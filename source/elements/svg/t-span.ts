import Element, { CoreAttributes } from './element.js';
import { TextAttributes } from './text.js';

/**
* A tspan element is a text element that allows the user to change the style
* or position of the rendered text inside the tspan.
*/
export default class TSpan extends Element {

  /**
  * The root element of the tspan object
  */
  declare root: SVGTSpanElement;

  /**
  * Constructs a tspan element
  */
  constructor( str:string ) {
    let tspan = document.createElementNS( 'http://www.w3.org/2000/svg', 'tspan');
    tspan.innerHTML = str;
    super(tspan);
  }

  /**
  * The text contents of this tspan element
  */
  get text() : string {
    return this.root.innerHTML;
  }

  /**
  * Sets the text contents of this tspan element to the provided string
  */
  set text( str:string ) {
    this.root.innerHTML = str;
  }

  // comment inherited from base class
  setAttribute(name: TextAttributes | CoreAttributes, value: string): TSpan {
    this.root.setAttribute(name,value);
    return this;
  }

  // comment inherited from base class
  getAttribute(name: TextAttributes | CoreAttributes): string {
    return this.root.getAttribute(name);
  }

  /**
  * Creates a child tspan element.
  */
  tspan( str:string ) : TSpan {
    let tspan = new TSpan(str);
    this.root.appendChild(tspan.root);
    return tspan;
  }
}
