// Many thing are controlled directly by THREE JS, 
// it would be good to have some post processed instances.

// Theres an Axis Helper
// new THREE.AxesHelper(3);

// There are some controls for the camera
// new OrbitControl

// There's Ortographic and Perspective Cameras
// new THREE.OrthographicCamera
// new THREE.PerspectiveCamera

// There's a Grid Helper
// new THREE.GridHelper();

import * as T from 'three';

export const Box = (props) => {
    return new T.Mesh(new T.BoxGeometry(), new T.MeshBasicMaterial(props));
}

export const Plane = (props, w, h) => {
    return new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial(props));
}

export const Sphere = (props) => {
    return new T.Mesh(new T.SphereGeometry(.5,10,10), new T.MeshBasicMaterial(props));
}
