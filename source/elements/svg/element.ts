import BaseElement from '../element.js';

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
  * Sets the provided attribute with the value.
  */
  setAttribute( attribute: string, value: string ) {
    this.root.setAttribute(attribute, value);
  }

  /**
  * Returns the value associated with the attribute.
  */
  getAttribute( attribute: string ) : string {
    return this.root.getAttribute(attribute);
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
  * Declares this element dependent on the provided element(s).
  */
  addDependency( ... elements: Element[] ) {
    for (let element of elements) {
      BaseElement.controller.dependencyGraph.addDependency( element, this);
    }
  }

  /**
  * Updates all of the elements that depend on this element.
  */
  updateDependents() {
    BaseElement.controller.update(this);
  }
}
