/**
* @title Trigonometric Functions
* @description
* @tags [math]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 600;
interactive.height = 300;
interactive.border = true;
// Create a new graph object
let graph = interactive.plot();
graph.function = (x) => { return Math.cos(x); };
// graph.function = (x:number) => { return Math.sin(x); };
// graph.function = (x:number) => { return Math.tan(x); };
graph.originX = 0;
graph.originY = interactive.height / 2;
graph.scale(2 * Math.PI / interactive.width, 100);
//# sourceMappingURL=trigonometric-functions.js.map