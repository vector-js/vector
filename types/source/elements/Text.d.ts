import Element from './Element.js';
/**
*
*/
export default class Text extends Element {
    /**
    *
    */
    root: SVGTextElement;
    /**
    *
    */
    constructor(x: number, y: number, text: string);
    contents: string;
    x: number;
    y: number;
}
