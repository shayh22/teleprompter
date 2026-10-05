// Bump the version whenever the app files change so installed copies pick up the update.
const CACHE_NAME = 'teleprompter-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from cache (works offline), and refresh the cache in the background when online.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        const network = fetch(event.request)
          .then(res => {
            if (res && res.ok && new URL(event.request.url).origin === self.location.origin) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
            }
            return res;
          })
          .catch(() => response);
        return response || network;
      })
  );
});
