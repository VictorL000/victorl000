import * as THREE from "three";
import gsap from "gsap";
import {locations, modelPivot} from "./main.js"

let tl = gsap.timeline();

const pageLoad = (callback) => {
  tl.from(".header a", { duration: 0.4, opacity: "0", ease: "power2.out", stagger: 0.05 })
    .from("#bg", { duration: 1, scale: 0, ease: "power1.out", onComplete: callback})
}

const indexIn = (callback) => {
  tl.to(modelPivot.rotation, { duration: 0.8, y: 0, ease: "power2.out"})
    .from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out"})
    .from(".headline h1, .headline h2, .headline h3", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.2 })
    .from(".blobs2", { duration: 0.8, y: "+100%", ease: "power2.out" }, "<")
    .from(".byline h3", { duration: 0.5, opacity: "0", ease: "power2.out", stagger: 0.2, onComplete: callback })
};

const indexOut = (callback) => {
  tl.clear();
  // tl.to(computer.position, { duration: 4, y: 30, ease: "power2.out"})
  tl.to(".headline", { duration: 0.5, y: "-300%", ease: "power2.in" })
    .to(".headline", { duration: 0.5, opacity: "0", ease: "power2.in" }, "<")
    .to(".byline", { duration: 0.5, y: "+300%", ease: "power2.in" })
    .to(".byline", { duration: 0.5, opacity: "0", ease: "power2.in", onComplete: callback }, "<");
};

const aboutIn = (callback) => {
  tl.to(modelPivot.rotation, { duration: 0.8, y: -2.07, ease: "power2.out"})
    .from(".blobs1", { duration: 0.8, y: "-100%", ease: "power2.out", delay: 0.5 })
    .from(".blobs2", { duration: 0.8, y: "+100%", ease: "power2.out" }, "<")
    .from(".about-container", { duration: 0.5, opacity: "0", ease: "power2.out", onComplete: callback });
};

const aboutOut = (callback) => {
  tl.clear();
  tl.to(".blobs1", { duration: 0.5, y: "-100%", ease: "power2.out"})
    .to(".blobs2", { duration: 0.5, y: "+100%", ease: "power2.out" }, "<")
    .to(".about-container", { duration: 0.5, opacity: "0", ease: "power2.out", onComplete: callback });
};

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
};

const outAnims = {
  // 404: errorPageOut,
  "/": indexOut,
  "/about": aboutOut,
  // "/contact": contactOut,
  // "/projects": projectsOut
};

export { indexIn, indexOut, inAnims, outAnims, pageLoad };
