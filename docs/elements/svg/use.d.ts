import Element from './element.js';
export default class Use extends Element {
    root: SVGUseElement;
    constructor(x: number, y: number, width: number, height: number);
    get href(): string;
    set href(value: string);
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
}
