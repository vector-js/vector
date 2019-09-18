/**
* @title Unit Circle Right Triangle
* @description An interactive to demonstrate how the radius of a circle can be used to measure the angle between two rays.
* @tags [math]
* @date June 9, 2019
* @author Kurt Bruns
*/
import Interactive from '../../interactive.js';
// Initialize the interactive
let id = 'unit-circle-right-triangle';
let interactive = new Interactive(id);
interactive.window = false;
interactive.width = 320;
interactive.height = 320;
interactive.originX = interactive.width / 2;
interactive.originY = 125;
// Create a circle
let circle = interactive.circle(0, 0, 100);
// Create a control
let control = interactive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
control.constrainToCircle(circle.cx, circle.cy, circle.r);
// Create a path
let path = interactive.path('');
path.root.style.fill = 'gray';
path.root.style.fillOpacity = '.3';
path.update = function () {
    path.d = `M 0 0
            L ${control.x} 0
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);
// Create a point at the origin
let point = interactive.circle(0, 0, 3);
point.fill = 'black';
// Display the x cordinate
let x = interactive.text(0, 135, "test");
x.root.style.whiteSpace = 'pre';
x.addDependency(control);
x.update = function () {
    x.contents = `<tspan>x = ${control.x > 0 ? ' ' : ''}${(control.x / circle.r).toFixed(2)}</tspan>`;
};
x.update();
x.x = -x.root.textLength.baseVal.value / 2;
let y = interactive.text(0, 165, "test");
y.root.style.whiteSpace = 'pre';
y.addDependency(control);
y.update = function () {
    y.contents = `y = ${control.y <= 0 ? ' ' : ''}${(-control.y / circle.r).toFixed(2)}`;
};
y.update();
y.x = -y.root.textLength.baseVal.value / 2;
//# sourceMappingURL=unit-circle-right-triangle.js.map