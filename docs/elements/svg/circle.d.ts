import Element from '../element.js';
/**
* A circle is a basic geometric element with a position and radius.
*
* properties:
*   - cx
*   - cy
*   - r
*/
export default class Circle extends Element {
    root: SVGCircleElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx: number, cy: number, r: number);
    /**
    * Returns the radius of this circle.
    */
    /**
    * Sets the value of the radius of this circle.
    */
    r: number;
    /**
    * Returns the x position of the rectangle
    */
    /**
    * Sets the x position of the rectangle
    */
    cx: number;
    /**
    * Returns the y position of the rectangle
    */
    /**
    * Sets the y position of the rectangle
    */
    cy: number;
    /**
    * Translates the circle to a new position by changing the x and y attributes.
    */
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this circle
    */
    /**
    * Sets the fill style of this circle
    */
    fill: string;
    /**
    * Returns the stroke style of this circle
    */
    /**
    * Sets the stroke style of this circle
    */
    stroke: string;
}
