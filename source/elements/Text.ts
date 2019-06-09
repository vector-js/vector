import SVG from '../SVG.js';
import Element from './Element.js';

/**
*
*/
export default class Text extends Element {

  /**
  *
  */
  root: SVGTextElement;

  /**
  *
  */
  constructor( x:number, y:number, text:string ) {
    super();
    this.root = SVG.Text( x, y, text );
    this.root.id = this.id;
  }

  set contents( str:string) {
    this.root.innerHTML = str;
  }

  set x( value:number ) {
    this.root.setAttribute('x', value.toString());
  }

  set y( value:number ) {
    this.root.setAttribute('y', value.toString());
  }
}
