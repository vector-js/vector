import Element from '../element.js';
/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Element {
    root: SVGPathElement;
    /**
    * Construct a new path element with a string of commands.
    */
    constructor(d: string);
    /**
    * Returns the d attribute
    */
    /**
    * Sets the d attribute
    */
    d: string;
    /**
    * Returns the location of the point on the path.
    */
    getPointAtLength(x: number): DOMPoint;
    /**
    * Returns the total length of this path.
    */
    getTotalLength(): number;
}
