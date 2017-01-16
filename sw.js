const CACHE_NAME = 'sgomes-v1';

// Cached files
const siteAssets = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/assets/images/avatar.jpg',
  '/assets/images/email.svg',
  '/assets/images/feed.svg',
  '/assets/images/github.svg',
  '/assets/images/logo.svg',
  '/assets/images/twitter.svg',
  '/assets/images/touch/16x16.png',
  '/assets/images/touch/32x32.png',
  '/assets/images/touch/144x144.png',
  '/assets/images/touch/152x152.png',
  '/assets/images/touch/192x192.png',
  '/assets/main.css',
  '/assets/fonts/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2',
  '/assets/fonts/RxZJdnzeo3R5zSexge8UUZBw1xU1rKptJj_0jans920.woff2',
  '/assets/fonts/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2',
  '/assets/fonts/vPcynSL0qHq_6dX7lKVByXYhjbSpvc47ee6xR_80Hnw.woff2',
  '/assets/fonts/OLffGBTaF0XFOW1gnuHF0Ygp9Q8gbYrhqGlRav_IXfk.woff2',
  '/assets/fonts/hMqPNLsu_dywMa4C_DEpY4gp9Q8gbYrhqGlRav_IXfk.woff2'
];

// Install essential URLs.
self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(siteAssets)));
});

// Delete old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Fetch data from cache.
self.addEventListener('fetch', event => {
  // Respond immediately from cache.
  event.respondWith(fromCache(event.request));

  // Update the cache resource?
  let match = siteAssets.find(url => event.request.url === location.origin + url);
  if (!match) {
    // Not a site asset. Load from network and store in cache.
    event.waitUntil(update(event.request));
  } else {
    // Site asset, don't update.
  }
});

function fromCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(matching => {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response);
    });
  });
}
