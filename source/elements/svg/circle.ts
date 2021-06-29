import Shape from './shape.js';
import Path from './path.js';

/**
* A circle is a basic geometric element with a position and radius.
*
* Geometric Properties:
*   - cx
*   - cy
*   - r
*/
export default class Circle extends Shape {

  // make the type of the root to be more specific
  declare root: SVGCircleElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor( cx:number, cy:number, r:number ) {
    let circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
    circle.setAttributeNS(null, 'cx', cx.toString());
    circle.setAttributeNS(null, 'cy', cy.toString());
    circle.setAttributeNS(null, 'r', r.toString());
    super(circle);
  }

  /**
  * Returns the radius of this circle.
  */
  get r():number {
   return this.root.r.baseVal.value;
  }

  /**
  * Sets the value of the radius of this circle.
  */
  set r( value:number ) {
   this.root.r.baseVal.value = value;
  }

  /**
  * Returns the x position of the rectangle
  */
  get cx() : number {
   return this.root.cx.baseVal.value;
  }

  /**
  * Sets the x position of the rectangle
  */
  set cx( n:number ) {
   this.root.cx.baseVal.value = n;
  }

  /**
  * Returns the y position of the rectangle
  */
  get cy():number {
   return this.root.cy.baseVal.value;
  }

  /**
  * Sets the y position of the rectangle
  */
  set cy( n:number){
   this.root.cy.baseVal.value = n;
  }

  getPath() : Path  {
    throw new Error("Method not implemented.");
  }

  /**
  * Translates the circle to a new position by changing the x and y attributes.
  */
  //TODO: Change
  translate(x:number, y:number){
   this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
   this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
  }

  /**
  * Returns the fill style of this circle
  */
  get fill() : string{
   return this.root.style.fill;
  }

  /**
  * Sets the fill style of this circle
  */
  set fill(s:string){
   this.root.style.fill = s;
  }

  /**
  * Returns the stroke style of this circle
  */
  get stroke() : string{
   return this.root.style.stroke;
  }

  /**
  * Sets the stroke style of this circle
  */
  set stroke(s: string){
   this.root.style.stroke = s;
  }
}
