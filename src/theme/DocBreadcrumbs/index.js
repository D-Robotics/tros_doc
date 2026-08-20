import React, {useMemo} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useSidebarBreadcrumbs, useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import {useDocScopeFilter} from '@site/src/context/DocScopeFilterContext';
import {shouldShowInSidebar} from '@site/src/context/sidebar-scope-config';
import {
  flattenSingleChildCategories,
  renumberVisibleItems,
  stripNumberPrefix,
} from '@site/src/utils/sidebar-numbering';
import styles from './styles.module.css';

function filterItemsByScope(items, version, product) {
  if (!Array.isArray(items)) {
    return [];
  }
  const result = [];
  for (const item of items) {
    if (item?.type === 'category' && Array.isArray(item.items)) {
      const filteredChildren = filterItemsByScope(item.items, version, product);
      if (filteredChildren.length > 0) {
        result.push({...item, items: filteredChildren});
      }
      continue;
    }
    if (shouldShowInSidebar(item, version, product)) {
      result.push(item);
    }
  }
  return result;
}

function processSidebarItems(items, version, product) {
  const filtered = filterItemsByScope(items, version, product);
  const flattened = flattenSingleChildCategories(filtered);
  return renumberVisibleItems(flattened);
}

function normalizePath(path) {
  if (!path) return '';
  return String(path)
    .split('#')[0]
    .split('?')[0]
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}

function normalizePathTail(path) {
  const normalized = normalizePath(path);
  if (!normalized) return '';
  return normalized
    .replace(/^\/tros_doc\//, '/')
    .replace(/^\/rdk_s_doc\//, '/')
    .replace(/^\/en\//, '/');
}

function hrefsMatch(a, b) {
  if (!a || !b) return false;
  return (
    normalizePath(a) === normalizePath(b) ||
    normalizePathTail(a) === normalizePathTail(b)
  );
}

/**
 * 在已重编号的侧栏中查找与面包屑项对应的节点。
 * 无独立页面的目录没有 href，需要按去掉章节号后的标题匹配。
 */
function findMatchingSidebarItem(items, crumb) {
  if (!Array.isArray(items) || !crumb) return null;

  const crumbHref = crumb.href || '';
  const crumbLabelRest = stripNumberPrefix(crumb.label || '');

  for (const item of items) {
    const itemHref = item?.href || item?.permalink || '';
    if (crumbHref && hrefsMatch(itemHref, crumbHref)) {
      return item;
    }
    if (crumbLabelRest && stripNumberPrefix(item?.label || '') === crumbLabelRest) {
      return item;
    }
  }
  return null;
}

function remapBreadcrumbs(processedItems, breadcrumbs, pathname) {
  if (!breadcrumbs) return null;

  let currentLevel = processedItems;
  const result = [];

  breadcrumbs.forEach((item, idx) => {
    const isLast = idx === breadcrumbs.length - 1;
    let match = findMatchingSidebarItem(currentLevel, item);
    if (!match && isLast && pathname) {
      match = findMatchingSidebarItem(currentLevel, {...item, href: pathname});
    }

    if (match) {
      result.push({...item, label: match.label});
      currentLevel = Array.isArray(match.items) ? match.items : [];
      return;
    }

    // 当前页始终保留；中间目录若已从侧栏扁平化掉则跳过，保证与目录一致
    if (isLast) {
      result.push(item);
    }
  });

  return result;
}

function BreadcrumbsItemLink({children, href, isLast}) {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({children, active}) {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const docsSidebar = useDocsSidebar();
  const {version, product} = useDocScopeFilter();
  const {pathname} = useLocation();
  const homePageRoute = useHomePageRoute();

  const processedSidebarItems = useMemo(() => {
    return processSidebarItems(docsSidebar?.items, version, product);
  }, [docsSidebar?.items, version, product]);

  const scopedBreadcrumbs = useMemo(() => {
    return remapBreadcrumbs(processedSidebarItems, breadcrumbs, pathname);
  }, [processedSidebarItems, breadcrumbs, pathname]);

  if (!scopedBreadcrumbs) {
    return null;
  }

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={scopedBreadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {scopedBreadcrumbs.map((item, idx) => {
            const isLast = idx === scopedBreadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
