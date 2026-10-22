import React, { useEffect, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import NotFound from '@theme-original/NotFound';

/**
 * 静态托管（OSS/CDN、GitHub Pages）对任何找不到的路径都只会回退到默认语言
 * 的 404 页面，即使 URL 属于 /en/ 英文文档。这样英文文档里点开失效链接时，
 * 显示的会是中文 404 页面。
 *
 * 这里在默认语言（中文）的 404 页面上检测 URL 是否属于其他语言前缀，
 * 如果是，就跳转到该语言在构建时已经生成的 404 页面，保证导航栏、
 * 页脚和提示文案都是对应语言。
 */
function getLocaleRedirects(baseUrl, locales) {
  return locales.map((locale) => ({
    prefix: `${baseUrl}${locale}/`,
    target: `${baseUrl}${locale}/404.html`,
  }));
}

function findRedirectTarget(pathname, redirects) {
  for (const { prefix, target } of redirects) {
    if (pathname.startsWith(prefix) && !pathname.startsWith(target)) {
      return target;
    }
  }
  return null;
}

function createRedirectScript(redirects) {
  // 内联脚本在页面 JS 加载前执行，避免用户先看到一闪而过的中文 404 内容。
  return `(function () {
  try {
    var redirects = ${JSON.stringify(redirects)};
    for (var i = 0; i < redirects.length; i += 1) {
      var pathname = window.location.pathname;
      if (pathname.indexOf(redirects[i].prefix) === 0 && pathname.indexOf(redirects[i].target) !== 0) {
        window.location.replace(redirects[i].target);
        return;
      }
    }
  } catch (error) {
    // 跳转失败时保留默认语言的 404 页面。
  }
})();`;
}

export default function NotFoundWrapper(props) {
  const { i18n, siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;
  const { currentLocale, defaultLocale, locales } = i18n;

  const redirects = useMemo(() => {
    // 非默认语言的 404 页面本身就是正确语言，不需要再跳转。
    if (currentLocale !== defaultLocale) {
      return [];
    }
    return getLocaleRedirects(
      baseUrl,
      locales.filter((locale) => locale !== defaultLocale),
    );
  }, [baseUrl, currentLocale, defaultLocale, locales]);

  useEffect(() => {
    // 客户端路由跳转到不存在的英文地址时，内联脚本不会重新执行，这里补充处理。
    if (redirects.length === 0) {
      return;
    }
    const target = findRedirectTarget(window.location.pathname, redirects);
    if (target) {
      window.location.replace(target);
    }
  }, [redirects]);

  return (
    <>
      {redirects.length > 0 && (
        <script
          dangerouslySetInnerHTML={{ __html: createRedirectScript(redirects) }}
        />
      )}
      <NotFound {...props} />
    </>
  );
}
