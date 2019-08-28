import Node from './Node.js';
import Element from './Element.js';
import SVG from '../SVG.js';

//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A circle is a basic element with a position and radius.
*/
export default class Edge extends Element {

  // make the type of the root to be more specific
  nodeFrom : Node;
  nodeTo : Node;
  root: SVGLineElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor(nodeFrom: Node, nodeTo: Node, directed: boolean) {
    super();
    let arr = this.calculateLinePosition(nodeFrom, nodeTo);

    this.root = SVG.Line(arr[0], arr[1], arr[2], arr[3]);
    this.root.id = this.id;
    this.style = this.root.style;
  }

  calculateLinePosition(nodeFrom: Node, nodeTo:Node)
  {
    let y1 = nodeFrom.nodeCircle.cy;
    let y2 = nodeTo.nodeCircle.cy;

    let x1 = nodeFrom.nodeCircle.cx;
    let x2 = nodeTo.nodeCircle.cx;


    let deltaY = y2 - y1;
    let deltaX = x2 - x1;

    let L = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

    let r1Lx = nodeFrom.nodeCircle.r / L * deltaX;
    let r1Ly = nodeFrom.nodeCircle.r / L * deltaY;

    let r2Lx = nodeTo.nodeCircle.r / L * deltaX;
    let r2Ly = nodeTo.nodeCircle.r / L * deltaY;


    let y1Prime = y1 + r1Ly;
    let y2Prime = y2 - r2Ly;

    let x1Prime = x1 + r1Lx;
    let x2Prime = x2 - r2Lx;

    return new Array(x1Prime, y1Prime, x2Prime, y2Prime);
  }

  // /**
  // * Returns the radius of this circle.
  // */
  // get r():number {
  //  return this.root.r.baseVal.value;
  // }
  //
  // /**
  // * Sets the value of the radius of this circle.
  // */
  // set r( value:number ) {
  //  this.root.r.baseVal.value = value;
  // }
  //
  // /**
  // * Returns the x position of the rectangle
  // */
  // get cx() : number {
  //  return this.root.cx.baseVal.value;
  // }
  //
  // /**
  // * Sets the x position of the rectangle
  // */
  // set cx( n:number ) {
  //  this.root.cx.baseVal.value = n;
  // }
  //
  // /**
  // * Returns the y position of the rectangle
  // */
  // get cy():number {
  //  return this.root.cy.baseVal.value;
  // }
  //
  // /**
  // * Sets the y position of the rectangle
  // */
  // set cy( n:number){
  //  this.root.cy.baseVal.value = n;
  // }
  //
  // /**
  // * Translates the circle to a new position by changing the x and y attributes.
  // */
  // translate(x:number, y:number){
  //  this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
  //  this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
  // }
  //
  // /**
  // * Returns the fill style of this circle
  // */
  // get fill() : string{
  //  return this.root.style.fill;
  // }
  //
  // /**
  // * Sets the fill style of this circle
  // */
  // set fill(s:string){
  //  this.root.style.fill = s;
  // }
  //
  // /**
  // * Returns the stroke style of this circle
  // */
  // get stroke() : string{
  //  return this.root.style.stroke;
  // }
  //
  // /**
  // * Sets the stroke style of this circle
  // */
  // set stroke(s: string){
  //  this.root.style.stroke = s;
  // }
}
