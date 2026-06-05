/**
 * Simple Service Worker for Techno-Vision
 * Handles caching of videos, API calls, and images
 * NO IMPORTS - plain JavaScript for Service Worker compatibility
 */

const CACHE_VIDEO = 'techno-vision-videos-v2';
const CACHE_API = 'techno-vision-api-v2';
const CACHE_IMAGE = 'techno-vision-images-v2';

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  self.skipWaiting();
});

// Activate event — delete all old caches on version bump
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => ![CACHE_VIDEO, CACHE_API, CACHE_IMAGE].includes(name))
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event - main caching logic
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only cache GET requests
  if (request.method !== 'GET') {
    return;
  }

  // ===== VIDEO CACHING (CacheFirst) =====
  if (url.pathname.includes('/assets/file/') || url.pathname.endsWith('.mp4') || url.pathname.endsWith('.webm')) {
    console.log('[SW] Video request:', url.pathname);
    event.respondWith(
      caches.open(CACHE_VIDEO).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            console.log('[SW] Video from cache:', url.pathname);
            return response;
          }

          // Not in cache, fetch from network
          // Strip Range header to force a full 200 response that can be cached
          // (videos are short 1-2s clips so fetching the full file upfront is fine)
          const fullRequest = new Request(request.url, { headers: {} });
          return fetch(fullRequest)
            .then((networkResponse) => {
              if (!networkResponse || !networkResponse.ok) {
                return networkResponse;
              }

              // Cache successful full response
              const responseToCache = networkResponse.clone();
              cache.put(request.url, responseToCache);
              console.log('[SW] Cached video:', url.pathname);

              return networkResponse;
            })
            .catch((error) => {
              console.error('[SW] Fetch failed for video:', url.pathname, error);
              // Return cached version if available, or a network error response
              return cache.match(request).then((cached) => cached || Response.error());
            });
        });
      })
    );
    return;
  }

  // ===== API CACHING (NetworkFirst) =====
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || !networkResponse.ok) {
            return networkResponse;
          }

          // Cache successful API response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_API).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.log('[SW] API fetch failed, using cache:', url.pathname);
          // Fall back to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // ===== IMAGE CACHING (StaleWhileRevalidate) =====
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_IMAGE).then((cache) => {
        return cache.match(request).then((response) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });

          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // ===== DEFAULT: NetworkFirst for other requests =====
  event.respondWith(
    fetch(request)
      .then((response) => response)
      .catch(() => caches.match(request))
  );
});
