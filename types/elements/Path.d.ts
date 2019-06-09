import Element from './Element.js';
declare class Segment extends Element {
    path: Path;
    constructor(command: string);
}
/**
*
*/
export default class Path extends Element {
    root: SVGPathElement;
    /**
    *
    */
    constructor(d: string);
    extend(command: string): void;
    getPath(d: string): Segment[];
    d: string;
}
export {};
