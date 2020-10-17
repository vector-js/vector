import Group from './group'
import SVG from './svg'
import Circle from './circle'
import Defs from './definitions'
import Description from './description'
import Ellipse from './ellipse'
import Line from './line'
import MetaData from './meta-data'
import Path from './path'
import Polygon from './polygon'
import Rectangle from './rectangle'
import Symbol from './symbol'
import Text from './text'
import Title from './title'
import Use from './use'

import Element from './element'

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
