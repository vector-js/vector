/**
* @title Normal Distribution
* @description This interactive demonstrates the properties of the normal distribution.
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
let s = 100;
let u = 300;
graph.function = (x) => { return 1 / (s * Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, -(x - u) * (x - u) / (2 * s * s)); };
// graph.function = (x:number) => { return Math.sin(x); };
// graph.function = (x:number) => { return Math.tan(x); };
graph.originX = 0;
graph.originY = interactive.height / 2;
graph.scale(1, 30000);
//# sourceMappingURL=plot-normal-distribution.js.map