import Element from '../elements/element.js';
import Node from '../elements/node.js';
import Edge from '../elements/edge.js';
import DirectedGraph from '../elements/directed-graph.js';
import DependencyGraph from '../model/dependency-graph.js';
import LinkedList from '../model/linked-list.js';


import SVG from '../svg.js';

/**
* A Directed graph is a complex element containing nodes and directed edges.
*/
export default class FlowGraph extends DirectedGraph {

  dGraph:DependencyGraph<string>;
  levelsMap: Map<number, Set<Node>>;
  edgeMap: Map<Node, Set<Node>>;
  list:LinkedList<Node>;
  /**
  * Constructs a directed graph
  */
  constructor(flow:string) {
    super();

    this.levelsMap = new Map();
    this.edgeMap = new Map();

    this.dGraph = DependencyGraph.Generate(flow);
    this.list = this.dGraph.getTopologicalSort();
    this.setLevels();
    this.draw();
  }

  setLevels(list: LinkedList<string>){

    this.levelsMap.set(0, new Set<string>())

    let currentLevel:number = 0;

    for(let node of this.list){
      let currNodes = this.levelsMap.get(currentLevel);
      if(currNodes.size == 0){
        currNodes.add(node);
      } else {
        for (let n of currNodes){
          if(this.dGraph.getAdjacentNodes(n).has(node)){
            currentLevel++;
            this.levelsMap.set(currentLevel, new Set<string>());
          }
        }
      }
      this.levelsMap.get(currentLevel).add(node);
    }

    console.log(this.levelsMap);
  }

  draw(){
    let x = 0;
    let y = 0;

    for(let level of this.levelsMap.keys()){
      for(let node of this.levelsMap.get(level)){
        this.edgeMap.set(node, this.dGraph.getAdjacentNodes(node));
        this.addNode(x, y, node);
        x += 64;
      }
      x = 0;
      y+= 64;
    }

    for(let node of this.list){
      let dependents = this.dGraph.getAdjacentNodes(node);
      for(let edge of dependents){
        this.addEdge()
      }
    }
  }
}
