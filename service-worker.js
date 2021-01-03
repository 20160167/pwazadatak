

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
    '/',
    // html file
    'index.html',
    // html manifest pointer
    'index.html?homescreen=1',
    '?homescreen=1',
    // css file
    'styles/index.min.css',
    // jquery file if you are using jquery in your site
    'functions/jquery.min.js',
    // javascript filter
    'functions/index.js',
    // manifest file
    'functions/manifest.json',
    // assets
    'assets/copy.svg',
    'assets/512x512.png',
    'assets/favicon.ico'

];

//FUNKCIJA ZA INSTALIRANJE
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.dlete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {

  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {

            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    )
  }
});


