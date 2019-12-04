import Element from './element.js';
/**
* A symbol is a reusable graphic.
*/
export default class Symbol extends Element {
    constructor();
    x: number;
    y: number;
    width: number;
    height: number;
    preserveAspectRatio: string;
    viewBox: string;
    refX: number;
    refY: number;
}
