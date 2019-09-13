import DependencyGraph from './DependencyGraph';
/**
* Controls the interactions between user input and visual changes to the
* interactive
*/
export default class Controller {
    /**
    *
    */
    constructor() {
        this.dependencyGraph = new DependencyGraph();
    }
    /**
    *
    */
    clear() {
    }
    /**
    * probably replace this call here....
    */
    add(element) {
    }
    /**
    * Returns the elememnt connecting to the unique string identifier
    */
    get(id) {
        // TODO:
        return null;
    }
    /**
    *
    */
    update(element) {
        let itr = this.dependencyGraph.getDependents(element);
        // Loop through the dependent elements, call each update function and update them visually.
        for (let e of itr) {
            e.update();
        }
    }
}
//# sourceMappingURL=controller.js.map