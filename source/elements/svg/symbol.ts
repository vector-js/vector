import Element from './element.js';

/**
* A symbol is a reusable graphic.
*/
export default class Symbol extends Element {

  constructor() {
    let symbol = document.createElementNS( 'http://www.w3.org/2000/svg', 'symbol');
    super(symbol);
  }

  // geometric properties

  get x() : number {
    throw new Error('Not Implemented');
  }

  set x(value:number) {
    throw new Error('Not Implemented');
  }

  get y() : number {
    throw new Error('Not Implemented');
  }

  set y(value:number) {
    throw new Error('Not Implemented');
  }

  get width() : number {
    throw new Error('Not Implemented');
  }

  set width(value:number) {
    throw new Error('Not Implemented');
  }

  get height() : number {
    throw new Error('Not Implemented');
  }

  set height(value:number) {
    throw new Error('Not Implemented');
  }

  // attributes

  get preserveAspectRatio() : string {
    throw new Error('Not Implemented');
  }

  set preserveAspectRatio( value:string ) {
    throw new Error('Not Implemented');
  }

  get viewBox() : string {
    return this.root.getAttribute('viewBox');
  }

  set viewBox(value:string) {
    this.root.setAttributeNS(null, 'viewBox', value);
  }

  get refX() : number {
    throw new Error('Not Implemented')
  }

  set refX(value:number) {
    throw new Error('Not Implemented');
  }

  get refY() : number {
    throw new Error('Not Implemented')
  }

  set refY(value:number) {
    throw new Error('Not Implemented');
  }

}
