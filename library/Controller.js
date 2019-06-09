import DependencyGraph from './model/DependencyGraph.js';
/**
* Controls the interactions between user input and visual changes to the
* interactive
*/
export default class Controller {
    /**
    * Constructs a new Controller
    */
    constructor() {
        this.dependencyGraph = new DependencyGraph();
    }
    /**
    * Adds an element to this controller.
    */
    add(element) {
        this.dependencyGraph.add(element);
    }
    /**
    * Returns the element corresponding to the unique string identifier
    */
    get(id) {
        return this.elements.get(id);
    }
    /**
    * Updates this element and all of its dependents
    */
    update(element) {
        let deps = this.dependencyGraph.getDependents(element);
        for (let d of deps) {
            d.update();
        }
    }
}
