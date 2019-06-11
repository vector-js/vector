import Element from './Element.js';
import SVG from '../SVG.js';

export default class Circle extends Element {

 root: SVGCircleElement;

 /**
 * Constructs a rectangle element at the position (x,y)
 */
 constructor( cx:number, cy:number, r:number ) {
   super();
   this.root = SVG.Circle(cx, cy, r);
   this.root.id = this.id;
 }

 /**
 * Sets the value of the radius of this circle.
 */
 set r( value:number ) {
   this.root.r.baseVal.value = value;
 }

 /**
 * Returns the radius of this circle.
 */
 get r():number {
   return this.root.r.baseVal.value;
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

 translate(x:number, y:number){
   this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
   this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
 }
}
