import { CONSTANTS as C } from './main';
import * as T from 'three';
import { GUI as G } from './gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Box, Plane, Sphere, Icosahedron } from './meshes';

// Scene Cameras

const SC = {
    camera: new T.PerspectiveCamera(C.FOV, C.W / C.H, C.NEAR, C.FAR)
}

// Scene Objects

const SO = {
    box: Box({ color: T.Color.NAMES.purple }),
    icosahedron: Icosahedron(2, 1, { color: T.Color.NAMES.salmon, flatShading: true }),
    sphere: Sphere({ color: T.Color.NAMES.yellow }),
    plane: Plane(3, 3, { color: T.Color.NAMES.white }),
    axisHelper: new T.AxesHelper(3),
    gridHelper: new T.GridHelper(),
};

// Scene Lights

const SL = {
    hemi: new T.HemisphereLight(0xffffff, 0x000000)
}

// SETUP

const SCENE = new T.Scene();

const RENDERER = new T.WebGLRenderer({ alpha: false, antialias: true });

RENDERER.setPixelRatio(window.devicePixelRatio);

const ORBIT = new OrbitControls(SC.camera, RENDERER.domElement);

let cameraPosition = new T.Vector3(0, 0, 2);

RENDERER.setSize(C.W, C.H);

ORBIT.listenToKeyEvents(window);

SCENE.add(SO.axisHelper);

SC.camera.position.set(...cameraPosition);

ORBIT.update();

document.body.appendChild(RENDERER.domElement);


// Scene Work

// Lights

SCENE.add(SL.hemi);

// Materials, Geometries, Etc

SCENE.add(SO.box);
SCENE.add(SO.sphere);
SO.sphere.position.x = 2;

// SCENE.add(SO.plane);
// SO.plane.position.set(...new T.Vector3(0,0,0));
// SO.plane.rotation.x = -0.5 * Math.PI;

SCENE.add(SO.gridHelper);

SCENE.add(SO.icosahedron);
SO.icosahedron.position.set(...[4, 2, 0])

// GUI

const GUI = new G(C.GUI_OPTIONS);

GUI.addColor('sphereColor', SO.sphere)
GUI.addColor('boxColor', SO.box);
GUI.addColor('icosahedronColor', SO.icosahedron)
GUI.addToAll('wireframe', [SO.box, SO.sphere, SO.icosahedron])
GUI.addSlider('boxSpeed', 0, 10)
GUI.addSlider('animationDelay', 0, 0.1, 0.001)

// Render

function animate(t = 0) {
    SO.box.rotation.x = (t / 1000) * GUI.options.boxSpeed;
    SO.box.rotation.y = (t / 1000) * GUI.options.boxSpeed;
    SO.box.position.z = (Math.cos(t * GUI.options.animationDelay) + GUI.options.animationDelay);
    SO.plane.rotation.z += 0.001;
    RENDERER.render(SCENE, SC.camera);

}

// Events

const handleWASDCameraMovement = (key) => {
    const keyMapping = {
        "w": ["z", -1],
        "s": ["z", 1],
        "a": ["x", -1],
        "d": ["x", 1],
        "q": ["y", 1],
        "e": ["y", -1],
    }
    if (keyMapping[key] == null) return;
    const [name, value] = keyMapping[key];
    SC.camera.position[name] += value;
}

document.addEventListener('keydown', (e) => {
    handleWASDCameraMovement(e.key);
})


window.addEventListener('resize', (e) => {
    C.H = window.innerHeight;
    C.W = window.innerWidth;
    RENDERER.setSize(C.W, C.H);
    RENDERER.setPixelRatio(window.devicePixelRatio);
})

RENDERER.setAnimationLoop(animate);