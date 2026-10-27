import {algoliasearch} from 'algoliasearch';
import {DOCSEARCH_SETTINGS} from './config.mjs';

export async function uploadRecords({
  appId,
  adminKey,
  indexName,
  records,
  skipClear,
}) {
  if (!adminKey) {
    throw new Error('ALGOLIA_ADMIN_API_KEY is required for upload');
  }
  if (records.length === 0) {
    throw new Error('Refusing to clear/upload: zero records');
  }

  const client = algoliasearch(appId, adminKey);

  await client.setSettings({
    indexName,
    indexSettings: DOCSEARCH_SETTINGS,
  });

  if (!skipClear) {
    await client.clearObjects({indexName});
  }

  const batchSize = 500;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await client.saveObjects({indexName, objects: batch});
  }

  return client;
}

export async function probeIndex(client, indexName, probes) {
  const results = [];
  for (const probe of probes) {
    const res = await client.searchSingleIndex({
      indexName,
      searchParams: {
        query: probe.query || '',
        hitsPerPage: 3,
        facetFilters: probe.facetFilters,
      },
    });
    results.push({
      label: probe.label,
      nbHits: res.nbHits,
      facets: res.facets,
    });
  }
  return results;
}
