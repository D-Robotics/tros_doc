import {useMemo} from 'react';
import {useDocScopeFilter} from '@site/src/context/DocScopeFilterContext';
import {
  formatDocScope,
  docScopeFacetFilter,
  appendScopeQueryToUrl,
} from './config';

export function useDocScopeSearch() {
  const {product, version} = useDocScopeFilter();
  return useMemo(
    () => ({
      product,
      version,
      scope: formatDocScope(product, version),
    }),
    [product, version],
  );
}

export function useDocScopeFacetFilters() {
  const {scope} = useDocScopeSearch();
  return useMemo(() => [docScopeFacetFilter(scope)], [scope]);
}

export function useAppendDocScopeToUrl() {
  const {product, version} = useDocScopeSearch();
  return (url) => appendScopeQueryToUrl(url, product, version);
}
