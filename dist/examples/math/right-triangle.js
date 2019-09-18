/**
* @title Right Triangle
* @description This interactive demonstrates the properties of a right triangle.
* @tags [math]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
import SVG from '../../svg.js';
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
let square = interactive.rectangle(0, 0, 40, 40);
square.addDependency(p1, p2);
square.update = function () {
    square.x = p1.x - square.width / 2;
    square.y = p2.y - square.height / 2;
};
square.update();
mirrorCircle(p2);
function mirrorCircle(point) {
    let circle = interactive.circle(point.x, point.y, 30);
    circle.root.style.fill = 'grey';
    circle.root.style.fillOpacity = '.3';
    circle.addDependency(point);
    circle.update = function () {
        this.cx = point.x;
        this.cy = point.y;
    };
    circle.update();
}
// Draw a triangle for display
let display_triangle = interactive.path('');
display_triangle.root.style.strokeWidth = '2px';
display_triangle.addDependency(triangle);
display_triangle.update = function () {
    this.d = triangle.d;
};
display_triangle.update();
// TODO: change this
let clipPath = SVG.ClipPath();
clipPath.id = 'triangle-with-angles-clip-path';
clipPath.appendChild(triangle.root);
interactive.root.appendChild(clipPath);
interactive.root.firstChild.setAttribute('clip-path', `url(#${clipPath.id})`);
//# sourceMappingURL=right-triangle.js.map