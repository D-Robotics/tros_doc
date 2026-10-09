import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { PageMetadata } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import NotFoundContent from '@theme/NotFound/Content';
import { useDocScopeFilter } from '@site/src/context/DocScopeFilterContext';
import { findApplicableProductsForDoc } from '@site/src/context/sidebar-scope-config';

/**
 * 当前产品/版本下不存在的文档：保留 URL，展示站点本地化的「找不到页面」。
 * 文档只是被 DocScope 限定到别的平台时，列出适用平台，并允许一键切过去继续阅读。
 */
export default function DocUnavailable({ docId }) {
  const homeUrl = useBaseUrl('/');
  const { product, setProduct } = useDocScopeFilter();

  const switchableProducts = useMemo(
    () =>
      docId
        ? findApplicableProductsForDoc(docId).filter((name) => name !== product)
        : [],
    [docId, product],
  );
  const hasSwitchTargets = switchableProducts.length > 0;

  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <NotFoundContent />
      <div className="container margin-bottom--xl doc-unavailable">
        {hasSwitchTargets ? (
          <p className="doc-unavailable__products">
            <Translate
              id="docUnavailable.appliesTo"
              description="The platforms that a document is scoped to, shown on the not-found page"
            >
              该文档适用于：
            </Translate>
            {switchableProducts.join(' / ')}
          </p>
        ) : null}
        <div className="doc-unavailable__actions">
          {switchableProducts.map((name) => (
            <button
              key={name}
              type="button"
              className="button button--primary"
              onClick={() => setProduct(name)}>
              {translate(
                {
                  id: 'docUnavailable.switchProduct',
                  message: '切换到 {product} 查看',
                  description:
                    'The button label that switches to a platform where this document is available',
                },
                { product: name },
              )}
            </button>
          ))}
          <Link
            className={hasSwitchTargets ? 'button button--secondary' : 'button button--primary'}
            to={homeUrl}>
            <Translate
              id="docUnavailable.backHome"
              description="The button label that leads back to the documentation home page">
              返回文档首页
            </Translate>
          </Link>
        </div>
      </div>
    </>
  );
}
