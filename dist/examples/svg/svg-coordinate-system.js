/**
* @title SVG Coordinate System
* @description This interactive demonstrates the properties of the SVG coordinate system.
* @date July 11, 2019
* @author Kurt Bruns
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
let margin = 0;
interactive.width = 692;
interactive.height = 300;
interactive.originX = margin;
interactive.originY = margin;
interactive.root.style.overflow = 'visible';
interactive.root.style.marginLeft = '6px';
let rectangle = interactive.rectangle(0, 0, interactive.width - 2 * margin, interactive.height - 2 * margin);
rectangle.style.fill = '#f8f8f8';
// let rect = interactive.rectangle( 0, 0, interactive.width - 2*margin, interactive.height - 2*margin );
// rect.root.style.stroke = 'cornflowerblue';
let xAxis = interactive.line(0, 0, interactive.width - 2 * margin, 0);
let yAxis = interactive.line(0, 0, 0, interactive.height - 2 * margin);
let originDot = interactive.circle(0, 0, 3);
originDot.root.style.fill = '#333333';
let control = interactive.control(100, 100);
control.constrainWithinBox(0, 0, interactive.width - 2 * margin, interactive.height - 2 * margin);
let xCoordinate = interactive.line(0, 0, 0, 0);
xCoordinate.root.style.strokeDasharray = '3';
xCoordinate.addDependency(control);
xCoordinate.update = function () {
    this.y1 = control.y;
    this.x2 = control.x;
    this.y2 = control.y;
};
xCoordinate.update();
let yCoordinate = interactive.line(0, 0, 0, 0);
yCoordinate.root.style.strokeDasharray = '3';
yCoordinate.addDependency(control);
yCoordinate.update = function () {
    this.x1 = control.x;
    this.x2 = control.x;
    this.y2 = control.y;
};
yCoordinate.update();
let arrow1 = interactive.path('');
arrow1.addDependency(xAxis);
arrow1.root.style.fill = '#333333';
arrow1.root.style.stroke = 'none';
arrow1.update = function () {
    let r = 7;
    let angle = Math.atan2(xAxis.y2 - xAxis.y1, xAxis.x2 - xAxis.x1);
    let x = xAxis.x2;
    let y = xAxis.y2;
    this.d = `M ${x + r * Math.cos(angle)} ${y + r * Math.sin(angle)}
  L ${x + r * Math.cos(angle - 2 * Math.PI / 3)} ${y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${x + r * Math.cos(angle + 2 * Math.PI / 3)} ${y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow1.update();
let arrow2 = interactive.path('');
arrow2.addDependency(yAxis);
arrow2.root.style.fill = '#333333';
arrow2.root.style.stroke = 'none';
arrow2.update = function () {
    let r = 7;
    let angle = Math.atan2(yAxis.y2 - yAxis.y1, yAxis.x2 - yAxis.x1);
    let x = yAxis.x2;
    let y = yAxis.y2;
    this.d = `M ${x + r * Math.cos(angle)} ${y + r * Math.sin(angle)}
  L ${x + r * Math.cos(angle - 2 * Math.PI / 3)} ${y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${x + r * Math.cos(angle + 2 * Math.PI / 3)} ${y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow2.update();
let text = interactive.text(100, 100, "(100,100)");
text.addDependency(control);
text.update = function () {
    this.x = control.x + 15;
    this.y = control.y + 15;
    this.contents = `( ${control.x}, ${control.y})`;
};
text.update();
//# sourceMappingURL=svg-coordinate-system.js.map