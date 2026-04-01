/**
 * Cache Management Utilities
 * Provides functions to monitor, inspect, and manage Service Worker caches
 */

/**
 * Get current cache storage usage
 * @returns {Promise<{usage: number, quota: number, percentUsed: number, usageMB: number, quotaMB: number}>}
 */
export async function getCacheStorage() {
  if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
    console.warn('StorageManager API not available');
    return null;
  }

  const estimate = await navigator.storage.estimate();
  return {
    usage: estimate.usage,
    quota: estimate.quota,
    percentUsed: (estimate.usage / estimate.quota) * 100,
    usageMB: estimate.usage / 1024 / 1024,
    quotaMB: estimate.quota / 1024 / 1024,
  };
}

/**
 * Get detailed information about all caches
 * @returns {Promise<Array>} Array of cache info with name, entries, size
 */
export async function inspectAllCaches() {
  const cacheNames = await caches.keys();
  const cacheInfo = [];

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    let size = 0;

    for (const req of keys) {
      const resp = await cache.match(req);
      if (resp) {
        const blob = await resp.blob();
        size += blob.size;
      }
    }

    cacheInfo.push({
      name,
      entries: keys.length,
      sizeMB: (size / 1024 / 1024).toFixed(2),
      sizeBytes: size,
      keys: keys.map((k) => k.url),
    });
  }

  return cacheInfo;
}

/**
 * Clear a specific cache by name
 * @param {string} cacheName - Name of cache to clear
 * @returns {Promise<boolean>}
 */
export async function clearCache(cacheName) {
  try {
    await caches.delete(cacheName);
    console.log(`[Cache] Deleted: ${cacheName}`);
    return true;
  } catch (error) {
    console.error(`[Cache] Failed to delete ${cacheName}:`, error);
    return false;
  }
}

/**
 * Clear all caches
 * @returns {Promise<number>} Number of caches deleted
 */
export async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
  console.log(`[Cache] Cleared ${cacheNames.length} caches`);
  return cacheNames.length;
}

/**
 * Get summary of cache storage
 * @returns {Promise<{storage, caches}>}
 */
export async function getCacheSummary() {
  const storage = await getCacheStorage();
  const caches_info = await inspectAllCaches();

  const totalVideoCaches = caches_info
    .filter((c) => c.name.includes('video'))
    .reduce((sum, c) => sum + parseFloat(c.sizeMB), 0);

  const totalAPICaches = caches_info
    .filter((c) => c.name.includes('api'))
    .reduce((sum, c) => sum + parseFloat(c.sizeMB), 0);

  return {
    storage,
    caches: caches_info,
    summary: {
      totalCachesMB: caches_info.reduce(
        (sum, c) => sum + parseFloat(c.sizeMB),
        0
      ),
      videoCachesMB: totalVideoCaches.toFixed(2),
      apiCachesMB: totalAPICaches.toFixed(2),
      numCaches: caches_info.length,
      numEntries: caches_info.reduce((sum, c) => sum + c.entries, 0),
    },
  };
}

/**
 * Monitor and log cache state (useful for development)
 * Call this periodically to track cache growth
 */
export async function monitorCaches() {
  const summary = await getCacheSummary();
  
  console.group('[🔵 Cache Monitor]');
  console.log(`Storage: ${summary.storage.usageMB.toFixed(2)}MB / ${summary.storage.quotaMB.toFixed(0)}MB (${summary.storage.percentUsed.toFixed(1)}%)`);
  console.log(`Video Caches: ${summary.summary.videoCachesMB}MB`);
  console.log(`API Caches: ${summary.summary.apiCachesMB}MB`);
  console.log(`Total Caches: ${summary.summary.numCaches}, Entries: ${summary.summary.numEntries}`);
  
  if (summary.summary.totalCachesMB > 0) {
    console.table(summary.caches.map((c) => ({
      Name: c.name,
      Entries: c.entries,
      Size: `${c.sizeMB}MB`,
    })));
  }
  console.groupEnd();

  return summary;
}

/**
 * Request persistent storage from the browser
 * Prevents cache from being cleared when device storage is low
 * @returns {Promise<boolean>}
 */
export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) {
    console.warn('Persistent storage not available');
    return false;
  }

  try {
    const persisted = await navigator.storage.persist();
    console.log(
      `[Cache] Persistent storage ${persisted ? 'granted' : 'denied'}`
    );
    return persisted;
  } catch (error) {
    console.error('[Cache] Failed to request persistent storage:', error);
    return false;
  }
}

/**
 * Get cache entries for a specific pattern
 * @param {string} pattern - URL pattern to search for
 * @returns {Promise<Array>} Matching cache entries
 */
export async function searchCaches(pattern) {
  const cacheNames = await caches.keys();
  const results = [];

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();

    for (const req of keys) {
      if (req.url.includes(pattern)) {
        const resp = await cache.match(req);
        results.push({
          cacheName: name,
          url: req.url,
          status: resp?.status,
          sizeMB: (await resp?.blob().then((b) => b.size / 1024 / 1024)),
        });
      }
    }
  }

  return results;
}
