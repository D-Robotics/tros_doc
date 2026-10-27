/** CJS mirror of doc-scope-config.mjs for Docusaurus plugins. */
const DOC_SCOPE_DIMENSIONS = {
  product: {queryParam: 'p', default: 'RDK X3', label: 'RDK X3'},
  version: {queryParam: 'v', default: '3.0.0', label: '3.0.0'},
};

function formatDocScope(product, version) {
  return `${product}::${version}`;
}

function defaultDocScope() {
  return formatDocScope(
    DOC_SCOPE_DIMENSIONS.product.default,
    DOC_SCOPE_DIMENSIONS.version.default,
  );
}

function docScopeFacetFilter(scope = defaultDocScope()) {
  return `doc_scope:${scope}`;
}

function pageDocScopesFromPathname(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized.includes('/search')) {
    return [];
  }
  // Keep CJS mirror minimal; indexer uses the .mjs version with full matrix.
  return [defaultDocScope()];
}

module.exports = {
  DOC_SCOPE_DIMENSIONS,
  formatDocScope,
  defaultDocScope,
  docScopeFacetFilter,
  pageDocScopesFromPathname,
};
