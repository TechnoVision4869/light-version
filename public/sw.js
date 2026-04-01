/**
 * Simple Service Worker for Techno-Vision
 * Handles caching of videos, API calls, and images
 * NO IMPORTS - plain JavaScript for Service Worker compatibility
 */

const CACHE_VIDEO = 'techno-vision-videos-v1';
const CACHE_API = 'techno-vision-api-v1';
const CACHE_IMAGE = 'techno-vision-images-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(self.clients.claim());
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
          return fetch(request)
            .then((networkResponse) => {
              if (!networkResponse || !networkResponse.ok) {
                return networkResponse;
              }

              // Cache successful response
              const responseToCache = networkResponse.clone();
              cache.put(request, responseToCache);
              console.log('[SW] Cached video:', url.pathname);

              return networkResponse;
            })
            .catch((error) => {
              console.error('[SW] Fetch failed for video:', url.pathname, error);
              // Return cached version if available
              return cache.match(request);
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
