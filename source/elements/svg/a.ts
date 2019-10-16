import Element, {GlobalAttributes} from './element.js';

/**
* A circle is a basic geometric element with a position and radius.
*/
export default class A extends Element {

  // make the type of the root to be more specific
  root: SVGAElement;

  /**
  * Constructs a link element with the provided href.
  */
  constructor( href:string ) {
    let root = document.createElementNS( 'http://www.w3.org/2000/svg', 'a') as SVGAElement;
    root.setAttributeNS(null, 'href', href.toString());
    super(root);
  }

  // comment inherited from base class
  setAttribute( name: 'href' | 'target' | 'download' | 'rel' | GlobalAttributes, value:string ) {
    this.root.setAttribute(name, value);
    return this;
  }

  // comment inherited from base class
  getAttribute( name: 'href' | 'target' | 'download' | 'rel' | GlobalAttributes): string {
    return this.root.getAttribute(name);
  }
}
