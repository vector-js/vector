import SVG from '../svg.js';
import Element from './element.js';
/**
* An ellipse is a basic element with a position, x-radius, and y-radius
*/
export default class Ellipse extends Element {
    /**
    * Constructs a ellipse element at the position (cx,cy) with a rx and ry radius.
    */
    constructor(cx, cy, rx, ry) {
        let ellipse = SVG.Ellipse(cx, cy, rx, ry);
        super(ellipse);
    }
    /**
    * Returns the x position of the rectangle
    */
    get cx() {
        return this.root.cx.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set cx(n) {
        this.root.cx.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get cy() {
        return this.root.cy.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set cy(n) {
        this.root.cy.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get rx() {
        return this.root.rx.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set rx(n) {
        this.root.rx.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get ry() {
        return this.root.ry.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set ry(n) {
        this.root.ry.baseVal.value = n;
    }
    /**
    * Translates the ellipse to a new position by changing the x and y attributes.
    */
    translate(x, y) {
        this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
        this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
    }
    /**
    * Returns the fill style of this ellipse
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this ellipse
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this ellipse
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this ellipse
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=ellipse.js.map