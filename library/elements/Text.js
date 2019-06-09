import SVG from '../SVG.js';
import Element from './Element.js';
/**
*
*/
export default class Text extends Element {
    /**
    *
    */
    constructor(x, y, text) {
        super();
        this.root = SVG.Text(x, y, text);
        this.root.id = this.id;
    }
    set contents(str) {
        this.root.innerHTML = str;
    }
    set x(value) {
        this.root.setAttribute('x', value.toString());
    }
    set y(value) {
        this.root.setAttribute('y', value.toString());
    }
}
