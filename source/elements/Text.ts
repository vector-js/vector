import SVG from '../SVG.js';
import Element from './Element.js';

/**
* Text is a basic element containing string contents
*/
export default class Text extends Element {

  // make the type of the root to be more specific
  root: SVGTextElement;

  /**
  * Constructs text at the position (x,y) with the provided string
  */
  constructor( x:number, y:number, text:string ) {
    super();
    this.root = SVG.Text( x, y, text );
    this.root.id = this.id;
    this.style = this.root.style;
  }

  /**
  * Sets the contents of this element
  */
  set contents( str:string) {
    this.root.innerHTML = str;
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

}
