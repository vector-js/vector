import Shape from './shape.js';
/**
* A circle is a basic shape element with a start and end position.
*
* Geometric Properties:
*   - x1
*   - y1
*   - x2
*   - y2
*/
export default class Line extends Shape {
    root: SVGLineElement;
    /**
    * Constructs a line between the points (x1, y1) and (x2, y2)
    */
    constructor(x1: number, y1: number, x2: number, y2: number);
    /**
    * Returns the x position of the start position
    */
    /**
    * Sets the x position of the start position
    */
    x1: number;
    /**
    * Returns the y position of the start position
    */
    /**
    * Sets the y position of the start position
    */
    y1: number;
    /**
    * Returns the x position of the end position
    */
    /**
    * Sets the x position of the end position
    */
    x2: number;
    /**
    * Returns the y position of the end position
    */
    /**
    * Sets the y position of the end position
    */
    y2: number;
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this line
    */
    /**
    * Sets the fill style of this line
    */
    fill: string;
    /**
    * Returns the stroke style of this line
    */
    /**
    * Sets the stroke style of this line
    */
    stroke: string;
}
