
import SVG from './SVG';
import Element from './Element';

/**
*
*/
export default class Text extends Element {

  /**
  *
  */
  text: SVGTextElement;

  /**
  *
  */
  constructor( x:number, y:number, text:string ) {
    super();
    this.text = SVG.Text( x, y, text );
    this.text.id = this.id;
  }

  set contents( str:string) {
    this.text.innerHTML = str;
  }
}
