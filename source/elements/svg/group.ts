import Element, { CoreAttributes } from './element.js';
import { Structural, Shape, Descriptive } from './content-model.js';

import A from './a.js';
import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Defs from './definitions.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import SVG from './svg.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';
import Description from './description.js';
import MetaData from './meta-data.js';

type GroupAttributes = 'clip-path' | 'transform' ;

/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element implements Descriptive, Shape, Structural {

  // make the type of the root to be more specific
  declare root: SVGGElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor() {
    let group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g');
    super(group);
  }

  // comment inherited from base class
  setAttribute(name: GroupAttributes | CoreAttributes, value: string): Group {
    this.root.setAttribute(name,value);
    return this;
  }

  // comment inherited from base class
  getAttribute(name: GroupAttributes | CoreAttributes): string {
    return this.root.getAttribute(name);
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
  svg(x:number,y:number,width:number,height:number): SVG {
    return this.appendChild(new SVG(x,y,width,height));
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

	/**
	* Constructs and appends a text element within this element.
	*/
  text(x:number, y:number, str:string ) : Text {
    return this.appendChild(new Text(x, y, str));
  }

	/**
	* Constructs and appends an 'a' (link) within this element.
	*/
	a(href:string) : A {
		return this.appendChild(new A(href));
	}

	/**
	* Constructs and appends a clipPath within this element
	*/
	clipPath() : ClipPath {
		return this.appendChild(new ClipPath());
	}
}
