import Element from './Element.js';
import SVG from '../SVG.js';

/**
* A group is a sctructural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element {

  // make the type of the root to be more specific
  root: SVGGElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor() {
   super(SVG.Group());
  }

  // TODO: add methods for structural elements
  // TODO: add methods for shape elements

}
