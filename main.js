import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

console.log("Threejs loaded");
const scene = new THREE.Scene();
const FOV_RATIO = -0.02285;
const FOV_INTERCEPT = 108.5;
const camera = new THREE.PerspectiveCamera(window.innerWidth * FOV_RATIO + FOV_INTERCEPT, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 14, 0);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

const locations = {
  index: { x: 20, y: 0, z: 0 },
  about: { x: 0, y: 0, z: 20 },
  projects: { x: -20, y: 0, z: 0 },
  contact: { x: 0, y: 0, z: -20 },
};

let loadedModel;
var modelPivot = new THREE.Group();
let computer;
loader.load("models/computer.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(6, 6, 6);
  model.position.copy(locations["index"]);
  model.rotation.y = 2.6;
  camera.lookAt(20, 3, 0);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  modelPivot.add(model);
  loadedModel = model;
  computer = model;
});

loader.load("models/mailbox.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(7, 7, 7);
  model.rotation.y = -1.6;
  model.position.copy(locations["contact"]);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  modelPivot.add(model);
});

loader.load("models/goose.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(5, 5, 5);
  model.position.copy(locations["about"]);
  model.rotation.y = 0.8;
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  modelPivot.add(model);
});

loader.load("models/books.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(1, 1, 1);
  model.position.copy(locations["projects"]);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  modelPivot.add(model);
});

scene.add(modelPivot);

const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(0, 30, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightMailbox = new THREE.PointLight(0xffffff, 1000);
pointLightMailbox.position.set(-2, 30, -18);
scene.add(pointLightMailbox);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(2000, 2000);
geometry.rotateX(-Math.PI / 2);

const material = new THREE.ShadowMaterial();
material.opacity = 0.2;

const plane = new THREE.Mesh(geometry, material);
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);

var pivot = new THREE.Group();

let stars = Array(80).fill().forEach(addStar);
scene.add(pivot);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  pivot.rotation.y += 0.0003;
  modelPivot.children.forEach((model) => {
    model.rotation.y += 0.0004;
  })
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 3, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloat(-20, 50));
  star.position.set(x, y, z);
  pivot.add(star);
}

animate();

window.camera = camera;

export { locations, modelPivot };
