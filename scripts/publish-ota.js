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
writeFileSync(`${OUT_DIR}/_headers`, "/*\n  Access-Control-Allow-Origin: *\n");

console.log(`\nOTA bundle ${version} ready in ${OUT_DIR}/ — drag that folder onto the`);
console.log("light-tour-ota Cloudflare deployment (Compute → Workers & Pages) to publish.");
