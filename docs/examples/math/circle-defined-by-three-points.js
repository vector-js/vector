/**
* @title Circle Defined By Three Points
* @description An interactive that demonstrates how a circle can be uniquely described by thee points.
* @tags [math]
* @date July 8, 2019
* @author Kurt Bruns
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
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
// Create a circle
let circle = interactive.circle(0, 0, 0);
circle.addDependency(c1);
circle.addDependency(c2);
circle.addDependency(c3);
circle.update = function () {
    // Solve for general form coefficients
    let A = c1.x * (c2.y - c3.y) - c1.y * (c2.x - c3.x) + c2.x * c3.y - c3.x * c2.y;
    let B = (c1.x * c1.x + c1.y * c1.y) * (c3.y - c2.y) + (c2.x * c2.x + c2.y * c2.y) * (c1.y - c3.y) + (c3.x * c3.x + c3.y * c3.y) * (c2.y - c1.y);
    let C = (c1.x * c1.x + c1.y * c1.y) * (c2.x - c3.x) + (c2.x * c2.x + c2.y * c2.y) * (c3.x - c1.x) + (c3.x * c3.x + c3.y * c3.y) * (c1.x - c2.x);
    let D = (c1.x * c1.x + c1.y * c1.y) * (c3.x * c2.y - c2.x * c3.y) + (c2.x * c2.x + c2.y * c2.y) * (c1.x * c3.y - c3.x * c1.y) + (c3.x * c3.x + c3.y * c3.y) * (c2.x * c1.y - c1.x * c2.y);
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
//# sourceMappingURL=circle-defined-by-three-points.js.map