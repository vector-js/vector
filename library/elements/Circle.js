import Ellipse from './Ellipse.js';
export default class Circle extends Ellipse {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, r) {
        super(cx, cy, r, r);
    }
    /**
    * Sets the value of the radius of this circle.
    */
    set r(value) {
        this.rx = value;
        this.rx = value;
    }
    /**
    * Returns the radius of this circle.
    */
    get r() {
        return this.rx;
    }
}
