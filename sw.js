/* ============================================================
   BIZ-OMICS · OFFLINE HELPER (service worker)
   ------------------------------------------------------------
   Lets the site install as an app and keeps pages you've
   already opened available offline.

   - Pages: always fetched fresh when online, so anything you
     upload to GitHub shows up straight away. The saved copy is
     only used when there's no connection.
   - Images, scripts, fonts: served from the saved copy for
     speed, and quietly refreshed in the background.
   - Nothing is downloaded in advance except the offline page
     and icons, so it never pulls the whole site onto a device.

   If you ever need every device to throw away its saved copies,
   change VERSION below (e.g. "v2") and upload this file.
   ============================================================ */

const VERSION = 'v1';
const PAGES = 'bizomics-pages-' + VERSION;
const ASSETS = 'bizomics-assets-' + VERSION;
const CORE = 'bizomics-core-' + VERSION;
const MAX_PAGES = 150;
const MAX_ASSETS = 400;

const CORE_FILES = [
  '/offline.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/manifest.webmanifest'
];

// Third-party hosts whose files are safe to keep (fonts).
const CACHEABLE_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE).then((c) => c.addAll(CORE_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('bizomics-') && !k.endsWith('-' + VERSION))
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

function keepable(res) {
  return res && res.ok && (res.type === 'basic' || res.type === 'cors');
}

async function pageRequest(request) {
  try {
    const fresh = await fetch(request);
    if (keepable(fresh)) {
      const cache = await caches.open(PAGES);
      await cache.put(request, fresh.clone());
      trim(PAGES, MAX_PAGES);
    }
    return fresh;
  } catch (err) {
    const saved = await caches.match(request, { ignoreSearch: true });
    return saved || caches.match('/offline.html');
  }
}

async function assetRequest(event) {
  const request = event.request;
  const saved = await caches.match(request);
  const refresh = fetch(request).then(async (fresh) => {
    if (keepable(fresh)) {
      const cache = await caches.open(ASSETS);
      await cache.put(request, fresh.clone());
      trim(ASSETS, MAX_ASSETS);
    }
    return fresh;
  });
  if (saved) {
    event.waitUntil(refresh.catch(() => {}));
    return saved;
  }
  return refresh;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (request.headers.has('range')) return; // video/audio streaming

  const url = new URL(request.url);
  const sameSite = url.origin === self.location.origin;
  if (!sameSite && !CACHEABLE_HOSTS.includes(url.hostname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(pageRequest(request));
    return;
  }
  if (sameSite && /\.(mp4|webm|mov|mp3|wav|zip|pdf|pptx|docx|xlsx)$/i.test(url.pathname)) return;

  event.respondWith(assetRequest(event));
});
