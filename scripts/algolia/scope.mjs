import {
  defaultDocScope,
  pageDocScopesFromPathname,
} from '../../search/doc-scope-config.mjs';
import {expandMetaToScopes} from '../../search/doc-scope-match.mjs';

export function parseScopesFromAttr(value) {
  if (!value || !String(value).trim()) return null;
  const raw = String(value).trim();
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(String);
    }
    if (parsed && typeof parsed === 'object') {
      // tros DocScope payload: {versions, products}
      if ('versions' in parsed || 'products' in parsed) {
        return expandMetaToScopes(parsed);
      }
    }
    if (typeof parsed === 'string') return [parsed];
  } catch {
    // fall through
  }
  return raw.split(/[\s,]+/).filter(Boolean);
}

export function intersectScopes(a, b) {
  if (!a?.length) return b ?? [];
  if (!b?.length) return a ?? [];
  const set = new Set(b);
  return a.filter((x) => set.has(x));
}

export function pageScopesFromHtml($, url) {
  const pathname = new URL(url).pathname;
  const meta = $('meta[name="doc-scope"]').attr('content');
  const htmlScopes = parseScopesFromAttr(
    meta || $('html').attr('data-doc-scopes'),
  );
  const fromPath = pageDocScopesFromPathname(pathname);
  if (htmlScopes?.length) {
    return intersectScopes(fromPath, htmlScopes);
  }
  return fromPath.length ? fromPath : [defaultDocScope()];
}

export function effectiveBlockScopes(pageScopes, blockScopes) {
  if (!blockScopes?.length) return pageScopes;
  return intersectScopes(pageScopes, blockScopes);
}
