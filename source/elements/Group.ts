import Element from './Element.js';
import SVG from '../SVG.js';

export default class Group extends Element {

  // make the type of the root to be more specific
  root: SVGGElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor() {
   super();
   this.root = SVG.Group();
   this.root.id = this.id;
   this.style = this.root.style;
  }
}
