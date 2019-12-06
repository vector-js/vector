/**
* @title Riemann Sum
* @description This interactive demonstrates three Riemann Sum methods for approximating area underneath a curve. The three approximation methods are the left, right, and trapezoidal approximations.
* @tags [math]
* @weight 2
*/
import { Interactive } from '../../index.js';
export default function main(id) {
    // default configuration
    let n = 7;
    let scale = 100;
    let interactive = new Interactive(id);
    interactive.height = 500;
    interactive.width = 736;
    let slider = interactive.scrubber(24, 475, {
        min: 1,
        max: 100,
        value: n,
        width: 700 - 16
    });
    let rect = interactive.rectangle(25 + 16, 25, 120, 100);
    rect.style.fill = '#ffffff';
    rect.style.stroke = '#333333';
    rect.style.strokeWidth = '1px';
    interactive.input.appendChild(rect);
    let radio = interactive.radioControl(60, 50, ['left', 'right', 'trapezoid']);
    let plot = interactive.plot((x) => { return Math.cos(x) + x / 3 + .5; }, {
        x: 16,
        y: 0,
        width: 700,
        height: 400,
        margin: 0,
        labels: false,
        scaleX: scale,
        scaleY: scale,
        originX: 0,
        originY: 400
    });
    interactive.rectangle(16, 0, 700, 400).classList.add('default');
    let path = plot.staticGroup.path('');
    let control1 = interactive.control(100, 0);
    let control2 = interactive.control(500, 0);
    let aLabel = interactive.text(0, 425, "a");
    aLabel.style.fontFamily = 'KaTeX_Math';
    aLabel.style.fontSize = '22px';
    aLabel.style.textAnchor = 'middle';
    aLabel.addDependency(control1, control2);
    aLabel.update = function () {
        aLabel.x = Math.min(control1.x, control2.x) + 16;
    };
    let bLabel = interactive.text(0, 425, "b");
    bLabel.style.fontFamily = 'KaTeX_Math';
    bLabel.style.fontSize = '22px';
    bLabel.style.textAnchor = 'middle';
    bLabel.addDependency(control1, control2);
    bLabel.update = function () {
        bLabel.x = Math.max(control1.x, control2.x) + 16;
    };
    plot.staticGroup.appendChild(control1);
    plot.staticGroup.appendChild(control2);
    function constrain(oldPos, newPos) {
        let x = newPos.x;
        if (x < 0) {
            x = 0;
        }
        else if (x > 700) {
            x = 700;
        }
        return { x: x, y: -plot.call(x) };
    }
    control1.constrain = constrain;
    control2.constrain = constrain;
    control1.translate(100, 0);
    control2.translate(500, 0);
    path.addDependency(control1, control2, slider, radio);
    path.style.fill = '#dadada';
    path.style.fillOpacity = '.5';
    path.update = function () {
        let start = control1.x < control2.x ? control1 : control2;
        let end = control1.x < control2.x ? control2 : control1;
        let delta = (end.x - start.x) / (Math.round(slider.value));
        let x = start.x;
        let nextX = start.x + delta;
        let y = -plot.call(x);
        let nextY = -plot.call(nextX);
        if (delta !== 0) {
            path.d = `M ${start.x} 0 `;
            while (x < end.x - .00001) {
                switch (radio.value) {
                    case "left":
                        path.d += `L ${x} ${y} L ${nextX} ${y} L ${nextX} 0`;
                        break;
                    case "right":
                        path.d += `L ${x} ${nextY} L ${nextX} ${nextY} L ${nextX} 0`;
                        break;
                    case "trapezoid":
                        path.d += `L ${x} ${y} L ${nextX} ${nextY} L ${nextX} 0`;
                        break;
                }
                x = nextX;
                y = nextY;
                nextX = x + delta;
                nextY = -plot.call(nextX);
            }
            if (x >= end.x) {
                path.d += `L ${end.x} 0 Z`;
            }
        }
        else {
            path.d = `M ${start.x} ${end.x} L ${start.x} 0`;
        }
    };
    path.update();
}
//# sourceMappingURL=riemann-sum.js.map