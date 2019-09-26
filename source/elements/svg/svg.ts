import { Descriptive, Shape, Structural, Typography } from '../svg-content-model.js';
import Element from '../element.js';

import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Defs from './defs.js';
import Ellipse from './ellipse.js';
import Group from './group.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import Text from './text.js';
import Use from './use.js';

/**
* This class represents a svg element.
*/
export default class SVG extends Element implements Descriptive, Shape, Structural, Typography {

  // make the type of the root more specific
  root: SVGSVGElement;

  /**
  * Constructs a svg element.
  */
  constructor( width?:number, height?:number ) {
    let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
    if( width ) {
      svg.setAttributeNS(null, 'width', width.toString());
    }
    if( height ) {
      svg.setAttributeNS(null, 'height', height.toString());
    }
    super(svg);
  }

  /**
  * Return the width of this svg element.
  */
  get width() {
    return this.root.width.baseVal.value;
  }

  /**
  * Set the width of this svg element.
  */
  set width( value:number ) {
    this.root.width.baseVal.value = value;
  }

  /**
  * Returns the height of this svg element.
  */
  get height() {
    return this.root.height.baseVal.value;
  }

  /**
  * Sets the height of this svg element to the provided value.
  */
  set height( value:number ) {
    this.root.height.baseVal.value = value;
  }

  get viewBox() : string {
    return this.root.getAttribute('viewBox');
  }

  set viewBox( value:string ) {
    this.root.setAttribute('viewBox', value);
  }

  setViewBox( x:number, y:number, width:number, height:number ) {
    this.viewBox = `${x} ${y} ${width} ${height}`;
  }

  // descriptive elements

  description(): void {
    throw new Error("Method not implemented.");
  }
  metadata(): void {
    throw new Error("Method not implemented.");
  }
  title(): void {
    throw new Error("Method not implemented.");
  }

  // shape elements

  circle(cx: number, cy: number, r: number): Circle {
    return this.appendChild(new Circle(cx, cy, r));
  }
  ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse {
    return this.appendChild(new Ellipse(cx, cy, rx, ry));
  }
  line(x1: number, y1: number, x2: number, y2: number): Line {
    return this.appendChild(new Line(x1, y1, x2, y2));
  }
  path(d: string): Path {
    return this.appendChild(new Path(d));
  }
  polygon(points: string): Polygon {
    return this.appendChild(new Polygon(points));
  }
  rectangle(x: number, y: number, width: number, height: number): Rectangle {
    return this.appendChild(new Rectangle(x, y, width, height));
  }

  // structural elements

  defs(): Defs {
    throw new Error("Method not implemented.");
  }
  group(): Group {
    return this.appendChild(new Group());
  }
  svg(): SVG {
    return this.appendChild(new SVG());
  }
  symbol(): Symbol {
    return this.appendChild(new Symbol());
  }
  use(): Use {
    return this.appendChild(new Use());
  }

  // typography elements

  text(x: number, y: number, str: string): Text {
    return this.appendChild(new Text(x, y, str));
  }

  // other elements

  clipPath():ClipPath {
    return this.appendChild(new ClipPath());
  }

}
