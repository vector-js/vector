import Element, { CoreAttributes } from './element.js';
declare type AAttributes = 'href' | 'target' | 'download' | 'rel';
/**
* A hyper link element.
*/
export default class A extends Element {
    root: SVGAElement;
    /**
    * Constructs a link element with the provided href.
    */
    constructor(href: string);
    setAttribute(name: AAttributes | CoreAttributes, value: string): this;
    getAttribute(name: AAttributes | CoreAttributes): string;
}
export {};
