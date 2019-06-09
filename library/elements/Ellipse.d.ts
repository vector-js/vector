import Element from './Element.js';
export default class Ellipse extends Element {
    root: SVGEllipseElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx: number, cy: number, rx: number, ry: number);
    fill: string;
    stroke: string;
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
    translate(x: number, y: number): void;
}
