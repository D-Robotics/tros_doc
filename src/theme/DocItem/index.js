import React, { useLayoutEffect, useMemo } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DocItem from "@theme-original/DocItem";
import DocScopeHydration from "@site/src/components/DocScopeHydration";
import DocUnavailable from "@site/src/components/DocUnavailable";
import GiscusComments from "./GiscusComments";
import { useDocScopeFilter } from "@site/src/context/DocScopeFilterContext";
import {
  shouldShowDoc,
  findFirstVisibleDoc,
} from "@site/src/context/sidebar-scope-config";
import { isMultiInstanceDocsRoute } from "@site/src/utils/docs-route-utils";
import {
  flattenSingleChildCategories,
  findDocDisplayNumber,
  renumberVisibleItems,
  stripNumberPrefix,
} from "@site/src/utils/sidebar-numbering";

function filterItems(items, version, product) {
  if (!Array.isArray(items)) return items;
  const result = [];
  for (const item of items) {
    if (item.type === "category" && item.items) {
      const filtered = filterItems(item.items, version, product);
      if (filtered.length > 0) {
        result.push({ ...item, items: filtered });
      }
      continue;
    }
    if (shouldShowDoc(item.docId || "", version, product)) {
      result.push(item);
    }
  }
  return result;
}

export default function DocItemWrapper(props) {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { version, product, consumeSwitchIntent } = useDocScopeFilter();
  const history = useHistory();
  const location = useLocation();
  const sidebar = useDocsSidebar();
  const homeUrl = useBaseUrl("/");

  const docId = props?.content?.metadata?.id || "";

  const skipSidebarScope = isMultiInstanceDocsRoute(
    location.pathname,
    siteConfig.baseUrl,
    i18n.currentLocale,
    i18n.defaultLocale,
  );

  const visible = skipSidebarScope || shouldShowDoc(docId, version, product);
  const filteredRenumberedSidebar = useMemo(() => {
    if (!sidebar?.items || skipSidebarScope) return null;
    const filtered = filterItems(sidebar.items, version, product);
    const flattened = flattenSingleChildCategories(filtered);
    return renumberVisibleItems(flattened);
  }, [sidebar, skipSidebarScope, version, product]);
  const currentDocDisplayNumber = useMemo(() => {
    if (!filteredRenumberedSidebar) return null;
    return findDocDisplayNumber(filteredRenumberedSidebar, docId);
  }, [filteredRenumberedSidebar, docId]);
  const renumberedDocTitle = useMemo(() => {
    const rawMetaTitle = props?.content?.metadata?.title || "";
    const plain = stripNumberPrefix(rawMetaTitle).trim();
    if (!plain || !currentDocDisplayNumber) return null;
    return `${currentDocDisplayNumber} ${plain}`;
  }, [props?.content?.metadata?.title, currentDocDisplayNumber]);
  const patchedContent = useMemo(() => {
    const originalContent = props?.content;
    if (!originalContent || !renumberedDocTitle) {
      return originalContent;
    }
    const currentTitle = originalContent?.metadata?.title || "";
    if (!currentTitle || currentTitle === renumberedDocTitle) {
      return originalContent;
    }

    function WrappedContent(mdxProps) {
      return React.createElement(originalContent, mdxProps);
    }

    Object.assign(WrappedContent, originalContent, {
      metadata: {
        ...originalContent.metadata,
        title: renumberedDocTitle,
      },
    });

    return WrappedContent;
  }, [props?.content, renumberedDocTitle]);

  // 只有读者主动切换产品/版本导致当前页不可见时，才跳到新选择下的第一个可见文档；
  // 点链接进入的隐藏页保持 URL，由下面的分支渲染「找不到页面」。
  useLayoutEffect(() => {
    if (skipSidebarScope || !sidebar?.items) {
      return;
    }
    const intentionalSwitch = consumeSwitchIntent(version, product);
    if (visible || !intentionalSwitch) {
      return;
    }
    const preferredHref = findFirstVisibleDoc(sidebar.items, version, product) || homeUrl;
    history.replace(`${preferredHref}${window.location.search}`);
  }, [
    visible,
    history,
    sidebar,
    skipSidebarScope,
    homeUrl,
    consumeSwitchIntent,
    version,
    product,
  ]);

  useLayoutEffect(() => {
    if (!visible || skipSidebarScope || !currentDocDisplayNumber) {
      return;
    }
    const root =
      typeof document !== "undefined"
        ? document.querySelector(".theme-doc-markdown") ||
          document.querySelector("article.markdown") ||
          document.querySelector("article")
        : null;
    const h1 = root?.querySelector("h1");
    if (!h1) return;

    const rawTitle = (h1.textContent || "").trim();
    if (!rawTitle) return;
    const plainTitle = stripNumberPrefix(rawTitle).trim();
    if (!plainTitle) return;

    const nextTitle = `${currentDocDisplayNumber} ${plainTitle}`;
    if (rawTitle !== nextTitle) {
      h1.textContent = nextTitle;
    }
  }, [visible, skipSidebarScope, currentDocDisplayNumber, docId]);

  if (!visible) {
    return <DocUnavailable docId={docId} />;
  }

  return (
    <>
      <DocScopeHydration />
      <DocItem {...props} content={patchedContent || props.content} />
      <GiscusComments />
    </>
  );
}
