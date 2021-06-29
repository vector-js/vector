/**
* @title Trigonometric Functions
* @description This interactive shows the connection between the three trigonometric functions and the unit circle.
* @tags [math]
* @ignore true
*/
import { Interactive, getScriptName, download } from '../../index.js';
import Group from '../../elements/svg/group.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
let width = 230;
let scale = width / Math.PI;
let radius = scale;
let margin = 2 * radius - width / 2;
// let functions = [Math.cos, Math.sin, Math.tan];
let functions = [Math.cos, Math.sin];
interactive.height = functions.length * width + (functions.length - 1) * margin;
interactive.width = width + margin + 2 * width;
class NumberWrapper extends Group {
    _value;
    constructor(value) {
        super();
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.updateDependents();
    }
}
let angle = new NumberWrapper(0);
let y = 0;
for (let f of functions) {
    let circleInteractive = interactive.interactive(0, y); // TODO: check this logic
    circleInteractive.rectangle(-width / 2, -width / 2, width, width);
    circleInteractive.height = width;
    circleInteractive.width = width;
    circleInteractive.originX = circleInteractive.width / 2;
    circleInteractive.originY = circleInteractive.height / 2;
    let triangle = circleInteractive.path('');
    let circle = circleInteractive.circle(0, 0, radius);
    let control = circleInteractive.control(circle.r, 0);
    control.constrainTo(circle);
    control.addDependency(angle);
    control.update = function () {
        this.x = circle.r * Math.cos(angle.value);
        this.y = -circle.r * Math.sin(angle.value);
    };
    control.onchange = function () {
        if (control.y <= 0) {
            angle.value = Math.abs(Math.atan2(control.y, control.x));
        }
        else {
            angle.value = Math.PI * 2 - Math.atan2(control.y, control.x);
        }
    };
    triangle.addDependency(control, angle);
    if (f === Math.tan) {
        triangle.update = function () {
            triangle.d = `M 0 0
                    L ${Math.sign(control.x) * Math.abs(circle.r)} ${0}
                    L ${Math.sign(control.x) * Math.abs(circle.r)} ${Math.sign(control.y) * Math.abs(circle.r * Math.tan(angle.value))}
                    Z`;
        };
    }
    else {
        triangle.update = function () {
            triangle.d = `M 0 0
                    L ${control.x} 0
                    L ${control.x} ${control.y}
                    Z`;
        };
    }
    triangle.update();
    // triangle.style.stroke = 'none';
    triangle.style.fill = '#f8f8f8';
    let side = circleInteractive.line(0, 0, 0, 0);
    switch (f) {
        case Math.cos:
            side.update = function () {
                side.x2 = control.x;
            };
            break;
        case Math.sin:
            side.update = function () {
                side.x1 = control.x;
                side.x2 = control.x;
                side.y2 = control.y;
            };
            break;
        case Math.tan:
            side = circleInteractive.line(circle.r, 0, circle.r, 0);
            side.update = function () {
                if (control.x < 0) {
                    side.x1 = -circle.r;
                    side.x2 = -circle.r;
                }
                else {
                    side.x1 = circle.r;
                    side.x2 = circle.r;
                }
                side.y2 = Math.sign(control.y) * Math.abs(circle.r * Math.tan(angle.value));
            };
    }
    side.style.stroke = 'cornflowerblue';
    side.style.strokeWidth = '2';
    // side.setAttribute('transform', 'scale(1,-1)');
    side.addDependency(angle, control);
    side.update();
    circleInteractive.circle(0, 0, 3).style.fill = '#404040';
    let plotInteractive = interactive.interactive(width + margin, y, {
        width: 2 * width,
        height: width
    });
    let plot = plotInteractive.plot(f, {
        width: 2 * width,
        height: width,
        scaleX: scale,
        scaleY: scale,
        originX: 0,
        originY: width / 2,
        zoomable: false,
        displayPoint: false,
        border: true
    });
    let line = plot.staticGroup.line(0, 0, 0, 0);
    line.setAttribute('transform', 'scale(1,-1)');
    line.style.stroke = 'cornflowerblue';
    line.style.strokeWidth = '2';
    line.addDependency(angle);
    line.update = function () {
        line.x1 = scale * angle.value;
        line.y1 = 0;
        line.x2 = line.x1;
        line.y2 = plot.call(line.x1);
    };
    let chartControl = interactive.control(0, 0);
    plot.staticGroup.appendChild(chartControl);
    chartControl.addDependency(angle, plot);
    chartControl.update = function () {
        chartControl.x = scale * angle.value;
        chartControl.y = -plot.call(chartControl.x);
    };
    chartControl.update();
    chartControl.constrain = (oldPos, newPos) => {
        let x = (plotInteractive.width + newPos.x) % plotInteractive.width;
        let y = -plot.call(x);
        return { x: x, y: y };
    };
    chartControl.onchange = function () {
        angle.value = chartControl.x / scale;
    };
    // draw gridlines
    for (let i = -5; i <= 10; i++) {
        for (let j = -5; j <= 5; j++) {
            let rect1 = plot.viewPort.rectangle(i, j, 1, 1);
            let rect2 = circleInteractive.rectangle(i * circle.r, j * circle.r, circle.r, circle.r);
            circleInteractive.background.prependChild(rect2);
            rect1.root.setAttribute('vector-effect', 'non-scaling-stroke');
            rect2.root.setAttribute('vector-effect', 'non-scaling-stroke');
            rect1.style.strokeOpacity = '.25';
            rect2.style.strokeOpacity = '.25';
        }
    }
    y += width + margin;
}
angle.value = 1;
window.download = download;
//# sourceMappingURL=trigonometric-functions.js.map