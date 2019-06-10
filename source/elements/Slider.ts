import SVG from '../SVG.js';
import Element from './Element.js';
import Control from './Control.js';
import Line from './Line.js';

export default class Slider extends Element{

  private _min : number;
  private _max : number;

  line : Line;
  control : Control;

  /**
  * Constructs a control at the position (x,y)
  */
  constructor( x:number, y:number, width:number=100, value:number=0) {
    super();

    this.root = SVG.Group();
    this.line = new Line(x, y, x + width, y);
    this.control = new Control(x + value, y);
    this.control.constrainToBox(x, y, x + width, y);
    this.root.appendChild(this.line.root);
    this.root.appendChild(this.control.root);
    this.root.id = this.id;

    this.update = () => {};
    this.addDependency(this.control);

    this.width = width;
    this.min = 0;
    this.max = 100;
    this.value = value;
  }

  set width( value:number ) {
    this.line.x2 = this.line.x1 + value;
  }

  get width() : number {
    return this.line.x2 - this.line.x1;
  }

  set value( n:number ) {
    this.control.x = this.line.x1 + n/this.range * (this.width);
  }

  get value():number {
    return (this.control.x - this.line.x1)/this.width * (this.range);
  }

  set min( value:number ) {
    this._min = value;
  }

  get min() : number {
    return this._min;
  }

  set max( value:number ) {
    this._max = value;
  }

  get max() : number {
    return this._max;
  }

  get range() : number {
    return this.max - this.min;
  }

}
