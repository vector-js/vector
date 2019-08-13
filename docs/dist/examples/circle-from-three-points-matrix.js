/**
* An interactive that demonstrates how a circle can be uniquely described by
* three points.
*
* @title Circle Defined By Three POints
* @date July 8, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
// Initialize the interactive
let id = 'circle-defined-by-three-points';
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 600;
interactive.height = 300;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.height / 2;
;
// Create three control points
let c1 = interactive.control(-70, -80);
let c2 = interactive.control(100, 0);
let c3 = interactive.control(0, 100);
let c4 = interactive.control(50, 100);
// Create a circle
let circle = interactive.circle(0, 0, 0);
circle.addDependency(c1);
circle.addDependency(c2);
circle.addDependency(c3);
circle.update = function () {
    let m = [[c1.x * c1.x + c1.y * c1.y, c1.x, c1.y, 1],
        [c2.x * c2.x + c2.y * c2.y, c2.x, c2.y, 1],
        [c3.x * c3.x + c3.y * c3.y, c3.x, c3.y, 1],
        [c3.x * c3.x + c3.y * c3.y, c3.x, c3.y, 1]];
    let x = math.lusolve(m, [0, 0, 0, 0]);
    console.log(x);
    let A = x[0][0];
    let B = x[1][0];
    let C = x[2][0];
    let D = x[3][0];
    // Calculate center point and radius
    this.cx = -B / (2 * A);
    this.cy = -C / (2 * A);
    this.r = Math.sqrt((B * B + C * C - 4 * A * D) / (4 * A * A));
};
circle.update();
// Create a display dot at the center of the circle
let dot = interactive.circle(0, 0, 3);
dot.root.style.fill = '#333333';
dot.addDependency(circle);
dot.update = function () {
    this.cx = circle.cx;
    this.cy = circle.cy;
};
dot.update();
//# sourceMappingURL=circle-from-three-points-matrix.js.map