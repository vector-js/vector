import Controller from '../controller.js';
/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
*/
export default class Element {
    /**
    * Constructs the elements and adds it into the current controller.
    */
    constructor(root) {
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
    * Removes this element from the DOM and from the Element controller.
    */
    remove() {
        Element.controller.remove(this);
        this.root.remove();
    }
    /**
    * Declares this element dependent on the provided element(s).
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
//# sourceMappingURL=element.js.map