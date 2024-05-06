
import * as T from 'three';
import * as GUI from './gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Box, Plane, Sphere, Icosahedron } from './meshes';

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
    icosahedron: Icosahedron(2, 0, {color: T.Color.NAMES.salmon}),
    sphere: Sphere({ color: T.Color.NAMES.yellow }),
    plane: Plane(3, 3, { color: T.Color.NAMES.white }),
    axisHelper: new T.AxesHelper(3),
    gridHelper: new T.GridHelper(),
};

// SETUP

const SCENE = new T.Scene();

const RENDERER = new T.WebGLRenderer({alpha: false, antialias: true});
RENDERER.setPixelRatio(window.devicePixelRatio);

const ORBIT = new OrbitControls(SC.camera, RENDERER.domElement);

let cameraPosition = new T.Vector3(0, 0, 2);

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

// SCENE.add(SO.plane);
// SO.plane.position.set(...new T.Vector3(0,0,0));
// SO.plane.rotation.x = -0.5 * Math.PI;

SCENE.add(SO.gridHelper);

SCENE.add(SO.icosahedron);
SO.icosahedron.position.set(...[4,2,0])

// GUI

GUI.addColor(GUI.options, 'sphereColor', SO.sphere)
GUI.addColor(GUI.options, 'boxColor', SO.box);
GUI.addColor(GUI.options, 'icosahedronColor', SO.icosahedron)
GUI.addToAll(GUI.options, 'wireframe', [SO.box, SO.sphere, SO.icosahedron])
GUI.addSlider(GUI.options, 'boxSpeed', 0, 10, SO.box)
// Render

function animate(t) {
    SO.box.rotation.x = (t / 1000) * GUI.options.boxSpeed;
    SO.box.rotation.y = (t / 1000) * GUI.options.boxSpeed;
    SO.box.position.z = (Math.sin(t/1000) * GUI.options.boxSpeed) / 5;
    SO.plane.rotation.z += 0.001;
    RENDERER.render(SCENE, SC.camera);
}

RENDERER.setAnimationLoop(animate);