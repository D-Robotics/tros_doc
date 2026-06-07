#!/usr/bin/env node
/**
 * Split algorithm-info markdown tables by platform into DocScope blocks.
 * Usage:
 *   node scripts/split-algorithm-info-tables.mjs           # Chinese docs/
 *   node scripts/split-algorithm-info-tables.mjs --en      # English i18n
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isEn = process.argv.includes('--en');
const docsDir = isEn
  ? path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs/current')
  : path.join(__dirname, '../docs');

const SECTION_MARKERS = isEn
  ? ['## Algorithm Information', '## Algorithm Info']
  : ['## 算法信息'];

const PLATFORM_COLUMNS = isEn ? ['Platform'] : ['平台'];

const PLATFORM_ORDER = ['X3', 'X5', 'S100', 'S100P', 'S600'];
const PLATFORM_TO_PRODUCT = {
  X3: 'RDK-X3',
  X5: 'RDK-X5',
  S100: 'RDK-S100',
  S100P: 'RDK-S100',
  S600: 'RDK-S600',
};

const DOC_SCOPE_IMPORT = "import DocScope from '@site/src/components/DocScope';";

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full, out);
    } else if (name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function parseTableLines(lines) {
  const rows = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    const cells = trimmed
      .slice(1, trimmed.endsWith('|') ? -1 : undefined)
      .split('|')
      .map((c) => c.trim());
    rows.push(cells);
  }
  return rows;
}

function isSeparatorRow(cells) {
  return cells.every((c) => /^:?-{3,}:?$/.test(c.replace(/\s/g, '')) || c === '');
}

function findSectionMarker(content) {
  for (const marker of SECTION_MARKERS) {
    const idx = content.indexOf(marker);
    if (idx !== -1) return { marker, idx };
  }
  return null;
}

function extractTablePipeLines(sectionBody) {
  const lines = sectionBody.split('\n');
  const pipeLines = [];
  let firstIdx = -1;
  let lastIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|')) {
      pipeLines.push(lines[i]);
      if (firstIdx === -1) firstIdx = i;
      lastIdx = i;
    }
  }
  return { pipeLines, firstIdx, lastIdx, lines };
}

function splitAlgorithmSection(content) {
  const found = findSectionMarker(content);
  if (!found) return null;
  const { marker, idx } = found;

  const afterHeading = content.slice(idx + marker.length);
  const nextSection = afterHeading.search(/\n## /);
  const sectionBody = nextSection === -1 ? afterHeading : afterHeading.slice(0, nextSection);

  if (sectionBody.includes('<DocScope products=')) {
    return null;
  }

  const { pipeLines, firstIdx, lastIdx, lines } = extractTablePipeLines(sectionBody);
  if (pipeLines.length < 2 || firstIdx === -1) return null;

  const rows = parseTableLines(pipeLines);
  if (rows.length < 2) return null;

  const header = rows[0];
  const platformIdx = header.findIndex((h) => PLATFORM_COLUMNS.includes(h));
  if (platformIdx === -1) return null;

  const dataRows = rows.slice(1).filter((r) => !isSeparatorRow(r));
  const grouped = new Map();
  for (const row of dataRows) {
    const platform = row[platformIdx]?.trim();
    if (!platform || !PLATFORM_TO_PRODUCT[platform]) continue;
    const product = PLATFORM_TO_PRODUCT[platform];
    if (!grouped.has(product)) grouped.set(product, { platform, rows: [] });
    grouped.get(product).rows.push(row);
  }
  if (grouped.size === 0) return null;

  const headerLine = `| ${header.join(' | ')} |`;
  const sepLine = `| ${header.map(() => '----').join(' | ')} |`;

  const blocks = [];
  const emittedProducts = new Set();
  for (const platform of PLATFORM_ORDER) {
    const product = PLATFORM_TO_PRODUCT[platform];
    if (emittedProducts.has(product)) continue;
    const bucket = grouped.get(product);
    if (!bucket) continue;
    emittedProducts.add(product);
    const dataLines = bucket.rows.map((row) => `| ${row.join(' | ')} |`);
    blocks.push(
      `<DocScope products="${product}">\n\n${headerLine}\n${sepLine}\n${dataLines.join('\n')}\n\n</DocScope>`,
    );
  }

  const prefix = sectionBody.slice(0, sectionBody.split('\n').slice(0, firstIdx).join('\n').length + (firstIdx > 0 ? 1 : 0));
  const suffix = lastIdx < lines.length - 1 ? sectionBody.slice(sectionBody.split('\n').slice(0, lastIdx + 1).join('\n').length + 1) : '';

  const replacement = `${prefix}${blocks.join('\n')}${suffix}`;
  const tableBlockStart = idx + marker.length;
  const tableBlockEnd = idx + marker.length + sectionBody.length;
  const newContent = content.slice(0, tableBlockStart) + replacement + content.slice(tableBlockEnd);

  return newContent;
}

function ensureDocScopeImport(content) {
  if (content.includes(DOC_SCOPE_IMPORT)) return content;
  const blockMatch = content.match(/```mdx-code-block\n([\s\S]*?)\n```/);
  if (blockMatch) {
    const block = blockMatch[1];
    if (block.includes('DocScope')) return content;
    const newBlock = `${block}\n${DOC_SCOPE_IMPORT}`;
    return content.replace(blockMatch[0], `\`\`\`mdx-code-block\n${newBlock}\n\`\`\``);
  }
  const headingEnd = content.search(/^#\s/m);
  if (headingEnd === -1) return content;
  const lineEnd = content.indexOf('\n', headingEnd);
  const insertAt = lineEnd === -1 ? content.length : lineEnd + 1;
  const injection = '\n```mdx-code-block\n' + DOC_SCOPE_IMPORT + '\n```\n';
  return content.slice(0, insertAt) + injection + content.slice(insertAt);
}

const files = walk(docsDir);
let updated = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const next = splitAlgorithmSection(content);
  if (!next) continue;
  const finalContent = ensureDocScopeImport(next);
  fs.writeFileSync(file, finalContent, 'utf8');
  updated += 1;
  console.log('updated:', path.relative(docsDir, file));
}
console.log(`\nDone. Updated ${updated} files in ${isEn ? 'en i18n' : 'docs'}.`);
