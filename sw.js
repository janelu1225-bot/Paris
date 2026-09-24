self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open("trip").then((c) =>
      c.match(e.request).then((hit) => {
        const net = fetch(e.request)
          .then((r) => { c.put(e.request, r.clone()); return r; })
          .catch(() => hit);
        return hit || net;
      })
    )
  );
});
