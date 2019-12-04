import Circle from './circle.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Element from './element.js';
import { Descriptive, Shape } from './content-model.js';
import Description from './description.js';
import MetaData from './meta-data.js';
import Title from './title.js';
export default class ClipPath extends Element implements Descriptive, Shape {
    root: SVGClipPathElement;
    constructor();
    circle(cx: number, cy: number, r: number): Circle;
    ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse;
    line(x1: number, y1: number, x2: number, y2: number): Line;
    path(d: string): Path;
    polygon(points: string): Polygon;
    rectangle(x: number, y: number, width: number, height: number): Rectangle;
    description(): Description;
    metadata(): MetaData;
    title(): Title;
}
