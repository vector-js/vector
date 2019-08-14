import SVG from '../SVG.js';
import Line from '../elements/Line.js';
import Element from '../elements/Element.js';
import ControlCircle from './ControlCircle.js';
/**
* A horizontal slider is an object that allows for a control to be moved along
* a user- defined range. The slider has a minimum value and a maximum value
* which default to the range [0, 100].
*/
export default class Slider extends Element {
    /**
    * Constructs the slider at the position (x,y). The leftmost edge of the line
    * is placed at this location.
    */
    constructor(x, y, width = 100, value = 0) {
        super();
        this.root = SVG.Group();
        this.line = new Line(x, y, x + width, y);
        this.line.root.style.strokeWidth = '1.5';
        this.line.root.style.strokeLinecap = 'round';
        this.control = new ControlCircle(x + value, y);
        this.control.constrainWithinBox(x, y, x + width, y);
        this.control.point.r.baseVal.value -= 1.5;
        this.control.handle.r.baseVal.value -= 2;
        this.control.handle.style.strokeWidth = '2';
        this.root.appendChild(this.line.root);
        this.root.appendChild(this.control.root);
        this.root.id = this.id;
        this.update = () => { };
        this.addDependency(this.control);
        this.width = width;
        this.min = 0;
        this.max = 100;
        this.value = value;
    }
    /**
    * Returns the width of the display line
    */
    get width() {
        return this.line.x2 - this.line.x1;
    }
    /**
    * Sets the width of the display line
    */
    set width(width) {
        this.line.x2 = this.line.x1 + width;
        this.control.constrainWithinBox(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
    }
    /**
    * Returns the value currently represented by this slider.
    */
    get value() {
        return (this.control.x - this.line.x1) / this.width * (this.range);
    }
    /**
    * Sets the value currently represented by this slider.
    */
    set value(n) {
        this.control.x = this.line.x1 + n / this.range * (this.width);
    }
    /**
    * Returns the minimum possible value of the range.
    */
    get min() {
        return this._min;
    }
    /**
    * Sets the minimum possible value of the range.
    */
    set min(value) {
        this._min = value;
    }
    /**
    * Returns the maximum possible value of the range.
    */
    get max() {
        return this._max;
    }
    /**
    * Returns the maximum possible value of the range.
    */
    set max(value) {
        this._max = value;
    }
    /**
    * Returns the length of the range represented by this slider.
    */
    get range() {
        return this.max - this.min;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2lucHV0L1NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUM7QUFFNUIsT0FBTyxJQUFJLE1BQU0scUJBQXFCLENBQUM7QUFDdkMsT0FBTyxPQUFPLE1BQU0sd0JBQXdCLENBQUM7QUFDN0MsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFFL0M7Ozs7RUFJRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLE9BQU87SUFnQnpDOzs7TUFHRTtJQUNGLFlBQWEsQ0FBUSxFQUFFLENBQVEsRUFBRSxRQUFhLEdBQUcsRUFBRSxRQUFhLENBQUM7UUFDL0QsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUU3QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEtBQUssQ0FBRSxLQUFZO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxLQUFLO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEtBQUssQ0FBRSxDQUFRO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEdBQUcsQ0FBRSxLQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEdBQUcsQ0FBRSxLQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQzdCLENBQUM7Q0FDRiJ9