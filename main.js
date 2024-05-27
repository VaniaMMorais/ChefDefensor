import * as THREE from "../threejs/build/three.module.js";
import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from '../threejs/examples/jsm/utils/SkeletonUtils.js';

let elThreejs = document.getElementById("threejs");
let camera, scene, renderer;
let axesHelper;

let keyboard = {};
let playerMesh;

let projectileMeshes = [];
let projectileMesh;

let karenMeshes = [];
let karenMesh;

let womanGLTF;
let mixers = [];
let clock;

let score = 0;
let lives = 3;

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

let spawnInterval = 1000; // Intervalo inicial de spawn
let spawnKarenIntervalId; // Armazena o ID do intervalo para ajuste posterior

init();

async function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    // rotate camera to see the scene from the top
    camera.rotation.x = -Math.PI / 2;

    clock = new THREE.Clock();

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xf6d7b6);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // opcional: melhora a qualidade das sombras
    renderer.outputEncoding = THREE.sRGBEncoding;

    elThreejs.appendChild(renderer.domElement);

    await loadKaren();

    addEdges();
    addDoor();
    addWindow();
    addPainting();
    addLamp();

    addPlayer();
    addPlane();
    addProjectile();

    addKeysListener();
    animate();

    spawnKarens();
}

function animate() {
    movePlayer();
    updateProjectiles();
    updateKarens();

    checkCollisions();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    const dt = clock.getDelta();
    for (const mixer of mixers) mixer.update(dt);
}

function addDoor() {
    // Moldura da porta
    const doorFrameGeometry = new THREE.BoxGeometry(20, 15, 0.2);
    const doorFrameMaterial = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 0, -120);
    doorFrame.castShadow = true;
    scene.add(doorFrame);
    // Puxador esquerdo
    const handleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
    const handleMaterial = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 }); // Cinza escuro
    const handleLeft = new THREE.Mesh(handleGeometry, handleMaterial);
    handleLeft.position.set(-1, 0, -90);
    handleLeft.castShadow = true;
    scene.add(handleLeft);

    // Puxador direito
    const handleRight = new THREE.Mesh(handleGeometry, handleMaterial);
    handleRight.position.set(1, 0, -90);
    handleRight.castShadow = true;
    scene.add(handleRight);
}

function addEdges() {
    const edge1Geometry = new THREE.BoxGeometry(20, 0.1, 0.2);
    const edge1Material = new THREE.MeshBasicMaterial({ color: 0x727272 });
    const edge1 = new THREE.Mesh(edge1Geometry, edge1Material);
    edge1.position.set(-65, 5, -90); // Posição igual à do vidro
    edge1.rotation.z = Math.PI / 2 - 0.2; // Mesma rotação do vidro
    edge1.castShadow = true;
    scene.add(edge1);

    const edge2Geometry = new THREE.BoxGeometry(20, 0.1, 0.2);
    const edge2Material = new THREE.MeshBasicMaterial({ color: 0x727272 });
    const edge2 = new THREE.Mesh(edge2Geometry, edge2Material);
    edge2.position.set(65, 5, -90); // Posição igual à do vidro
    edge2.rotation.z = Math.PI / 2 + 0.2; // Mesma rotação do vidro
    edge2.castShadow = true;
    scene.add(edge2);

    // Teto
    const ceilingGeometry = new THREE.PlaneGeometry(200, 300);
    const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.set(0, 20, 0);
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);
}

