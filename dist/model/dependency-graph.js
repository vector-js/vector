import LinkedList from './linked-list.js';
/**
A dependency graph models relationships between nodes. The graph is directed and asyclic, throwing a circular dependency exception if circular dependencies are added.
*/
export default class DependencyGraph {
    /**
    Constructs an empty dependency graph.
    */
    constructor() {
        this.relationships = new Map();
        this._size = 0;
    }
    /***
    Adds a node into the dependency graph. If the node already exists within the graph, does nothing.
    */
    add(node) {
        if (!this.contains(node)) {
            this.relationships.set(node, new Set());
            this._size++;
        }
    }
    /**
    Returns true if the node exists within the dependency graph.
    */
    contains(node) {
        return this.relationships.has(node);
    }
    /**
    Removes the node from the dependency graph. If the node does not exist does nothing.
    */
    remove(node) {
        if (this.relationships.delete(node)) {
            this._size--;
        }
    }
    /**
    Returns the number of vertices in the dependency graph.
    */
    size() {
        return this._size;
    }
    /**
    Adds a dependency between two nodes. If either of the nodes do not exist within the dependency graph, throws an exception.
    */
    addDependency(from, to) {
        // Make sure the nodes exist
        this.add(from);
        this.add(to);
        // Add the dependency
        this.relationships.get(from).add(to);
        // Check for circular dependencies
        this.traverse(from, from);
    }
    /**
    Traverses the graph structuring checking for circular dependecies. If a circular dependency is added, throws an error.
    */
    traverse(current, node, visited = new Set()) {
        // Mark this node as visited
        visited.add(current);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(current, true);
        for (let d of dependents) {
            // Check if this dependency causes a circular dependency
            if (d == node) {
                throw new Error("circular dependency");
            }
            // Continue traversing un-explored nodes
            if (!visited.has(d)) {
                this.traverse(d, node, visited);
            }
        }
    }
    /**
    Returns true if a node has dependents.
    */
    hasDependents(node) {
        return this.contains(node) && this.relationships.get(node).size != 0;
    }
    /**
    * Returns an iterator to the dependents of the node.
    */
    getDependents(node, shallow = false) {
        // If the node does not exist return an empty iterable
        if (!this.relationships.has(node)) {
            return [];
        }
        // If shallow, return adjacent dependencies.
        if (shallow) {
            return this.relationships.get(node).keys();
        }
        else {
            // Get the dependents including the original node.
            let list = this.getTopologicalDependents(node);
            // Remove the starting node and return the dependents.
            list.remove();
            return list;
        }
    }
    /**
    * Returns a topological sort of this dependency
    */
    getTopologicalSort() {
        let list = new LinkedList();
        let visited = new Set();
        for (let node of this.getNodes()) {
            if (!visited.has(node)) {
                this.getTopologicalDependents(node, visited, list);
            }
        }
        return list;
    }
    /**
    Returns a list of the arguent node and all of its dependents in topological order.
    */
    getTopologicalDependents(node, visited = new Set(), list = new LinkedList()) {
        // Mark this node as visited
        visited.add(node);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(node, true);
        for (let d of dependents) {
            if (!visited.has(d)) {
                this.getTopologicalDependents(d, visited, list);
            }
        }
        // Insert node to the front of iterator to retain Topological ordering
        list.insert(node);
        return list;
    }
    /**
    Returns the nodes within this dependency graph.
    */
    getNodes() {
        return this.relationships.keys();
    }
    /**
    Returns a string representation of this dependency graph.
    */
    toString() {
        // Build a string of dependencies in the form of from->to
        let result = "";
        for (let from of this.getNodes()) {
            for (let to of this.getDependents(from, true)) {
                result += from.toString() + '->' + to.toString() + '\n';
            }
        }
        return result;
    }
    /**
    Generates a DependenyGraph object from a string representation.
    */
    static Generate(str) {
        let graph = new DependencyGraph();
        // Prime the loop
        let start = 0;
        let index = str.indexOf('->', start);
        while (index > 0) {
            // Get the first part of the dependency
            let from = str.substring(start, index);
            // Get the second part of the dependency
            start = index + 1;
            index = str.indexOf('\n', index);
            let to = str.substring(start + 1, index);
            // Add the dependency to the graph
            graph.addDependency(from, to);
            // Get the next string if there is one
            start = index + 1;
            index = str.indexOf('->', start);
        }
        return graph;
    }
}
//# sourceMappingURL=dependency-graph.js.map