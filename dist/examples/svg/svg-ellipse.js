/**
* @title SVG Ellipse Element
* @description This interactive demonstrates the SVG ellipse element and its attributes.
* @date May 3, 2019
* @author Kurt Bruns
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 704;
let ellipse = interactive.ellipse(0, 0, 0, 0);
let l1 = interactive.line(0, 0, 0, 0);
let l2 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
let text = interactive.text(25, 275, "");
let c0 = interactive.control(300, 150);
let c1 = interactive.control(450, 150);
let c2 = interactive.control(300, 100);
ellipse.update = function () {
    this.cx = c0.x;
    this.cy = c0.y;
    this.rx = Math.abs(c1.x - c0.x);
    this.ry = Math.abs(c2.y - c0.y);
};
ellipse.update();
ellipse.addDependency(c0);
ellipse.addDependency(c1);
ellipse.addDependency(c2);
c1.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c1.addDependency(c0);
c1.constrainToX();
c2.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c2.addDependency(c0);
c2.constrainToY();
l1.update = function () {
    this.x1 = c0.x;
    this.y1 = c0.y;
    this.x2 = c1.x;
    this.y2 = c1.y;
};
l1.update();
l1.addDependency(c0);
l1.addDependency(c1);
l2.update = function () {
    this.x1 = c0.x;
    this.y1 = c0.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
l2.update();
l2.addDependency(c0);
l2.addDependency(c2);
let tag = text.tspan('&lt;ellipse ');
let cx = text.tspan('cx=');
let cy = text.tspan('cy=');
let rx = text.tspan('rx=');
let ry = text.tspan('rx=');
let close = text.tspan('&gt;&lt;/ellipse&gt;');
text.x = 20;
text.y = interactive.maxY - 20;
text.style.alignmentBaseline = 'middle';
tag.style.fill = 'purple';
cx.style.fill = '#ab6f00';
cy.style.fill = '#ab6f00';
rx.style.fill = '#ab6f00';
ry.style.fill = '#ab6f00';
close.style.fill = 'purple';
let cxValue = cx.tspan('... ');
let cyValue = cy.tspan('... ');
let rxValue = rx.tspan('... ');
let ryValue = ry.tspan('... ');
cxValue.style.fill = '#333333';
cyValue.style.fill = '#333333';
rxValue.style.fill = '#333333';
ryValue.style.fill = '#333333';
cxValue.style.fill = '#333333';
cxValue.addDependency(ellipse);
cxValue.update = function () {
    cxValue.text = `"${ellipse.cx.toFixed(0)}" `;
};
cyValue.addDependency(ellipse);
cyValue.update = function () {
    cyValue.text = `"${ellipse.cy.toFixed(0)}" `;
};
rxValue.addDependency(ellipse);
rxValue.update = function () {
    rxValue.text = `"${ellipse.rx.toFixed(0)}" `;
};
ryValue.addDependency(ellipse);
ryValue.update = function () {
    ryValue.text = `"${ellipse.ry.toFixed(0)}" `;
};
ellipse.updateDependents();
//# sourceMappingURL=svg-ellipse.js.map