/**
* @title Cartesian Coordinate System
* @description This interactive demonstrates the cartesian coordinate system.
* @tags [math]
* @ignore true
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import { Interactive, getScriptName, download } from '../../index.js';
/**
* A point has an x position and y position
*/
class Point {
    x;
    y;
}
// Initialize the interactive
let margin = 32;
let width = 600;
let height = 300;
let interactive = new Interactive(getScriptName(), {
    width: width + 2 * margin,
    height: height + 2 * margin,
    originX: margin,
    originY: height + margin
});
// interactive.border = true;
interactive.style.overflow = 'visible';
// Create three control points
let point = interactive.control(0, 0);
let xAxis = interactive.line(0, 0, width, 0);
let yAxis = interactive.line(0, 0, 0, -height);
point.constrainWithinBox(0, -height, width, 0);
let boxConstraint = point.constrain;
point.constrain = (o, n) => {
    // first snap to grid
    let x = 50 * Math.round(n.x / 50);
    let y = 50 * Math.round(n.y / 50);
    // then constrain within box
    let p = boxConstraint({ x: x, y: y }, { x: x, y: y });
    return { x: p.x, y: p.y };
};
let text = interactive.text(150, 150, "myText");
text.addDependency(point);
text.update = function () {
    this.x = point.x + 15;
    this.y = point.y - 15;
    this.contents = `(${point.x / 50},${-point.y / 50})`;
};
text.update();
let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');
xAxis.setAttribute('marker-end', `url(#${marker.id})`);
yAxis.setAttribute('marker-end', `url(#${marker.id})`);
let xAxisLabel = interactive.text(xAxis.x2 + 16, xAxis.y2, 'x');
xAxisLabel.setAttribute('alignment-baseline', 'middle');
let yAxisLabel = interactive.text(yAxis.x1, yAxis.y2 - 16, 'y');
yAxisLabel.setAttribute('text-anchor', 'middle');
let xPosition = interactive.line(0, 0, 0, 0);
xPosition.style.stroke = 'cornflowerblue';
xPosition.addDependency(point);
xPosition.update = function () {
    this.x1 = point.x;
    this.x2 = point.x;
    this.y2 = point.y;
};
let yPosition = interactive.line(0, 0, 0, 0);
yPosition.style.stroke = 'cornflowerblue';
yPosition.addDependency(point);
yPosition.update = function () {
    this.y1 = point.y;
    this.x2 = point.x;
    this.y2 = point.y;
};
let w = 50;
let h = 50;
for (let i = 0; i <= 12; i++) {
    let x = i * w;
    let vertical = interactive.line(x, 0, x, -height);
    let label = interactive.text(x, 25, i.toString());
    label.style.textAnchor = 'middle';
    label.style.alignmentBaseline = 'middle';
    vertical.style.strokeOpacity = '.2';
}
for (let i = 0; i <= 6; i++) {
    let y = i * h;
    let horizontal = interactive.line(0, -y, width, -y);
    let label = interactive.text(-25, -y, i.toString());
    label.style.textAnchor = 'middle';
    label.style.alignmentBaseline = 'middle';
    horizontal.style.strokeOpacity = '.2';
}
point.translate(150, -100);
window.download = download;
interactive.circle(0, 0, 3).style.fill = '#404040';
//# sourceMappingURL=cartesian-coordinate-system-test.js.map