import Shape from './shape.js';
/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Shape {
    root: any | SVGGeometryElement | SVGPathElement;
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
    * Returns the path representation of the provided shape.
    */
    static getPath(shape: Shape): Path;
}
