#!/usr/bin/env node
/**
 * Fail CI builds that would ship DocSearch with placeholder credentials.
 * Local builds can skip with ALLOW_ALGOLIA_PLACEHOLDER=1.
 */
const appId = (process.env.ALGOLIA_APP_ID || '').trim();
const apiKey = (process.env.ALGOLIA_SEARCH_API_KEY || '').trim();
const indexName = (process.env.ALGOLIA_INDEX_NAME || '').trim();
const allowPlaceholder = process.env.ALLOW_ALGOLIA_PLACEHOLDER === '1';

const missing = [];
if (!appId || appId === 'YOUR_APP_ID') missing.push('ALGOLIA_APP_ID');
if (!apiKey || apiKey === 'YOUR_SEARCH_API_KEY') missing.push('ALGOLIA_SEARCH_API_KEY');
if (!indexName) missing.push('ALGOLIA_INDEX_NAME');

if (missing.length === 0) {
  console.log(
    `[algolia-env] ok appId=${appId.slice(0, 4)}… index=${indexName} keyLen=${apiKey.length}`,
  );
  process.exit(0);
}

const msg = `[algolia-env] missing/placeholder: ${missing.join(', ')}`;
if (allowPlaceholder || !process.env.CI) {
  console.warn(`${msg} (continuing; set secrets in CI to enable search)`);
  process.exit(0);
}

console.error(`${msg}. Refusing to build searchable site with placeholder Algolia credentials.`);
process.exit(1);
