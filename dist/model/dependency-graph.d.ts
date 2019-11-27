import LinkedList from './linked-list.js';
/**
A dependency graph models relationships between nodes. The graph is directed and asyclic, throwing a circular dependency exception if circular dependencies are added.
*/
export default class DependencyGraph<T> {
    private relationships;
    private _size;
    /**
    Constructs an empty dependency graph.
    */
    constructor();
    /***
    Adds a node into the dependency graph. If the node already exists within the graph, does nothing.
    */
    add(node: T): void;
    /**
    Returns true if the node exists within the dependency graph.
    */
    contains(node: T): boolean;
    /**
    Removes the node from the dependency graph. If the node does not exist does nothing.
    */
    remove(node: T): void;
    /**
    Returns the number of vertices in the dependency graph.
    */
    size(): number;
    /**
    Adds a dependency between two nodes. If either of the nodes do not exist within the dependency graph, throws an exception.
    */
    addDependency(from: T, to: T): void;
    /**
    Traverses the graph structuring checking for circular dependecies. If a circular dependency is added, throws an error.
    */
    private traverse;
    /**
    Returns true if a node has dependents.
    */
    hasDependents(node: T): boolean;
    /**
    * Returns the adjacent dependent nodes.
    */
    getAdjacentNodes(node: T): Set<T>;
    /**
    * Returns an iterator to the dependents of the node.
    */
    getDependents(node: T, shallow?: boolean): Iterable<T>;
    /**
    * Returns a topological sort of this dependency
    */
    getTopologicalSort(): LinkedList<T>;
    /**
    Returns a list of the arguent node and all of its dependents in topological order.
    */
    private getTopologicalDependents;
    /**
    Returns the nodes within this dependency graph.
    */
    getNodes(): Iterable<T>;
    /**
    Returns a string representation of this dependency graph.
    */
    toString(): string;
    /**
    Generates a DependenyGraph object from a string representation.
    */
    static Generate(str: string): DependencyGraph<string>;
}
