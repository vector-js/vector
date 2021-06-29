import { CoreAttributes } from './element.js';
import Shape, { ShapeAttributes } from './shape.js';
declare type RectangleAttributes = 'rx' | 'ry';
/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
export default class Rectangle extends Shape {
    root: SVGRectElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x: number, y: number, width: number, height: number);
    setAttribute(name: RectangleAttributes | ShapeAttributes | CoreAttributes, value: string): Rectangle;
    getAttribute(name: RectangleAttributes | ShapeAttributes | CoreAttributes): string;
    /**
    * Returns the x position of the rectangle
    */
    get x(): number;
    /**
    * Sets the x position of the rectangle
    */
    set x(n: number);
    /**
    * Returns the y position of the rectangle
    */
    get y(): number;
    /**
    * Sets the y position of the rectangle
    */
    set y(n: number);
    /**
    * Returns the width of the rectangle
    */
    get width(): number;
    /**
    * Sets the width of the rectangle
    */
    set width(n: number);
    /**
    * Returns the height of the rectangle
    */
    get height(): number;
    /**
    * Sets the height of the rectangle
    */
    set height(n: number);
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this rectangle
    */
    get fill(): string;
    /**
    * Sets the fill style of this rectangle
    */
    set fill(s: string);
    /**
    * Returns the stroke style of this rectangle
    */
    get stroke(): string;
    /**
    * Sets the stroke style of this rectangle
    */
    set stroke(s: string);
}
export {};
