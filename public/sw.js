// Service Worker for Rajputana Palace - Enhanced Offline Experience
// v4: Fully bypass caching on localhost (dev) and explicitly skip Next.js dev/HMR assets
const CACHE_NAME = 'rajputana-palace-v5';
const STATIC_CACHE_NAME = 'rajputana-static-v5';
const DYNAMIC_CACHE_NAME = 'rajputana-dynamic-v5';
const IS_DEV = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/stories',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html'
];

// Stories data cache configuration
const STORIES_CACHE_NAME = 'rajputana-stories-v2';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(STORIES_CACHE_NAME).then((cache) => {
        console.log('Creating stories cache');
        return cache.add('/stories');
      })
    ])
  );
  self.skipWaiting(); // Activate worker immediately
});

// Enhanced fetch event with network-first strategy for API calls and cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // In development, bypass all caching to avoid interfering with Next.js dev server
  if (IS_DEV) {
    event.respondWith(fetch(request));
    return;
  }

  // Bypass Next.js internal assets and HMR/dev endpoints to avoid interference
  // Also bypass React Server Component data requests (?_rsc) which require streaming
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.includes('webpack.hot-update') ||
    url.pathname.includes('__webpack_hmr') ||
    url.pathname.includes('/@vite') ||
    url.searchParams.has('_rsc') ||
    request.headers.get('accept')?.includes('text/x-component')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // Handle different types of requests
  if (request.mode === 'navigate') {
    // HTML pages - network only (no caching) to avoid stale build chunks after deploys
    event.respondWith(
      fetch(request).catch(() => {
        // Fallback to offline page only
        return caches.match('/offline.html');
      })
    );
  } else if (request.destination === 'image' || 
             request.destination === 'style' || 
             request.destination === 'script') {
    // Static assets - network first (scripts/styles) to ensure fresh hashed chunks
    event.respondWith(
      (async () => {
        // For styles and scripts, skip cache to avoid stale chunks
        if (request.destination === 'style' || request.destination === 'script') {
          return fetch(request);
        }
        // For images, use cache-first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;
        const networkResponse = await fetch(request);
        if (networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      })()
    );
  } else if (url.pathname.includes('/api/') || url.pathname.includes('/stories')) {
    // API calls - network first with cache fallback
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(STORIES_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
  } else {
    // Default - network first to avoid stale content on dynamic data
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== STORIES_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ])
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

async function syncFavorites() {
  // Sync favorites when back online
  const favorites = await getLocalStorageData('favorites');
  if (favorites && favorites.length > 0) {
    // Here you could sync with a backend if available
    console.log('Syncing favorites:', favorites);
  }
}

// Message handling for app-service worker communication
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_OFFLINE_DATA') {
    event.ports[0].postMessage({
      offlineReady: true,
      cachedStories: true
    });
  }
});

// Utility function to check cache expiration
function isCacheExpired(cachedResponse) {
  const cachedDate = cachedResponse.headers.get('sw-cache-date');
  if (!cachedDate) return true;
  
  const cachedTime = new Date(cachedDate).getTime();
  const currentTime = Date.now();
  
  return (currentTime - cachedTime) > CACHE_EXPIRATION_TIME;
}

// Add cache date header to responses
function addCacheHeader(response) {
  const newHeaders = new Headers(response.headers);
  newHeaders.append('sw-cache-date', new Date().toISOString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

async function getLocalStorageData(key) {
  // Helper function to get data from localStorage (would need to be adapted for actual use)
  return null;
}