import Controller from '../Controller.js';

/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
*/
export default class Element {

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
  * The root element of this element
  */
  root : SVGElement;

  /**
  * Style for this element.
  */
  style: CSSStyleDeclaration;

  /**
  * The update function describes how this element should update itself
  */
  update : () => void;

  /**
  * Constructs the elements and adds it into the current controller
  */
  constructor() {

    // give this element an unique id
    this._id = `${this.constructor.name}-${Element.count++}`;

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
  * Removes this element from the DOM and from the controller.
  */
  remove() {
    Element.controller.remove(this);
    this.root.remove();
  }

  /**
  * Declares this element dependent on the provided element.
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
