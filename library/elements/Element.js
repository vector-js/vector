import Controller from '../Controller.js';
/**
* Represents an element that lives within the ecosystem of our interactives.
*/
export default class Element {
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
    * Returns the unique generated identifier associated with this element.
    */
    get id() {
        return this._id;
    }
    /**
    * Adds a dependency on the other element.
    */
    addDependency(element) {
        Element.controller.dependencyGraph.addDependency(element, this);
    }
    /**
    * Updates the elements that depend on this element.
    */
    updateDependents() {
        Element.controller.update(this);
    }
}
/**
* Allows for the events attatched to elements to be disabled.
*/
Element.disable = false;
/**
* This controller handles the relationships between different visual elements.
*/
Element.controller = new Controller();
/**
* This number uniquely identifes elements
*/
Element.count = 0;
