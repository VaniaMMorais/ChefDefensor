import * as THREE from "../threejs/build/three.module.js";
import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';

let elThreejs = document.getElementById("threejs");
let camera, scene, renderer, playerMesh, rotationSpeed = 0.01, karenMesh;

init();

async function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.z = 5;

    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
    ambient.position.set(0, 5, 0);
    scene.add(ambient);

    // Renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xf0f0f0); // Define a cor de fundo como branco
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    elThreejs.appendChild(renderer.domElement);

    // Adicionando o chef à cena
    await addPlayer();
    await loadKaren();

    // Iniciando o loop de renderização
    animate();

    // Listener para redimensionamento da janela
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the chef around its Y-axis (upward direction)
    playerMesh.rotation.z += rotationSpeed;
    karenMesh.rotation.z += rotationSpeed;

    renderer.render(scene, camera);
}

async function addPlayer() {
    const gltfLoader = new GLTFLoader().setPath('chef/');
    const playerGLTF = await gltfLoader.loadAsync('scene.gltf');
    playerMesh = playerGLTF.scene.children[0];

    // Reposicionando o chef para estar de frente para o usuário
    playerMesh.position.set(-5, 0, -5); // Posição centralizada na cena

    scene.add(playerMesh);
}

async function loadKaren(){
    const gltfLoader = new GLTFLoader();
    
    // Carregar o modelo 3D da mulher
    const karenGLTF = await gltfLoader.loadAsync('karen/female_cartoon_character/scene.gltf');
    karenMesh = karenGLTF.scene.children[0];
    
    karenMesh.position.set(5,0,-5)
    karenMesh.scale.set(3, 3, 3);
    scene.add(karenMesh)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

