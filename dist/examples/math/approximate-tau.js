/**
* @ignore true
*/
import { Interactive } from '../../index.js';
export default function main(id) {
    let interactive = new Interactive(id);
    interactive.classList.add('default');
    interactive.height = 400;
    interactive.originX = interactive.width / 2;
    interactive.originY = interactive.height / 2 - 30;
    let circle = interactive.circle(0, 0, 75);
    circle.style.stroke = '#0366EE';
    let insidePolygon = interactive.path('');
    let outsidePolygon = interactive.path('');
    let slider = interactive.slider(-100, 170, {
        width: 200,
        min: 3,
        max: 16,
        step: 1
    });
    insidePolygon.addDependency(slider);
    // insidePolygon.style.fill = '#f8f8f8';
    insidePolygon.update = function () {
        let n = Math.floor(slider.value);
        let d = `M ${circle.r} 0`;
        for (let i = 0; i < n; i++) {
            let angle = 2 * Math.PI * (i / n);
            d += `L ${circle.r * Math.cos(angle)} ${circle.r * Math.sin(angle)}`;
        }
        insidePolygon.d = d + 'z';
    };
    insidePolygon.update();
    outsidePolygon.addDependency(slider);
    outsidePolygon.update = function () {
        let n = Math.floor(slider.value);
        let r = circle.r / Math.cos(Math.PI / n);
        let d = `M ${r} 0`;
        for (let i = 0; i < n; i++) {
            let angle = 2 * Math.PI * (i / n);
            d += `L ${r * Math.cos(angle)} ${r * Math.sin(angle)}`;
        }
        outsidePolygon.d = d + 'z';
    };
    outsidePolygon.update();
    let text = interactive.text(0, 210, '...');
    text.addDependency(insidePolygon, outsidePolygon, slider, circle);
    text.update = function () {
        let low = insidePolygon.getTotalLength() / (circle.r);
        let high = outsidePolygon.getTotalLength() / (circle.r);
        text.contents = `${low.toFixed(3)} ≤ τ ≤ ${high.toFixed(3)}`;
    };
    text.style.textAnchor = 'middle';
    text.update();
}
//# sourceMappingURL=approximate-tau.js.map