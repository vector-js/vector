import Controller from '../Controller.js';
/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
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
    * Clears the static data structures holding elements and resets the count.
    */
    static clear(disable = false) {
        Element.count = 0;
        Element.controller.clear();
        Element.disable = disable;
    }
    /**
    * Returns the unique generated identifier associated with this element.
    */
    get id() {
        return this._id;
    }
    /**
    * Declares this element dependent on the provided element.
    */
    addDependency(...elements) {
        for (let element of elements) {
            Element.controller.dependencyGraph.addDependency(element, this);
        }
    }
    /**
    * Updates all of the elements that depend on this element.
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
* The controller manages the dependencies between elements. Every element
* is added to this controller upon creation.
*/
Element.controller = new Controller();
/**
* This number uniquely identifes elements
*/
Element.count = 0;
//# sourceMappingURL=Element.js.map