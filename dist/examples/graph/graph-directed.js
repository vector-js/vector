import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
let graph = interactive.graph();
let a = graph.addNode(100, 100, 'a');
let b = graph.addNode(200, 100, 'b');
graph.addEdge(a, b, true);
//# sourceMappingURL=graph-directed.js.map