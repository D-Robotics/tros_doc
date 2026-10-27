import * as cheerio from 'cheerio';
import {levelWeight} from './config.mjs';
import {makeObjectId} from './object-id.mjs';
import {
  effectiveBlockScopes,
  pageScopesFromHtml,
  parseScopesFromAttr,
} from './scope.mjs';

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function localeFromUrl(url) {
  const pathname = new URL(url).pathname;
  return /\/en(\/|$)/.test(pathname) ? 'en' : 'zh-Hans';
}

function docusaurusTagFromHtml($) {
  const cls = $('html').attr('class') || '';
  const plugin = cls.match(/plugin-id-(\w+)/)?.[1] ?? 'default';
  const version = cls.match(/docs-version-([\w-]+)/)?.[1] ?? 'current';
  return `docs-${plugin}-${version}`;
}

function emptyHierarchy() {
  return {
    lvl0: null,
    lvl1: null,
    lvl2: null,
    lvl3: null,
    lvl4: null,
    lvl5: null,
    lvl6: null,
  };
}

function hierarchyPath(h) {
  return HEADING_TAGS.map((_, i) => h[`lvl${i}`]).filter(Boolean).join(' > ');
}

function slugifyAnchor(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '');
}

function pickContentRoot($) {
  const sel = [
    'article .theme-doc-markdown',
    'article .markdown',
    '.theme-doc-markdown',
    'main .markdown',
    'article',
  ];
  for (const s of sel) {
    const el = $(s).first();
    if (el.length) return el;
  }
  return $('body');
}

function walkNode($, el, state, pageMeta, out) {
  const tag = el[0]?.tagName?.toLowerCase?.();
  if (!tag) return;

  if (el.attr('data-doc-scope')) {
    state.scopeStack.push(
      parseScopesFromAttr(el.attr('data-doc-scope')) ?? [],
    );
  }

  const blockScopes =
    state.scopeStack.length > 0
      ? state.scopeStack[state.scopeStack.length - 1]
      : null;
  const docScopes = effectiveBlockScopes(pageMeta.pageScopes, blockScopes);

  if (HEADING_TAGS.includes(tag)) {
    const level = Number(tag[1]) - 1;
    const text = el.text().trim();
    if (!text) {
      // still pop scope if needed at end
    } else {
      for (let i = level; i < 7; i++) state.hierarchy[`lvl${i}`] = null;
      state.hierarchy[`lvl${level}`] = text;
      const anchor =
        el.attr('id') ||
        slugifyAnchor(text) ||
        `heading-${state.position}`;
      pushRecord(out, {
        type: `lvl${level}`,
        content: text,
        hierarchy: {...state.hierarchy},
        anchor,
        docScopes,
        pageMeta,
        position: state.position++,
      });
    }
  } else if (tag === 'p' || tag === 'li' || tag === 'td') {
    const text = el.text().replace(/\s+/g, ' ').trim();
    if (text.length >= 2 && docScopes.length) {
      const anchor = currentAnchor(state);
      pushRecord(out, {
        type: 'content',
        content: text,
        hierarchy: {...state.hierarchy},
        anchor,
        docScopes,
        pageMeta,
        position: state.position++,
      });
    }
  }

  if (el.children().length) {
    el.children().each((_, child) => {
      walkNode($, $(child), state, pageMeta, out);
    });
  }

  if (el.attr('data-doc-scope')) {
    state.scopeStack.pop();
  }
}

function currentAnchor(state) {
  for (let i = 6; i >= 0; i--) {
    const key = `lvl${i}`;
    if (state.hierarchy[key]) {
      return slugifyAnchor(state.hierarchy[key]);
    }
  }
  return '';
}

function pushRecord(out, {type, content, hierarchy, anchor, docScopes, pageMeta, position}) {
  const urlWithoutAnchor = pageMeta.urlWithoutAnchor;
  const url = anchor ? `${urlWithoutAnchor}#${anchor}` : urlWithoutAnchor;
  const level = type.startsWith('lvl') ? Number(type.slice(3)) : 7;
  const record = {
    hierarchy,
    content,
    type,
    url,
    url_without_anchor: urlWithoutAnchor,
    anchor: anchor || '',
    language: pageMeta.language,
    lang: pageMeta.language,
    version: 'current',
    docusaurus_tag: pageMeta.docusaurus_tag,
    doc_scope: [...docScopes].sort(),
    weight: levelWeight(type) - position * 0.01,
    pageRank: pageMeta.pageRank,
    level,
    position,
  };
  record.objectID = makeObjectId({
    url,
    anchor,
    type,
    content,
    hierarchyPath: hierarchyPath(hierarchy),
    position,
    doc_scope: record.doc_scope,
  });
  out.push(record);
}

export function parsePageHtml(html, url) {
  const $ = cheerio.load(html);
  const urlWithoutAnchor = url.split('#')[0];
  const language = localeFromUrl(url);
  const pageScopes = pageScopesFromHtml($, url);
  const pageMeta = {
    urlWithoutAnchor,
    language,
    docusaurus_tag: docusaurusTagFromHtml($),
    pageRank: 10,
    pageScopes,
  };

  const root = pickContentRoot($);
  const state = {
    hierarchy: emptyHierarchy(),
    position: 0,
    scopeStack: [],
  };
  const records = [];

  root.children().each((_, child) => {
    walkNode($, $(child), state, pageMeta, records);
  });

  if (records.length === 0 && pageScopes.length) {
    const title = $('title').text().trim() || url;
    state.hierarchy.lvl0 = title;
    pushRecord(records, {
      type: 'lvl0',
      content: title,
      hierarchy: {...state.hierarchy},
      anchor: '',
      docScopes: pageScopes,
      pageMeta,
      position: 0,
    });
  }

  return records;
}
