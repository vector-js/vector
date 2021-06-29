import Element, { CoreAttributes } from './element.js';
import { TextAttributes } from './text.js';
/**
* A tspan element is a text element that allows the user to change the style
* or position of the rendered text inside the tspan.
*/
export default class TSpan extends Element {
    /**
    * The root element of the tspan object
    */
    root: SVGTSpanElement;
    /**
    * Constructs a tspan element
    */
    constructor(str: string);
    /**
    * The text contents of this tspan element
    */
    get text(): string;
    /**
    * Sets the text contents of this tspan element to the provided string
    */
    set text(str: string);
    setAttribute(name: TextAttributes | CoreAttributes, value: string): TSpan;
    getAttribute(name: TextAttributes | CoreAttributes): string;
    /**
    * Creates a child tspan element.
    */
    tspan(str: string): TSpan;
}
