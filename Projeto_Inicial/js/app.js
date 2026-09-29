import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x160b2e);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const robo = new THREE.Group();
scene.add(robo);

function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// CORPO
const corpo = mesh(new THREE.BoxGeometry(1.35, 1.5, 0.8), 0x38bdf8);
robo.add(corpo);

// CABEÇA
const cabeca = mesh(new THREE.BoxGeometry(2.2, 1.4, 1.25), 0xa855f7);
cabeca.position.set(0, 1.55, 0);
robo.add(cabeca);

// BRAÇOS
const bracoE = mesh(new THREE.BoxGeometry(0.3, 2.2, 0.35), 0x22d3ee);
bracoE.position.set(-1.25, -0.1, 0.1);
const bracoD = bracoE.clone();
bracoD.position.set(1.25, -0.1, 0.1);
robo.add(bracoE, bracoD);

// PERNAS
const pernaE = mesh(new THREE.BoxGeometry(0.4, 1.1, 0.45), 0xf97316);
pernaE.position.set(-0.38, -1.3, 0);
const pernaD = pernaE.clone();
pernaD.position.set(0.38, -1.3, 0);
robo.add(pernaE, pernaD);

// OLHOS
const olhoE = mesh(new THREE.SphereGeometry(0.3, 16, 8), 0x0f172a);
olhoE.position.set(-0.55, 1.6, 0.64);
const olhoD = olhoE.clone();
olhoD.position.x = 0.55;
robo.add(olhoE, olhoD);

const boca = mesh(
  new THREE.BoxGeometry(0.8, 0.25, 0.12),
  0x111827
);
boca.position.set(0, 1.15, 0.68);
robo.add(boca);

// ANTENA
const haste = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 12), 0xfbbf24);
haste.position.y = 3;
const ponta = mesh(new THREE.SphereGeometry(0.18, 16, 8), 0xf97316);
ponta.position.y = 3.8;
robo.add(haste, ponta);

let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);
  if (!pausado) {
    robo.rotation.y += 0.025 * velocidade;
    tempo += 0.05 * velocidade;
    robo.position.y = Math.sin(tempo * 1.5) * 0.15;
    haste.rotation.z = Math.sin(tempo * 2) * 0.15;
    if (acenar) bracoD.rotation.z = Math.sin(tempo) * 1.2;
  }
  renderer.render(scene, camera);
}
animar();

document.querySelector("#pausa").onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};
document.querySelector("#lento").onclick = () => velocidade = 0.4;
document.querySelector("#normal").onclick = () => velocidade = 1;
document.querySelector("#rapido").onclick = () => velocidade = 2.5;
document.querySelector("#acenar").onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar) bracoD.rotation.z = 0;
};
document.querySelector("#reset").onclick = () => {
  velocidade=1; pausado=false; acenar=false; tempo=0;
  robo.position.set(0, 0, 0); robo.rotation.set(0,0,0); haste.rotation.set(0,0,0); bracoD.rotation.set(0,0,0);
  document.querySelector("#pausa").textContent="Pausar";
  document.querySelector("#acenar").textContent="Acenar";
};
addEventListener("resize", () => {
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});