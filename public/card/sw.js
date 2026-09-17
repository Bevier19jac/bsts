/**
 * BSTS card service worker.
 *
 * One job that matters: after a single successful load, the app opens from
 * the home screen and shows the QR code with no network at all.
 *
 * The QR screen is fully self-contained — the code itself is inline SVG in
 * the page — so precaching the shell is enough to guarantee it. Opening the
 * public card at the scanned URL is a different thing and does need the
 * internet; the UI says so plainly rather than pretending otherwise.
 */
/* Both tokens below are replaced at build time. They are written as valid
   literals so this file stays syntactically valid JavaScript on its own. */
const VERSION = "c35116fceae3";
const CACHE = `bsts-card-${VERSION}`;
const PRECACHE = [
  "./",
  "assets/photos/headshot-420.avif",
  "assets/photos/headshot-420.webp",
  "assets/photos/headshot-420.jpg",
  "assets/photos/headshot-640.avif",
  "assets/photos/headshot-640.webp",
  "assets/photos/headshot-640.jpg",
  "qr/bsts-card-qr.svg",
  "qr/bsts-card-qr-1024.png",
  "qr/bsts-card-qr-2048.png",
  "assets/jacob-bevier.vcf",
  "_headers",
  "assets/favicon.svg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/icon-maskable-512.png",
  "assets/apple-touch-icon.png",
  "assets/fonts/inter-latin-wght-normal.woff2",
  "assets/fonts/fraunces-latin-wght-normal.woff2",
  "index.html",
  "assets/og.png",
  "manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // addAll is atomic: one 404 and nothing is cached, which would leave
      // the app half-offline. Add individually and tolerate stragglers.
      await Promise.all(
        PRECACHE.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => {}),
        ),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith("bsts-card-") && k !== CACHE).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: serve the cached shell first so the app opens instantly and
  // works offline, then refresh it in the background for next time.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match("./", { ignoreSearch: true });
        const network = fetch(request)
          .then((res) => {
            if (res && res.ok) cache.put("./", res.clone());
            return res;
          })
          .catch(() => null);
        return cached || (await network) || new Response("Offline", { status: 503 });
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const res = await fetch(request);
        if (res && res.ok && res.type === "basic") cache.put(request, res.clone());
        return res;
      } catch {
        return cached || new Response("", { status: 504 });
      }
    })(),
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "skip-waiting") self.skipWaiting();
});
