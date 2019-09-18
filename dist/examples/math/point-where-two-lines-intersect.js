/**
* @title Point Where Two Lines Intersect
* @description This interactive demonstrates the point where two lines intersect.
* @tags [math]
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../../interactive.js';
import { PointWhereTwoLinesIntersect } from '../../util.js';
// Initialize the interactive
let id = 'point-where-two-lines-intersect';
let interactive = new Interactive(id);
interactive.window = true;
// Create three control points
let p1 = interactive.control(200, 200);
let p2 = interactive.control(300, 100);
let p3 = interactive.control(350, 200);
let p4 = interactive.control(100, 100);
let point = interactive.circle(0, 100, 3);
point.root.style.fill = '#333333';
point.addDependency(p1, p2, p3, p4);
point.update = function () {
    let point = PointWhereTwoLinesIntersect(p1, p2, p3, p4);
    this.cx = point.x;
    this.cy = point.y;
};
point.update();
addLineBetweenPoints(p1, p2);
addLineBetweenPoints(p3, p4);
// Draws a line between two points
function addLineBetweenPoints(point1, point2) {
    let line = interactive.line(0, 0, 0, 0);
    line.addDependency(point1, point2);
    line.update = function () {
        let slope = (point2.y - point1.y) / (point2.x - point1.x);
        let b = point2.y - slope * point2.x;
        if (isFinite(slope)) {
            this.x1 = interactive.minX - 10;
            this.y1 = slope * this.x1 + b;
            this.x2 = interactive.width + 10;
            this.y2 = slope * this.x2 + b;
        }
        else {
            this.x1 = point1.x;
            this.y1 = interactive.minY - 10;
            this.x2 = point1.x;
            this.y2 = interactive.maxY + 10;
        }
    };
    line.update();
    return line;
}
//# sourceMappingURL=point-where-two-lines-intersect.js.map