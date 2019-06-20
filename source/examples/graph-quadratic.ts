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
let id = 'graph-quadratic';
let interactive = new Interactive(id);
interactive.window = true;

// Create a new graph object
let graph = interactive.graph();
graph.function = (x:number) => { return x*x; };
graph.originX = interactive.width/2;
graph.originY = 2*interactive.height/3;
graph.scale( 1/60, 30);
