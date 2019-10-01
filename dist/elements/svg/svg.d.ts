import { Descriptive, Shape, Structural, Typography } from './content-model.js';
import Element from '../element.js';
import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Defs from './definitions.js';
import Ellipse from './ellipse.js';
import Group from './group.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';
import Description from './description.js';
import MetaData from './meta-data.js';
/**
* This class represents a svg element.
*/
export default class SVG extends Element implements Descriptive, Shape, Structural, Typography {
    root: SVGSVGElement;
    /**
    * Constructs a svg element.
    */
    constructor(width?: number, height?: number);
    /**
    * Return the width of this svg element.
    */
    /**
    * Set the width of this svg element.
    */
    width: number;
    /**
    * Returns the height of this svg element.
    */
    /**
    * Sets the height of this svg element to the provided value.
    */
    height: number;
    x: number;
    y: number;
    viewBox: string;
    setViewBox(x: number, y: number, width: number, height: number): void;
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
    svg(): SVG;
    symbol(): Symbol;
    use(): Use;
    text(x: number, y: number, str: string): Text;
    clipPath(): ClipPath;
}
