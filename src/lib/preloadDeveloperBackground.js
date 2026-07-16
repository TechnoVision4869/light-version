import { developerApi } from "../api/admin/developerApi";
import { assetApi } from "../api/admin/assetApi";

const PRELOAD_TIMEOUT_MS = 5000;

/**
 * Resolves and fully loads a developer's background image before it's needed,
 * so ProjectSelector can paint it instantly instead of popping in after mount.
 * Never rejects — any failure or a slow load past the timeout just resolves null.
 */
export async function preloadDeveloperBackground(developerId) {
  if (!developerId) return null;

  try {
    const developer = await developerApi.getById(developerId);
    if (!developer?.backgroundImageAssetId) return null;

    const url = await assetApi.getAssetFileUrl(developer.backgroundImageAssetId);
    if (!url) return null;

    await Promise.race([
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      }),
      new Promise((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT_MS)),
    ]);

    return url;
  } catch (error) {
    console.warn("[Preload] Failed to preload developer background:", error);
    return null;
  }
}
