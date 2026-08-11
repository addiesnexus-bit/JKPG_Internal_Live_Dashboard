// Minimal service worker — required by Android Chrome for "Add to Home
// Screen" / installability. No caching logic on purpose: this dashboard
// shows live data, so every request should always hit the network, never
// a stale cache.
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
