import {GUI as G} from 'dat.gui';

export class GUI {
    constructor(options) {
        this.options = options;
        this.main = new G();
    }

    addColor(key, object) {
        this.main.addColor(this.options, key).onChange((e) => {
            if (object.material.color) {
                object.material.color.set(e);
            }
        })
    }

    addToAll (key, objects)  {
        this.main.add(this.options, key).onChange((e) => {
            for (let k in objects) {
                objects[k].material[key] = e;
            }
        })
    }

    addSlider (key, min, max) {
        this.main.add(this.options, key, min, max);
    }
}