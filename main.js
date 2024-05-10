import * as THREE from "../threejs/build/three.module.js";
import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from '../threejs/examples/jsm/utils/SkeletonUtils.js';

let elThreejs = document.getElementById("threejs");
let camera,scene,renderer;
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

    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
    ambient.position.set(0, 5, 0);
    scene.add(ambient);

    clock = new THREE.Clock();

    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0xf6d7b6); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;

    elThreejs.appendChild(renderer.domElement);


    await loadKaren();

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

function animate(){

    movePlayer();
    updateProjectiles();
    updateKarens();

    checkCollisions();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    const dt = clock.getDelta();
    for ( const mixer of mixers ) mixer.update( dt );
}

function addDoor() {
    // Moldura da porta
    const doorFrameGeometry = new THREE.BoxGeometry(10, 10, 0.2);
    const doorFrameMaterial = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 0, -90);
    scene.add(doorFrame);
	// Puxador esquerdo
    const handleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
    const handleMaterial = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 }); // Cinza escuro
    const handleLeft = new THREE.Mesh(handleGeometry, handleMaterial);
    handleLeft.position.set(-1, 0, -90);
    scene.add(handleLeft);

    // Puxador direito
    const handleRight = new THREE.Mesh(handleGeometry, handleMaterial);
    handleRight.position.set(1, 0, -90);
    scene.add(handleRight);
}


function addWindow() {
    // Vidro da janela
    const glassGeometry = new THREE.PlaneGeometry(4, 8);
    const glassMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6, transparent: true, opacity: 0.5 }); // Azul claro, transparente
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(30, 5, 0); // Posição na parede direita
	glass.rotation.z = Math.PI/2 -0.1;
    scene.add(glass);

    // // Moldura da janela
    // const frameGeometry = new THREE.BoxGeometry(5, 10, 0.2);
    // const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x804000 }); // Marrom escuro
    // const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    // frame.position.set(15, 0, 0); // Posição na parede direita
    // scene.add(frame);
}

function addPainting() {
    // Tela do quadro
    const paintingGeometry = new THREE.PlaneGeometry(4, 2);
    const paintingMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFE0 }); // Amarelo claro
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(-15, 10, 0); // Posição na parede esquerda
    scene.add(painting);

    // Moldura do quadro
    const frameGeometry = new THREE.BoxGeometry(5, 3, 0.2);
    const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Marrom
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(-15, 10, 0); // Posição na parede esquerda
    scene.add(frame);
}

function addLamp() {
    // Suporte do candeeiro
    const standGeometry = new THREE.CylinderGeometry(0.5, 0.5, 8, 32);
    const standMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Cinza
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, 4, -100); // Posição ao lado da porta
    scene.add(stand);

    // Lâmpada do candeeiro
    const bulbGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Amarelo
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0, 10, -100); // Posição ao lado da porta
    scene.add(bulb);
}



async function addPlayer(){
    const gltfLoader = new GLTFLoader().setPath( 'chef/' );
    const playerGLTF = await gltfLoader.loadAsync( 'scene.gltf' );
    playerMesh = playerGLTF.scene.children[0];
    playerMesh.rotation.z = Math.PI;
    playerMesh.scale.set(0.75, 0.75, 0.75);
    playerMesh.position.set(0, 0, 15);
    scene.add(playerMesh);

    camera.position.set(playerMesh.position.x, playerMesh.position.y + 5, playerMesh.position.z + 10);
    camera.lookAt(playerMesh.position);
}

function addPlane(){
    const texture = new THREE.TextureLoader().load( "floor/brownFloor.png" );
    const geometry = new THREE.BoxGeometry(200, 0, 300);
    const material = new THREE.MeshBasicMaterial({ map: texture, color: 0x333333 });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, -10, 0);
    scene.add(plane);
}

function addKeysListener(){
    window.addEventListener('keydown', function(event){
        keyboard[event.keyCode] = true;
    }, false);
    window.addEventListener('keyup', function(event){
        keyboard[event.keyCode] = false;
    }, false);

    window.addEventListener("keyup", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        if (event.keyCode == 32) {
            let projectileMeshClone = projectileMesh.clone();
            projectileMeshClone.position.x = playerMesh.position.x +3;
            projectileMeshClone.position.y = playerMesh.position.y;
            projectileMeshClone.position.z = playerMesh.position.z;
            scene.add(projectileMeshClone);
            projectileMeshes.push(projectileMeshClone);
        }
    });
}

function movePlayer(){
    if(keyboard[65] && playerMesh.position.x > -20) playerMesh.position.x -= 0.25;
    if(keyboard[68] && playerMesh.position.x < 20) playerMesh.position.x += 0.25;
}

async function addProjectile(){
    const gltfLoader = new GLTFLoader().setPath( 'rollingPin/' );
    const projectileGLTF = await gltfLoader.loadAsync( 'scene.gltf' );
    projectileMesh = projectileGLTF.scene;
    projectileMesh.scale.set(0.3, 0.3, 0.3);
}

async function loadKaren(){
    const gltfLoader = new GLTFLoader();
    
    womanGLTF = await gltfLoader.loadAsync('karen/female_cartoon_character/scene.gltf');
    const hairGLTF = await gltfLoader.loadAsync('karen/female_karen_hair/scene.gltf');
    
    const karenMesh = womanGLTF.scene;
    karenMesh.scale.set(2, 2, 2);
}

function addKaren(posX){
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

    karenMeshes.push(model1);
    scene.add(model1);
    mixers.push(mixer1);
}

function spawnKarens(){
    let randomX = Math.floor(Math.random() * 20) - 10;
    addKaren(randomX);
    setInterval(() => {
        randomX = Math.floor(Math.random() * 20) - 10;
        addKaren(randomX);
    }, 2000);
}

function updateKarens(){
    karenMeshes.forEach((karen, index) => {
        karen.position.z += 0.1;
        if(karen.position.z > 20){
            scene.remove(karen);
            karenMeshes.splice(index, 1);
        }
    });
}
  
function updateProjectiles(){
    projectileMeshes.forEach((projectile, index) => {
        projectile.position.z -= 0.5;
        if(projectile.position.z < -20){
            scene.remove(projectile);
            projectileMeshes.splice(index, 1);
        }
    });
}

function checkCollisions(){
    karenMeshes.forEach((karen, indexa) => {
        projectileMeshes.forEach((projectile, indexb) => {
            if( karen.position.x >= projectile.position.x - 2 &&
                karen.position.x <= projectile.position.x + 2 &&
                karen.position.z >= projectile.position.z - 2 &&
                karen.position.z <= projectile.position.z + 2){
                    scene.remove(karen);
                    karenMeshes.splice(indexa, 1);
                    scene.remove(projectile);
                    projectileMeshes.splice(indexb, 1);
            }
        });
    });
}