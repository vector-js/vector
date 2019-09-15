import SVG from '../SVG.js';
import Button from '../elements/Button.js';
import Text from '../elements/Text.js';
import Element from '../elements/Element.js';

/**
* A button that when pressed fires an onclick event.
*/
export default class Stepper extends Element {

  backButton:Button;
  forwardButton:Button;

  counter:number;
  length:number;

  constructor( x1:number, y1:number, x2:number, y2:number, length:number ) {
    super();

    this.length = length
    this.counter = 0;
    this.root = SVG.Group();
    this.root.id = this.id;

    this.backButton = new Button(x1, y1, "Previous");
    this.forwardButton = new Button(x2, y2, "Next");

    this.root.appendChild(this.backButton.root);
    this.root.appendChild(this.forwardButton.root);
  }
}
