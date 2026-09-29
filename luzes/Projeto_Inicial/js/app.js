import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// CENA, CÂMARA E RENDERER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111f);

const camera = new THREE.PerspectiveCamera(
  55, innerWidth / innerHeight, 0.1, 100
);
camera.position.set(6, 4, 8);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// MATERIAIS
const azul = new THREE.MeshStandardMaterial({
  color: 0x22d3ee,
  roughness: 0.12,
  metalness: 0.92
});

const rosa = new THREE.MeshStandardMaterial({
  color: 0xff4d8d,
  roughness: 0.96,
  metalness: 0.02
});

const verde = new THREE.MeshStandardMaterial({
  color: 0xb8ff6a,
  roughness: 0.2,
  metalness: 0.85
});

// OBJETOS
const cubo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), azul);
cubo.position.set(-2.2, 1, 0);

const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), rosa);
esfera.position.set(0, 1, 0);

const toro = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.3, 20, 64), verde);
toro.position.set(2.3, 1.1, 0);
toro.rotation.x = Math.PI / 2;

scene.add(cubo, esfera, toro);

// CHÃO
const chao = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshStandardMaterial({ color: 0x18283d, roughness: 0.82 })
);
chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;
scene.add(chao);

// SOMBRAS NOS OBJETOS
[cubo, esfera, toro].forEach(obj => {
  obj.castShadow = true;
  obj.receiveShadow = true;
});

// LUZ AMBIENTE
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.18);
scene.add(luzAmbiente);

// LUZ DIRECIONAL
const luz = new THREE.DirectionalLight(0xffaa55, 2.6);
luz.position.set(-4, 3, 2);
luz.castShadow = true;
luz.shadow.mapSize.set(1024, 1024);
scene.add(luz);

// AJUDANTE VISUAL DA LUZ
const helper = new THREE.DirectionalLightHelper(luz, 0.8);
scene.add(helper);

let rodar = true;
let sombras = true;
let intensidadeAmbiente = 0.18;
let focoDireita = false;

function animar() {
  requestAnimationFrame(animar);

  if (rodar) {
    cubo.rotation.y += 0.008;
    esfera.rotation.y += 0.006;
    toro.rotation.z += 0.008;
  }

  helper.update();
  renderer.render(scene, camera);
}
animar();

// BOTÕES
document.querySelector("#ambiente").onclick = () => {
  intensidadeAmbiente = intensidadeAmbiente === 0 ? 1.5 : 0;
  luzAmbiente.intensity = intensidadeAmbiente;
};

document.querySelector("#foco").onclick = () => {
  focoDireita = !focoDireita;
  luz.position.x = focoDireita ? 4 : -4;
  luz.position.z = focoDireita ? 5 : 2;
};

document.querySelector("#sombras").onclick = () => {
  sombras = !sombras;
  renderer.shadowMap.enabled = sombras;
  luz.castShadow = sombras;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = sombras);
};

document.querySelector("#rodar").onclick = () => {
  rodar = !rodar;
};

document.querySelector("#reset").onclick = () => {
  azul.color.set(0x22d3ee);
  rosa.color.set(0xff4d8d);
  verde.color.set(0xb8ff6a);
  azul.roughness = 0.12; azul.metalness = 0.92;
  rosa.roughness = 0.96; rosa.metalness = 0.02;
  verde.roughness = 0.2; verde.metalness = 0.85;
  luzAmbiente.intensity = 0.18;
  intensidadeAmbiente = 0.18;
  luz.intensity = 2.6;
  luz.color.set(0xffaa55);
  luz.position.set(-4, 3, 2);
  focoDireita = false;
  sombras = true;
  renderer.shadowMap.enabled = true;
  luz.castShadow = true;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = true);
  rodar = true;
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});