/**
 * 从指定提交中只抽取图片样式更新，应用到当前工作树：
 * - 仅当当前文件已存在相同 src 的图片时才替换/升级样式
 * - 不新增提交里有、当前没有的图片或其他正文
 *
 * 用法: node scripts/apply-img-styles-from-commit.mjs <commit>
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const commit = process.argv[2];
if (!commit) {
  console.error("Usage: node scripts/apply-img-styles-from-commit.mjs <commit>");
  process.exit(1);
}

function sh(cmd) {
  return execSync(cmd, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  });
}

// Map: relativeFile -> Map(src -> { alt, style, br })
const fileImgMap = new Map();

const diff = sh(`git show ${commit} --unified=0 -- "*.md"`);
const fileChunks = diff.split(/^diff --git /m).slice(1);

for (const chunk of fileChunks) {
  const pathMatch = chunk.match(/^a\/(.+?) b\//);
  if (!pathMatch) continue;
  const rel = pathMatch[1].replace(/\\/g, "/");
  if (!rel.endsWith(".md")) continue;

  // Collect + lines that are img tags (from the commit's new side)
  const plusImgs = [];
  for (const line of chunk.split(/\n/)) {
    if (!line.startsWith("+") || line.startsWith("+++")) continue;
    const body = line.slice(1);
    const m = body.match(
      /<img\s+([^>]*?)\s*\/>(\s*<br\s*\/?\s*>)?/,
    );
    if (!m) continue;
    const attrs = m[1];
    const src = (attrs.match(/src="([^"]+)"/) || [])[1];
    const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] ?? "";
    const style = (attrs.match(/style=(\{\{[\s\S]*?\}\})/) || [])[1];
    if (!src || !style) continue;
    plusImgs.push({
      src,
      alt,
      style,
      br: Boolean(m[2]),
      // keep indentation from the + line if any
      indent: (body.match(/^([ \t]*)/) || ["", ""])[1],
    });
  }
  if (!plusImgs.length) continue;

  const bySrc = new Map();
  for (const img of plusImgs) {
    // later occurrence overwrites earlier for same src (usually same style)
    // keep queue for duplicates by pushing arrays
    if (!bySrc.has(img.src)) bySrc.set(img.src, []);
    bySrc.get(img.src).push(img);
  }
  fileImgMap.set(rel, bySrc);
}

console.log(`Loaded image styles for ${fileImgMap.size} files from ${commit}`);

function toImgTag(img, indent = "") {
  const br = img.br ? "<br/>" : "";
  return `${indent}<img src="${img.src}" alt="${img.alt}" style=${img.style} />${br}`;
}

function applyToFile(rel, bySrc) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.log(`  skip missing file: ${rel}`);
    return 0;
  }
  const text = fs.readFileSync(full, "utf8");
  const lines = text.split(/\r?\n/);
  let inFence = false;
  let changed = 0;

  // queues per src (consume in order for duplicate srcs)
  const queues = new Map();
  for (const [src, list] of bySrc) {
    queues.set(src, [...list]);
  }

  const mdImgRe =
    /!\[([^\]]*)\]\((?:<)?([^ )\n>]+)(?:>)?(?:\s+["']([^"']*)["'])?\)/;
  const htmlImgRe = /<img\s+([^>]*?)\s*\/>(\s*<br\s*\/?\s*>)?/;

  const out = lines.map((line) => {
    if (/^[ \t]*`{3,}/.test(line)) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;

    // Replace markdown images
    let next = line.replace(
      /!\[([^\]]*)\]\((?:<)?([^ )\n>]+)(?:>)?(?:\s+["']([^"']*)["'])?\)/g,
      (fullMatch, _alt, srcRaw) => {
        const src = String(srcRaw).trim();
        const q = queues.get(src);
        const list = bySrc.get(src);
        if (!list || !list.length) return fullMatch; // src not in commit
        const img = q && q.length ? q.shift() : list[list.length - 1];
        changed++;
        return toImgTag(img, "").replace(/^\s*/, "");
      },
    );

    // Also upgrade existing <img> with same src if style differs
    next = next.replace(
      /<img\s+([^>]*?)\s*\/>(\s*<br\s*\/?\s*>)?/g,
      (fullMatch, attrs, brPart) => {
        const src = (attrs.match(/src="([^"]+)"/) || [])[1];
        if (!src) return fullMatch;
        const list = bySrc.get(src);
        if (!list || !list.length) return fullMatch;
        const q = queues.get(src);
        const img = q && q.length ? q.shift() : list[list.length - 1];
        const curStyle = (attrs.match(/style=(\{\{[\s\S]*?\}\})/) || [])[1];
        const curAlt = (attrs.match(/alt="([^"]*)"/) || [])[1] ?? "";
        const curBr = Boolean(brPart);
        if (
          curStyle === img.style &&
          curAlt === img.alt &&
          curBr === img.br
        ) {
          return fullMatch;
        }
        changed++;
        return toImgTag(img, "");
      },
    );

    return next;
  });

  if (changed > 0) {
    fs.writeFileSync(full, out.join("\n"), "utf8");
  }
  return changed;
}

let files = 0;
let imgs = 0;
for (const [rel, bySrc] of fileImgMap) {
  const n = applyToFile(rel, bySrc);
  if (n > 0) {
    files++;
    imgs += n;
    console.log(`  ${rel}: ${n}`);
  }
}
console.log(`\nUpdated ${files} files, ${imgs} images (styles only).`);
