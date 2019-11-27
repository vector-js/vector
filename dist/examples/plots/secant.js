/**
* @title Secant Plot
* @description This interactive demonstrates the plot element
* @tags [elements]
* @ignore true
*/
import { Interactive } from '../../index.js';
export default function main(idOrElement) {
    // Initialize the interactive
    let interactive = new Interactive(idOrElement);
    interactive.width = 700;
    interactive.height = 700;
    // Create a new graph object
    let scale = 300 / Math.PI;
    let plot2 = interactive.plot(600, 600, Math.cos, {
        x: 50,
        y: 50,
        originX: 0,
        originY: 300,
        scaleX: scale,
        scaleY: scale,
        zoomable: false,
        controls: false,
        grid: false
    });
    plot2.fPath.style.stroke = '#1bc075';
    let secant = (x) => { return 1 / Math.cos(x); };
    let plot = interactive.plot(600, 600, secant, {
        x: 50,
        y: 50,
        originX: 0,
        originY: 300,
        scaleX: scale,
        scaleY: scale,
        zoomable: false,
        controls: false
    });
    let group = interactive.group();
    group.style.fontFamily = 'KaTeX_Main';
    group.style.fontSize = '22px';
    let title = group.text(interactive.width / 2, 25, 'secant(');
    let span = title.tspan('x');
    span.setAttribute('text-anchor', 'middle');
    span.setAttribute('alignment-baseline', 'middle');
    span.style.fontFamily = 'KaTeX_Math';
    title.contents += ')';
    title.setAttribute('alignment-baseline', 'middle');
    title.setAttribute('text-anchor', 'middle');
    let xPoints = plot.getXLabelPoints();
    let yPoints = plot.getYLabelPoints();
    for (let p of xPoints) {
        let point = plot.internalToAbsolute(p);
        let text = group.text(point.x + 50, 50 + 600 + 25, `${p.x}`);
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');
    }
    for (let p of yPoints) {
        let point = plot.internalToAbsolute(p);
        let text = group.text(point.x + 50 - 25, point.y + 50, `${p.y}`);
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');
    }
}
//# sourceMappingURL=secant.js.map