/**
* @title Square Root
* @description This interactive visualizes the growth rate of x versus the growth rate of the square root of x.
* @tags [math]
* @weight 1
*/

import {Interactive, getScriptName} from '../../index.js';

let interactive = new Interactive(getScriptName());
interactive.width = 550;
interactive.height = 550;
interactive.originX = 75;
interactive.originY = 325;
let unit = 50;

let border = interactive.rectangle( -interactive.originX, -interactive.originY, interactive.width, interactive.height );
border.style.strokeWidth = '2';
border.classList.add('default');

// create x axis
interactive.line(-interactive.originX, 0, interactive.width-interactive.originX, 0);
interactive.text(interactive.width-interactive.originX-20, -7, 'x');
let x = -unit, y = 20;
for (let num = -1; num <= 9; num++) {
  interactive.line(x, 0, x, 3);
  interactive.text(num < 0 ? x-7 : x-3.5, y, `${num}`).style.fontSize = '12';
  x += unit;
}

// create y axis
interactive.line(0, -interactive.originY, 0, 0);
interactive.text(7, -interactive.originY+20, 'y');
x = -20; y = -unit;
for (let num = 1; num <= 6; num++) {
  interactive.line(-3, y, 0, y);
  interactive.text(x, y+3.5, `${num}`).style.fontSize = '12';
  y -= unit;
}

// create square root circle and control along x axis
let xControl = interactive.control(unit, 0);
xControl.constrainWithinBox(unit, 0, interactive.width-interactive.originX, 0);

let circle = interactive.circle(0, 0, unit);
circle.classList.add('default');
circle.update = function() {
  this.cx = (-unit + xControl.x) / 2;
  this.r = xControl.x - this.cx;
};
circle.update();
circle.addDependency(xControl);

// create colored line and label that move along x axis as x changes
let xLine = interactive.line(0, 0, 0, 0);
xLine.stroke = 'cornflowerblue';
xLine.style.strokeWidth = '3';
xLine.update = function() {
  this.x2 = xControl.x;
};
xLine.update();
xLine.addDependency(xControl);

let xLabel = interactive.text(/*(interactive.width-interactive.originX)/2*/unit/2, unit, 'x');
xLabel.style.fontSize = '24';
xLabel.style.fontStyle = 'italic';
xLabel.style.fontWeight = 'bold';
xLabel.style.fill = '#0366EE';
xLabel.update = function() {
  this.x = xControl.x/2;
};
xLabel.update();
xLabel.addDependency(xControl);

// create colored line and label that move along y axis as square root of x changes
let yLine = interactive.line(0, 0, 0, 0);
yLine.stroke = '#a771eb';
yLine.style.strokeWidth = '3';
yLine.update = function() {
  this.y2 = -Math.sqrt(xControl.x/unit) * unit;
};
yLine.update();
yLine.addDependency(xControl);

let yLabel = interactive.text(-unit-10, /*-interactive.originY/2*/-unit/2, '√ x');
yLabel.style.fontSize = '24';
yLabel.style.fontStyle = 'italic';
yLabel.style.fontWeight = 'bold';
yLabel.style.fill = '#9D5EEB';
yLabel.update = function() {
  this.y = (-Math.sqrt(xControl.x/unit) * unit) / 2;
};
yLabel.update();
yLabel.addDependency(xControl);
