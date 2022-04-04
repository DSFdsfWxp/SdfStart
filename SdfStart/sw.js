self.addEventListener("install", e => {
	self.skipWaiting();
});
self.addEventListener("fetch", e => {
		e.respondWith(caches.match(e.request).then(response => {
			return response || fetch(e.request).catch(() => { });
		}).then(data => {
			return data || new Response(null, {
				status: 502,
				statusText: "Bad Gateway"
			});
		}));
});