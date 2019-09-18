import SVG from '../svg.js';
import Control from './control.js';
import Line from '../elements/line.js';
import Element from '../elements/element.js';
import ControlCircle from './control-circle.js';

/**
* A horizontal slider is an object that allows for a control to be moved along
* a user- defined range. The slider has a minimum value and a maximum value
* which default to the range [0, 100].
*/
export default class Slider extends Element {

  // instance variables
  private _min : number;
  private _max : number;

  /**
  * Visually displays the possible positions along the range
  */
  line : Line;

  /**
  * The control can be moved along the line to change the value of this input
  */
  control : Control;
  _onchange: () => void;

  /**
  * Constructs the slider at the position (x,y). The leftmost edge of the line
  * is placed at this location.
  */
  constructor( x:number, y:number, width:number=100, value:number=0) {
    super(SVG.Group());

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

    this.update = () => {};
    this.addDependency(this.control);

    this.width = width;
    this.min = 0;
    this.max = 100;
    this.value = value;
  }

  set onchange( fn:()=>void ) {
    this.control.onchange = function() {
      this.control._onchange();
      fn();
    }
  }

  /**
  * Returns the width of the display line
  */
  get width() : number {
    return this.line.x2 - this.line.x1;
  }

  /**
  * Sets the width of the display line
  */
  set width( width:number ) {
    this.line.x2 = this.line.x1 + width;
    this.control.constrainWithinBox(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
  }

  /**
  * Returns the value currently represented by this slider.
  */
  get value():number {
    return (this.control.x - this.line.x1)/this.width * (this.range);
  }

  /**
  * Sets the value currently represented by this slider.
  */
  set value( n:number ) {
    this.control.x = this.line.x1 + n/this.range * (this.width);
  }

  /**
  * Returns the minimum possible value of the range.
  */
  get min() : number {
    return this._min;
  }

  /**
  * Sets the minimum possible value of the range.
  */
  set min( value:number ) {
    this._min = value;
  }

  /**
  * Returns the maximum possible value of the range.
  */
  get max() : number {
    return this._max;
  }

  /**
  * Returns the maximum possible value of the range.
  */
  set max( value:number ) {
    this._max = value;
  }

  /**
  * Returns the length of the range represented by this slider.
  */
  get range() : number {
    return this.max - this.min;
  }
}
