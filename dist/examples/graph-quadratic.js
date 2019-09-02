import Interactive from '../Interactive.js';
import { getScriptName } from '../Util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.border = true;
// Create a new graph object
let graph = interactive.plot();
graph.function = (x) => { return x * x; };
graph.originX = interactive.width / 2;
graph.originY = 2 * interactive.height / 3;
graph.scale(1 / 60, 30);
//# sourceMappingURL=graph-quadratic.js.map