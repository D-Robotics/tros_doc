import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { loadContext } = require("@docusaurus/core/lib/server/site");
const { loadI18n } = require("@docusaurus/core/lib/server/i18n");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildLocaleScript = path.join(root, "scripts/build-locale.mjs");
const buildDir = path.join(root, "build");

function orderLocales(locales, defaultLocale) {
  if (locales.includes(defaultLocale)) {
    return [defaultLocale, ...locales.filter((locale) => locale !== defaultLocale)];
  }
  return locales;
}

if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
  console.log("[build] Removed previous build output folder.");
}

const context = await loadContext({ siteDir: root });
const i18n = await loadI18n(context.siteConfig);
const locales = orderLocales(i18n.locales, i18n.defaultLocale);

console.log(`[build] Building locales in separate processes: ${locales.join(", ")}`);

for (const locale of locales) {
  console.log(`[build] Starting locale: ${locale}`);
  const result = spawnSync(process.execPath, [buildLocaleScript, locale], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("[build] Use `npm run serve` to test the build locally.");
