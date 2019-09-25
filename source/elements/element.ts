import Controller from '../controller.js';

/**
* This interface ensures that every element contains a root element and a style
* declaration.
*/
export interface ElementInterface {

  /**
  * The root element of this element
  */
  root : SVGElement;

  /**
  * Style for the root element.
  */
  style: CSSStyleDeclaration;

}


/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
*/
export default class Element implements ElementInterface {

  /**
  * Allows for the events attatched to elements to be disabled.
  */
  static disable : boolean = false;

  /**
  * The controller manages the dependencies between elements. Every element
  * is added to this controller upon creation.
  */
  static controller : Controller = new Controller();

  /**
  * This number uniquely identifes elements
  */
  static count : number = 0;

  /**
  * A unique identifier string
  */
  private _id : string;

  /**
  * The update function describes how this element should update itself
  */
  update : () => void;

  // interface data members
  root : SVGElement;
  style: CSSStyleDeclaration;

  /**
  * Constructs the elements and adds it into the current controller.
  */
  constructor( root:SVGElement ) {

    // give this element an unique id
    this._id = `${this.constructor.name.toLowerCase()}-${Element.count++}`;

    // store the root element and set the id attribute
    this.root = root;
    this.root.id = this.id;
    this.root.classList.add('element');

    // make the root's style declaration available
    this.style = this.root.style;

    // add this element to the controller
    Element.controller.add(this);
  }

  /**
  * Clears the static data structures holding elements and resets the count.
  */
  static clear( disable = false ) {
    Element.count = 0;
    Element.controller.clear();
    Element.disable = disable;
  }

  /**
  * Returns the unique generated identifier associated with this element.
  */
  get id() : string {
    return this._id;
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
  appendChild( child:Element ) : Element {
    this.root.appendChild(child.root);
    return child;
  }

  /**
  * Removes this element from the DOM and from the Element controller.
  */
  remove() {
    Element.controller.remove(this);
    this.root.remove();
  }

  /**
  * Declares this element dependent on the provided element(s).
  */
  addDependency( ... elements: Element[] ) {
    for (let element of elements) {
      Element.controller.dependencyGraph.addDependency( element, this);
    }
  }

  /**
  * Updates all of the elements that depend on this element.
  */
  updateDependents() {
    Element.controller.update(this);
  }
}
