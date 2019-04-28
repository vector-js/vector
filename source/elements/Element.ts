import Controller from "../Controller";

/**
* Represents an element that lives within the ecosystem of our interactives.
*/
export default class Element {

  /**
  * Allows for the events attatched to elements to be disabled.
  */
  static disable : boolean = false;

  /**
  * This controller handles the relationships between different visual elements.
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
  * The root element of the interactive
  */
  root : SVGElement;

  creationNum : number;

  /**
  * The update function describes how this element should update itself
  */
  update : () => void;

  /**
  * Constructs the elements and adds it into the current controller
  */
  constructor() {

    // give this element an unique id
    this._id = this.constructor.name + '-' + Element.count++;

    // add this element to the controller
    Element.controller.add(this);

  }

  get id() : string {
    return this._id;
  }


  addDependency( element: Element ) {
    Element.controller.dependencyGraph.addDependency( element, this);
  }

  /**
  * Updates the elements that depend on this element.
  */
  updateDependents() {
    Element.controller.update(this);
  }

}
