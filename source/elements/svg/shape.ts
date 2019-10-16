import Element, { GlobalAttributes } from './element.js';

export type ShapeAttributes = 'marker-start' | 'marker-mid' | 'marker-end';

/**
* A shape is a basic geometric element.
*/
export default abstract class Shape extends Element {

  // make the type of the root more specific
  root:SVGGeometryElement;

  /**
  * Constructs a shape element with the provided root.
  */
  constructor( root:SVGGeometryElement ) {
    super(root);
  }

  /**
  * what the fuck typescript
  */
  setAttribute(name: ShapeAttributes | GlobalAttributes, value: string): Shape {
    this.root.setAttribute(name,value);
    return this;
  }

  // comment inherited from base class
  getAttribute(name: ShapeAttributes | GlobalAttributes): string {
    return this.root.getAttribute(name);
  }

  /**
  * Returns the location of the point on the path.
  */
  getPointAtLength(x:number) : DOMPoint{
    return this.root.getPointAtLength(x);
  }

  /**
  * Returns the total length of this path.
  */
  getTotalLength() : number {
    return this.root.getTotalLength();
  }

  /**
  * Returns true if the point is contained within this shapes fill
  */
  isPointInFill( point:DOMPoint ) {
    return this.root.isPointInFill(point);
  }

  /**
  * Returns true if the point is contained within this shapes stroke
  */
  isPointInStroke( point:DOMPoint ) {
    return this.root.isPointInStroke(point);
  }
}
