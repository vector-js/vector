/**
* This interactive demonstrates the quadratic bezier command for a SVG path
* element. There are three control points that allow the user to control the
* shape of the bezier curve that is drawn.
*
* @title SVG Path Quadratic Bezier Curve
* @date May 3, 2019
* @author Kurt Bruns
*/

import Interactive from '../Interactive.js';

// Initialize the interactive
let id = 'graph-example';
let interactive = new Interactive(id);
interactive.width = 500;
interactive.height = 250;
interactive.window = true;

// Create a new graph object
let graph = interactive.graph();
graph.function = (x:number) => { return Math.sin(x); };
graph.originX = 0;
graph.originY = interactive.height/2;
graph.scale( 2*Math.PI/interactive.width, 100);

// expose the graph object for messing around for example:
// graph.function = Math.cos
// graph.function = (x) => { return x*x; };
(window as any).graph = graph;
