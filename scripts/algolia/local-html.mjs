import fs from 'node:fs';
import path from 'node:path';

export function urlToLocalBuildPath(url, siteUrl) {
  const site = new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`);
  const u = new URL(url);
  if (u.origin !== site.origin) return null;
  let rel = u.pathname;
  const basePath = site.pathname.replace(/\/$/, '');
  if (basePath && rel.startsWith(basePath)) {
    rel = rel.slice(basePath.length) || '/';
  }
  rel = rel.replace(/^\//, '');
  if (!rel || rel.endsWith('/')) {
    return path.join(process.cwd(), 'build', rel, 'index.html');
  }
  const direct = path.join(process.cwd(), 'build', rel);
  if (fs.existsSync(`${direct}.html`)) return `${direct}.html`;
  return path.join(direct, 'index.html');
}

export async function loadPageHtml(url, siteUrl) {
  try {
    const res = await fetch(url, {redirect: 'follow'});
    if (res.ok) return res.text();
  } catch {
    // fall through to local build
  }
  const localPath = urlToLocalBuildPath(url, siteUrl);
  if (localPath && fs.existsSync(localPath)) {
    return fs.readFileSync(localPath, 'utf8');
  }
  throw new Error('fetch failed and no local build HTML');
}
