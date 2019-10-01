import Element from '../element.js';
/**
* An ellipse is a basic element with a position, x-radius, and y-radius
*/
export default class Ellipse extends Element {
    root: SVGEllipseElement;
    /**
    * Constructs a ellipse element at the position (cx,cy) with a rx and ry radius.
    */
    constructor(cx: number, cy: number, rx: number, ry: number);
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
    * Returns the width of the rectangle
    */
    /**
    * Sets the width of the rectangle
    */
    rx: number;
    /**
    * Returns the height of the rectangle
    */
    /**
    * Sets the height of the rectangle
    */
    ry: number;
    /**
    * Translates the ellipse to a new position by changing the x and y attributes.
    */
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this ellipse
    */
    /**
    * Sets the fill style of this ellipse
    */
    fill: string;
    /**
    * Returns the stroke style of this ellipse
    */
    /**
    * Sets the stroke style of this ellipse
    */
    stroke: string;
}
