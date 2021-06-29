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
    children: Node[];
    parents: Node[];
    depth: number;
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
    get cx(): number;
    /**
    * Getter for cy of this node
    */
    get cy(): number;
    set cx(cx: number);
    /**
    * Getter for cy of this node
    */
    set cy(cy: number);
    /**
    * Getter for rx of this node
    */
    get rx(): number;
    /**
    * Getter for ry of this node
    */
    get ry(): number;
    /**
    * Getter for the text of this node
    */
    get label(): string;
    /**
    * Setter for the text of this node
    */
    set label(text: string);
    /**
    * Setter for rx of this node
    */
    set rx(rx: number);
    /**
    * Setter for ry of this node
    */
    set ry(ry: number);
    /**
    * Adds an edge to this node.
    */
    addEdge(edge: Edge): void;
}
