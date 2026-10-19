var V="algernon-v1";
var SHELL=["./","index.html","manifest.webmanifest","jszip.min.js","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf("algernon-")===0&&k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(hit){
      var net=fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res}).catch(function(){return hit});
      return hit||net;
    }).then(function(res){return res||caches.match("index.html")}));
  }
});
