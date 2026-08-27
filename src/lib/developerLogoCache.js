// Caches the resolved developer logo URL (as fetched once by ProjectSelector) per developerId,
// so callers that need it later — e.g. the unit brochure PDF — can reuse it instead of
// re-fetching the developer entity and resolving the asset URL themselves.
const STORAGE_KEY = "developerLogoCache";

function readCache() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

export function getCachedDeveloperLogo(developerId) {
    if (!developerId) return null;
    return readCache()[developerId] ?? null;
}

export function setCachedDeveloperLogo(developerId, logoUrl) {
    if (!developerId) return;
    const cache = readCache();
    cache[developerId] = logoUrl ?? null;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
        // Storage full/unavailable — the cache is a pure optimization, safe to skip.
    }
}
