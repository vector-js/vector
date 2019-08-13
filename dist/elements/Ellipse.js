import SVG from '../SVG.js';
import Element from './Element.js';
/**
* An ellipse is a basic element with a position, x-radius, and y-radius
*/
export default class Ellipse extends Element {
    /**
    * Constructs a ellipse element at the position (x,y)
    */
    constructor(cx, cy, rx, ry) {
        super();
        this.root = SVG.Ellipse(cx, cy, rx, ry);
        this.root.classList.add('default');
        this.root.id = this.id;
        this.style = this.root.style;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxsaXBzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbGVtZW50cy9FbGxpcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUM1QixPQUFPLE9BQU8sTUFBTSxjQUFjLENBQUM7QUFFbkM7O0VBRUU7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLE9BQVEsU0FBUSxPQUFPO0lBSzFDOztNQUVFO0lBQ0YsWUFBYSxFQUFTLEVBQUUsRUFBUyxFQUFFLEVBQVMsRUFBRSxFQUFTO1FBQ3RELEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksRUFBRSxDQUFFLENBQVE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksRUFBRSxDQUFFLENBQVE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksRUFBRSxDQUFFLENBQVE7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEVBQUU7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFLENBQUUsQ0FBUTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7TUFFRTtJQUNGLFNBQVMsQ0FBQyxDQUFRLEVBQUUsQ0FBUTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBUTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTSxDQUFDLENBQVM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YifQ==