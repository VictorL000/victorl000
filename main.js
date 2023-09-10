import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(15, 11, -10);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load("models/computer.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(7, 7, 7);
  model.position.set(0, 0, 0);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(model);
});

loader.load("models/mailbox.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(5, 5, 5);
  model.position.set(0, 0, -10);
  // scene.add(model);
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
});

loader.load("models/goose.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(5, 5, 5);
  model.position.set(-10, 0, 0);

  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  // scene.add(model);
});

loader.load("models/books.glb", function (gltf) {
  const model = gltf.scene;
  model.scale.set(1, 1, 1);
  model.position.set(10, 0, 0);

  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  // scene.add(model);
});

const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(5, 30, 3);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;
controls.enableDamping = true;
controls.enabled = false;
const geometry = new THREE.PlaneGeometry( 2000, 2000 );
geometry.rotateX( - Math.PI / 2 );

const material = new THREE.ShadowMaterial();
material.opacity = 0.2;

const plane = new THREE.Mesh( geometry, material );
plane.position.y = -2;
plane.receiveShadow = true;
scene.add( plane );
var pivot = new THREE.Group();
let stars = Array(200).fill().forEach(addStar);
scene.add(pivot);

function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
  pivot.rotation.y += 0.0003;
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 3, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  pivot.add(star);
}

animate();
