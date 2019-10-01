import ControlCircle from './control-circle.js';
import Input from './input.js';
/**
* A horizontal slider is an object that allows for a control to be moved along
* a user- defined range. The slider has a minimum value and a maximum value
* which default to the range [0, 100].
*/
export default class Slider extends Input {
    /**
    * Constructs the slider at the position (x,y). The leftmost edge of the line
    * is placed at this location.
    */
    constructor(x, y, width = 100, value = 0) {
        super();
        this._line = this.line(x, y, x + width, y);
        this._line.root.style.strokeWidth = '1.5';
        this._line.root.style.strokeLinecap = 'round';
        this._control = new ControlCircle(x + value, y);
        this._control.constrainWithinBox(x, y, x + width, y);
        this._control.point.r -= 1.5;
        this._control.handle.r -= 2;
        this._control.handle.style.strokeWidth = '2';
        this.appendChild(this._control);
        this.width = width;
        this.min = 0;
        this.max = 100;
        this.value = value;
        let slider = this;
        let fn = slider._control.onchange;
        slider._control.onchange = function () {
            fn();
            slider.onchange();
        };
    }
    /**
    * Returns the width of the display line
    */
    get width() {
        return this._line.x2 - this._line.x1;
    }
    /**
    * Sets the width of the display line
    */
    set width(width) {
        this._line.x2 = this._line.x1 + width;
        this._control.constrainWithinBox(this._line.x1, this._line.y1, this._line.x2, this._line.y2);
    }
    /**
    * Returns the value currently represented by this slider.
    */
    get value() {
        return (this._control.x - this._line.x1) / this.width * (this.range);
    }
    /**
    * Sets the value currently represented by this slider.
    */
    set value(n) {
        this._control.x = this._line.x1 + n / this.range * (this.width);
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
//# sourceMappingURL=slider.js.map