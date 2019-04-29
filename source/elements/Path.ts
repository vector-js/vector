import SVG from '../SVG';
import Element from './Element';

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

  /**
  *
  */
  path: SVGPathElement;

  /**
  *
  */
  constructor( d:string ) {
    super();
    this.path = SVG.Path(d);
    this.path.id = this.id;
  }

  extend( command:string ) {

  }

  getPath( d:string ) : Segment[] {
    return null;
  }

  set d( d:string ) {
    this.path.setAttribute('d', d);
  }

  get d():string {
    return this.path.getAttribute('d');
  }

}
