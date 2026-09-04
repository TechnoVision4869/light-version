import { CapacitorUpdater } from "@capgo/capacitor-updater";

const MANIFEST_URL = "https://light-tour-ota.cold-bush-b9d3.workers.dev/manifest.json";

export async function checkForUpdate() {
  const response = await fetch(MANIFEST_URL);
  if (!response.ok) {
    throw new Error(`OTA manifest fetch failed: ${response.status}`);
  }
  const manifest = await response.json();

  const { bundle: currentBundle } = await CapacitorUpdater.current();
  if (manifest.version === currentBundle.version) {
    return null;
  }

  const { bundles } = await CapacitorUpdater.list();
  const alreadyDownloaded = bundles.some(
    (bundle) => bundle.version === manifest.version && bundle.status !== "error",
  );
  if (alreadyDownloaded) {
    return null;
  }

  return CapacitorUpdater.download({
    version: manifest.version,
    url: manifest.url,
  });
}
