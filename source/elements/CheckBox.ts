import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
import Element from '../elements/Element.js';

/**
* A checkbox with an label. The can be checked, unchecked, and related to other
* elements.
*/
export default class CheckBox extends Element {

  /**
  * The state of the checkbox
  */
  _value : boolean = false;

  /**
  * The box to be checked and unchecked
  */
  box : Rectangle;

  /**
  * The text label associated with the checkbox
  */
  text: Text;

  /**
  * Constructs a control at the position (x,y)
  */
  constructor( x:number, y:number, text:string, value:boolean ) {
    super(SVG.Group());

    this.root.setAttribute('transform', `translate(${x},${y})`);

    this.box = new Rectangle( -6.5, -6.5, 13, 13);
    this.box.root.setAttribute('rx', '2px');
    this.text = new Text( 18, 1, text);
    this.text.root.setAttribute('alignment-baseline','middle');
    this.root.appendChild(this.box.root);
    this.root.appendChild(this.text.root);

    let temp = this;
    this.value = value;

    this.box.root.onmousedown = function() {
      temp.toggle();
    };

    this.addDependency(this.box);
  }

  /**
  * Sets the value to true and visually checks the box.
  */
  set value( value:boolean ) {
    if( this._value = value ) {
      this.box.root.style.fill = '#404040';
    } else {
      this.box.root.style.fill = '#f2f2f2';
    }
    this.onchange();
  }

  /**
  * Returns true if the box is checked, false if it is not.
  */
  get value() : boolean {
    return this._value;
  }

  /**
  * The default behavior is to update its dependents on change.
  */
  onchange() {
    this.updateDependents();
  }

  /**
  * Converts the current true/false state of the checkbox to a zero or one.
  */
  number() : number {
    return this.value ? 1 : 0;
  }

  /**
  * Toggles the state of this check box.
  */
  toggle() {
    this.value = !this.value;
  }
}
