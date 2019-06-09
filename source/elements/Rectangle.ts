import SVG from '../SVG.js';
import Element from './Element.js';

export default class Rectangle extends Element{

  /**
  * The svg element
  */
  root: SVGRectElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor( x:number, y:number, width:number, height:number ) {
    super();
    this.root = SVG.Rectangle( x, y, width, height);
    this.root.id = this.id;
  }

  get fill() : string{
    return this.root.style.fill;
  }

  set fill(s:string){
    this.root.style.fill = s;
  }

  get stroke() : string{
    return this.root.style.stroke;
  }

  set stroke(s: string){
    this.root.style.stroke = s;
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

  translate(x:number, y:number){
    this.root.x.baseVal.value = this.root.x.baseVal.value + x;
    this.root.y.baseVal.value = this.root.y.baseVal.value + y;
  }
}
