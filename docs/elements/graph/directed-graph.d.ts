import Node from './node.js';
import Edge from './edge.js';
import Group from '../svg/group.js';
/**
* A Directed graph is a complex element containing nodes and directed edges.
*/
export default class DirectedGraph extends Group {
    nodes: Node[];
    /**
    * Constructs a directed graph
    */
    constructor();
    /**
    * Clears all nodes and all edges from the graph, removes them from the dom.
    */
    clear(): void;
    /**
    * Adds a node at the given location with the given text. radius defaults to 20, 20
    */
    addNode(x: number, y: number, text: string, rx?: number, ry?: number): Node;
    /**
    * Adds an edge without direction between the two given nodes.
    */
    addEdge(from: Node, to: Node): Edge;
    /**
    * Getter for the list of all nodes inside this graph.
    */
    getNodes(): Node[];
    /**
    * Returns the size of this graph
    */
    size(): number;
}
