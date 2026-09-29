import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Scene
const scene = new THREE.Scene();

// 2. Criar Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. Criar Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 4. Criar um cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;

// 5. Adicionar o cubo à Scene
scene.add(cube);

// 6. Criar função animar()
let animationSpeed = 0.01;
let isPaused = false;

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        cube.rotation.x += animationSpeed;
        cube.rotation.y += animationSpeed;
        sphere.rotation.y += animationSpeed;
        cone.rotation.y += animationSpeed;
    }

    renderer.render(scene, camera);
}

// 7. Adicionar esfera e cone
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0, 0);
sphere.castShadow = true;
scene.add(sphere);

const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(-2, 0, 0);
cone.castShadow = true;
scene.add(cone);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(4, 6, 5);
light.castShadow = true;
light.shadow.mapSize.set(2048, 2048);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.35));

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x273449 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
floor.receiveShadow = true;
scene.add(floor);

document.getElementById("pausa").onclick = () => {
    isPaused = !isPaused;
    document.getElementById("pausa").textContent = isPaused ? "Continuar" : "Pausar";
};
document.getElementById("lento").onclick = () => { animationSpeed = 0.003; };
document.getElementById("normal").onclick = () => { animationSpeed = 0.01; };
document.getElementById("rapido").onclick = () => { animationSpeed = 0.03; };
document.getElementById("reset").onclick = () => {
    cube.position.set(0, 0, 0);
    sphere.position.set(2, 0, 0);
    cone.position.set(-2, 0, 0);
    cube.rotation.set(0, 0, 0);
    sphere.rotation.set(0, 0, 0);
    cone.rotation.set(0, 0, 0);
    animationSpeed = 0.01;
    isPaused = false;
    document.getElementById("pausa").textContent = "Pausar";
};

// 9. Configurar a posição da câmera
camera.position.z = 5;

// 10. Chamar a função animar()
animate();