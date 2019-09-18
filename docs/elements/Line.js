import SVG from '../svg.js';
import Element from './element.js';
/**
* A circle is a basic shape element with a start and end position.
*/
export default class Line extends Element {
    /**
    * Constructs a line between the points (x1, y1) and (x2, y2)
    */
    constructor(x1, y1, x2, y2) {
        super(SVG.Line(x1, y1, x2, y2));
    }
    /**
    * Returns the x position of the start position
    */
    get x1() {
        return this.root.x1.baseVal.value;
    }
    /**
    * Sets the x position of the start position
    */
    set x1(x1) {
        this.root.x1.baseVal.value = x1;
    }
    /**
    * Returns the y position of the start position
    */
    get y1() {
        return this.root.y1.baseVal.value;
    }
    /**
    * Sets the y position of the start position
    */
    set y1(y1) {
        this.root.y1.baseVal.value = y1;
    }
    /**
    * Returns the x position of the end position
    */
    get x2() {
        return this.root.x2.baseVal.value;
    }
    /**
    * Sets the x position of the end position
    */
    set x2(x2) {
        this.root.x2.baseVal.value = x2;
    }
    /**
    * Returns the y position of the end position
    */
    get y2() {
        return this.root.y2.baseVal.value;
    }
    /**
    * Sets the y position of the end position
    */
    set y2(y2) {
        this.root.y2.baseVal.value = y2;
    }
    /*
    * Translates the position of the line to a new position from its current
    * position. TODO: this is inconsistent with other translate methods within
    * the elements. Probably best to conform to how SVG implements translate with
    * the transform attribute, and then implement a move method or something.
    */
    translate(x, y) {
        this.root.x1.baseVal.value += x;
        this.root.y1.baseVal.value += y;
        this.root.x2.baseVal.value += x;
        this.root.y2.baseVal.value += y;
    }
    /**
    * Returns the fill style of this line
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this line
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this line
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this line
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=line.js.map