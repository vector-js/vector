/**
* @title Triangle
* @description This interactive demonstrates an angle formed by three points.
* @tags [math]
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../../interactive.js';
// Initialize the interactive
let id = 'triangle';
let interactive = new Interactive(id);
interactive.window = true;
// Create three control points
let p1 = interactive.control(250, 200);
let p2 = interactive.control(300, 100);
let p3 = interactive.control(350, 200);
// Draw three lines between them
addLineBetweenPoints(p1, p2);
addLineBetweenPoints(p2, p3);
addLineBetweenPoints(p3, p1);
// Draws a line between two points
function addLineBetweenPoints(point1, point2) {
    let line = interactive.line(0, 0, 0, 0);
    line.addDependency(point1);
    line.addDependency(point2);
    line.update = function () {
        this.x1 = point1.x;
        this.y1 = point1.y;
        this.x2 = point2.x;
        this.y2 = point2.y;
    };
    line.update();
    return line;
}
//# sourceMappingURL=triangle.js.map