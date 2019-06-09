import SVG from '../SVG.js';
import Element from './Element.js';


export default class Ellipse extends Element {

 root: SVGEllipseElement;

 /**
 * Constructs a rectangle element at the position (x,y)
 */
 constructor( cx:number, cy:number, rx:number, ry:number ) {
   super();
   this.root = SVG.Ellipse(cx, cy, rx, ry);
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

 /**
 * Returns the width of the rectangle
 */
 get rx() : number {
   return this.root.rx.baseVal.value;
 }

 /**
 * Sets the width of the rectangle
 */
 set rx( n:number ) {
   this.root.rx.baseVal.value = n;
 }

 /**
 * Returns the height of the rectangle
 */
 get ry() : number {
   return this.root.ry.baseVal.value;
 }

 /**
 * Sets the height of the rectangle
 */
 set ry( n:number ) {
   this.root.ry.baseVal.value = n;
 }

 translate(x:number, y:number){
   this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
   this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
 }
}
