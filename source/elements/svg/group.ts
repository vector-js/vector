import Element from '../element.js';
import { Structural, Shape, Descriptive } from './content-model.js';

import Circle from './circle.js';
import Polygon from './polygon.js';
import Path from './path.js';
import Line from './line.js';
import Ellipse from './ellipse.js';
import Use from './use.js';
import SVG from './svg.js';
import Defs from './defs.js';
import Symbol from './symbol.js';
import Rectangle from './rectangle.js';
import Text from './text.js';

/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element implements Descriptive, Shape, Structural {

  // make the type of the root to be more specific
  root: SVGGElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor() {
    let group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g');
    super(group);
  }

  // Descriptive methods

  symbol(): Symbol{
    throw new Error("Method not implemented.");
  }
  description(): void {
    throw new Error("Method not implemented.");
  }
  metadata(): void {
    throw new Error("Method not implemented.");
  }
  title(): void {
    throw new Error("Method not implemented.");
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

  use(): Use {
    return this.appendChild(new Use());
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
  polygon(): Polygon {
    throw new Error("Method not implemented.");
  }
  rectangle( x:number, y:number, width:number, height:number ): Rectangle {
    return this.appendChild(new Rectangle(x, y, width, height));
  }

  // other methods

  text(x:number, y:number, str:string ){
    return this.appendChild(new Text(x, y, str));
  }
}
