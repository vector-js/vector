import { Descriptive, Shape, Structural, Typography } from './content-model.js';
import Element, { CoreAttributes } from './element.js';

import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Defs from './definitions.js';
import Description from './description.js';
import Ellipse from './ellipse.js';
import Group from './group.js';
import Line from './line.js';
import Marker from './marker.js';
import MetaData from './meta-data.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';
import A from './a.js';
import Script from './script.js';

type SVGAttributes = 'viewBox' | 'preserveAspectRatio' | 'transform';

/**
* This class represents a SVG element. There are four geometric properties x, y,
* width, and height. The (x,y) properties only affect nested SVG elements.
*/
export default class SVG extends Element implements Descriptive, Shape, Structural, Typography {

  // make the type of the root more specific
  declare root: SVGSVGElement;

  /**
  * Constructs a svg element.
  */
  constructor( x?:number, y?:number, width?:number, height?:number ) {
    let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if( x ) {
      svg.setAttributeNS(null, 'x', x.toString());
    }
    if( y ) {
      svg.setAttributeNS(null, 'y', y.toString());
    }
    if( width ) {
      svg.setAttributeNS(null, 'width', width.toString());
    }
    if( height ) {
      svg.setAttributeNS(null, 'height', height.toString());
    }
    super(svg);
  }

  /**
  * Constructs and returns a SVG object within the DOM.  If the provided
  * argument is an HTMLElement appends the interactive within that element. If
  * the provided a value is a string, appends the interactive within the HTML
  * element with the corresponding ID. If no element is found throws an error.
  */
  static SVG( idOrElement:string | HTMLElement, x?:number, y?:number, width?:number, height?:number ) : SVG {

    // get the container element
    let container : HTMLElement;
    if (typeof idOrElement == "string") {
      container = document.getElementById(idOrElement);
      if( container === null || container === undefined ) {
        throw new Error(`There is no HTML element with the id: ${idOrElement}`);
      }
    } else {
      container = idOrElement;
    }

    // construct and append the svg
    let svg = new SVG(x,y,width,height);
    container.appendChild(svg.root);
    return svg;
  }

  /**
  * Return the width of this svg element.
  */
  get width() {
    // return this.root.width.baseVal.value;
    return parseInt(this.root.getAttribute('width'));
  }

  /**
  * Set the width of this svg element.
  */
  set width( value:number ) {
    // this.root.width.baseVal.value = value;
    this.root.setAttributeNS(null, 'width', value.toString());
  }

  /**
  * Returns the height of this svg element.
  */
  get height() {
    // return this.root.height.baseVal.value;
    return parseInt(this.root.getAttribute('height'));
  }

  /**
  * Sets the height of this svg element to the provided value.
  */
  set height( value:number ) {
    // this.root.height.baseVal.value = value;
    this.root.setAttributeNS(null, 'height', value.toString());
  }

  get x() {
    return this.root.x.baseVal.value;
  }

  set x( value:number ) {
    this.root.x.baseVal.value = value;
  }

  get y() {
    return this.root.y.baseVal.value;
  }

  set y( value:number ) {
    this.root.y.baseVal.value = value;
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

  // comment inherited from base class
  setAttribute(name: SVGAttributes | CoreAttributes, value: string): SVG {
    this.root.setAttribute(name,value);
    return this;
  }

  // comment inherited from base class
  getAttribute(name: SVGAttributes | CoreAttributes): string {
    return this.root.getAttribute(name);
  }

  // descriptive elements

  description(): Description {
    return this.appendChild(new Description());
  }
  metadata(): MetaData {
    return this.appendChild(new MetaData());
  }
  title(): Title {
    return this.appendChild(new Title());
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
    return this.appendChild(new Defs());
  }
  group(): Group {
    return this.appendChild(new Group());
  }
  svg(x:number, y:number, width:number, height:number): SVG {
    return this.appendChild(new SVG(x,y,width,height));
  }
  symbol(): Symbol {
    return this.appendChild(new Symbol());
  }
  use(x:number, y:number, width:number, height:number): Use {
    return this.appendChild(new Use(x, y, width, height));
  }

  // typography elements

  text(x: number, y: number, str: string): Text {
    return this.appendChild(new Text(x, y, str));
  }

  // other elements

	/**
	* Constructs and appends an 'a' (link) element within this element.
	*/
	a( href:string ) : A {
		return this.appendChild(new A(href));
	}

	/**
	* Constructs and appends a 'clipPath' element within this element.
	*/
  clipPath():ClipPath {
    return this.appendChild(new ClipPath());
  }

	/**
	* Constructs and appends a 'marker' element within this element.
	*/
  marker(refX:number, refY:number, width:number, height:number):Marker {
    return this.appendChild(new Marker(refX, refY, width, height));
  }

	/**
	* Constructs and appends a 'script' element within this element.
	*/
	script(): Script {
		return this.appendChild(new Script());
	}
}
