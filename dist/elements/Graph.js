import Element from '../elements/Element.js';
import Node from '../elements/Node.js';
import Edge from '../elements/Edge.js';
import SVG from '../SVG.js';
export default class Graph extends Element {
    constructor() {
        super();
        this.root = SVG.Group();
        this.root.id = this.id;
        let defs = SVG.Defs();
        defs.innerHTML = `<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>`;
        this.root.appendChild(defs);
    }
    clear() {
        for (var i = 0; i < this.nodes.length; i++) {
            let removeNode = this.nodes[i];
            removeNode.remove();
        }
    }
    addNode(x, y, text, r = 20) {
        let node = new Node(x, y, r, text);
        this.root.appendChild(node.root);
        this.nodes.concat(node);
        return node;
    }
    addEdge(from, to, directed) {
        let edge = new Edge(from, to, directed);
        if (directed) {
            edge.root.setAttribute('marker-end', `url(#arrow)`);
        }
        this.root.appendChild(edge.root);
        from.addEdge(edge);
        to.addEdge(edge);
        return edge;
    }
}
//# sourceMappingURL=Graph.js.map