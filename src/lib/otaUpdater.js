import { CapacitorUpdater } from "@capgo/capacitor-updater";

const MANIFEST_URL = "https://light-tour-ota.cold-bush-b9d3.workers.dev/manifest.json";

export async function checkForUpdate() {
  // Cache-bust deliberately: a plain fetch was served a stale manifest from Cloudflare's
  // edge cache after a deploy, so the app never saw the new version. The unique query
  // string defeats the edge cache; `no-store` defeats the WebView's own HTTP cache.
  const response = await fetch(`${MANIFEST_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`OTA manifest fetch failed: ${response.status}`);
  }
  const manifest = await response.json();

  const { bundle: currentBundle } = await CapacitorUpdater.current();
  if (manifest.version === currentBundle.version) {
    return null;
  }

  const { bundles } = await CapacitorUpdater.list();
  const existing = bundles.find(
    (bundle) => bundle.version === manifest.version && bundle.status !== "error",
  );
  if (existing) {
    return existing;
  }

  return CapacitorUpdater.download({
    version: manifest.version,
    url: manifest.url,
  });
}
