import BaseElement from '../base-element.js';
/**
* These global attributes are associated with every SVG element in the DOM.
*/
export declare type CoreAttributes = 'id' | 'tabindex' | 'style' | 'class' | 'lang' | 'autofocus' | 'xml:space' | 'transform';
/**
* This class defines the basic shape for all SVG elements within our library.
*/
export default class Element extends BaseElement {
    /**
    * The root element of this element.
    */
    root: SVGElement;
    /**
    * Style for the root element.
    */
    style: CSSStyleDeclaration;
    /**
    * Class attribute for the root element.
    */
    classList: DOMTokenList;
    /**
    * Constructs the elements and adds it into the current controller.
    */
    constructor(root: SVGElement);
    /**
    * Sets the provided attribute with the value. WARNING: Elements are given
    * a unique id by default. Changing the id may have unintended consequences.
    * Similarily, the style and class attributes should be accessed through the
    * properties "style" and "classList".
    */
    setAttribute(name: CoreAttributes, value: string): Element;
    /**
    * Returns the value associated with the attribute.
    */
    getAttribute(name: CoreAttributes): string;
    /**
    * Appends the element as a child within this element.
    */
    appendChild<T extends Element>(child: T): T;
    /**
    * Inserts the element before the first child within this element.
    */
    prependChild<T extends Element>(child: T): T;
    /**
    * Returns true if this element contains the argument element.
    */
    contains(element: Element): boolean;
    /**
    * Removes this element from the DOM and from the Element controller.
    */
    remove(): void;
    /**
    * Removes all child elements from this element.
    */
    clear(): void;
    /**
    * Returns the bounding box of this element. Note, this is different from the
    * getBoundingClientRect method since the bounding box is affected by the
    * current viewPort.
    *
    * If this element's root is not a SVGGraphics element as is the case for the
    * marker, title, and more element, then null is returned instead of a DOMRect.
    */
    getBoundingBox(): SVGRect;
}
