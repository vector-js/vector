import Element from '../element.js';
/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Element {
    /**
    * Construct a new path element with a string of commands.
    */
    constructor(d) {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        super(path);
    }
    /**
    * Returns the d attribute
    */
    get d() {
        return this.root.getAttribute('d');
    }
    /**
    * Sets the d attribute
    */
    set d(d) {
        this.root.setAttribute('d', d);
    }
    /**
    * Returns the location of the point on the path.
    */
    getPointAtLength(x) {
        return this.root.getPointAtLength(x);
    }
    /**
    * Returns the total length of this path.
    */
    getTotalLength() {
        return this.root.getTotalLength();
    }
}
//# sourceMappingURL=path.js.map