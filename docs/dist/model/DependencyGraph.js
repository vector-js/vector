import LinkedList from './LinkedList.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwZW5kZW5jeUdyYXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL21vZGVsL0RlcGVuZGVuY3lHcmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6Qzs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZTtJQVNuQzs7TUFFRTtJQUNGO1FBRUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7TUFFRTtJQUNGLEdBQUcsQ0FBRSxJQUFNO1FBRVYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQ3hCO1lBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDYjtJQUNGLENBQUM7SUFFRDs7TUFFRTtJQUNGLFFBQVEsQ0FBRSxJQUFNO1FBRWYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNLENBQUUsSUFBTTtRQUViLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ25DO1lBQ0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2I7SUFDRixDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJO1FBRUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7TUFFRTtJQUNGLGFBQWEsQ0FBRSxJQUFNLEVBQUUsRUFBSTtRQUUxQiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztR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