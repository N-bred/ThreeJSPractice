import {GUI} from 'dat.gui';

export const main = new GUI();

export const options = {
    sphereColor: "#ffea00",
    boxColor: "#00aaee",
    icosahedronColor: "#ae86ea",
    wireframe: false,
    boxSpeed: 0.1
}

export const results = {
    boxSpeed: 0
}

export const addColor = (options, key, object) => {
    main.addColor(options, key).onChange((e) => {
        if (object.material.color) {
            object.material.color.set(e);
        }
    })
}

export const addToAll = (options, key, objects) => {
    main.add(options, key).onChange((e) => {
        for (let k in objects) {
            objects[k].material[key] = e;
        }
    })
}

export const addSlider = (options, key, min, max, object) => {
    main.add(options, key, min, max);
}

