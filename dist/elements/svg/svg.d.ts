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
declare type SVGAttributes = 'viewBox' | 'preserveAspectRatio' | 'transform';
/**
* This class represents a SVG element. There are four geometric properties x, y,
* width, and height. The (x,y) properties only affect nested SVG elements.
*/
export default class SVG extends Element implements Descriptive, Shape, Structural, Typography {
    root: SVGSVGElement;
    /**
    * Constructs a svg element.
    */
    constructor(x?: number, y?: number, width?: number, height?: number);
    /**
    * Constructs and returns a SVG object within the DOM.  If the provided
    * argument is an HTMLElement appends the interactive within that element. If
    * the provided a value is a string, appends the interactive within the HTML
    * element with the corresponding ID. If no element is found throws an error.
    */
    static SVG(idOrElement: string | HTMLElement, x?: number, y?: number, width?: number, height?: number): SVG;
    /**
    * Return the width of this svg element.
    */
    get width(): number;
    /**
    * Set the width of this svg element.
    */
    set width(value: number);
    /**
    * Returns the height of this svg element.
    */
    get height(): number;
    /**
    * Sets the height of this svg element to the provided value.
    */
    set height(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get viewBox(): string;
    set viewBox(value: string);
    setViewBox(x: number, y: number, width: number, height: number): void;
    setAttribute(name: SVGAttributes | CoreAttributes, value: string): SVG;
    getAttribute(name: SVGAttributes | CoreAttributes): string;
    description(): Description;
    metadata(): MetaData;
    title(): Title;
    circle(cx: number, cy: number, r: number): Circle;
    ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse;
    line(x1: number, y1: number, x2: number, y2: number): Line;
    path(d: string): Path;
    polygon(points: string): Polygon;
    rectangle(x: number, y: number, width: number, height: number): Rectangle;
    defs(): Defs;
    group(): Group;
    svg(x: number, y: number, width: number, height: number): SVG;
    symbol(): Symbol;
    use(x: number, y: number, width: number, height: number): Use;
    text(x: number, y: number, str: string): Text;
    /**
    * Constructs and appends an 'a' (link) element within this element.
    */
    a(href: string): A;
    /**
    * Constructs and appends a 'clipPath' element within this element.
    */
    clipPath(): ClipPath;
    /**
    * Constructs and appends a 'marker' element within this element.
    */
    marker(refX: number, refY: number, width: number, height: number): Marker;
    /**
    * Constructs and appends a 'script' element within this element.
    */
    script(): Script;
}
export {};
