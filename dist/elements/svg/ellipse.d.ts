import Shape from './shape.js';
/**
* An ellipse is a basic element with a position, x-radius, and y-radius
*
* Geometric Properties:
*   - cx
*   - cy
*   - rx
*   - ry
*/
export default class Ellipse extends Shape {
    root: SVGEllipseElement;
    /**
    * Constructs a ellipse element at the position (cx,cy) with a rx and ry radius.
    */
    constructor(cx: number, cy: number, rx: number, ry: number);
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
    /**
    * Returns the width of the rectangle
    */
    get rx(): number;
    /**
    * Sets the width of the rectangle
    */
    set rx(n: number);
    /**
    * Returns the height of the rectangle
    */
    get ry(): number;
    /**
    * Sets the height of the rectangle
    */
    set ry(n: number);
    /**
    * Translates the ellipse to a new position by changing the x and y attributes.
    */
    translate(x: number, y: number): void;
    /**
    * Returns the fill style of this ellipse
    */
    get fill(): string;
    /**
    * Sets the fill style of this ellipse
    */
    set fill(s: string);
    /**
    * Returns the stroke style of this ellipse
    */
    get stroke(): string;
    /**
    * Sets the stroke style of this ellipse
    */
    set stroke(s: string);
}
