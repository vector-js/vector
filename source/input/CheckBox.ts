import SVG from '../SVG.js';
import Element from '../elements/Element.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
import Input from './Input.js';

export default class CheckBox extends Input{

  value : boolean = false;
  box : Rectangle;
  text: Text;

  /**
  * Constructs a control at the position (x,y)
  */
  constructor( x:number, y:number, text:string, value:boolean ) {
    super();
    this.root = SVG.Group();

    this.root.setAttribute('transform', `translate(${x},${y})`);

    this.box = new Rectangle( -5, -5, 10, 10);
    this.text = new Text( 18, 1, text);
    this.text.root.setAttribute('alignment-baseline','middle');
    this.root.appendChild(this.box.root);
    this.root.appendChild(this.text.root);
    this.root.id = this.id;

    this.onchange = function() {
      this.updateDependents();
    };

    let temp = this;
    if( value ) {
      this.box.root.style.fill = '#0366EE';
    } else {
      this.box.root.style.fill = 'white';
    }
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
