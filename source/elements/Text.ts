import SVG from '../SVG.js';
import Element from './Element.js';
import TSpan from './Tspan.js';

/**
* Text is a basic element containing string contents
*/
export default class Text extends Element {

  // make the type of the root to be more specific
  root: SVGTextElement;

  /**
  * Constructs text at the position (x,y) with the provided string
  */
  constructor( x:number, y:number, text:string = '' ) {
    super(SVG.Text( x, y, text ));
  }

  /**
  * Sets the contents of this element
  */
  set contents( str:string) {
    this.root.innerHTML = str;
  }

  /**
  * Sets the contents of this element
  */
  get contents() {
    return this.root.innerHTML;
  }

  /**
  * Gets the x position of this element
  */
  get x() {
    return Number(this.root.getAttribute('x'));
  }

  /**
  * Gets the y position of this element
  */
  get y() {
    return Number(this.root.getAttribute('y'));
  }

  /**
  * Sets the x position of this element
  */
  set x( value:number ) {
    this.root.setAttribute('x', value.toString());
  }

  /**
  * Sets the y position of this element
  */
  set y( value:number ) {
    this.root.setAttribute('y', value.toString());
  }

  /**
  * Returns the length of the text
  */
  get length() : number {
    const context = document.createElement("canvas").getContext("2d");
    return context.measureText(this.root.innerHTML).width;
  }

  tspan( text:string ) : TSpan {
    let tspan = new TSpan(text);
    this.root.appendChild(tspan.root);
    return tspan;
  }
}
