import Controller from "../library/controller";
/**
* Represents an element that lives within the ecosystem of our interactives.
*/
export default class Element {
    /**
    * Constructs the elements and adds it into the current controller
    */
    constructor() {
        Element.controller.dependencyGraph.add(this);
    }
    /**
    * Initializes the Element class with the current controller
    */
    static initialize(controller) {
        Element.controller = controller;
    }
    addDependency(from) {
        Element.controller.dependencyGraph.addDependency(from, this);
    }
    updateDependents() {
        Element.controller.update(this);
    }
}
/**
* Allows for the events attatched to elements to be disabled.
*/
Element.disable = true;
/**
* This controller handles the relationships between different visual elements.
*/
Element.controller = new Controller();
//# sourceMappingURL=element.js.map