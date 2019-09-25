import Group from './elements/group.js';
import SVG from './elements/svg.js';
import Circle from './elements/circle.js';
import Element from './elements/element.js';
import Ellipse from './elements/ellipse.js';
import Line from './elements/line.js';
import Path from './elements/path.js';
import Rectangle from './elements/rectangle.js';
import Text from './elements/text.js';

/**
* Describes methods for creating descriptive elements.
*/
export interface Descriptive extends Element {

  /**
  * Creates and appends a description element within this element.
  */
  description() : void;

  /**
  * Creates and appends a metadata element within this element.
  */
  metadata() : void;

  /**
  * Creates and appends a title element within this element.
  */
  title() : void;
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
  polygon(points:string) : void;

  /**
  * Constructs and appends a rectangel within this element
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
  defs() : void;

  /**
  * Creates and appends a group element within this element.
  */
  group() : Group;

  /**
  * Creates and appends a svg element within this element.
  */
  svg() : SVG ;

  /**
  * Creates and appends a use element within this element.
  */
  use() : void;

}

/**
* Describes methods for creating textual elements.
*/
export interface Typography extends Element {

  /**
  * Creates and appends a text element within this element.
  */
  text( x:number, y:number, str:string ) : Text;

}
