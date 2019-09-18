import Element from '../elements/element.js';
import Node from '../elements/node.js';
import Edge from '../elements/edge.js';
import SVG from '../svg.js';
/**
* A Directed graph is a complex element containing nodes and directed edges.
*/
export default class DirectedGraph extends Element {
    /**
    * Constructs a directed graph
    */
    constructor() {
        super(SVG.Group());
        this.nodes = [];
        let defs = SVG.Defs();
        defs.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#333333;"></path></marker>`;
        this.root.appendChild(defs);
    }
    /**
    * Clears all nodes and all edges from the graph, removes them from the dom.
    */
    clear() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].edges.forEach(function (item) {
                item.remove();
            });
            this.nodes[i].remove();
        }
        this.nodes = [];
    }
    /**
    * Adds a node at the given location with the given text. radius defaults to 20, 20
    */
    addNode(x, y, text, rx = 20, ry = 20) {
        let node = new Node(x, y, rx, ry, text);
        this.root.appendChild(node.root);
        this.nodes.push(node);
        return node;
    }
    /**
    * Adds an edge without direction between the two given nodes.
    */
    addEdge(from, to) {
        let edge = new Edge(from, to, true);
        edge.root.setAttribute('marker-end', `url(#arrow)`);
        this.root.appendChild(edge.root);
        from.addEdge(edge);
        to.addEdge(edge);
        return edge;
    }
    /**
    * Getter for the list of all nodes inside this graph.
    */
    getNodes() {
        return this.nodes;
    }
    /**
    * Returns the size of this graph
    */
    size() {
        return this.nodes.length;
    }
}
//# sourceMappingURL=directed-graph.js.map