import BaseElement from '../base-element.js';

/**
* These global attributes are associated with every SVG element in the DOM.
* TODO: probably remove transform from this list
*/
export type GlobalAttributes = 'id' | 'tabindex' | 'style' | 'class' | 'transform';

/**
* This class defines the basic shape for all SVG elements within our library.
*/
export default class Element extends BaseElement {

  /**
  * The root element of this element.
  */
  root : SVGElement;

  /**
  * Style for the root element.
  */
  style: CSSStyleDeclaration;

  /**
  * Class attribute for the root element.
  */
  classList: DOMTokenList;

  // TODO: tranform object/property?

  /**
  * Constructs the elements and adds it into the current controller.
  */
  constructor( root:SVGElement ) {

    super();

    // store the root element and set the id attribute
    this.root = root;
    this.root.id = this.id;
    this.root.classList.add('element');

    // make the root's style declaration available
    this.style = this.root.style;
    this.classList = this.root.classList;
  }

  /**
  * Sets the provided attribute with the value. WARNING: Elements are given
  * a unique id by default. Changing the id may have unintended consequences.
  * Similarily, the style and class attributes should be accessed through the
  * properties "style" and "classList".
  */
  setAttribute( name: GlobalAttributes, value: string ) : Element {
    this.root.setAttribute(name,value);
    return this;
  }

  /**
  * Returns the value associated with the attribute.
  */
  getAttribute( name: GlobalAttributes ) : string {
    return this.root.getAttribute(name);
  }

  /**
  * Appends the element as a child within this element.
  */
  appendChild<T extends Element>( child:T ) : T {
    this.root.appendChild(child.root);
    return child;
  }

  /**
  * Inserts the element before the first child within this element.
  */
  prependChild<T extends Element>( child:T ) : T {
    this.root.prepend(child.root);
    return child;
  }

  /**
  * Returns true if this element contains the argument element.
  */
  contains( element:Element ) {
    return this.root.contains(element.root);
  }

  /**
  * Removes this element from the DOM and from the Element controller.
  */
  remove() {
    BaseElement.controller.remove(this);
    this.root.remove();
  }

  /**
  * Returns the bounding box of this element. Note, this is different from the
  * getBoundingClientRect method since the bounding box is affected by the
  * current viewPort.
  *
  * If this element's root is not a SVGGRaphics element as is the case for the
  * marker, title, and more element, then null is returned instead of a DOMRect.
  */
  getBoundingBox() : DOMRect {
    if ( this.root instanceof SVGGraphicsElement ) {
      return this.root.getBBox();
    } else {
      return null;
    }
  }
}
