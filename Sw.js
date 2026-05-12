const CACHE_NAME = "monster-cache-v2";

const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./img1.png",
  "./img2.png",
  "./V1/monsterlist.js",
  "./V1/index.html",
  "./V1.1/monsterlist.js",
  "./V1.1/index.html",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// FETCH
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

//activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Oude cache verwijderen...");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
