import {GUI} from 'dat.gui';

export const main = new GUI();

export const options = {
    sphereColor: "#ffea00",
    boxColor: "#00aaee",
    wireframe: false
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


