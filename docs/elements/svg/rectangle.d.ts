import Element from '../element.js';
/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
export default class Rectangle extends Element {
    root: SVGRectElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x: number, y: number, width: number, height: number);
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
    /**
    * Returns the fill style of this rectangle
    */
    /**
    * Sets the fill style of this rectangle
    */
    fill: string;
    /**
    * Returns the stroke style of this rectangle
    */
    /**
    * Sets the stroke style of this rectangle
    */
    stroke: string;
}
