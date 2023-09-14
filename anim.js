import * as THREE from "three";
import gsap from "gsap";
import {locations, modelPivot} from "./main.js"

let tl = gsap.timeline();
let tlLoop = gsap.timeline();
tlLoop.yoyo(true).repeat(-1);

const pageLoad = (callback) => {
  tl.from(".header a", { duration: 0.4, opacity: "0", ease: "power2.out", stagger: 0.05, delay: 0.5 })
    .from("#bg", { duration: 1, scale: 0, ease: "power1.out", onComplete: callback})
}

const indexIn = (callback) => {
  tl.to(modelPivot.rotation, { duration: 0.8, y: 0, ease: "power2.out"})
    .from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out"})
    .from(".headline h1, .headline h2, .headline h3", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.2 })
    .from(".blobs2", { duration: 0.8, y: "+100%", ease: "power2.out" }, "<")
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
    .to(".byline", { duration: 0.5, opacity: "0", ease: "power2.in", onComplete: callback }, "<");
};

const aboutIn = (callback) => {
  tl.to(modelPivot.rotation, { duration: 0.8, y: 1.12, ease: "power2.out"})
    .from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out", delay: 0.5 })
    .from(".blobs2", { duration: 0.8, y: "+100%", ease: "power2.out" }, "<")
    .from(".about-container", { duration: 0.5, opacity: "0", ease: "power2.out", onComplete: () => {
      enableBlobAnims();
      callback();
    } })

};

const aboutOut = (callback) => {
  disableBlobAnims();
  tl.clear();
  tl.to(".blobs1", { duration: 0.5, y: "-100%", ease: "power2.out"})
    .to(".blobs2", { duration: 0.5, y: "+100%", ease: "power2.out" }, "<")
    .to(".about-container", { duration: 0.5, opacity: "0", ease: "power2.out", onComplete: callback });
};

const contactOut = (callback) => {
  disableBlobAnims();
  callback();
}

const contactIn = (callback) => {
  tl.to(modelPivot.rotation, { duration: 0.8, y: 4.3, ease: "power2.out", onComplete: () => {
      enableBlobAnims();
      callback();
    } })
};

const projectsIn = (callback) => {
  tl.to(modelPivot.rotation, { duration: 0.8, y: 3.77, ease: "power2.out", onComplete: callback})
    .from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out"})
    .from(".projects > h1", { duration: 0.5, opacity: "0", ease: "power2.out"})
    .from(".project-container", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.1})
    .from(".scroll-reminder", { duration: 0.5, opacity: "0", ease: "power2.out"})
    .to(".scroll-reminder", { duration: 0.5, opacity: "0", ease: "power2.out", delay: 2, onComplete: () => {
      enableBlobAnims();
      callback();
    } })
};

const projectsOut = (callback) => {
  disableBlobAnims();
  callback();
}

const navigate = (event, path, callback) => {
  console.log(event);
  event.preventDefault();
  console.log("navigate from " + path);
  outAnims[path](callback);
};

window.navigate = navigate;

const inAnims = {
  "/": indexIn,
  "/about": aboutIn,
  "/contact": contactIn,
  "/projects": projectsIn,
};

const outAnims = {
  // 404: errorPageOut,
  "/": indexOut,
  "/about": aboutOut,
  "/contact": contactOut,
  "/projects": projectsOut
};

export { indexIn, indexOut, inAnims, outAnims, pageLoad };
const enableBlobAnims = () => {
  document.querySelectorAll('.blobs1, .blobs2').forEach((e) => e.classList.add("enabled"));
}
const disableBlobAnims = () => {
  document.querySelectorAll('.blobs1, .blobs2').forEach((e) => e.classList.add("enabled"));
}