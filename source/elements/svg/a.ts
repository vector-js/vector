import Element from './element.js';

/**
* A circle is a basic geometric element with a position and radius.
*/
export default class A extends Element {

  // make the type of the root to be more specific
  root: SVGCircleElement;

  /**
  * Constructs a link element with the provided href.
  */
  constructor( href:string ) {
    let root = document.createElementNS( 'http://www.w3.org/2000/svg', 'a');
    root.setAttributeNS(null, 'href', href.toString());
    super(root);
  }

}
