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
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = -10;
	// camera.position.z = 0;
	camera.position.y = 20;
  
	// rotate camera to see the scene from the top
	camera.rotation.x = -Math.PI / 2;

	const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
	ambient.position.set(0, 5, 0);
	scene.add(ambient);
  
	clock = new THREE.Clock();

  // render
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.outputEncoding = THREE.sRGBEncoding;


	// axesHelper = new THREE.AxesHelper( 100 );
	// scene.add( axesHelper );

	elThreejs.appendChild(renderer.domElement);

	await loadKaren();

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


	// collision detection between projectileMeshes and animalMeshes
	checkCollisions();

	renderer.render(scene, camera);
	requestAnimationFrame(animate);

	const dt = clock.getDelta();
	for ( const mixer of mixers ) mixer.update( dt );
}

async function addPlayer(){
	const gltfLoader = new GLTFLoader().setPath( 'chef/' );
	const playerGLTF = await gltfLoader.loadAsync( 'scene.gltf' );
	playerMesh = playerGLTF.scene.children[0];
	// playerMesh.position.set(0, 0, 0); // default
    playerMesh.rotation.z = Math.PI;
	playerMesh.scale.set(0.75,0.75,0.75)
	scene.add(playerMesh);
}


function addPlane(){
	const texture = new THREE.TextureLoader().load( "floor/brownFloor.png" );
	let geometry =  new THREE.BoxGeometry(60, 0, 35);
	let material = new THREE.MeshBasicMaterial({map: texture, color: 0x333333});
	let plane = new THREE.Mesh(geometry, material);
	plane.position.set(0, 0, -10);
	scene.add(plane);
  }


function addKeysListener(){
	window.addEventListener('keydown', function(event){
	  keyboard[event.keyCode] = true;
	} , false);
	window.addEventListener('keyup', function(event){
	  keyboard[event.keyCode] = false;
	} , false);

	window.addEventListener("keyup", (event) => {
		// boiler plate code to prevent side effects
		if (event.isComposing || event.keyCode === 229) {
		  return;
		}
	
		// space bar 
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
	// left letter A
	if(keyboard[65] && playerMesh.position.x > -25) playerMesh.position.x -= 0.25;
	// right letter D
	if(keyboard[68] && playerMesh.position.x < 20) playerMesh.position.x += 0.25;
}


async function addProjectile(){
	const gltfLoader = new GLTFLoader().setPath( 'rollingPin/' );
	const projectileGLTF = await gltfLoader.loadAsync( 'scene.gltf' );
	projectileMesh = projectileGLTF.scene;
	projectileMesh.scale.set(0.3, 0.3, 0.3);
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

async function loadKaren(){
	const gltfLoader = new GLTFLoader();
    
    // Carregar o modelo 3D da mulher
    womanGLTF = await gltfLoader.loadAsync('karen/female_cartoon_character/scene.gltf');
    
    // Carregar o modelo 3D do cabelo
    const hairGLTF = await gltfLoader.loadAsync('karen/female_karen_hair/scene.gltf');
    
    // Adicionar o modelo da mulher à cena
    const karenMesh = womanGLTF.scene;
    karenMesh.scale.set(2, 2, 2);
    // scene.add(karenMesh);

    // // Adicionar o modelo do cabelo como filho do modelo da mulher
    // const hairModel = hairGLTF.scene;
    // hairModel.scale.set(10, 10, 10);
    // womanModel.add(hairModel);
}


function addKaren(posX){
	let model1 = SkeletonUtils.clone(womanGLTF.scene);

    let animations = {};
    womanGLTF.animations.forEach(animation => {
        animations[animation.name] = animation;
    });

    const mixer1 = new THREE.AnimationMixer(model1);
    const actualAnimation = animations["mixamorig_KarenAnimation"]; // Verifique o nome da animação no seu arquivo GLTF
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
	// random number between -20 and 20
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
		if(karen.position.z > 0){
		  scene.remove(karen);
		  karenMeshes.splice(index, 1);
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