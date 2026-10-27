#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {discoverUrls} from './algolia/discover-urls.mjs';
import {parsePageHtml} from './algolia/parse-page.mjs';
import {aggregateRecords} from './algolia/aggregate.mjs';
import {dedupeByObjectId} from './algolia/object-id.mjs';
import {writeSearchIndexShards} from './algolia/shards.mjs';
import {envConfig} from './algolia/config.mjs';
import {uploadRecords, probeIndex} from './algolia/upload.mjs';
import {loadPageHtml} from './algolia/local-html.mjs';
import {
  defaultDocScope,
  docScopeFacetFilter,
} from '../search/doc-scope-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const skipClear = args.has('--skip-clear');

function summarizeFacets(records) {
  const languages = new Set();
  const tags = new Set();
  const scopes = new Set();
  for (const r of records) {
    languages.add(r.language);
    tags.add(r.docusaurus_tag);
    for (const s of r.doc_scope || []) scopes.add(s);
  }
  return {
    languages: [...languages].sort(),
    docusaurus_tags: [...tags].sort(),
    doc_scopes: [...scopes].sort(),
  };
}

async function main() {
  const {adminKey, appId, indexName, siteUrl} = envConfig();
  console.log(`[algolia-index] site=${siteUrl} index=${indexName} dryRun=${dryRun}`);

  const urls = await discoverUrls(siteUrl);
  console.log(`[algolia-index] discovered ${urls.length} URLs`);

  const fine = [];
  let errors = 0;
  for (const url of urls) {
    try {
      const html = await loadPageHtml(url, siteUrl);
      fine.push(...parsePageHtml(html, url));
    } catch (e) {
      errors += 1;
      console.warn(`[algolia-index] skip ${url}: ${e.message}`);
    }
  }

  const fineDeduped = dedupeByObjectId(fine);
  const aggregated = dedupeByObjectId(aggregateRecords(fineDeduped));
  const facets = summarizeFacets(aggregated);

  const outDir = path.join(process.cwd(), 'build', 'search-index');
  writeSearchIndexShards(fineDeduped, outDir);

  const report = {
    siteUrl,
    indexName,
    urlsDiscovered: urls.length,
    fetchErrors: errors,
    fineRecords: fineDeduped.length,
    aggregatedRecords: aggregated.length,
    facets,
    dryRun,
  };

  const reportPath = path.join(process.cwd(), 'build', 'algolia-index-report.json');
  fs.mkdirSync(path.dirname(reportPath), {recursive: true});
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('[algolia-index] facet summary:', JSON.stringify(facets, null, 2));
  console.log(
    `[algolia-index] records: fine=${fineDeduped.length} aggregated=${aggregated.length}`,
  );
  console.log(`[algolia-index] report → ${reportPath}`);
  console.log(`[algolia-index] shards → ${outDir}`);

  if (dryRun) {
    console.log('[algolia-index] dry-run complete (no upload)');
    return;
  }

  const client = await uploadRecords({
    appId,
    adminKey,
    indexName,
    records: aggregated,
    skipClear,
  });

  const scope = defaultDocScope();
  const probes = await probeIndex(client, indexName, [
    {
      label: 'zh-Hans + default tag + doc_scope',
      query: 'TROS',
      facetFilters: [
        'language:zh-Hans',
        'docusaurus_tag:docs-default-current',
        docScopeFacetFilter(scope),
      ],
    },
    {
      label: 'en + default tag + doc_scope',
      query: 'TROS',
      facetFilters: [
        'language:en',
        'docusaurus_tag:docs-default-current',
        docScopeFacetFilter(scope),
      ],
    },
  ]);

  console.log('[algolia-index] probe results:', JSON.stringify(probes, null, 2));
}

main().catch((err) => {
  console.error('[algolia-index] fatal:', err);
  process.exit(1);
});
