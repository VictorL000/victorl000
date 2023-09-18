import * as THREE from "three";
import gsap from "gsap";
import {locations, modelPivot} from "./main.js"

const isDesktop = window.innerWidth > 900;

let tl = gsap.timeline();
let tlLoop = gsap.timeline();
tlLoop.yoyo(true).repeat(-1);

const pageHeadLoad = (callback) => {
  tl.from(".header a", { duration: 0.4, opacity: "0", ease: "power2.out", stagger: 0.05, onComplete: callback })
}

const pageBGLoad = (callback) => {
  if(isDesktop)
    tl.from("#bg", { duration: 1, scale: 0, ease: "power1.out", onComplete: callback, delay: 0.8 });
  else
    callback();
}

const indexIn = (callback) => {
  if(isDesktop) tl.to(modelPivot.rotation, { duration: 0.8, y: 0, ease: "power2.out"});
  tl.from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out"})
    .from(".headline h1, .headline h2, .headline h3", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.2 })
    .from(".blobs2", { duration: 0.8, y: "+100%", ease: "power2.out" }, "<")
    .from(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .from(".byline h3", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.2, onComplete: () => {
      enableBlobAnims();
      callback();
    } })
};

const indexOut = (callback) => {
  disableBlobAnims();
  tl.clear();
  tl.to(".headline", { duration: 0.5, y: "-300%", ease: "power2.in" })
    .to(".headline", { duration: 0.5, opacity: "0", ease: "power2.in" }, "<")
    .to(".byline", { duration: 0.5, y: "+300%", ease: "power2.in" })
    .to(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .to(".byline", { duration: 0.5, opacity: "0", ease: "power2.in", onComplete: callback }, "<");
};

const aboutIn = (callback) => {
  if(isDesktop)  tl.to(modelPivot.rotation, { duration: 0.8, y: 1.08, ease: "power2.out"});
  tl.from(".blobs1", { duration: 0.8, y: "-180%", ease: "power2.out", delay: 0.5 })
    .from(".blobs2", { duration: 0.8, y: "+180%", ease: "power2.out" }, "<")
    .from(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .from(".about-container", { duration: 0.5, opacity: "0", ease: "power2.out", onComplete: () => {
      enableBlobAnims();
      callback();
    } })

};

const aboutOut = (callback) => {
  disableBlobAnims();
  tl.clear();
  tl.to(".blobs1", { duration: 0.5, y: "-100%", ease: "power2.out"})
    .to(".blobs2", { duration: 0.5, y: "+120%", ease: "power2.out" }, "<")
    .to(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .to(".about-container", { duration: 0.4, opacity: "0", ease: "power2.out", onComplete: callback });
};

const contactOut = (callback) => {
  disableBlobAnims();
  tl.clear();
  tl.to(".blobs1", { duration: 0.5, y: "-100%", ease: "power2.out"})
    .to(".blobs2", { duration: 0.5, y: "+120%", ease: "power2.out" }, "<")
    .to(".contact-container", { duration: 0.4, opacity: "0", ease: "power2.out", onComplete: callback });
}

const contactIn = (callback) => {
  if(isDesktop) tl.to(modelPivot.rotation, { duration: 0.8, y: 4.2, ease: "power2.out"});
  tl.from(".blobs1", { duration: 0.8, y: "-180%", ease: "power2.out", delay: 0.5 })
    .from(".blobs2", { duration: 0.8, y: "+180%", ease: "power2.out" }, "<")
    .from(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .to(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .from(".contact-container", { duration: 0.5, opacity: "0", ease: "power2.out", onComplete: () => {
      enableBlobAnims();
      callback();
    } })
};

const projectsIn = (callback) => {
  if(isDesktop) tl.to(modelPivot.rotation, { duration: 0.8, y: 3.86, ease: "power2.out"});
  tl.from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out"})
    .from(".projects > h1", { duration: 0.5, opacity: "0", ease: "power2.out"})
    .from(".project-container", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.1})
    .from(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .from(".scroll-reminder", { duration: 0.3, opacity: "0", ease: "power2.out", onComplete: () => {
      enableBlobAnims();
      callback();
    } })
};

const projectsOut = (callback) => {
  disableBlobAnims();
  tl.clear();
  tl.to(".blobs1", { duration: 0.7, y: "-100%", ease: "power2.out"})
    .to(".project-container", { duration: 0.3, opacity: "0", ease: "power2.out", stagger: 0.08} )
    .to(".scroll-reminder", { duration: 0.3, opacity: "0", ease: "power2.out"}, "<")
    .to(".footer", { duration: 0.5, opacity: "0", ease: "power2.out"}, "<")
    .to(".projects > h1", { duration: 0.3, opacity: "0", ease: "power2.out", onComplete: callback})
}

const navigate = (event, path, callback) => {
  event.preventDefault();
  console.log(event.target.href);
  // console.log("navigate from " + path);
  outAnims[path](callback);
};

window.navigate = navigate;

const inAnims = {
  "/": indexIn,
  "/about": aboutIn,
  "/contact": contactIn,
  "/projects": projectsIn,
  "/projects/": projectsIn,
};

const outAnims = {
  // 404: errorPageOut,
  "/": indexOut,
  "/about": aboutOut,
  "/contact": contactOut,
  "/projects": projectsOut,
  "/projects/": projectsOut
};

export { indexIn, indexOut, inAnims, outAnims, pageBGLoad, pageHeadLoad };
const enableBlobAnims = () => {
  document.querySelectorAll('.blobs1, .blobs2').forEach((e) => e.classList.add("enabled"));
}
const disableBlobAnims = () => {
  document.querySelectorAll('.blobs1, .blobs2').forEach((e) => e.classList.remove("enabled"));
}