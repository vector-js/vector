import Element from '../elements/Element.js';
import Node from '../elements/Node.js';
import Edge from '../elements/Edge.js';
import SVG from '../SVG.js';

export default class Graph extends Element {

  nodes: Node[];

  constructor() {
    super();

    this.root = SVG.Group();
    this.root.id = this.id;

    this.nodes = [];

    let defs = SVG.Defs();
    defs.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#333333;"></path></marker>`;

    this.root.appendChild(defs);
  }

  clear() {
    for(var i = 0; i < this.nodes.length; i++)
    {
      this.nodes[i].edges.forEach(function(item){
        item.remove();
      })
      this.nodes[i].remove();
    }
    this.nodes = [];
  }

  addNode(x:number, y:number, text:string, r=20) : Node
  {
    let node = new Node(x, y, r, text);
    this.root.appendChild(node.root);
    this.nodes.push(node);
    return node;
  }

  addEdge(from: Node, to: Node, directed: boolean) : Edge
  {
    let edge = new Edge(from, to, directed);

    if(directed)
    {
      edge.root.setAttribute('marker-end', `url(#arrow)`);
    }

    this.root.appendChild(edge.root);

    from.addEdge(edge);
    to.addEdge(edge);

    return edge;
  }

  size():number{
    return this.nodes.length;
  }
}
