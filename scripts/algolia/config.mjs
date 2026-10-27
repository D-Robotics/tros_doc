export const DOCSEARCH_SETTINGS = {
  searchableAttributes: [
    'hierarchy.lvl0',
    'hierarchy.lvl1',
    'hierarchy.lvl2',
    'hierarchy.lvl3',
    'hierarchy.lvl4',
    'hierarchy.lvl5',
    'hierarchy.lvl6',
    'content',
  ],
  attributesForFaceting: [
    'filterOnly(language)',
    'filterOnly(docusaurus_tag)',
    'filterOnly(doc_scope)',
  ],
  distinct: true,
  attributeForDistinct: 'url',
  customRanking: ['desc(pageRank)', 'desc(level)', 'asc(position)'],
  highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
  highlightPostTag: '</span>',
};

export const SKIP_PATH_RE =
  /\/(search|tags|blog)(\/|$)|\/category\/|\.(png|jpe?g|gif|webp|svg|ico|css|js|mjs|map|woff2?|ttf|eot|zip|gz|pdf|mp4)$/i;

export const STATIC_ASSET_RE =
  /\.(png|jpe?g|gif|webp|svg|ico|css|js|mjs|map|woff2?|ttf|eot|zip|gz|pdf)$/i;

export function envConfig() {
  if (process.env.ALGOLIA_NO_PROXY === '1') {
    for (const k of [
      'HTTP_PROXY',
      'HTTPS_PROXY',
      'http_proxy',
      'https_proxy',
      'ALL_PROXY',
      'all_proxy',
    ]) {
      delete process.env[k];
    }
  }

  const adminKey = process.env.ALGOLIA_ADMIN_API_KEY;
  const appId = process.env.ALGOLIA_APP_ID || 'placeholder';
  const indexName = process.env.ALGOLIA_INDEX_NAME || 'tros_doc';
  const siteUrl = (
    process.env.ALGOLIA_SITE_URL || 'https://developer.d-robotics.cc/tros_doc'
  ).replace(/\/+$/, '');

  return {adminKey, appId, indexName, siteUrl};
}

export function levelWeight(type) {
  if (type === 'content') return 0;
  const m = /^lvl(\d)$/.exec(type);
  if (!m) return 0;
  return 100 - Number(m[1]) * 10;
}
