
import * as T from 'three';
import {GUI} from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Box, Plane, Sphere } from './uses';


const H = window.innerHeight;
const W = window.innerWidth;

const renderer = new T.WebGLRenderer();

renderer.setSize(W, H);

document.body.appendChild(renderer.domElement);

const scene = new T.Scene();
const light = new T.Light();

const camera = new T.PerspectiveCamera(75, W/H, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.listenToKeyEvents(window)

const axisHelper = new T.AxesHelper(3);

scene.add(axisHelper);

const cameraPosition = new T.Vector3(0, 0, 2);

orbit.update();

camera.position.set(...cameraPosition);

// Materials, Geometries, Etc

const sceneObjects = {
    box:Box({color: T.Color.NAMES.purple}),
    sphere:Sphere({ color:T.Color.NAMES.yellow})
};


scene.add(sceneObjects.box);
scene.add(sceneObjects.sphere);
sceneObjects.sphere.position.x = 2;


const plane = Plane({color: 0xffffff}, 3, 3);
plane.position.set(...new T.Vector3(0,0,0));
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);


const gridHelper = new T.GridHelper();
scene.add(gridHelper);

const gui = new GUI();

const options = {
    sphereColor: "#ffea00",
    boxColor: "#00aaee",
    wireframe: false
}


gui.addColor(options, 'sphereColor').onChange((e) => {
    sceneObjects.sphere.material.color.set(e);
})

gui.addColor(options, 'boxColor').onChange((e) => {
    sceneObjects.box.material.color.set(e);
})

gui.add(options, 'wireframe').onChange((e) => {
    sceneObjects.box.material.wireframe = e;
    sceneObjects.sphere.material.wireframe = e;
})

function animate(t) {
    sceneObjects.box.rotation.x = t / 1000;
    sceneObjects.box.rotation.y = t / 1000;
    plane.rotation.z += 0.001;
    renderer.render(scene, camera);
}

// Render

renderer.setAnimationLoop(animate);