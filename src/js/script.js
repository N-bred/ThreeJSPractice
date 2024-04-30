
import * as T from 'three';
import * as GUI from './gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Box, Plane, Sphere } from './meshes';

const H = window.innerHeight;
const W = window.innerWidth;
const FOV = 75;
const near = 0.1;
const far = 1000;

// Scene Cameras
const SC = {
    camera: new T.PerspectiveCamera(FOV, W/H, near, far)
}

// Scene Objects
const SO = {
    box: Box({ color: T.Color.NAMES.purple }),
    sphere: Sphere({ color: T.Color.NAMES.yellow }),
    plane: Plane({ color: T.Color.NAMES.white }, 3, 3),
    axisHelper: new T.AxesHelper(3),
    gridHelper: new T.GridHelper(),
};

// SETUP

const SCENE = new T.Scene();

const RENDERER = new T.WebGLRenderer();

const ORBIT = new OrbitControls(SC.camera, RENDERER.domElement);

const cameraPosition = new T.Vector3(0, 0, 2);

RENDERER.setSize(W, H);

ORBIT.listenToKeyEvents(window);

SCENE.add(SO.axisHelper);

SC.camera.position.set(...cameraPosition);

ORBIT.update();

document.body.appendChild(RENDERER.domElement);


// Scene Work

// Materials, Geometries, Etc

SCENE.add(SO.box);
SCENE.add(SO.sphere);
SO.sphere.position.x = 2;

SCENE.add(SO.plane);
SO.plane.position.set(...new T.Vector3(0,0,0));
SO.plane.rotation.x = -0.5 * Math.PI;

SCENE.add(SO.gridHelper);

// GUI

GUI.addColor(GUI.options, 'sphereColor', SO.sphere)
GUI.addColor(GUI.options, 'boxColor', SO.box);
GUI.addToAll(GUI.options, 'wireframe', [SO.box, SO.sphere])

// Render

function animate(t) {
    SO.box.rotation.x = t / 1000;
    SO.box.rotation.y = t / 1000;
    SO.plane.rotation.z += 0.001;
    RENDERER.render(SCENE, SC.camera);
}

RENDERER.setAnimationLoop(animate);