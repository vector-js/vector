import SVG from '../SVG.js';
import Element from './Element.js';
import Control from './Control.js';
import Line from './Line.js';

export default class Slider extends Element{

  min : number;
  max : number;
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
  }

  set value( n:number ) {

  }

  get value():number {
    return this.control.x - this.line.x1;
  }

}
