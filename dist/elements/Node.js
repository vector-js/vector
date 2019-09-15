import Element from './Element.js';
import Ellipse from './Ellipse.js';
import Text from './Text.js';
import SVG from '../SVG.js';
//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A Node is a basic element with a position, radius, and text held within it.
*/
export default class Node extends Element {
    /**
    * Constructs a Node element at the position (x,y) with radius r containing the string text
    */
    constructor(cx, cy, rx, ry, text) {
        super();
        this._cx = cx;
        this._cy = cy;
        this._text = text;
        this.edges = new Set();
        this.root = SVG.Group();
        this.nodeName = new Text(cx, cy, text);
        this.nodeName.style.textAnchor = "middle";
        this.nodeName.root.setAttribute("alignment-baseline", "middle");
        this.nodeEllipse = new Ellipse(cx, cy, rx, ry);
        this.nodeEllipse.fill = '#f8f8f8';
        this.root.appendChild(this.nodeEllipse.root);
        this.root.appendChild(this.nodeName.root);
        this.root.classList.add('default');
        this.root.id = this.id;
    }
    /**
    * Returns the number of edges coming out of this node.
    */
    edgeWeight() {
        return this.edges.size;
    }
    get cx() {
        return this._cx;
    }
    moveX(x) {
        this.nodeEllipse.cx += x;
        this.nodeName.x += x;
        this._cx += x;
    }
    moveY(y) {
        this.nodeEllipse.cy += y;
        this.nodeName.y += y;
        this._cy += y;
    }
    get cy() {
        return this._cy;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this.nodeName.contents = text;
        this._text = text;
    }
    /**
    * Adds an edge to this node.
    */
    addEdge(edge) {
        this.edges.add(edge);
    }
}
//# sourceMappingURL=Node.js.map