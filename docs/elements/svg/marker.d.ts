import Element, { CoreAttributes } from './element.js';
import { Structural, Shape } from './content-model.js';
import Circle from './circle.js';
import Defs from './definitions.js';
import Description from './definitions.js';
import Ellipse from './ellipse.js';
import Group from './group.js';
import Line from './line.js';
import MetaData from './meta-data.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import SVG from './svg.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';
declare type MarkerAttributes = 'viewBox' | 'preserveAspectRatio' | 'refX' | 'refY' | 'markerUnits' | 'markerWidth' | 'markerHeight' | 'orient';
/**
* A marker is a shape that can be repeatably drawn on a shape.
*/
export default class Marker extends Element implements Shape, Structural {
    root: SVGMarkerElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(refX: number, refY: number, width: number, height: number);
    setAttribute(name: MarkerAttributes | CoreAttributes, value: string): Element;
    getAttribute(name: MarkerAttributes | CoreAttributes): string;
    get viewBox(): string;
    set viewBox(value: string);
    get refX(): number;
    set refX(value: number);
    get refY(): number;
    set refY(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    description(): Description;
    metadata(): MetaData;
    title(): Title;
    defs(): Defs;
    group(): Group;
    svg(): SVG;
    symbol(): Symbol;
    use(x: number, y: number, width: number, height: number): Use;
    circle(cx: number, cy: number, r: number): Circle;
    ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse;
    line(x1: number, y1: number, x2: number, y2: number): Line;
    path(d: string): Path;
    polygon(points: string): Polygon;
    rectangle(x: number, y: number, width: number, height: number): Rectangle;
    text(x: number, y: number, str: string): Text;
}
export {};
