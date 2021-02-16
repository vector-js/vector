import { Element } from './element'

interface Configuration {
  width:number
  height:number
  x:number
  y:number
}

/**
*/
export class Image extends Element {

  // make the type of the root to be more specific
  root: SVGImageElement;

  /**
  * Contructs an image element
  */
  constructor(href:string , width:number, height:number) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    element.setAttributeNS(null, 'href', href);
    element.setAttributeNS(null, 'width', width.toString());
    element.setAttributeNS(null, 'height', height.toString());

    super(element);
  }

  /**
  * Returns the x position
  */
  get x(): number {
    return this.root.x.baseVal.value;
  }

  /**
  * Sets the x position
  */
  set x(x: number) {
    this.root.x.baseVal.value = x;
  }

  /**
  * Returns the y position
  */
  get y(): number {
    return this.root.y.baseVal.value;
  }

  /**
  * Sets the y position
  */
  set y(y1: number) {
    this.root.y.baseVal.value = y1;
  }

  /**
  * Returns the width
  */
  get width(): number {
    return this.root.width.baseVal.value;
  }

  /**
  * Sets the width
  */
  set width(v: number) {
    this.root.width.baseVal.value = v;
  }

  /**
  * Returns the height
  */
  get height(): number {
    return this.root.height.baseVal.value;
  }

  /**
  * Sets the height
  */
  set y2(y2: number) {
    this.root.height.baseVal.value = y2;
  }
}
