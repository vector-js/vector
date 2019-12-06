import Element, { CoreAttributes } from './element.js';
/**
* Attributes associated with geometric SVG elements.
*/
export declare type ShapeAttributes = 'marker-start' | 'marker-mid' | 'marker-end' | 'transform';
/**
* A shape is a basic geometric element.
*/
export default abstract class Shape extends Element {
    root: SVGGeometryElement;
    /**
    * Constructs a shape element with the provided root.
    */
    constructor(root: SVGGeometryElement);
    setAttribute(name: ShapeAttributes | CoreAttributes, value: string): Shape;
    getAttribute(name: ShapeAttributes | CoreAttributes): string;
    /**
    * Returns the location of the point on the path.
    */
    getPointAtLength(x: number): DOMPoint;
    /**
    * Returns the total length of this path.
    */
    getTotalLength(): number;
    /**
    * Returns true if the point is contained within this shapes fill
    */
    isPointInFill(point: DOMPoint): boolean;
    /**
    * Returns true if the point is contained within this shapes stroke
    */
    isPointInStroke(point: DOMPoint): boolean;
}
