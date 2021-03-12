const CACHE_NAME = 'sgomes-v12';
const TIMEOUT = 400;

// Cached files
const SITE_ASSETS = [
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
  '/assets/images/touch/512x512.png',
  '/manifest.json'
];

// Install essential URLs.
self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => cache.addAll(SITE_ASSETS)));
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
  const requestUrl = new URL(event.request.url);
  // Routing for local URLs
  if (requestUrl.origin == location.origin) {
    if (SITE_ASSETS.find(url => requestUrl.pathname === url)) {
      // Installed asset. Cache only, with network fallback.
      cacheWithNetworkFallback(event);
    } else if (requestUrl.pathname === '/' ||  // Home. Try network first, with timeout. If it times out, go to cache.
        /\.html$/.test(requestUrl.pathname) || // Article. Try network first, with timeout. If it times out, go to cache.
        /\/posts\/.*\/$/.test(requestUrl.pathname)) {
      networkWithTimeoutAndUpdate(event);
    } else {
      // Cache, then update.
      cacheThenUpdate(event);
    }
  }
});


// Auxiliary methods.

// Use first promise to resolve, reject if they all do.
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    // make sure promises are all promises
    promises = promises.map(p => Promise.resolve(p));
    // resolve this promise as soon as one resolves
    promises.forEach(p => p.then(resolve));
    // reject if all promises reject
    promises.reduce((a, b) => a.catch(() => b))
      .catch(() => reject(Error("All failed")));
  });
};

// Network with timeout loading strategy, and update logic.
// Attempts to load from the network, with a timeout.
// If the timeout happens, it loads from cache immediately, or waits for
// network if the resource isn't in the cache.
// In parallel, it caches the new network response (if successful).
function networkWithTimeoutAndUpdate(event) {
  const cached = fromCache(event.request);
  const network = fetch(event.request);
  const networkClone = network.then(response => response.clone());

  event.respondWith(promiseAny([
    networkClone.catch(() => cached),
    wait(TIMEOUT).then(() => cached)
  ]));
  event.waitUntil(network.then(resp => update(event.request, resp)));
}

function cacheWithNetworkFallback(event) {
  event.respondWith(fromCache(event.request).catch(() => fetch(event.request)));
}

function cacheThenUpdate(event) {
  const network = fetch(event.request);
  const networkClone = network.then(response => response.clone());

  event.respondWith(fromCache(event.request).catch(() => networkClone));
  event.waitUntil(network.then(resp => update(event.request, resp)));
}

function fromCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(matching => {
      return matching || Promise.reject('no-match');
    });
  });
}

function wait(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function update(request, response) {
  return caches.open(CACHE_NAME).then(cache => cache.put(request, response));
}
