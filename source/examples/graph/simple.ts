import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
let graph = interactive.graph();
let a = graph.addNode( 100, 100);
let b = graph.addNode( 200, 100);
graph.addEdge( a, b, true);
