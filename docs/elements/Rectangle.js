import SVG from '../SVG.js';
import Element from './Element.js';
/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
export default class Rectangle extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x, y, width, height) {
        super();
        this.root = SVG.Rectangle(x, y, width, height);
        this.root.id = this.id;
        this.style = this.root.style;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2VsZW1lbnRzL1JlY3RhbmdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUM7QUFDNUIsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBRW5DOzs7RUFHRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLE9BQU87SUFLNUM7O01BRUU7SUFDRixZQUFhLENBQVEsRUFBRSxDQUFRLEVBQUUsS0FBWSxFQUFFLE1BQWE7UUFDMUQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLENBQUMsQ0FBRSxDQUFRO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksQ0FBQyxDQUFFLENBQVE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxLQUFLLENBQUUsQ0FBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxNQUFNLENBQUUsQ0FBUTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFDRixTQUFTLENBQUMsQ0FBUSxFQUFFLENBQVE7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksSUFBSSxDQUFDLENBQVE7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTSxDQUFDLENBQVM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0YifQ==