import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
import Element from '../elements/Element.js';

/**
* A button that when pressed fires an onclick event.
*/
export default class Button extends Element {

  /**
  * The state of the checkbox
  */
  _count : number = 0;

  /**
  * The box that represents the area where the user clicks
  */
  box : Rectangle;

  /**
  * The text label associated with the button
  */
  text: Text;

  /**
  * Constructs a button at the position (x,y)
  */
  constructor( x:number, y:number, text:string ) {
    super();

    this.root = SVG.Group();
    this.root.setAttribute('transform', `translate(${x},${y})`);
    this.root.classList.add('button');
    this.root.id = this.id;

    // Create a text element
    this.text = new Text( 18, 1, text);
    this.text.root.setAttribute('alignment-baseline','middle');

    // TODO: why is this.text.root.textLength returning zero?
    this.box = new Rectangle( 0, -16, text.length*12, 32);
    this.box.root.setAttribute('rx', '2px');
    this.root.appendChild(this.box.root);
    this.root.appendChild(this.text.root);
  }

  /**
  * Fires when the user clicks the left button on the button.
  */
  set onlick( handler ) {
    this.root.onclick = handler;
  }

  /**
  * The default behavior is to update its dependents on change.
  */
  onchange() {
    this.updateDependents();
  }
}
