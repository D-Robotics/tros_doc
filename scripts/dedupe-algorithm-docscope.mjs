#!/usr/bin/env node
/** Remove duplicate DocScope blocks (same products) in algorithm info sections. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isEn = process.argv.includes('--en');
const docsDir = isEn
  ? path.join(__dirname, '../i18n/en/docusaurus-plugin-content-docs/current')
  : path.join(__dirname, '../docs');
const markers = isEn
  ? ['## Algorithm Information', '## Algorithm Info']
  : ['## 算法信息'];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith('.md')) out.push(full);
  }
  return out;
}

function dedupeSection(sectionBody) {
  const blockRe = /<DocScope products="([^"]+)">[\s\S]*?<\/DocScope>/g;
  const seen = new Set();
  return sectionBody.replace(blockRe, (match, product) => {
    if (seen.has(product)) return '';
    seen.add(product);
    return match;
  });
}

function dedupeFile(content) {
  let updated = false;
  for (const marker of markers) {
    let idx = 0;
    while ((idx = content.indexOf(marker, idx)) !== -1) {
      const after = content.slice(idx + marker.length);
      const next = after.search(/\n## /);
      const sectionBody = next === -1 ? after : after.slice(0, next);
      if (!sectionBody.includes('<DocScope products=')) {
        idx += marker.length;
        continue;
      }
      const deduped = dedupeSection(sectionBody);
      if (deduped !== sectionBody) {
        content =
          content.slice(0, idx + marker.length) +
          deduped +
          content.slice(idx + marker.length + sectionBody.length);
        updated = true;
      }
      idx += marker.length;
    }
  }
  return updated ? content : null;
}

let count = 0;
for (const file of walk(docsDir)) {
  const content = fs.readFileSync(file, 'utf8');
  const next = dedupeFile(content);
  if (!next) continue;
  fs.writeFileSync(file, next, 'utf8');
  count += 1;
  console.log('deduped:', path.relative(docsDir, file));
}
console.log(`Done. Deduped ${count} files.`);
