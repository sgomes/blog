if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const a=e=>t(e,c),r={module:{uri:c},exports:n,require:a};s[c]=Promise.all(i.map((e=>r[e]||a(e)))).then((e=>(o(...e),n)))}}define(["./workbox-90acf95f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/images/avatar.jpg",revision:"1cb8dad42547ecfce1182007c5210a77"},{url:"assets/images/touch/144x144.png",revision:"c84cdcad183ad8b00a840bc0ca372720"},{url:"assets/images/touch/152x152.png",revision:"6d03cf8f1b42ff0b1ec1ca16f765aa62"},{url:"assets/images/touch/16x16.png",revision:"08ca75c3303a602f0afe7c47e120f15f"},{url:"assets/images/touch/192x192.png",revision:"0a9ddad5951a7779bd66f0844d9947a9"},{url:"assets/images/touch/32x32.png",revision:"c057e23d9f3e37db3783e2c4ededa1d5"},{url:"assets/images/touch/512x512.png",revision:"c9115d4287d943aff93970ebe5395620"},{url:"favicon.ico",revision:"d2abd2759860c67c24e737b646b1719e"},{url:"index.html",revision:"994028bb2436376ad241a99546190488"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg)$/,new e.CacheFirst,"GET"),e.registerRoute(/\/posts\/.*\/$/,new e.NetworkFirst,"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate,"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-webfonts",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.js.map
