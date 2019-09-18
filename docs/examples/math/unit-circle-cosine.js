/**
* @title Unit Circle Cosine
* @tags [math]
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../../interactive.js';
// Initialize the interactive
let id = 'unit-circle-cosine';
let angleInteractive = new Interactive(id);
let margin = 18;
let radius = 80;
angleInteractive.width = 2 * radius + 2 * margin;
angleInteractive.height = 250;
angleInteractive.originX = angleInteractive.width / 2;
angleInteractive.originY = angleInteractive.height / 2;
angleInteractive.root.style.display = 'inline';
// Create a circle
let circle = angleInteractive.circle(0, 0, 80);
// Create a control
let angleControl = angleInteractive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
angleControl.constrainToCircle(circle.cx, circle.cy, circle.r);
let triangle = angleInteractive.path('');
triangle.addDependency(angleControl);
triangle.update = function () {
    this.d = `M ${angleControl.x} 0 L ${angleControl.x} ${angleControl.y} L 0 0z`;
};
triangle.update();
let adjacent = angleInteractive.path('');
adjacent.root.style.stroke = 'red';
adjacent.addDependency(angleControl);
adjacent.update = function () {
    this.d = `M 0 0 L ${angleControl.x} 0`;
};
adjacent.update();
// Create a point at the origin
let anglePoint = angleInteractive.circle(0, 0, 3);
anglePoint.fill = 'black';
let circumference = circle.r * 2 * Math.PI;
let interactive = new Interactive(id);
interactive.width = circumference + 2 * margin;
interactive.height = 250;
interactive.originX = margin;
interactive.originY = interactive.height / 2;
interactive.window = false;
interactive.root.style.display = 'inline';
let graph = interactive.plot(false);
graph.function = Math.cos;
graph.originX = 0;
graph.originY = 0;
graph.yAxis.style.stroke = 'none';
graph.xAxis.x1 = 0;
graph.xAxis.x2 = circumference;
// interactive.root.style.overflow = 'visible';
graph.translate(graph.originX, graph.originY);
graph.scale(2 * Math.PI / (circumference), circle.r);
graph.draw(0, circumference);
let x = interactive.line(0, 0, 0, 0);
x.root.style.stroke = 'red';
let control = interactive.control(0, 0);
function getAngle() {
    if (angleControl.y <= 0) {
        return Math.abs(Math.atan2(angleControl.y, angleControl.x));
    }
    else {
        return Math.PI * 2 - Math.atan2(angleControl.y, angleControl.x);
    }
}
control.addDependency(angleControl);
control.update = function () {
    this.x = circle.r * getAngle();
    this.y = -angleControl.x;
};
control.update();
control.constrain = function (o, n) {
    return { x: n.x, y: graph.call(n.x) };
};
control.onchange = function () {
    angleControl.x = -control.y;
    angleControl.y = -circle.r * Math.sin(control.x / circle.r);
    angleControl.updateDependents();
};
x.addDependency(control);
x.update = function () {
    this.x1 = control.x;
    this.y1 = 0;
    this.x2 = control.x;
    this.y2 = control.y;
};
x.update();
// let text = interactive.text(interactive.width/2, - interactive.height/2 + 30, 'y = sin(θ)');
// text.root.style.textAnchor = 'middle';
interactive.line(0 * circumference / 4, -4, 0 * circumference / 4, 4);
interactive.line(1 * circumference / 4, -4, 1 * circumference / 4, 4);
interactive.line(2 * circumference / 4, -4, 2 * circumference / 4, 4);
interactive.line(3 * circumference / 4, -4, 3 * circumference / 4, 4);
interactive.line(4 * circumference / 4, -4, 4 * circumference / 4, 4);
interactive.text(0 * circumference / 4, -10, `0`).root.style.textAnchor = 'middle';
interactive.text(2 * circumference / 4, -10, `π`).root.style.textAnchor = 'middle';
interactive.text(4 * circumference / 4, -10, `τ`).root.style.textAnchor = 'middle';
//# sourceMappingURL=unit-circle-cosine.js.map