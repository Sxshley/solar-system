import './style.css'

import * as THREE from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const sunTexture = new THREE.TextureLoader().load('images/suntexture.jpg');
const earthTexture = new THREE.TextureLoader().load('images/earthtextyre.jpg');
const mercuryTexture = new THREE.TextureLoader().load('images/mercurytexture.jpg');
const venusTexture = new THREE.TextureLoader().load('images/venustexture.jpg');
const marsTexture = new THREE.TextureLoader().load('images/marstexture.jpg');

const geometry = new THREE.SphereGeometry( 10, 64, 32) //10 , 10, 10, 100
const material = new THREE.MeshStandardMaterial({map: sunTexture});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

/*
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
*/
const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){ 
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color : 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
    star.position.set(x, y, z);
    scene.add(star)
}

Array(350).fill().forEach(addStar)

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(4, 64, 32),
    new THREE.MeshBasicMaterial({map:earthTexture})
);
const earthOBJ = new THREE.Object3D();
earthOBJ.add(earth);
scene.add(earthOBJ);
earth.position.x += 70;

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(2, 64, 32),
    new THREE.MeshBasicMaterial({map:mercuryTexture})
);
const mercuryOBJ = new THREE.Object3D();
mercuryOBJ.add(mercury);
scene.add(mercuryOBJ);
mercury.position.x += 22.5;

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 64, 32),
    new THREE.MeshBasicMaterial({map:venusTexture})
);
const venusOBJ = new THREE.Object3D();
venusOBJ.add(venus);
scene.add(venusOBJ);
venus.position.x += 47.5;

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(3.75, 64, 32),
    new THREE.MeshBasicMaterial({map:marsTexture})
);
const marsOBJ = new THREE.Object3D();
marsOBJ.add(mars);
scene.add(marsOBJ);
mars.position.x += 95;

const spaceTexture = new THREE.TextureLoader().load('images/spacetexturejpg.jpg');
scene.background = spaceTexture;

function animate(){
    requestAnimationFrame(animate);
    /*
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    */
    torus.rotation.y += 0.005; //sun rotation 0.025

    earth.rotation.y += 0.025;
    earthOBJ.rotation.y += 0.025;

    mercury.rotation.y += 0.05;
    mercuryOBJ.rotation.y += 0.05;

    venus.rotation.y += 0.03;
    venusOBJ.rotation.y += 0.03;

    mars.rotation.y += 0.0225;
    marsOBJ.rotation.y += 0.0225;

    controls.update();

    renderer.render(scene,camera);
}

animate()