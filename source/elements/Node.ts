import Element from './Element.js';
import Circle from './Circle.js';
import Text from './Text.js';
import SVG from '../SVG.js';

//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A circle is a basic element with a position and radius.
*/
export default class Node extends Element {

  // make the type of the root to be more specific
  nodeName: Text;
  nodeCircle: Circle;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor( cx:number, cy:number, r:number, text:string ) {
   super();

   this.root = SVG.Group();

   this.nodeName = new Text(cx, cy, text);
   this.nodeCircle = new Circle(cx, cy, r);

   this.root.appendChild(this.nodeCircle.root);
   this.root.appendChild(this.nodeName.root);

   this.root.classList.add('default');
   this.root.id = this.id;
  }

  adjustText():void {
    let textWidth = this.nodeName.root.getBBox().width;

    let textHeight = this.nodeName.root.getBBox().height;
    this.nodeName.x = this.nodeName.x - textWidth / 2;
    this.nodeName.y = this.nodeName.y + textHeight / 4;
    console.log(textHeight)
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
