import Element, {CoreAttributes} from './element.js';

type AAttributes = 'href' | 'target' | 'download' | 'rel';

/**
* A hyper link element.
*/
export default class A extends Element {

  // make the type of the root to be more specific
  declare root: SVGAElement;

  /**
  * Constructs a link element with the provided href.
  */
  constructor( href:string ) {
    let root = document.createElementNS( 'http://www.w3.org/2000/svg', 'a') as SVGAElement;
    root.setAttributeNS(null, 'href', href);
    super(root);
  }

  // comment inherited from base class
  setAttribute( name: AAttributes | CoreAttributes, value:string ) {
    this.root.setAttribute(name, value);
    return this;
  }

  // comment inherited from base class
  getAttribute( name: AAttributes | CoreAttributes): string {
    return this.root.getAttribute(name);
  }
}
