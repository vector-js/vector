/**
* @title Triangle Law of Sines
* @description This interactive demonstrates the relationship between two angles within a triangle.
* @tags [math]
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../../interactive.js';
import { PointWhereTwoLinesIntersect } from '../../util.js';
import SVG from '../../svg.js';
// Initialize the interactive
let id = 'triangle-law-of-sines';
let interactive = new Interactive(id);
interactive.window = true;
// Create three control points
let p1 = interactive.control(300, 75);
let p2 = interactive.control(225, 225);
let p3 = interactive.control(425, 225);
// addLabelToControl( p1, 'p1');
// addLabelToControl( p2, 'p2');
// addLabelToControl( p3, 'p3');
// Draw little angle displays
let displayAngle1 = mirrorCircle(p2);
let displayAngle2 = mirrorCircle(p3);
let group = SVG.Group();
group.appendChild(displayAngle1.root);
group.appendChild(displayAngle2.root);
interactive.root.insertBefore(group, interactive.root.firstChild);
function mirrorCircle(point) {
    let circle = interactive.circle(point.x, point.y, 25);
    circle.root.style.fill = 'grey';
    circle.root.style.fillOpacity = '.3';
    circle.addDependency(point);
    circle.update = function () {
        this.cx = point.x;
        this.cy = point.y;
    };
    circle.update();
    return circle;
}
// Draw a triangle for the clip path
let triangle = interactive.path('');
// triangle.root.style.fill = 'rgb(236,236,236)';
triangle.addDependency(p1);
triangle.addDependency(p2);
triangle.addDependency(p3);
triangle.update = function () {
    this.d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
};
triangle.update();
// TODO: change this
let clipPath = SVG.ClipPath();
clipPath.id = id + '-clip-path';
clipPath.appendChild(triangle.root);
interactive.root.appendChild(clipPath);
group.setAttribute('clip-path', `url(#${clipPath.id})`);
let line = interactive.path('');
line.addDependency(p1);
line.addDependency(p2);
line.addDependency(p3);
line.update = function () {
    let slope1 = (p3.y - p2.y) / (p3.x - p2.x);
    let slope2 = (-1 / slope1);
    let x = p1.x + 100;
    let y = slope2 * (100) + p1.y;
    let point = PointWhereTwoLinesIntersect(p1, { x: x, y: y }, p2, p3);
    this.d = `M ${p1.x} ${p1.y}
            L ${point.x} ${point.y}
            L ${p3.x} ${p3.y}
            L ${p2.x} ${p2.y} Z
            L ${p3.x} ${p3.y}`;
};
line.update();
/**
* Normalizes the angle to be within the range [0, 2 PI].
*/
function normalize(angle) {
    if (angle > 0) {
        return angle;
    }
    else {
        return 2 * Math.PI + angle;
    }
}
function addLabelToControl(control, label) {
    let text = interactive.text(0, 0, label);
    text.addDependency(control);
    text.update = function () {
        this.x = control.x + 15;
        this.y = control.y + 15;
    };
    text.update();
}
//# sourceMappingURL=triangle-law-of-sines.js.map