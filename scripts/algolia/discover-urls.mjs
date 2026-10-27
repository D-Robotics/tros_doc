import fs from 'node:fs';
import path from 'node:path';
import {XMLParser} from 'fast-xml-parser';
import * as cheerio from 'cheerio';
import {SKIP_PATH_RE, STATIC_ASSET_RE} from './config.mjs';

const parser = new XMLParser({ignoreAttributes: false});

function normalizeSiteUrl(siteUrl) {
  return siteUrl.replace(/\/+$/, '');
}

function isSkippableUrl(urlString, siteUrl) {
  try {
    const u = new URL(urlString);
    const site = new URL(siteUrl);
    if (u.origin !== site.origin) return true;
    if (!u.pathname.startsWith(site.pathname.replace(/\/$/, ''))) return true;
    if (SKIP_PATH_RE.test(u.pathname)) return true;
    if (STATIC_ASSET_RE.test(u.pathname)) return true;
    return false;
  } catch {
    return true;
  }
}

function parseSitemapXml(xml) {
  const data = parser.parse(xml);
  const urlset = data.urlset?.url;
  if (!urlset) return [];
  const entries = Array.isArray(urlset) ? urlset : [urlset];
  return entries
    .map((e) => e.loc)
    .filter(Boolean)
    .map(String);
}

async function fetchText(url) {
  const res = await fetch(url, {redirect: 'follow'});
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function discoverFromSitemapUrl(sitemapUrl, siteUrl, out) {
  try {
    const xml = await fetchText(sitemapUrl);
    const locs = parseSitemapXml(xml);
    for (const loc of locs) {
      if (/sitemap.*\.xml$/i.test(loc)) {
        await discoverFromSitemapUrl(loc, siteUrl, out);
      } else if (!isSkippableUrl(loc, siteUrl)) {
        out.add(loc.split('#')[0]);
      }
    }
  } catch (e) {
    console.warn(`[discover] sitemap failed ${sitemapUrl}: ${e.message}`);
  }
}

function discoverFromLocalSitemap(siteUrl, out) {
  const candidates = [
    path.join(process.cwd(), 'build', 'sitemap.xml'),
    path.join(process.cwd(), 'build', 'en', 'sitemap.xml'),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const xml = fs.readFileSync(file, 'utf8');
    for (const loc of parseSitemapXml(xml)) {
      if (!isSkippableUrl(loc, siteUrl)) out.add(loc.split('#')[0]);
    }
  }
}

async function crawlFromSeeds(seeds, siteUrl, out, maxPages = 500) {
  const queue = [...seeds];
  const seen = new Set();

  while (queue.length && out.size < maxPages) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    if (isSkippableUrl(url, siteUrl)) continue;

    try {
      const html = await fetchText(url);
      out.add(url.split('#')[0]);
      const $ = cheerio.load(html);
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
        const abs = new URL(href, url).href.split('#')[0];
        if (!isSkippableUrl(abs, siteUrl) && !seen.has(abs)) {
          queue.push(abs);
        }
      });
    } catch (e) {
      console.warn(`[discover] crawl skip ${url}: ${e.message}`);
    }
  }
}

/** @returns {Promise<string[]>} */
export async function discoverUrls(siteUrl) {
  const base = normalizeSiteUrl(siteUrl);
  const urls = new Set();

  await discoverFromSitemapUrl(`${base}/sitemap.xml`, base, urls);
  discoverFromLocalSitemap(base, urls);

  if (urls.size === 0) {
    const seeds = [base, `${base}/`, `${base}/en/`];
    await crawlFromSeeds(seeds, base, urls);
  } else if (urls.size < 20) {
    await crawlFromSeeds([...urls].slice(0, 5), base, urls);
  }

  return [...urls].sort();
}
