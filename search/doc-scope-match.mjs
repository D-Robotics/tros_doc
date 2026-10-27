/**
 * Indexer-side scope matching (mirrors src/context doc-scope utils, ESM-safe).
 */
import {PRODUCT_VERSION_MATRIX, formatDocScope, allDocScopes} from './doc-scope-config.mjs';

function normalizeProductKey(s) {
  return String(s)
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/\s+/g, ' ');
}

function normalizeProductSeriesKey(s) {
  if (s == null || typeof s !== 'string') return null;
  const match = s.trim().match(/^rdk\s*-\s*(.+)$/i);
  if (!match) return null;
  const suffix = match[1].trim().replace(/\s+/g, ' ');
  if (!suffix) return null;
  return normalizeProductKey(`RDK ${suffix}`);
}

function productBelongsToSeries(currentProduct, seriesKey) {
  const current = normalizeProductKey(currentProduct);
  return current === seriesKey || current.startsWith(`${seriesKey} `);
}

function resolveCanonicalProduct(input) {
  if (input == null || String(input).trim() === '') return null;
  const key = normalizeProductKey(input);
  for (const product of Object.keys(PRODUCT_VERSION_MATRIX)) {
    if (normalizeProductKey(product) === key) return product;
  }
  return null;
}

function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  const maxLength = Math.max(parts1.length, parts2.length);
  for (let i = 0; i < maxLength; i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 < p2) return -1;
    if (p1 > p2) return 1;
  }
  return 0;
}

function versionMatchesOperator(currentVersion, operator, version) {
  const cmp = compareVersions(currentVersion, version);
  switch (operator) {
    case '>':
      return cmp > 0;
    case '>=':
      return cmp >= 0;
    case '<':
      return cmp < 0;
    case '<=':
      return cmp <= 0;
    case '':
    default:
      return cmp === 0;
  }
}

function parseVersionExpression(versionStr) {
  if (!versionStr || typeof versionStr !== 'string') return null;
  let trimmed = versionStr.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }
  const m = trimmed.match(/^(>=|<=|>|<)?\s*(\d+(?:\.\d+)*)$/);
  if (!m) return null;
  return {operator: m[1] || '', version: m[2]};
}

export function matchVersion(currentVersion, versionConfigs) {
  if (!versionConfigs || versionConfigs.length === 0) return true;
  for (const config of versionConfigs) {
    if (typeof config === 'string') {
      if (config === currentVersion) return true;
      const parsed = parseVersionExpression(config);
      if (parsed?.version) {
        if (versionMatchesOperator(currentVersion, parsed.operator, parsed.version)) {
          return true;
        }
      }
      continue;
    }
    if (typeof config === 'object' && config != null && config.version) {
      const op = config.operator != null ? config.operator : '';
      if (versionMatchesOperator(currentVersion, op, config.version)) {
        return true;
      }
    }
  }
  return false;
}

export function scopeProductsMatchCurrent(scopeProducts, currentProduct) {
  if (!scopeProducts || scopeProducts.length === 0) return true;
  if (currentProduct == null || String(currentProduct).trim() === '') return false;
  const cur = normalizeProductKey(currentProduct);
  for (const entry of scopeProducts) {
    const seriesKey = normalizeProductSeriesKey(entry);
    if (seriesKey && productBelongsToSeries(currentProduct, seriesKey)) {
      return true;
    }
    const canon = resolveCanonicalProduct(entry);
    if (canon && normalizeProductKey(canon) === cur) return true;
    if (normalizeProductKey(entry) === cur) return true;
  }
  return false;
}

/** Expand `{versions, products}` meta into concrete product::version facet values. */
export function expandMetaToScopes(meta) {
  if (!meta || typeof meta !== 'object') {
    return allDocScopes();
  }
  const versions = Array.isArray(meta.versions) ? meta.versions : [];
  const products = Array.isArray(meta.products) ? meta.products : [];
  const scopes = [];
  for (const [product, vers] of Object.entries(PRODUCT_VERSION_MATRIX)) {
    for (const version of vers) {
      if (
        matchVersion(version, versions) &&
        scopeProductsMatchCurrent(products, product)
      ) {
        scopes.push(formatDocScope(product, version));
      }
    }
  }
  return scopes.length ? scopes : allDocScopes();
}
