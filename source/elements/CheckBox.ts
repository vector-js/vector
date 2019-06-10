import SVG from '../SVG.js';
import Element from './Element.js';
import Rectangle from './Rectangle.js';
import Text from './Text.js';

export default class CheckBox extends Element{

  value : boolean = false;
  box : Rectangle;
  label: Text;

  /**
  * Constructs a control at the position (x,y)
  */
  constructor( x:number, y:number, label:string, value:boolean ) {
    super();
    this.root = SVG.Group();

    this.box = new Rectangle( x, y - 5, 10, 10);
    this.label = new Text( x + 20, y + 5, label);
    this.root.appendChild(this.box.root);
    this.root.appendChild(this.label.root);
    this.root.id = this.id;

    this.onchange = function() {
      this.updateDependents();
    };

    let temp = this;
    this.box.root.style.fill = 'white';
    this.box.root.onmousedown = function() {
      temp.toggle();
    };

    this.addDependency(this.box);
  }

  onchange() {
    this.updateDependents();
  }

  /**
  * Converts the current true/false state of the checkbox to a zero or one.
  */
  number() : number {
    return this.value ? 1 : 0;
  }

  toggle() {
    if( this.value ) {
      this.box.root.style.fill = 'white';
      this.value = false;
    } else {
      this.box.root.style.fill = '#0366EE';
      this.value = true;
    }
    this.onchange();
  }

}