function addWindow() {
    // Vidro da janela
    const glassGeometry = new THREE.PlaneGeometry(4, 8);
    const glassMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6, transparent: true, opacity: 0.5 }); // Azul claro, transparente
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(30, 5, 0); // Posição na parede direita
    glass.rotation.z = Math.PI / 2 - 0.1;
    scene.add(glass);

    const frame3Geometry = new THREE.BoxGeometry(8, 0.5, 0.2);
    const frame3Material = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    const frame3 = new THREE.Mesh(frame3Geometry, frame3Material);
    frame3.position.set(30, 7, 0);
    frame3.rotation.y = Math.PI;
    frame3.rotation.z = Math.PI + 0.1;
    scene.add(frame3);

    const frame4Geometry = new THREE.BoxGeometry(8, 0.5, 0.2);
    const frame4Material = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    const frame4 = new THREE.Mesh(frame4Geometry, frame4Material);
    frame4.position.set(30, 3, 0);
    frame4.rotation.y = Math.PI;
    frame4.rotation.z = Math.PI + 0.1;
    scene.add(frame4);

    const frame5Geometry = new THREE.BoxGeometry(4.5, 0.5, 0.2);
    const frame5Material = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    const frame5 = new THREE.Mesh(frame5Geometry, frame5Material);
    frame5.position.set(34, 4.6, 0);
    frame5.rotation.z = glass.rotation.z;
    scene.add(frame5);

    const frame6Geometry = new THREE.BoxGeometry(4.5, 0.5, 0.2);
    const frame6Material = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    const frame6 = new THREE.Mesh(frame6Geometry, frame6Material);
    frame6.position.set(26, 5.4, 0);
    frame6.rotation.z = glass.rotation.z;
    scene.add(frame6);
}

function addPainting() {
    // Carregar a textura da imagem
    const loader = new THREE.TextureLoader();
    loader.load('/painting.png', function(texture) {
        // Certificar que a textura não está sendo afetada por outras configurações
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Tela do quadro com a imagem
        const paintingGeometry = new THREE.PlaneGeometry(4, 2);
        const paintingMaterial = new THREE.MeshPhongMaterial({ map: texture }); // Aplicar a textura da imagem
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.set(-30, 7, 0); // Posição na parede esquerda
        painting.castShadow = true;
        painting.receiveShadow = true; // Certificar que a pintura pode receber sombras
        scene.add(painting);
    });
}

function addLamp() {
    // Suporte do candeeiro
    const standGeometry = new THREE.CylinderGeometry(0.5, 0.5, 8, 32);
    const standMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Cinza
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, 18, -10); // Posição ao lado da porta
    stand.castShadow = true;
    scene.add(stand);

    // Lâmpada do candeeiro
    const bulbGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Amarelo
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0, 14, -10); // Posição ao lado da porta
    bulb.castShadow = true;
    scene.add(bulb);

    // Luz do candeeiro
    const pointLight = new THREE.PointLight(0xffffcf, 2, 3000);
    pointLight.position.set(0, 14, -10); // Mesma posição da lâmpada
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 512; // tamanho do mapa de sombras
    pointLight.shadow.mapSize.height = 512;
    pointLight.shadow.camera.near = 0.5;
    pointLight.shadow.camera.far = 500;
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Luz ambiente fraca
    scene.add(ambientLight);
}

async function addPlayer() {
    const gltfLoader = new GLTFLoader().setPath('chef/');
    const playerGLTF = await gltfLoader.loadAsync('scene.gltf');
    playerMesh = playerGLTF.scene.children[0];
    playerMesh.rotation.z = Math.PI;
    playerMesh.scale.set(0.75, 0.75, 0.75);
    playerMesh.position.set(0, 0, 15);
    playerMesh.castShadow = true;
    scene.add(playerMesh);

    camera.position.set(playerMesh.position.x, playerMesh.position.y + 5, playerMesh.position.z + 10);
    camera.lookAt(playerMesh.position);
}

function addPlane() {
    const texture = new THREE.TextureLoader().load("floor/brownFloor.png", function(texture) {
        // Repetir a textura várias vezes
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);

        const geometry = new THREE.BoxGeometry(200, 0, 300);
        const material = new THREE.MeshBasicMaterial({ map: texture, color: 0x333333 });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, -10, 0);
        plane.receiveShadow = true;
        scene.add(plane);
    });
}

