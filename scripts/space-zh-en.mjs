/**
 * 仅在 docs/（中文手册）正文中，为中文与英文/数字相邻处补空格。
 * 不改动代码块、行内代码、HTML 标签、URL；不做其他格式修改。
 *
 * 用法: node scripts/space-zh-en.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docsDir = path.join(root, "docs");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (["node_modules", ".git", "build", ".docusaurus"].includes(name)) continue;
      walk(p, acc);
    } else if (/\.(md|mdx)$/i.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

function addZhEnSpaces(text) {
  const cjk = "\\u4e00-\\u9fff";
  let out = text;
  out = out.replace(new RegExp(`([${cjk}])([A-Za-z0-9])`, "g"), "$1 $2");
  out = out.replace(new RegExp(`([A-Za-z0-9])([${cjk}])`, "g"), "$1 $2");
  // 中文引号夹英文时，与外侧中文/英文补空格
  out = out.replace(/([A-Za-z0-9])([”’])([\u4e00-\u9fff])/g, "$1$2 $3");
  out = out.replace(/([\u4e00-\u9fff])([“‘])([A-Za-z0-9])/g, "$1 $2$3");
  out = out.replace(/([”’])([A-Za-z0-9])/g, "$1 $2");
  out = out.replace(/([A-Za-z0-9])([“‘])/g, "$1 $2");
  return out;
}

function spaceOutsideProtected(text) {
  const store = [];
  const protect = (pattern) => {
    text = text.replace(pattern, (m) => {
      const token = `\u0000P${store.length}\u0000`;
      store.push(m);
      return token;
    });
  };

  protect(/(^[ \t]*`{3,}[^\n]*\n[\s\S]*?^[ \t]*`{3,}[ \t]*$)/gm);
  protect(/`[^`\n]+`/g);
  protect(/<\/?[A-Za-z][^>\n]*\/?>/g);
  protect(/https?:\/\/[^\s)\]>'"]+/gi);

  text = addZhEnSpaces(text);

  for (let i = 0; i < store.length; i++) {
    text = text.split(`\u0000P${i}\u0000`).join(store[i]);
  }
  return text;
}

function spaceInsideAltAttrs(text) {
  return text.replace(/(\salt=")([^"]*)(")/g, (_m, a, alt, b) => {
    return a + addZhEnSpaces(alt) + b;
  });
}

function process(text) {
  let next = spaceInsideAltAttrs(text);
  next = spaceOutsideProtected(next);
  return next;
}

let fileCount = 0;
let totalDiffChars = 0;

for (const file of walk(docsDir)) {
  const text = fs.readFileSync(file, "utf8");
  const next = process(text);
  if (next !== text) {
    if (next.replace(/ /g, "") !== text.replace(/ /g, "")) {
      console.error(
        `REFUSING (non-space change): ${path.relative(root, file)}`,
      );
      continue;
    }
    fs.writeFileSync(file, next, "utf8");
    fileCount++;
    const added = next.length - text.length;
    totalDiffChars += added;
    console.log(
      `  ${path.relative(root, file).replace(/\\/g, "/")}: +${added} spaces`,
    );
  }
}

console.log(`\nUpdated ${fileCount} files, inserted ~${totalDiffChars} spaces.`);
