
cacheName = "MMT_1.0";
cacheFiles = [
    "index.html",
    "this.js",
    "this.css",
    "sw/main.js"
]

self.addEventListener('install',e=>{
    console.log("Service installed offline");
    e.waitUntil(
        caches
            .open(cacheName)
            .then(ch=>{
                ch.addAll(cacheFiles);
            })
            .then(()=>{ self.skipWaiting()})
    )
})

self.addEventListener('activate',e=>{
    console.log("Service activated offline");
    e.waitUntil(
        caches.keys().then(e=>{
            return Promise.all(
                e.map(ch=>{
                    if(ch !== cacheName){
                        return caches.delete(ch);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch',e=>{
    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request))
    )
})