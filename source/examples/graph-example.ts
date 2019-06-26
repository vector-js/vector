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
interactive.width = 600;
interactive.height = 300;
interactive.window = true;

// Create a new graph object
let graph = interactive.graph();
graph.function = (x:number) => { return Math.tan(x); };
graph.originX = 0;
graph.originY = interactive.height/2;
graph.scale( 2*Math.PI/interactive.width, interactive.width/(2*Math.PI));
//
// let r1 = interactive.rectangle(0, 0, 125, 40);
// let r2 = interactive.rectangle(120, 0, 125, 40);
// r1.root.style.fill = 'white';
// r2.root.style.fill = 'white';
//
// let x = interactive.text( 15, 20, 'x:0');
// x.root.style.dominantBaseline = 'middle';
// x.root.style.whiteSpace = 'pre';
//
// let y = interactive.text( 125 + 15, 20, 'y:0');
// y.root.style.dominantBaseline = 'middle';
// y.root.style.whiteSpace = 'pre';
//
// function format( n:number ) {
//     if ( n > 10000 || n < -10000 || (n < .01 && n > -.01)) {
//       return n.toExponential(2);
//     } else {
//       return n.toPrecision(4);
//     }
// }
//
// let input = 0;
// graph.rect.addEventListener('mousemove', function( event:MouseEvent ) {
//   input = event.clientX - graph.rect.getBoundingClientRect().left - graph.originX;
//   let i = graph.scaleX(input);
//   let o = graph.call(input, false);
//
//   x.contents = `x:${i < 0 ? '' : ' '}${format(i)}`;
//   y.contents = `y:${o < 0 ? '' : ' '}${format(o)}`;
// });
//
//
// // expose the graph object for messing around for example:
// // graph.function = Math.cos
// // graph.function = (x) => { return x*x; };
(window as any).graph = graph;
