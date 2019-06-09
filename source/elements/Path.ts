import SVG from '../SVG.js';
import Element from './Element.js';

class Segment extends Element {

  path:Path;

  constructor( command:string ) {
    super();
  }

}

/**
*
*/
export default class Path extends Element {


  root:SVGPathElement;

  /**
  *
  */
  constructor( d:string ) {
    super();
    this.root = SVG.Path(d);
    this.root.id = this.id;
  }

  extend( command:string ) {
  }

  getPath( d:string ) : Segment[] {
    return null;
  }

  set d( d:string ) {
    this.root.setAttribute('d', d);
  }

  get d():string {
    return this.root.getAttribute('d');
  }

}
