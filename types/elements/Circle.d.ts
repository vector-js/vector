import Element from './Element.js';
export default class Circle extends Element {
    root: SVGCircleElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx: number, cy: number, r: number);
    /**
    * Sets the value of the radius of this circle.
    */
    /**
    * Returns the radius of this circle.
    */
    r: number;
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
    translate(x: number, y: number): void;
}
