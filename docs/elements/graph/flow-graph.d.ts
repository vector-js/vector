import DirectedGraph from './directed-graph.js';
import DependencyGraph from '../../model/dependency-graph.js';
import LinkedList from '../../model/linked-list.js';
/**
* A Directed graph is a complex element containing nodes and directed edges.
*/
export default class FlowGraph extends DirectedGraph {
    dGraph: DependencyGraph<string>;
    levelsMap: Map<number, Set<string>>;
    edgeMap: Map<string, Set<string>>;
    list: LinkedList<string>;
    /**
    * Constructs a directed graph
    */
    constructor(flow: string);
    setLevels(): void;
    draw(): void;
}
