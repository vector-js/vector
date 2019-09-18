import SVG from '../svg.js';
import Element from './element.js';
/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
export default class Rectangle extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x, y, width, height) {
        super(SVG.Rectangle(x, y, width, height));
    }
    /**
    * Returns the x position of the rectangle
    */
    get x() {
        return this.root.x.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set x(n) {
        this.root.x.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get y() {
        return this.root.y.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set y(n) {
        this.root.y.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get width() {
        return this.root.width.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set width(n) {
        this.root.width.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get height() {
        return this.root.height.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set height(n) {
        this.root.height.baseVal.value = n;
    }
    /*
    * Translates the position of the rectangle to a new position from its current
    * position. TODO: this is inconsistent with other translate methods within
    * the elements. Probably best to conform to how SVG implements translate with
    * the transform attribute, and then implement a move method or something.
    */
    translate(x, y) {
        this.root.x.baseVal.value = this.root.x.baseVal.value + x;
        this.root.y.baseVal.value = this.root.y.baseVal.value + y;
    }
    /**
    * Returns the fill style of this rectangle
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this rectangle
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this rectangle
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this rectangle
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=rectangle.js.map