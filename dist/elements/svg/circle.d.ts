import Shape from './shape.js';
import Path from './path.js';
/**
* A circle is a basic geometric element with a position and radius.
*
* Geometric Properties:
*   - cx
*   - cy
*   - r
*/
export default class Circle extends Shape {
    root: SVGCircleElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx: number, cy: number, r: number);
    /**
    * Returns the radius of this circle.
    */
    get r(): number;
    /**
    * Sets the value of the radius of this circle.
    */
    set r(value: number);
    /**
    * Returns the x position of the rectangle
    */
    get cx(): number;
    /**
    * Sets the x position of the rectangle
    */
    set cx(n: number);
    /**
    * Returns the y position of the rectangle
    */
    get cy(): number;
    /**
    * Sets the y position of the rectangle
    */
    set cy(n: number);
    getPath(): Path;
    /**
    * Translates the circle to a new position by changing the x and y attributes.
    */
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this circle
    */
    get fill(): string;
    /**
    * Sets the fill style of this circle
    */
    set fill(s: string);
    /**
    * Returns the stroke style of this circle
    */
    get stroke(): string;
    /**
    * Sets the stroke style of this circle
    */
    set stroke(s: string);
}
