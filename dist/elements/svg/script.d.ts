import Element, { CoreAttributes } from './element.js';
declare type ScriptAttributes = 'type' | 'crossorigin' | 'href';
export default class Script extends Element {
    root: SVGScriptElement;
    /**
    * Constructs a new sript element.
    */
    constructor();
    setAttribute(name: ScriptAttributes | CoreAttributes, value: string): this;
    getAttribute(name: ScriptAttributes | CoreAttributes): string;
}
export {};
