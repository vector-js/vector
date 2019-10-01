import Element from '../element.js';
import { Structural, Shape, Descriptive } from './content-model.js';
import Circle from './circle.js';
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
/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element implements Descriptive, Shape, Structural {
    root: SVGGElement;
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor();
    description(): Description;
    metadata(): MetaData;
    title(): Title;
    defs(): Defs;
    group(): Group;
    svg(): SVG;
    symbol(): Symbol;
    use(): Use;
    circle(cx: number, cy: number, r: number): Circle;
    ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse;
    line(x1: number, y1: number, x2: number, y2: number): Line;
    path(d: string): Path;
    polygon(points: string): Polygon;
    rectangle(x: number, y: number, width: number, height: number): Rectangle;
    text(x: number, y: number, str: string): Text;
}
