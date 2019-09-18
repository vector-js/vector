import DependencyGraph from './model/dependency-graph.js';
/**
* This controller manages the dependencies between elements.
*/
export default class Controller {
    /**
    * Constructs a controller
    */
    constructor() {
        this.dependencyGraph = new DependencyGraph();
        this.elements = new Map();
    }
    /**
    * Clears all the elements from this controller.
    */
    clear() {
        this.dependencyGraph = new DependencyGraph(); // TODO: implement clear method
        this.elements.clear();
    }
    /**
    * Adds an element to this controller.
    */
    add(element) {
        this.dependencyGraph.add(element);
        this.elements.set(element.id, element);
    }
    /**
    * Removes an element from this controller.
    */
    remove(element) {
        this.dependencyGraph.remove(element);
        this.elements.delete(element.id);
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
//# sourceMappingURL=controller.js.map