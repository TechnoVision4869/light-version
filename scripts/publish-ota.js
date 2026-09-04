import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const OTA_BASE_URL = "https://light-tour-ota.cold-bush-b9d3.workers.dev";
const APP_ID = "com.technovision.light";
const OUT_DIR = "ota-publish";

execSync("npm version patch --no-git-tag-version", { stdio: "inherit" });
const { version } = JSON.parse(readFileSync("package.json", "utf8"));

execSync("npm run build", { stdio: "inherit" });

mkdirSync(OUT_DIR, { recursive: true });
const zipPath = `${OUT_DIR}/bundle-${version}.zip`;
execSync(
  `npx @capgo/cli@latest bundle zip ${APP_ID} --path ./dist -b ${version} -n ${zipPath} --json`,
  { stdio: "inherit" },
);

writeFileSync(
  `${OUT_DIR}/manifest.json`,
  JSON.stringify({ version, url: `${OTA_BASE_URL}/bundle-${version}.zip` }, null, 2),
);
// manifest.json must never be cached: Cloudflare's edge was observed serving a stale
// copy (CF-Cache-Status: HIT) after a deploy, so devices kept seeing the old version
// number and never detected the update. The zips are content-addressed by filename and
// are safe to cache normally.
writeFileSync(
  `${OUT_DIR}/_headers`,
  "/*\n  Access-Control-Allow-Origin: *\n\n/manifest.json\n  Cache-Control: no-store\n",
);

console.log(`\nOTA bundle ${version} ready in ${OUT_DIR}/ — drag that folder onto the`);
console.log("light-tour-ota Cloudflare deployment (Compute → Workers & Pages) to publish.");
