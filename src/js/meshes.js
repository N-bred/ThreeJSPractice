import * as T from 'three';

export const Box = (props) => {
    return new T.Mesh(new T.BoxGeometry(), new T.MeshBasicMaterial(props));
}

export const Plane = (w, h, props) => {
    return new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial(props));
}

export const Sphere = (props) => {
    return new T.Mesh(new T.SphereGeometry(.5,10,10), new T.MeshBasicMaterial(props));
}

export const Icosahedron = (r, d, props) => {
    return new T.Mesh(new T.IcosahedronGeometry(r, d), new T.MeshBasicMaterial(props));
}