/**
* @title Line Defined by Two Points
* @description This interactive demonstrates how a line is uniquely defined by two points.
* @tags [math]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.window = true;
// Create three control points
let p1 = interactive.control(200, 100);
let p2 = interactive.control(400, 200);
addLineBetweenPoints(p1, p2);
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
let text = interactive.text(100, 100, "(100,100)");
text.style.fontFamily = "KaTeX_Math";
text.update = function () {
    this.x = p1.x + 15;
    this.y = p1.y - 15;
    this.contents = `P<tspan baseline-shift = "sub">1</tspan>`;
};
text.addDependency(p1);
text.update();
let text2 = interactive.text(100, 100, "(100,100)");
text2.style.fontFamily = "KaTeX_Math";
text2.update = function () {
    this.x = p2.x + 15;
    this.y = p2.y - 15;
    this.contents = `P<tspan baseline-shift = "sub">2</tspan>`;
};
text2.addDependency(p2);
text2.update();
//# sourceMappingURL=line-defined-by-two-points.js.map