/**
 * Service Worker — techno-vision
 *
 * STRATEGIES:
 *   /assets/file/*  →  Cache First   (videos + images, all content assets)
 *   /api/*          →  Network First  (live data, falls back to cache)
 *   everything else →  Network First  (no SW interference unless network fails)
 *
 * CACHE VERSIONING:
 *   Bump the version suffix (e.g. v2 → v3) when the stored content contract
 *   changes in a breaking way. The activate event deletes all caches not in
 *   the current list, so old entries are evicted automatically on version bump.
 *   You do NOT need to wait for an error before bumping.
 *
 * GOLDEN RULE:
 *   event.respondWith() must always resolve to a valid Response — never
 *   undefined, never null. caches.match() returns undefined on a cache miss,
 *   so every final fallback guards with: cached || Response.error()
 *
 * NO IMPORTS — plain JavaScript required for Service Worker compatibility.
 */

const CACHE_ASSETS = 'techno-vision-assets-v4'; // videos + images under /assets/file/
const CACHE_API    = 'techno-vision-api-v4';    // API responses under /api/

const CURRENT_CACHES = [CACHE_ASSETS, CACHE_API];

// ─── INSTALL ────────────────────────────────────────────────────────────────
// Nothing is precached here yet — that belongs to the offline mode milestone.
// Shell assets (index.html, JS bundle, CSS, public/ icons) will be added here
// when full offline support is implemented.
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  self.skipWaiting();
  // skipWaiting() is safe here: SW and all app files deploy together from the
  // same repo, so there is no version mismatch risk on activation.
});

// ─── ACTIVATE ───────────────────────────────────────────────────────────────
// Delete every cache whose name is not in CURRENT_CACHES.
// This automatically evicts orphaned caches from previous SW versions.
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !CURRENT_CACHES.includes(name))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
      // clients.claim() is safe alongside skipWaiting() for this app:
      // React Router SPA — no full HTML reload mid-session, so there is no
      // risk of an old JS bundle running under a new SW mid-navigation.
  );
});

// ─── FETCH ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests. Non-GET requests (POST, PUT, DELETE) are
  // mutations — they must always reach the network. Returning early without
  // calling event.respondWith() lets the browser handle them normally.
  if (request.method !== 'GET') return;

  // ── CONTENT ASSETS — Cache First ────────────────────────────────────────
  //
  // Covers all videos AND images. Both live under /assets/file/ in this app,
  // so a single path condition replaces separate video/image blocks.
  //
  // Why Cache First: these are static files. The backend generates a unique
  // URL per asset version, so a changed file always has a new URL → automatic
  // cache miss → fresh fetch. Stale-until-cleared trade-off is fully
  // eliminated. No need for Stale While Revalidate.
  //
  // Range header is stripped on the fetch request to force a full 200
  // response. Videos are short (1–2s clips), so fetching the full file
  // upfront and caching it is correct. A 206 Partial Content response
  // cannot be stored in the Cache API.
  //
  if (url.pathname.includes('/assets/file/')) {
    event.respondWith(
      caches.open(CACHE_ASSETS).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) {
            // console.log('[SW] Asset from cache:', url.pathname);
            return cached;
          }

          // Not in cache — fetch full file from network, strip Range header
          const fullRequest = new Request(request.url, { headers: {} });
          return fetch(fullRequest)
            .then((networkResponse) => {
              if (!networkResponse || !networkResponse.ok) {
                // Non-OK response (e.g. 404, 500) — return as-is, don't cache
                return networkResponse;
              }
              cache.put(request.url, networkResponse.clone());
              // console.log('[SW] Asset cached:', url.pathname);
              return networkResponse;
            })
            .catch((error) => {
              // Network failed entirely — try cache one more time as last resort.
              // cache.match() can return undefined, so guard with Response.error().
              console.error('[SW] Asset fetch failed:', url.pathname, error);
              return cache.match(request).then((fallback) => fallback || Response.error());
            });
        })
      )
    );
    return;
  }

  // ── API — Network First ──────────────────────────────────────────────────
  //
  // Always try the network first — API data is live and must be fresh.
  // Cache is a safety net for when the network is unavailable.
  //
  // In full offline mode this strategy will be replaced by Cache First,
  // with all API responses precached after login via application-driven
  // prefetching (see prefetchAssets() in the React codebase).
  //
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || !networkResponse.ok) {
            // Non-OK response — return as-is, don't cache a failure
            return networkResponse;
          }
          // Clone synchronously before any async gap — a Response body is a
          // stream that can only be read once. Calling .clone() after an await
          // or inside a .then() risks the body already being consumed, which
          // throws "Response body is already used". Clone first, cache the
          // clone, return the original.
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_API).then((cache) => cache.put(request, responseToCache));
          return networkResponse;
        })
        .catch(() => {
          // Network failed — fall back to cached API response if available.
          // caches.match() can return undefined on a miss, so guard with Response.error().
          console.log('[SW] API fetch failed, trying cache:', url.pathname);
          return caches.match(request).then((cached) => cached || Response.error());
        })
    );
    return;
  }

  // ── DEFAULT — Network First ──────────────────────────────────────────────
  //
  // All other GET requests (navigation, fonts, third-party scripts, etc.).
  // Try the network, fall back to cache if available, or return a network
  // error response. The SW does not interfere unless the network fails.
  //
  event.respondWith(
    fetch(request)
      .catch(() =>
        caches.match(request).then((cached) => cached || Response.error())
      )
  );
});