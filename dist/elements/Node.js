import Element from './Element.js';
import Circle from './Circle.js';
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
    constructor(cx, cy, r, text) {
        super();
        this.edges = new Set();
        this.root = SVG.Group();
        this.nodeName = new Text(cx, cy, text);
        this.nodeName.style.textAnchor = "middle";
        this.nodeName.root.setAttribute("alignment-baseline", "middle");
        this.nodeCircle = new Circle(cx, cy, r);
        this.nodeCircle.fill = '#f8f8f8';
        this.root.appendChild(this.nodeCircle.root);
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
    /**
    * Adds an edge to this node.
    */
    addEdge(edge) {
        this.edges.add(edge);
    }
}
//# sourceMappingURL=Node.js.map