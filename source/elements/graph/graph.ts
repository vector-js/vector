import Node from './node.js';
import Edge from './edge.js';
import Group from '../svg/group.js';

/**
* A Graph is a complex element containing nodes and undirected edges.
*/
export default class Graph extends Group {

  nodes: Node[];


  /**
  * Constructs a graph
  */
  constructor() {
    super();
    this.nodes = [];
  }

  /**
  * Clears all nodes and all edges from the graph, removes them from the dom.
  */
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

  /**
  * Adds a node at the given location with the given text. radius defaults to 20, 20
  */
  addNode(x:number, y:number, text:string, rx=20, ry=20) : Node
  {
    let node = new Node(x, y, rx, ry, text);
    this.root.appendChild(node.root);
    this.nodes.push(node);
    return node;
  }

  /**
  * Adds an edge without direction between the two given nodes.
  */
  addEdge(from: Node, to: Node) : Edge
  {
    let edge = new Edge(from, to, false);

    this.root.prepend(edge.root);

    from.addEdge(edge);
    to.addEdge(edge);

    return edge;
  }

  /**
  * Getter for the list of all nodes inside this graph.
  */
  getNodes():Node[]
  {
    return this.nodes;
  }

  /**
  * Returns the size of this graph
  */
  size():number{
    return this.nodes.length;
  }
}
