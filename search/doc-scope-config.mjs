/**
 * Doc scope dimensions for search indexing and frontend facet filters.
 * Values are stored in Algolia as filterOnly(doc_scope): "product::version"
 */
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const matrixPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/context/doc-scope-matrix.json',
);
const {PRODUCT_VERSION_MATRIX} = require(matrixPath);

export {PRODUCT_VERSION_MATRIX};

export const DOC_SCOPE_DIMENSIONS = {
  product: {
    queryParam: 'p',
    default: 'RDK X3',
    label: 'RDK X3',
  },
  version: {
    queryParam: 'v',
    default: '3.0.0',
    label: '3.0.0',
  },
};

/** @returns {string} e.g. RDK X5::3.5.0 */
export function formatDocScope(product, version) {
  return `${product}::${version}`;
}

export function allDocScopes() {
  const scopes = [];
  for (const [product, versions] of Object.entries(PRODUCT_VERSION_MATRIX)) {
    for (const version of versions) {
      scopes.push(formatDocScope(product, version));
    }
  }
  return scopes;
}

export function defaultDocScope() {
  return formatDocScope(
    DOC_SCOPE_DIMENSIONS.product.default,
    DOC_SCOPE_DIMENSIONS.version.default,
  );
}

/** Algolia facet filter string */
export function docScopeFacetFilter(scope = defaultDocScope()) {
  return `doc_scope:${scope}`;
}

/**
 * Page pathname → doc_scope[] (intersection semantics at block level).
 * Default: all product::version pairs so unscoped content is searchable under any filter.
 */
export function pageDocScopesFromPathname(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized.includes('/search')) {
    return [];
  }
  return allDocScopes();
}

export function appendScopeQueryToUrl(url, product, version) {
  const {queryParam: pKey} = DOC_SCOPE_DIMENSIONS.product;
  const {queryParam: vKey} = DOC_SCOPE_DIMENSIONS.version;
  try {
    const u = new URL(url, 'https://placeholder.local');
    u.searchParams.set(pKey, product);
    u.searchParams.set(vKey, version);
    return u.pathname + u.search + u.hash;
  } catch {
    return url;
  }
}
