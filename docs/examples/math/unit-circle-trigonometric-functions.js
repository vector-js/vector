/**
* @title Unit Circle Right Triangle
* @description An interactive to demonstrate how the radius of a circle can be used to measure the angle between two rays.
* @tags [math]
* @date June 9, 2019
* @author Kurt Bruns
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.window = true;
interactive.width = 600;
interactive.height = 600;
interactive.originX = interactive.width / 2;
interactive.originY = 225;
// Create a circle
let circle = interactive.circle(0, 0, 125);
let line = interactive.line(0, 0, circle.r, 0);
let margin = 0;
let yAxis = interactive.line(0, -(circle.r + margin), 0, circle.r + margin);
let xAxis = interactive.line(-(circle.r + margin), 0, circle.r + margin, 0);
// Create a control
let control = interactive.control(circle.r * Math.cos(-.25 * Math.PI), circle.r * Math.sin(-.25 * Math.PI));
control.constrainToCircle(circle.cx, circle.cy, circle.r);
// Create a path
let path = interactive.path('');
path.root.style.fillOpacity = '.3';
path.update = function () {
    path.d = `M 0 0
            L ${control.x} 0
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);
function getAngle() {
    let angle;
    if (control.y <= 0) {
        angle = Math.abs(Math.atan2(control.y, control.x));
    }
    else {
        angle = Math.PI * 2 - Math.atan2(control.y, control.x);
    }
    return angle.toFixed(2) + ' rad';
}
let xCoord = -180;
let yCoord = 200;
// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let angle = interactive.text(xCoord, yCoord + 0, "test");
angle.root.style.whiteSpace = 'pre';
angle.addDependency(control);
angle.update = function () {
    angle.contents = `θ =  ${getAngle()}`;
};
angle.update();
// Display the x cordinate
let x = interactive.text(xCoord, yCoord + 25, "test");
x.root.style.whiteSpace = 'pre';
x.addDependency(control);
x.update = function () {
    x.contents = `x = ${control.x > 0 ? ' ' : ''}${(control.x / circle.r).toFixed(2)}`;
};
x.update();
let y = interactive.text(xCoord, yCoord + 50, "test");
y.root.style.whiteSpace = 'pre';
y.addDependency(control);
y.update = function () {
    y.contents = `y = ${control.y <= 0 ? ' ' : ''}${(-control.y / circle.r).toFixed(2)}`;
};
y.update();
let r = interactive.text(xCoord, yCoord + 75, "r =  1");
let cosineCheckBox = interactive.checkBox(75, 195, 'cosine(θ)', false);
let sineCheckBox = interactive.checkBox(75, 195 + 25, 'sine(θ)', false);
let tangentCheckBox = interactive.checkBox(75, 195 + 50, 'tangent(θ)', false);
let secantCheckBox = interactive.checkBox(75, 195 + 75, 'secant(θ)', false);
let cosecantCheckBox = interactive.checkBox(75, 195 + 100, 'cosecant(θ)', false);
let cotangentCheckBox = interactive.checkBox(75, 195 + 125, 'cotangent(θ)', false);
let secant = interactive.line(0, 0, 0, 0);
secant.addDependency(control);
secant.addDependency(secantCheckBox);
secant.update = function () {
    this.x2 = circle.r / (control.x / circle.r);
    if (secantCheckBox.value) {
        this.root.style.stroke = 'red';
        this.root.style.strokeWidth = '2px';
    }
    else {
        this.root.style.stroke = '';
        this.root.style.strokeWidth = '';
    }
};
secant.update();
let cosine = interactive.line(0, 0, 0, 0);
cosine.addDependency(control);
cosine.addDependency(cosineCheckBox);
cosine.addDependency(secantCheckBox);
cosine.update = function () {
    this.x2 = control.x;
    this.root.style.strokeOpacity = '1';
    if (secantCheckBox.value) {
        this.root.style.strokeOpacity = '0';
    }
    else if (cosineCheckBox.value) {
        this.root.style.stroke = 'red';
        this.root.style.strokeWidth = '2px';
    }
    else {
        this.root.style.stroke = '';
        this.root.style.strokeWidth = '';
    }
};
cosine.update();
let sine = interactive.line(0, 0, 0, 0);
sine.addDependency(control);
sine.addDependency(sineCheckBox);
sine.update = function () {
    this.x1 = control.x;
    this.x2 = control.x;
    this.y2 = control.y;
    if (sineCheckBox.value) {
        this.root.style.stroke = 'red';
        this.root.style.strokeWidth = '2px';
    }
    else {
        this.root.style.stroke = '';
        this.root.style.strokeWidth = '';
    }
};
sine.update();
let tangent = interactive.line(0, 0, 0, 0);
tangent.addDependency(control);
tangent.addDependency(tangentCheckBox);
tangent.update = function () {
    this.x1 = control.x;
    this.y1 = control.y;
    this.x2 = circle.r / (control.x / circle.r);
    if (tangentCheckBox.value) {
        this.root.style.stroke = 'red';
        this.root.style.strokeWidth = '2px';
    }
    else {
        this.root.style.stroke = '';
        this.root.style.strokeWidth = '';
    }
};
tangent.update();
let cotangent = interactive.line(0, 0, 0, 0);
cotangent.addDependency(control);
cotangent.addDependency(cotangentCheckBox);
cotangent.update = function () {
    this.y1 = circle.r / (control.y / circle.r);
    this.x2 = control.x;
    this.y2 = control.y;
    if (cotangentCheckBox.value) {
        this.root.style.stroke = 'red';
        this.root.style.strokeWidth = '2px';
    }
    else {
        this.root.style.stroke = '';
        this.root.style.strokeWidth = '';
    }
};
cotangent.update();
let cosecant = interactive.line(0, 0, 0, 0);
cosecant.addDependency(control);
cosecant.addDependency(cosecantCheckBox);
cosecant.update = function () {
    this.y2 = circle.r / (control.y / circle.r);
    if (cosecantCheckBox.value) {
        this.root.style.stroke = 'red';
        this.root.style.strokeWidth = '2px';
    }
    else {
        this.root.style.stroke = '';
        this.root.style.strokeWidth = '';
    }
};
cosecant.update();
// Create a point at the origin
let point = interactive.circle(0, 0, 3);
point.fill = 'black';
//# sourceMappingURL=unit-circle-trigonometric-functions.js.map