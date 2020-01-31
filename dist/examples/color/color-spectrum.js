/**
* @title Color Wheel
* @description This interactive demonstrates the possible hues as modeled by the color wheel. A slider allows the user to control the number of hues displayed along the perimeter of the circle.
* @tags [color]
* @ignore false
*/
import { Interactive } from '../../index.js';
import { trapezoidalWave } from '../../util/math.js';
/**
* Constructs a 600 by 600 interactive demonstrating the color wheel.
*/
export default function main(id) {
    let interactive = new Interactive(id, {
        width: 600,
        height: 150
    });
    let r = trapezoidalWave(-1 / 3, 1, 1);
    let g = trapezoidalWave(0 / 3, 1, 1);
    let b = trapezoidalWave(1 / 3, 1, 1);
    let slider = interactive.slider(25, 125, {
        min: 6,
        max: 32,
        value: 6,
        width: interactive.width - 50,
    });
    let group = interactive.group();
    group.addDependency(slider);
    group.update = function () {
        // Clear the current state of the color wheel
        while (group.root.firstChild) {
            group.root.removeChild(group.root.firstChild);
        }
        // Redraw the color spectrum
        let n = Math.floor(slider.value);
        let width = interactive.width / n;
        let height = 100;
        for (let i = 0; i < n; i++) {
            let v = i / (n);
            let x = interactive.width * (i / n);
            let rect = interactive.rectangle(x, 0, width, height);
            let rv = r(v) * 255;
            let gv = g(v) * 255;
            let bv = b(v) * 255;
            rect.style.fill = `rgb(${rv}, ${gv}, ${bv})`;
        }
    };
    group.update();
}
//# sourceMappingURL=color-spectrum.js.map