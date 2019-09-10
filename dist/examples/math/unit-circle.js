/**
* @title Unit Circle
* @description This interactive demonstrates the properties of the unit circle in relation to the trigonometric functions - sine, cosine, and tangent.
* @tags [math]
* @weight 1
*/
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let radius = 80;
let margin = 20;
let container = document.getElementById(getScriptName());
container.style.display = 'grid';
container.style.gridTemplateColumns = `${2 * (radius + margin)}px ${2 * Math.PI * radius}px`;
container.style.gridGap = '1rem';
// Initialize the interactive
let circleInteractive = new Interactive(getScriptName());
circleInteractive.width = 2 * (radius + margin);
circleInteractive.height = 2 * (radius + margin);
circleInteractive.border = true;
circleInteractive.originX = radius + margin;
circleInteractive.originY = radius + margin;
let xAxis = circleInteractive.line(-(radius + margin), 0, radius + margin, 0);
let yAxis = circleInteractive.line(0, -(radius + margin), 0, radius + margin);
let circle = circleInteractive.circle(0, 0, radius);
let control = circleInteractive.control(radius, 0);
control.constrainTo(circle);
let line = circleInteractive.line(0, 0, radius, 0);
line.addDependency(control);
line.update = function () {
    line.x2 = control.x;
    line.y2 = control.y;
};
let rightTriangle = circleInteractive.path('');
rightTriangle.addDependency(control);
rightTriangle.update = function () {
    rightTriangle.d = `M 0 0
                      L ${control.x} 0
                      L ${control.x} ${control.y}
                      Z`;
};
rightTriangle.update();
rightTriangle.style.fill = '#f8f8f8';
let chartInteractive = new Interactive(getScriptName());
chartInteractive.width = 2 * Math.PI * radius;
chartInteractive.height = 2 * (radius + margin);
chartInteractive.border = true;
// chartInteractive.originX = 0;
// chartInteractive.originY = chartInteractive.height/2;
let graph = chartInteractive.plot(false);
graph.function = Math.sin;
graph.originX = 0;
graph.originY = chartInteractive.height / 2;
graph.scale(2 * Math.PI / chartInteractive.width, chartInteractive.width / (2 * Math.PI));
chartInteractive.text(8, chartInteractive.height / 2 - margin, "0");
chartInteractive.text(chartInteractive.width / 2, chartInteractive.height / 2 - margin, "π");
chartInteractive.text(chartInteractive.width - 28, chartInteractive.height / 2 - margin, "2π");
let chartControl = chartInteractive.control(0, chartInteractive.height / 2);
chartControl.addDependency(graph, control);
chartControl.update = function () {
    // chartControl.x = circle.r*getAngle();
    let point = chartControl.constrain({ x: chartControl.x, y: chartControl.y }, { x: circle.r * getAngle(), y: 0 });
    chartControl.x = point.x;
    chartControl.y = point.y;
    // chartControl.translate( chartControl.x, chartControl.y);
};
// Constrain the control to follow the path of the graph
chartControl.constrain = (oldPos, newPos) => {
    let x = (newPos.x + chartInteractive.width) % chartInteractive.width;
    let y = (-circle.r * graph.function(newPos.x / circle.r) + chartInteractive.height / 2);
    return { x: x, y: y };
};
// Override the chart control to instead update the data of the unit circle
// control and then propegate the change through the dependency graph.
chartControl.onchange = function () {
    let angle = 2 * Math.PI * chartControl.x / (chartInteractive.width);
    control.x = radius * Math.cos(angle);
    control.y = -radius * Math.sin(angle);
    control.updateDependents();
};
let info = new Interactive(getScriptName());
info.width = 2 * (radius + margin);
info.height = 2 * (radius + margin);
info.border = true;
let x = 20;
let thetaDisplay = info.text(x, info.height * 1 / 5, "θ = ...");
let xDisplay = info.text(x, info.height * 2 / 5, "x = ...");
let yDisplay = info.text(x, info.height * 3 / 5, "y = ...");
thetaDisplay.addDependency(control);
thetaDisplay.update = function () {
    thetaDisplay.contents = `θ = ${getAngle().toFixed(2)}`;
};
xDisplay.addDependency(control);
xDisplay.update = function () {
    xDisplay.contents = `x = ${(control.x / circle.r).toFixed(2)}`;
};
yDisplay.addDependency(control);
yDisplay.update = function () {
    yDisplay.contents = `y = ${(control.y / circle.r).toFixed(2)}`;
};
let requestID = 0;
let animating = false;
let animate = info.button(3 * x, info.height * 4 / 5, "animate");
animate.onclick = function () {
    let step = function (timestamp) {
        chartControl.x += 1;
        chartControl.onchange();
        requestID = window.requestAnimationFrame(step);
    };
    if (animating) {
        window.cancelAnimationFrame(requestID);
        animating = false;
    }
    else {
        animating = true;
        requestID = window.requestAnimationFrame(step);
    }
};
let functions = new Interactive(getScriptName());
functions.width = 2 * Math.PI * radius;
functions.height = 2 * (radius + margin);
functions.border = true;
// TODO: replace with radio input
let cosInput = functions.checkBox(x + 16, functions.height * 2 / 6, "cos(θ)", false);
let sinInput = functions.checkBox(x + 16, functions.height * 3 / 6, "sin(θ)", false);
let tanIpnut = functions.checkBox(x + 16, functions.height * 4 / 6, "tan(θ)", false);
// TODO: replace with interchangeable functions katex or external SVG
let rect = functions.rectangle(2 * radius, functions.height * 2 / 6, 300, functions.height * 2 / 6);
rect.style.display = 'none';
functions.loadSVG('./sine.svg').then(function (data) {
    data.root.setAttribute('transform', `translate(${rect.x}, ${rect.y})`);
    data.style.display = 'none';
    sinInput.onchange = function () {
        if (sinInput.value) {
            data.style.display = '';
            graph.function = Math.sin;
            graph.draw();
        }
        else {
            data.style.display = 'none';
        }
    };
});
functions.loadSVG('./cosine.svg').then(function (data) {
    data.root.setAttribute('transform', `translate(${rect.x}, ${rect.y})`);
    data.style.display = 'none';
    cosInput.onchange = function () {
        if (cosInput.value) {
            data.style.display = '';
            graph.function = Math.cos;
            graph.draw();
        }
        else {
            data.style.display = 'none';
        }
    };
});
;
functions.loadSVG('./tangent.svg').then(function (data) {
    data.root.setAttribute('transform', `translate(${rect.x}, ${rect.y})`);
    data.style.display = 'none';
    tanIpnut.onchange = function () {
        if (tanIpnut.value) {
            data.style.display = '';
            graph.function = Math.tan;
            graph.draw();
        }
        else {
            data.style.display = 'none';
        }
    };
});
;
// Set the angle to be one radian
control.x = circle.r * Math.cos(1);
control.y = -circle.r * Math.sin(1);
control.updateDependents();
// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
    if (control.y <= 0) {
        return Math.abs(Math.atan2(control.y, control.x));
    }
    else {
        return Math.PI * 2 - Math.atan2(control.y, control.x);
    }
}
//# sourceMappingURL=unit-circle.js.map