function addKeysListener() {
    window.addEventListener('keydown', function(event) {
        keyboard[event.keyCode] = true;
    }, false);
    window.addEventListener('keyup', function(event) {
        keyboard[event.keyCode] = false;
    }, false);

    window.addEventListener("keyup", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        if (event.keyCode == 32) {
            let projectileMeshClone = projectileMesh.clone();
            projectileMeshClone.position.x = playerMesh.position.x + 3;
            projectileMeshClone.position.y = playerMesh.position.y;
            projectileMeshClone.position.z = playerMesh.position.z;
            projectileMeshClone.castShadow = true;
            scene.add(projectileMeshClone);
            projectileMeshes.push(projectileMeshClone);
        }
    });
}

function movePlayer() {
    if (keyboard[65] && playerMesh.position.x > -20) playerMesh.position.x -= 0.25;
    if (keyboard[68] && playerMesh.position.x < 20) playerMesh.position.x += 0.25;
}

async function addProjectile() {
    const gltfLoader = new GLTFLoader().setPath('rollingPin/');
    const projectileGLTF = await gltfLoader.loadAsync('scene.gltf');
    projectileMesh = projectileGLTF.scene;
    projectileMesh.scale.set(0.3, 0.3, 0.3);
    projectileMesh.castShadow = true;
}

async function loadKaren() {
    const gltfLoader = new GLTFLoader();

    womanGLTF = await gltfLoader.loadAsync('karen/female_cartoon_character/scene.gltf');
    const hairGLTF = await gltfLoader.loadAsync('karen/female_karen_hair/scene.gltf');

    const karenMesh = womanGLTF.scene;
    karenMesh.scale.set(2, 2, 2);
}

function addKaren(posX) {
    let model1 = SkeletonUtils.clone(womanGLTF.scene);

    let animations = {};
    womanGLTF.animations.forEach(animation => {
        animations[animation.name] = animation;
    });

    const mixer1 = new THREE.AnimationMixer(model1);
    const actualAnimation = animations["mixamorig_KarenAnimation"];
    if (actualAnimation) {
        mixer1.clipAction(actualAnimation).play();
    } else {
        console.error("A animação 'mixamorig_KarenAnimation' não foi encontrada.");
    }

    model1.position.x = posX;
    model1.position.y = 0;
    model1.position.z = -30;
    model1.castShadow = true;

    karenMeshes.push(model1);
    scene.add(model1);
    mixers.push(mixer1);
}

function spawnKarens() {
    let randomX = Math.floor(Math.random() * 20) - 10;
    addKaren(randomX);
    setInterval(() => {
        randomX = Math.floor(Math.random() * 20) - 10;
        addKaren(randomX);
    }, spawnInterval);
}

function updateKarens() {
    karenMeshes.forEach((karen, index) => {
        karen.position.z += 0.1;
        if (karen.position.z > 20) {
            scene.remove(karen);
            karenMeshes.splice(index, 1);
            loseLife();
        }
    });
}

function updateProjectiles() {
    projectileMeshes.forEach((projectile, index) => {
        projectile.position.z -= 0.5;
        if (projectile.position.z < -20) {
            scene.remove(projectile);
            projectileMeshes.splice(index, 1);
        }
    });
}

function checkCollisions() {
    karenMeshes.forEach((karen, indexa) => {
        projectileMeshes.forEach((projectile, indexb) => {
            if (karen.position.x >= projectile.position.x - 2 &&
                karen.position.x <= projectile.position.x + 2 &&
                karen.position.z >= projectile.position.z - 2 &&
                karen.position.z <= projectile.position.z + 2) {
                scene.remove(karen);
                karenMeshes.splice(indexa, 1);
                scene.remove(projectile);
                projectileMeshes.splice(indexb, 1);
                score++;
                updateHUD();
            }
        });
    });
}

function loseLife() {
    lives--;
    updateHUD();
    if (lives === 0) {
        alert(`Game Over! Final Score: ${score}`);
        window.location.href = "index.html"; // Substitua "index.html" pela URL da sua página inicial
    }
}

function updateHUD() {
    scoreElement.innerText = score;
    
    // Update lives with hearts
    livesElement.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        livesElement.appendChild(heart);
    }
    // spawnInterval = Math.max(200, 2000 - score*10000);
    // clearInterval(spawnKarenIntervalId);
    // spawnKarens();
}
