import Ellipse from '../svg/ellipse.js';
import Group from '../svg/group.js';
import Text from '../svg/text.js';
import Edge from './edge.js';
/**
* A Node is a basic element with a position, radius, and text held within it.
*/
export default class Node extends Group {
    nodeName: Text;
    nodeEllipse: Ellipse;
    edges: Set<Edge>;
    private _cx;
    private _text;
    private _cy;
    private _rx;
    private _ry;
    /**
    * Constructs a Node element at the position (x,y) with radius r containing the string text
    */
    constructor(cx: number, cy: number, rx: number, ry: number, text: string);
    /**
    * Returns the number of edges coming out of this node.
    */
    edgeWeight(): number;
    /**
    * Translates this node and all inner elements by x, y.
    */
    translate(x: number, y: number): void;
    /**
    * Getter for the cx of this node.
    */
    readonly cx: number;
    /**
    * Getter for cy of this node
    */
    readonly cy: number;
    /**
    * Getter for rx of this node
    */
    /**
    * Setter for rx of this node
    */
    rx: number;
    /**
    * Getter for ry of this node
    */
    /**
    * Setter for ry of this node
    */
    ry: number;
    /**
    * Getter for the text of this node
    */
    /**
    * Setter for the text of this node
    */
    label: string;
    /**
    * Adds an edge to this node.
    */
    addEdge(edge: Edge): void;
}
