import {makeObjectId} from './object-id.mjs';

const MAX_CONTENT = 2000;

function groupKey(r) {
  const scopeKey = [...(r.doc_scope || [])].sort().join('|');
  return `${r.url_without_anchor}::${r.anchor || ''}::${scopeKey}`;
}

function hierarchyPath(h) {
  const parts = [];
  for (let i = 0; i <= 6; i++) {
    const v = h?.[`lvl${i}`];
    if (v) parts.push(v);
  }
  return parts.join(' > ');
}

function pickHeadingRecord(group) {
  const headings = group.filter((r) => r.type.startsWith('lvl'));
  if (!headings.length) return null;
  headings.sort((a, b) => a.level - b.level);
  return headings[0];
}

function splitContent(text) {
  if (text.length <= MAX_CONTENT) return [text];
  const chunks = [];
  let rest = text;
  while (rest.length > MAX_CONTENT) {
    let cut = rest.lastIndexOf('\n', MAX_CONTENT);
    if (cut < MAX_CONTENT / 2) cut = MAX_CONTENT;
    chunks.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

/** Merge fine-grained records into DocSearch-style heading records. */
export function aggregateRecords(records) {
  const groups = new Map();
  for (const r of records) {
    const key = groupKey(r);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }

  const aggregated = [];

  for (const group of groups.values()) {
    const heading = pickHeadingRecord(group);
    const contents = group
      .filter((r) => r.type === 'content')
      .sort((a, b) => a.position - b.position)
      .map((r) => r.content);

    if (!heading && contents.length === 0) continue;

    const base = heading ?? group[0];
    const mergedText = contents.join('\n\n').trim();
    const chunks =
      mergedText.length > 0 ? splitContent(mergedText) : [''];

    chunks.forEach((chunk, idx) => {
      const content =
        idx === 0 && heading
          ? heading.content + (chunk ? `\n\n${chunk}` : '')
          : chunk || heading?.content || '';
      const rec = {
        ...base,
        content,
        type: heading ? heading.type : 'content',
        weight: (heading?.weight ?? 0) + idx * 0.001,
        position: (heading?.position ?? 0) + idx,
      };
      rec.objectID = makeObjectId({
        url: rec.url,
        anchor: rec.anchor,
        type: rec.type,
        content: rec.content.slice(0, 200),
        hierarchyPath: hierarchyPath(rec.hierarchy),
        position: rec.position,
        doc_scope: rec.doc_scope,
        chunk: idx,
      });
      aggregated.push(rec);
    });
  }

  return aggregated;
}
