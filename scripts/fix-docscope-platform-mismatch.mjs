#!/usr/bin/env node
/**
 * Remove or narrow DocScope env-setup blocks that don't match section platform tables.
 *
 * Usage:
 *   node scripts/fix-docscope-platform-mismatch.mjs           # apply to docs/
 *   node scripts/fix-docscope-platform-mismatch.mjs --en        # apply to i18n/en/
 *   node scripts/fix-docscope-platform-mismatch.mjs --dry-run   # report only
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isEn = process.argv.includes('--en');
const dryRun = process.argv.includes('--dry-run');
const docsDir = isEn
  ? path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs/current')
  : path.join(__dirname, '../docs');

const PLATFORM_HEADINGS = isEn
  ? ['## Supported Platforms', '### Supported Platforms', '## 支持平台', '### 支持平台']
  : ['## 支持平台', '### 支持平台', '## Supported Platforms', '### Supported Platforms'];

const SENSOR_TABLE_MARKERS = isEn
  ? ['| No.', '| Type |', '| 序号 |']
  : ['| 序号 |', '| No.', '| 类型 |'];

const DOCSCOPE_RE = /<DocScope\s+products="([^"]*)">([\s\S]*?)<\/DocScope>/g;

const PRODUCT_ALIASES = {
  'RDK X3': 'RDK-X3',
  'RDK-X3': 'RDK-X3',
  'RDK X5': 'RDK-X5',
  'RDK-X5': 'RDK-X5',
  'RDK S100': 'RDK-S100',
  'RDK-S100': 'RDK-S100',
  'RDK S100P': 'RDK-S100',
  'RDK-S100P': 'RDK-S100',
  'RDK 100': 'RDK-S100',
  'RDK S600': 'RDK-S600',
  'RDK-S600': 'RDK-S600',
};

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith('.md')) out.push(full);
  }
  return out;
}

function normalizeProduct(raw) {
  const trimmed = raw.trim();
  if (PRODUCT_ALIASES[trimmed]) return PRODUCT_ALIASES[trimmed];
  const products = new Set();
  if (/RDK\s*X3/i.test(trimmed)) products.add('RDK-X3');
  if (/RDK\s*X5/i.test(trimmed)) products.add('RDK-X5');
  if (/RDK\s*S100P?|RDK\s+100\b/i.test(trimmed)) products.add('RDK-S100');
  if (/RDK\s*S600/i.test(trimmed)) products.add('RDK-S600');
  return products.size === 1 ? [...products][0] : trimmed;
}

function extractProductsFromCell(text) {
  const products = new Set();
  const parts = text.split(/[,，、]/);
  for (const part of parts) {
    const p = part.trim();
    if (!p || /Module|模块|X86/i.test(p) && !/RDK/i.test(p)) continue;
    if (/RDK\s*X3/i.test(p)) products.add('RDK-X3');
    if (/RDK\s*X5/i.test(p)) products.add('RDK-X5');
    if (/RDK\s*S100P?|RDK\s+100\b/i.test(p)) products.add('RDK-S100');
    if (/RDK\s*S600/i.test(p)) products.add('RDK-S600');
  }
  return products;
}

function parseMarkdownTable(lines, startIdx) {
  const rows = [];
  let i = startIdx;
  while (i < lines.length && lines[i].trim().startsWith('|')) {
    const cells = lines[i]
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    rows.push(cells);
    i++;
  }
  return { rows, endIdx: i };
}

function isSeparatorRow(cells) {
  return cells.every((c) => /^:?-{3,}:?$/.test(c.replace(/\s/g, '')) || c === '');
}

function parsePlatformTable(rows) {
  const products = new Set();
  if (rows.length < 2) return products;

  const header = rows[0];
  let platformCol = header.findIndex((h) => /平台|Platform/i.test(h));
  if (platformCol === -1) platformCol = 0;

  for (let r = 1; r < rows.length; r++) {
    if (isSeparatorRow(rows[r])) continue;
    const cell = rows[r][platformCol] ?? rows[r][0];
    if (!cell) continue;
    for (const p of extractProductsFromCell(cell)) products.add(p);
  }
  return products;
}

function parseSensorSupportTable(content) {
  const products = new Set();
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('|') || !/支持平台|Supported Platforms/i.test(line)) continue;
    const { rows } = parseMarkdownTable(lines, i);
    const header = rows[0] ?? [];
    const platformCol = header.findIndex((h) => /支持平台|Supported Platforms/i.test(h));
    if (platformCol === -1) continue;
    for (let r = 1; r < rows.length; r++) {
      if (isSeparatorRow(rows[r])) continue;
      const cell = rows[r][platformCol];
      if (!cell) continue;
      for (const p of extractProductsFromCell(cell)) products.add(p);
    }
    break;
  }
  return products;
}

function isEnvSetupBlock(inner) {
  return (
    inner.includes('tros-distro') ||
    inner.includes('setup.bash') ||
    inner.includes('/opt/tros') ||
    inner.includes('/opt/ros')
  );
}

function parseDocScopeProducts(attr) {
  return attr.split(',').map((s) => normalizeProduct(s)).filter((p) => p.startsWith('RDK-'));
}

function filterToSupported(blockProducts, supported) {
  return [...new Set(blockProducts.filter((p) => supported.has(p)))];
}

function productsToAttr(products) {
  return products.join(',');
}

function splitH2Sections(content) {
  const lines = content.split('\n');
  const sections = [];
  let current = { title: '__frontmatter__', start: 0, lines: [] };
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      if (current.lines.length || current.start === 0) {
        sections.push({ ...current, end: i });
      }
      current = { title: lines[i].slice(3).trim(), start: i, lines: [lines[i]] };
    } else {
      current.lines.push(lines[i]);
    }
  }
  sections.push({ ...current, end: lines.length });
  return sections;
}

function findPlatformTableInText(text, level = 'any') {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const isH2 = line === '## 支持平台' || line === '## Supported Platforms';
    const isH3 = line === '### 支持平台' || line === '### Supported Platforms';
    if (level === 'h2' && !isH2) continue;
    if (level === 'h3' && !isH3) continue;
    if (level === 'any' && !isH2 && !isH3) continue;

    let tableStart = i + 1;
    while (tableStart < lines.length && !lines[tableStart].trim().startsWith('|')) {
      tableStart++;
    }
    const { rows } = parseMarkdownTable(lines, tableStart);
    const products = parsePlatformTable(rows);
    if (products.size) return products;
  }
  return null;
}

function fixRgbdWrapper(content, relPath, changes) {
  if (!/demo_sensor\.md$/.test(relPath)) return content;
  const openRe = /<DocScope products="RDK X3">\s*\n/g;
  const closeBeforeRealSense = /\n<\/DocScope>\s*\n(?=## (?:RealSense|Orbbec|ZED))/;

  let next = content;
  if (openRe.test(next)) {
    next = next.replace(openRe, '');
    changes.push('remove RGBD wrapper open (RDK X3)');
  }
  if (closeBeforeRealSense.test(next)) {
    next = next.replace(closeBeforeRealSense, '\n');
    changes.push('remove RGBD wrapper close');
  }
  return next;
}

function processSection(sectionText, supported, relPath, sectionTitle, changes, localOverride) {
  let activeSupported = localOverride ?? supported;
  if (!activeSupported || activeSupported.size === 0) return sectionText;

  const secondCamMarker = isEn
    ? /X5 and S100 only|limited to X5 and S100/i
    : /仅限X5和S100/i;

  return sectionText.replace(DOCSCOPE_RE, (full, attr, inner, offset) => {
    if (!isEnvSetupBlock(inner)) return full;

    const before = sectionText.slice(0, offset);
    let blockSupported = activeSupported;
    if (secondCamMarker.test(before) && /MIPI|mipi/i.test(sectionTitle)) {
      blockSupported = new Set(['RDK-X5', 'RDK-S100']);
    }

    const blockProducts = parseDocScopeProducts(attr);
    const kept = filterToSupported(blockProducts, blockSupported);

    if (kept.length === 0) {
      changes.push(`remove DocScope [${attr}] in "${sectionTitle}" (supported: ${[...blockSupported].join(',')})`);
      return '';
    }
    if (kept.length === blockProducts.length && productsToAttr(kept) === attr.replace(/\s/g, '')) {
      return full;
    }
    const newAttr = productsToAttr(kept);
    if (newAttr !== attr) {
      changes.push(`narrow DocScope [${attr}] -> [${newAttr}] in "${sectionTitle}"`);
      return `<DocScope products="${newAttr}">${inner}</DocScope>`;
    }
    return full;
  });
}

function processFile(filePath) {
  const relPath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
  let content = fs.readFileSync(filePath, 'utf8');
  const changes = [];

  content = fixRgbdWrapper(content, relPath, changes);

  const fileLevelSupported = findPlatformTableInText(content, 'h2');
  const sections = splitH2Sections(content);

  const processed = sections.map((section) => {
    const sectionText = section.lines.join('\n');
    // Skip the dedicated platform-table section itself
    if (/^(支持平台|Supported Platforms)$/i.test(section.title)) {
      return sectionText;
    }

    let sectionSupported = findPlatformTableInText(sectionText, 'h3');
    if (!sectionSupported || sectionSupported.size === 0) {
      sectionSupported = fileLevelSupported;
    }

    if (
      !sectionSupported &&
      /MIPI图像采集|MIPI Image Capture/i.test(section.title)
    ) {
      sectionSupported = parseSensorSupportTable(sectionText);
    }

    if (!sectionSupported || sectionSupported.size === 0) {
      return sectionText;
    }

    return processSection(sectionText, sectionSupported, relPath, section.title, changes, null);
  });

  const result = processed.join('\n').replace(/\n{3,}/g, '\n\n');
  return { content: result, changes, relPath };
}

function main() {
  const files = walk(docsDir);
  let totalChanges = 0;
  const reports = [];

  for (const file of files) {
    if (!fs.readFileSync(file, 'utf8').includes('<DocScope')) continue;
    const { content, changes, relPath } = processFile(file);
    if (changes.length === 0) continue;
    totalChanges += changes.length;
    reports.push({ relPath, changes });
    if (!dryRun) fs.writeFileSync(file, content, 'utf8');
  }

  for (const { relPath, changes } of reports) {
    console.log(`\n${relPath} (${changes.length} changes)`);
    for (const c of changes.slice(0, 8)) console.log(`  - ${c}`);
    if (changes.length > 8) console.log(`  ... +${changes.length - 8} more`);
  }
  console.log(`\n${dryRun ? 'Would update' : 'Updated'} ${reports.length} files, ${totalChanges} changes.`);
}

main();
