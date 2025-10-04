const CACHE_NAME = 'simple-tally-v4';
const urlsToCache = [
    './',
    './index.html',
    './app.css',
    './app.js',
    './manifest.json',
    './icon.png',
    './bg_img.jpg'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// リクエストをキャッシュから返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュがあればそれを返し、なければネットワークから取得
                return response || fetch(event.request);
            })
    );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
