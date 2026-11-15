"use strict";
const $ = (id) => document.getElementById(id);
let frame, controller, connection, initializing;
let currentURL = "";
function normalize(value) {
 const text=value.trim();
 if (!text) throw new Error("Enter a website or search.");
 if (/^[a-z][a-z0-9+.-]*:/i.test(text) && !/^https?:/i.test(text)) throw new Error("Only HTTP and HTTPS websites are supported.");
 if (/^https?:\/\//i.test(text)) return new URL(text).href;
 if (/^[^\s/]+\.[a-z]{2,}(:\d+)?(\/.*)?$/i.test(text)) return new URL("https://"+text).href;
 return "https://www.youtube.com/results?search_query="+encodeURIComponent(text);
}
async function init() {
 if (initializing) return initializing;
 initializing=(async()=>{
  if (!window.isSecureContext || !navigator.serviceWorker) throw new Error("This proxy needs HTTPS and service worker support.");
  const {ScramjetController}=$scramjetLoadController();
  controller=new ScramjetController({files:{wasm:"/scram/scramjet.wasm.wasm",all:"/scram/scramjet.all.js",sync:"/scram/scramjet.sync.js"}});
  await controller.init();
  await navigator.serviceWorker.register("/sw.js",{scope:"/"});
  await navigator.serviceWorker.ready;
  if(!navigator.serviceWorker.controller) await new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>reject(new Error("The browser is preparing the proxy. Reload this page and retry.")),15000);
   navigator.serviceWorker.addEventListener("controllerchange",()=>{clearTimeout(timer);resolve();},{once:true});
  });
  connection=new BareMux.BareMuxConnection("/baremux/worker.js");
  const wisp=(location.protocol==="https:"?"wss://":"ws://")+location.host+"/wisp/";
  await connection.setTransport("/libcurl/index.mjs",[{websocket:wisp}]);
  frame=controller.createFrame();
  frame.frame.title="Proxied website";
  frame.frame.allow="autoplay; fullscreen; encrypted-media; picture-in-picture; clipboard-write";
  frame.frame.setAttribute("allowfullscreen","");
  $("framehost").appendChild(frame.frame);
 })().catch(e=>{initializing=null;throw e;});
 return initializing;
}
async function go(value){
 try{
  const url=normalize(value);
  $("status").textContent="Connecting to your proxy…";
  await init();
  currentURL=url;$("location").value=url;$("direct").href=url;
  $("landing").hidden=true;$("viewer").hidden=false;
  $("home").hidden=false;$("fullscreen").hidden=false;
  $("viewer-status").textContent="Opening website. A loaded page does not confirm video playback.";
  frame.go(url);
 }catch(e){$("status").textContent="Could not open website: "+e.message;$("viewer-status").textContent="Could not open website: "+e.message;}
}
$("browse").addEventListener("submit",e=>{e.preventDefault();go($("address").value)});
$("navigate").addEventListener("submit",e=>{e.preventDefault();go($("location").value)});
document.querySelectorAll("[data-url]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.url)));
$("home").onclick=()=>{location.href="/"};
$("reload").onclick=()=>{if(currentURL)frame.go(currentURL)};
$("fullscreen").onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $("framehost").requestFullscreen();}catch(e){$("viewer-status").textContent="Fullscreen is unavailable in this browser. Use the video player's fullscreen control."}};
