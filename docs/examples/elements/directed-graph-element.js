/**
* @title Directed Graph Element
* @description This interactive demonstrates the directed graph element.
* @tags [elements]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.border = true;
let graph = interactive.directedGraph();
let a = graph.addNode(75, 75, 'a');
let b = graph.addNode(200, 75, 'b');
graph.addEdge(a, b);
//# sourceMappingURL=directed-graph-element.js.map