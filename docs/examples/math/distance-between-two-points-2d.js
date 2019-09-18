/**
* @title Distance Between Two Points 2D
* @description This interactive demonstrates how to calculate the distance between two points in two dimensions.
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
// Create two control points
let p1 = interactive.control(100, -80);
let p2 = interactive.control(-100, 80);
// Create a line between the points
let triangle = interactive.path('');
// triangle.root.style.fill = 'rgb(236,236,236)';
triangle.addDependency(p1);
triangle.addDependency(p2);
triangle.update = function () {
    this.d = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y} L ${p2.x} ${p2.y}z`;
};
triangle.update();
let t1 = interactive.text(0, 0, "");
t1.addDependency(p1);
t1.update = function () {
    this.x = p1.x + 15;
    this.y = p1.y - 15;
    this.contents = `(${p1.x},${-p1.y})`;
};
t1.update();
let t2 = interactive.text(0, 0, "");
t2.addDependency(p2);
t2.update = function () {
    this.x = p2.x + 15;
    this.y = p2.y - 15;
    this.contents = `(${p2.x},${-p2.y})`;
};
t2.update();
//# sourceMappingURL=distance-between-two-points-2d.js.map