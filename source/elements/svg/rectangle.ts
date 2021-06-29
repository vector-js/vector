import { CoreAttributes } from './element.js';
import Shape, { ShapeAttributes } from './shape.js';

type RectangleAttributes = 'rx' | 'ry';

/**
* A rectangle is a basic element with a position, width, and height. The
* position refers to the top left corner of the rectangle
*/
export default class Rectangle extends Shape {

  // make the type of the root to be more specific
  declare root: SVGRectElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor( x:number, y:number, width:number, height:number ) {
    let rect = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'x', x.toString());
    rect.setAttributeNS(null, 'y', y.toString());
    rect.setAttributeNS(null, 'width', width.toString());
    rect.setAttributeNS(null, 'height', height.toString());
    super(rect);
  }

  // comment inherited from base class
  setAttribute(name: RectangleAttributes | ShapeAttributes | CoreAttributes, value: string): Rectangle {
    this.root.setAttribute(name,value);
    return this;
  }

  // comment inherited from base class
  getAttribute(name: RectangleAttributes | ShapeAttributes | CoreAttributes): string {
    return this.root.getAttribute(name);
  }

  /**
  * Returns the x position of the rectangle
  */
  get x() : number {
    return this.root.x.baseVal.value;
  }

  /**
  * Sets the x position of the rectangle
  */
  set x( n:number ) {
    this.root.x.baseVal.value = n;
  }

  /**
  * Returns the y position of the rectangle
  */
  get y():number {
    return this.root.y.baseVal.value;
  }

  /**
  * Sets the y position of the rectangle
  */
  set y( n:number){
    this.root.y.baseVal.value = n;
  }

  /**
  * Returns the width of the rectangle
  */
  get width() : number {
    return this.root.width.baseVal.value;
  }

  /**
  * Sets the width of the rectangle
  */
  set width( n:number ) {
    this.root.width.baseVal.value = n;
  }

  /**
  * Returns the height of the rectangle
  */
  get height() : number {
    return this.root.height.baseVal.value;
  }

  /**
  * Sets the height of the rectangle
  */
  set height( n:number ) {
    this.root.height.baseVal.value = n;
  }

  /*
  * Translates the position of the rectangle to a new position from its current
  * position. TODO: this is inconsistent with other translate methods within
  * the elements. Probably best to conform to how SVG implements translate with
  * the transform attribute, and then implement a move method or something.
  */
  translate(x:number, y:number){
    this.root.x.baseVal.value = this.root.x.baseVal.value + x;
    this.root.y.baseVal.value = this.root.y.baseVal.value + y;
  }

  /**
  * Returns the fill style of this rectangle
  */
  get fill() : string{
    return this.root.style.fill;
  }

  /**
  * Sets the fill style of this rectangle
  */
  set fill(s:string){
    this.root.style.fill = s;
  }

  /**
  * Returns the stroke style of this rectangle
  */
  get stroke() : string{
    return this.root.style.stroke;
  }

  /**
  * Sets the stroke style of this rectangle
  */
  set stroke(s: string){
    this.root.style.stroke = s;
  }
}
