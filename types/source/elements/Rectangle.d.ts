import Element from './Element.js';
export default class Rectangle extends Element {
    /**
    * The svg element
    */
    root: SVGRectElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x: number, y: number, width: number, height: number);
    fill: string;
    stroke: string;
    /**
    * Returns the x position of the rectangle
    */
    /**
    * Sets the x position of the rectangle
    */
    x: number;
    /**
    * Returns the y position of the rectangle
    */
    /**
    * Sets the y position of the rectangle
    */
    y: number;
    /**
    * Returns the width of the rectangle
    */
    /**
    * Sets the width of the rectangle
    */
    width: number;
    /**
    * Returns the height of the rectangle
    */
    /**
    * Sets the height of the rectangle
    */
    height: number;
    translate(x: number, y: number): void;
}
