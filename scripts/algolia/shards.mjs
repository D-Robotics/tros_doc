import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_LOCALE = 'zh-Hans';

export function writeSearchIndexShards(fineRecords, outDir) {
  const localeRecords = fineRecords.filter(
    (r) => r.language === DEFAULT_LOCALE,
  );

  const pages = [];
  const headings = [];
  const inPageSnippets = [];
  const contentSummaries = [];

  const seenPages = new Set();

  for (const r of localeRecords) {
    if (r.type.startsWith('lvl') && !seenPages.has(r.url_without_anchor)) {
      if (r.type === 'lvl0') {
        pages.push({
          url: r.url_without_anchor,
          title: r.content,
          doc_scope: r.doc_scope,
        });
        seenPages.add(r.url_without_anchor);
      }
      headings.push({
        url: r.url,
        type: r.type,
        title: r.content,
        hierarchy: r.hierarchy,
        doc_scope: r.doc_scope,
      });
    }
    if (r.type === 'content') {
      const snippet = r.content.slice(0, 280);
      inPageSnippets.push({
        url: r.url_without_anchor,
        anchor: r.anchor,
        snippet,
        doc_scope: r.doc_scope,
      });
      contentSummaries.push({
        url: r.url,
        summary: r.content.slice(0, 500),
        doc_scope: r.doc_scope,
      });
    }
  }

  const shards = {
    pages,
    headings,
    'in-page-snippets': inPageSnippets,
    empty: [],
    'content-summaries': contentSummaries,
  };

  fs.mkdirSync(outDir, {recursive: true});
  for (const [name, data] of Object.entries(shards)) {
    fs.writeFileSync(
      path.join(outDir, `${name}.json`),
      JSON.stringify(data, null, 2),
      'utf8',
    );
  }

  fs.writeFileSync(
    path.join(outDir, 'manifest.json'),
    JSON.stringify(
      {
        locale: DEFAULT_LOCALE,
        generatedAt: new Date().toISOString(),
        counts: Object.fromEntries(
          Object.entries(shards).map(([k, v]) => [k, v.length]),
        ),
      },
      null,
      2,
    ),
    'utf8',
  );

  return shards;
}
