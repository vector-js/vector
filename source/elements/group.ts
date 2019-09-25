import Element from './element.js';
import SVG from '../svg.js';
import { Shape, Structural, Descriptive } from '../mixins.js';

/**
* A group is a sctructural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Descriptive(Shape(Structural(Element))) {

  // make the type of the root to be more specific
  root: SVGGElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor() {
   super(SVG.Group());
  }
}
