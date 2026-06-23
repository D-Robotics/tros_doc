import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { buildLocale } = require("@docusaurus/core/lib/commands/build/buildLocale");

const locale = process.argv[2];
if (!locale) {
  console.error("[build-locale] Missing locale argument.");
  process.exit(1);
}

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

try {
  await buildLocale({
    siteDir,
    locale,
    cliOptions: {},
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
