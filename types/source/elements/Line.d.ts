import Element from './Element.js';
export default class Line extends Element {
    root: SVGLineElement;
    constructor(x1: number, y1: number, x2: number, y2: number);
    fill: string;
    stroke: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    translate(x: number, y: number): void;
}
