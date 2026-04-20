const CACHE_NAME = 'emuna-tarot-v14';
const APP_SHELL = [
    './',
    'index.html',
    'cartaastral/index.html',
    'tarotsiono/index.html',
    'css/style.css',
    'js/app.js',
    'manifest.json',
    'lunaroja.jfif',
    'lunaagua.jfif',
    'lunamano.jfif',
    'lunahijo.jfif',
    'pasado.jfif',
    'presente.jfif',
    'futuro.jfif',
    'assets/chica luna.jpg',
    'assets/descarga.jpg',
    'assets/luna-after-hero.jpg',
    'assets/icon-192.svg',
    'assets/icon-512.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || event.request.mode === 'navigate')) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                }

                return networkResponse;
            })
            .catch(async () => {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                if (event.request.mode === 'navigate') {
                    return caches.match('./') || caches.match('index.html');
                }

                throw new Error('No hay respuesta en caché disponible.');
            })
    );
});