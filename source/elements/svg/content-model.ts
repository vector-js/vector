import Group from './group.js';
import SVG from './svg.js';
import Circle from './circle.js';
import Defs from './definitions.js';
import Description from './description.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import MetaData from './meta-data.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';

import Element from './element.js';

// NOTE: these interfaces only extend the Element object for testing purposes.

/*
* Export the general SVG element
*/
export { Element };

/**
* Describes methods for creating descriptive elements.
*/
export interface Descriptive extends Element {

  /**
  * Creates and appends a description element within this element.
  */
  description() : Description;

  /**
  * Creates and appends a metadata element within this element.
  */
  metadata() : MetaData;

  /**
  * Creates and appends a title element within this element.
  */
  title() : Title;
}

/**
* Describes methods for creating structural elements.
*/
export interface Shape extends Element {

  /**
  * Constructs and appends a circle within this element.
  */
  circle(cx:number, cy:number, r:number) : Circle;

  /**
  * Constructs and appends an ellipse within this element.
  */
  ellipse(cx:number, cy:number, rx:number, ry:number) : Ellipse;

  /**
  * Constructs and appends a line within this element.
  */
  line(x1:number, y1:number, x2:number, y2:number) : Line;

  /**
  * Constructs and appends a path within this element.
  */
  path(d:string) : Path;

  /**
  * constructs and appends a polygon within this element
  */
  polygon(points:string) : Polygon;

  /**
  * Constructs and appends a rectangle within this element
  */
  rectangle(x:number, y:number, width:number, height:number) : Rectangle;
}

/**
* Describes methods for creating structural elements.
*/
export interface Structural extends Element {

  /**
  * Creates and appends a defs element within this element.
  */
  defs() : Defs;

  /**
  * Creates and appends a group element within this element.
  */
  group() : Group;

  /**
  * Creates and appends a symbol element within this element.
  */
  symbol() : Symbol;

  /**
  * Creates and appends a svg element within this element.
  */
  svg(x:number, y:number, width:number, height:number) : SVG ;

  /**
  * Creates and appends a use element within this element.
  */
  use(x:number, y:number, width:number, height:number) : Use;

}

/**
* Describes methods for creating textual elements.
*/
export interface Typography extends Element{

  /**
  * Creates and appends a text element within this element.
  */
  text( x:number, y:number, str:string ) : Text;

}
