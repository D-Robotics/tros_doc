import {algoliasearch} from 'algoliasearch';
import {DOCSEARCH_SETTINGS} from './config.mjs';

async function waitTask(client, indexName, taskID) {
  if (taskID == null) return;
  await client.waitForTask({indexName, taskID});
}

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

  // setSettings creates the index if it does not exist; wait until it is ready.
  const settingsRes = await client.setSettings({
    indexName,
    indexSettings: DOCSEARCH_SETTINGS,
  });
  await waitTask(client, indexName, settingsRes.taskID);
  console.log(`[algolia-index] index ready: ${indexName}`);

  if (!skipClear) {
    const clearRes = await client.clearObjects({indexName});
    await waitTask(client, indexName, clearRes.taskID);
  }

  const batchSize = 500;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await client.saveObjects({
      indexName,
      objects: batch,
      waitForTasks: true,
    });
    console.log(
      `[algolia-index] uploaded ${Math.min(i + batch.length, records.length)}/${records.length}`,
    );
  }

  return client;
}

export async function probeIndex(client, indexName, probes) {
  const results = [];
  for (const probe of probes) {
    let lastErr;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
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
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        const missing =
          err?.status === 404 ||
          /does not exist/i.test(String(err?.message || err));
        if (!missing || attempt === 5) throw err;
        console.warn(
          `[algolia-index] probe retry ${attempt}/5 (${probe.label}): ${err.message}`,
        );
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
    if (lastErr) throw lastErr;
  }
  return results;
}
