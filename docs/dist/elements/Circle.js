import Element from './Element.js';
import SVG from '../SVG.js';
/**
* A circle is a basic element with a position and radius.
*/
export default class Circle extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, r) {
        super();
        this.root = SVG.Circle(cx, cy, r);
        this.root.classList.add('default');
        this.root.id = this.id;
    }
    /**
    * Returns the radius of this circle.
    */
    get r() {
        return this.root.r.baseVal.value;
    }
    /**
    * Sets the value of the radius of this circle.
    */
    set r(value) {
        this.root.r.baseVal.value = value;
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
    * Translates the circle to a new position by changing the x and y attributes.
    */
    translate(x, y) {
        this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
        this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
    }
    /**
    * Returns the fill style of this circle
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this circle
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this circle
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this circle
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2lyY2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2VsZW1lbnRzL0NpcmNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxjQUFjLENBQUM7QUFDbkMsT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDO0FBRTVCOztFQUVFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsT0FBTztJQUt6Qzs7TUFFRTtJQUNGLFlBQWEsRUFBUyxFQUFFLEVBQVMsRUFBRSxDQUFRO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxDQUFDO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksQ0FBQyxDQUFFLEtBQVk7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksRUFBRSxDQUFFLENBQVE7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEVBQUU7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFLENBQUUsQ0FBUTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7TUFFRTtJQUNGLFNBQVMsQ0FBQyxDQUFRLEVBQUUsQ0FBUTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBUTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTSxDQUFDLENBQVM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YifQ==