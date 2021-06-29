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
    get x1(): number;
    /**
    * Sets the x position of the start position
    */
    set x1(x1: number);
    /**
    * Returns the y position of the start position
    */
    get y1(): number;
    /**
    * Sets the y position of the start position
    */
    set y1(y1: number);
    /**
    * Returns the x position of the end position
    */
    get x2(): number;
    /**
    * Sets the x position of the end position
    */
    set x2(x2: number);
    /**
    * Returns the y position of the end position
    */
    get y2(): number;
    /**
    * Sets the y position of the end position
    */
    set y2(y2: number);
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this line
    */
    get fill(): string;
    /**
    * Sets the fill style of this line
    */
    set fill(s: string);
    /**
    * Returns the stroke style of this line
    */
    get stroke(): string;
    /**
    * Sets the stroke style of this line
    */
    set stroke(s: string);
}
