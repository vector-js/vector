import SVG from '../SVG.js';
import Element from './Element.js';
class Segment extends Element {
    constructor(command) {
        super();
    }
}
/**
*
*/
export default class Path extends Element {
    /**
    *
    */
    constructor(d) {
        super();
        this.root = SVG.Path(d);
        this.root.id = this.id;
    }
    extend(command) {
    }
    getPath(d) {
        return null;
    }
    set d(d) {
        this.root.setAttribute('d', d);
    }
    get d() {
        return this.root.getAttribute('d');
    }
}
