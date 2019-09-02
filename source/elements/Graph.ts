import Element from '../elements/Element.js';
import Node from '../elements/Node.js';
import Edge from '../elements/Edge.js';
import SVG from '../SVG.js';




export default class Graph extends Element {
  /**
  * Constructs a control at the position (x,y)
  */
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

  addNode(x:number, y:number, text:string, r=20) : Node
  {
    let node = new Node(x, y, r, text);
    this.root.appendChild(node.root);
    return node;
  }

  addEdge(from: Node, to: Node, directed: boolean) : Edge
  {
    let edge = new Edge(from, to, directed);

    if(directed)
    {
      edge.root.setAttribute('marker-end', `url(#arrow)`);
    }

    this.root.appendChild(node.root);
    return node;
  }



}
