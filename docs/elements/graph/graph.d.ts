import Node from './node.js';
import Edge from './edge.js';
import Group from '../svg/group.js';
/**
* A Graph is a complex element containing nodes and undirected edges.
*/
export interface GraphOptions {
    directed?: boolean;
}
export default class Graph extends Group {
    nodes: Node[];
    options: GraphOptions;
    /**
    * Constructs a graph
    */
    constructor(options: GraphOptions);
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
    /**
    * The tidy algorithm. Assuming a tree for now, pass it the root.
    */
    tidy(root: Node): void;
    fixOffScreen(root: any, modMap: any): void;
    fixConflicts(root: any, orderedNodes: any, modMap: any): any;
    shiftChildrenByMod(node: Node, mod: any, modMap: any): void;
    clearModMap(modMap: any): any;
    calculateShift(leftList: any, rightList: any): number;
    leftContour(node: Node, contourList: any): any;
    rightContour(node: Node, contourList: any): any;
    postTraverse(node: Node, list: any): any;
}
