import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
import DependencyGraph from "../../model/dependency-graph.js";
let interactive = new Interactive(getScriptName());
let dg = new DependencyGraph();
dg.add('a');
dg.add('b');
dg.add('c');
dg.addDependency('a', 'b');
// dg.addDependency('b', 'c');
dg.addDependency('a', 'c');
console.log(dg.toString());
let flowGraph = interactive.flowGraph(dg.toString());
let rect = flowGraph.root.getBBox();
interactive.setViewBox(rect.x - 8, rect.y - 8, rect.width + 16, rect.height + 16);
//# sourceMappingURL=flow-graph-2.js.map