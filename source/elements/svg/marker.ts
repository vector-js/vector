import Element, { CoreAttributes } from './element'
import { Structural, Shape } from './content-model'

import Circle from './circle'
import ClipPath from './clip-path'
import Defs from './definitions'
import Description from './definitions'
import Ellipse from './ellipse'
import Group from './group'
import Line from './line'
import MetaData from './meta-data'
import Path from './path'
import Polygon from './polygon'
import Rectangle from './rectangle'
import Symbol from './symbol'
import SVG from './svg'
import Text from './text'
import Title from './title'
import Use from './use'

type MarkerAttributes = 'viewBox' | 'preserveAspectRatio' | 'refX' | 'refY' | 'markerUnits' | 'markerWidth' | 'markerHeight' | 'orient';

/**
* A marker is a shape that can be repeatably drawn on a shape.
*/
export default class Marker extends Element implements Shape, Structural {

  // make the type of the root to be more specific
  root: SVGMarkerElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor( refX:number, refY:number, width:number, height:number ) {
    let element = document.createElementNS( 'http://www.w3.org/2000/svg', 'marker') as SVGMarkerElement;
    element.setAttributeNS(null, 'refX', refX.toString());
    element.setAttributeNS(null, 'refY', refY.toString());
    element.setAttributeNS(null, 'markerWidth', width.toString());
    element.setAttributeNS(null, 'markerHeight', height.toString());
    super(element);
  }

  // comment inherited from base class
  setAttribute(name: MarkerAttributes | CoreAttributes, value: string): Element {
    this.root.setAttribute(name,value);
    return this;
  }

  // comment inherited from base class
  getAttribute(name: MarkerAttributes | CoreAttributes): string {
    return this.root.getAttribute(name);
  }

  get viewBox():string {
    return this.getAttribute('viewBox');
  }

  set viewBox( value:string ) {
    this.setAttribute('viewBox', value);
  }

  get refX():number {
    return this.root.refX.baseVal.value;
  }

  set refX(value:number) {
    this.root.refX.baseVal.value = value;
  }

  get refY():number {
    return this.root.refY.baseVal.value;
  }

  set refY(value:number) {
    this.root.refY.baseVal.value = value;
  }

  get width():number{
    return this.root.markerWidth.baseVal.value;
  }

  set width(value:number){
    this.root.markerWidth.baseVal.value = value;
  }

  get height():number{
    return this.root.markerHeight.baseVal.value;
  }

  set height(value:number){
    this.root.markerHeight.baseVal.value = value;
  }

  // Descriptive methods

  description(): Description {
    return this.appendChild(new Description());
  }
  metadata(): MetaData {
    return this.appendChild(new MetaData());
  }
  title(): Title {
    return this.appendChild(new Title());
  }

  // Structural methods

  defs(): Defs {
    return this.appendChild(new Defs());
  }

  group(): Group {
    return this.appendChild(new Group());
  }

  svg(): SVG {
    return this.appendChild(new SVG());
  }

  symbol(): Symbol{
    return this.appendChild(new Symbol());
  }

  use(x:number, y:number, width:number, height:number): Use {
    return this.appendChild(new Use(x, y, width, height));
  }

  // Shape methods

  circle(cx: number, cy: number, r: number): Circle {
    return this.appendChild(new Circle(cx, cy, r));
  }
  ellipse( cx:number, cy:number, rx:number, ry:number): Ellipse {
    return this.appendChild(new Ellipse(cx, cy, rx, ry));
  }
  line( x1:number, y1:number, x2:number, y2:number ): Line {
    return this.appendChild(new Line(x1, y1, x2, y2));
  }
  path( d:string ): Path {
    return this.appendChild(new Path(d));
  }
  polygon( points:string ): Polygon {
    return this.appendChild(new Polygon(points));
  }
  rectangle( x:number, y:number, width:number, height:number ): Rectangle {
    return this.appendChild(new Rectangle(x, y, width, height));
  }

  // other methods

  text(x:number, y:number, str:string ){
    return this.appendChild(new Text(x, y, str));
  }

}
