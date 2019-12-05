/**
* @title Plot Element
* @description This interactive demonstrates the plot element
* @tags [elements]
*/
import { Interactive } from '../../index.js';
/**
* Creates a graph of the sine function within the element with the provided id.
*/
export default function main(id) {
    let interactive = new Interactive(id);
    interactive.width = 700;
    interactive.height = 400;
    let plot = interactive.plot(Math.sin, {
        title: "Sine Function",
        originX: 0,
        originY: 150,
        scaleX: 300 / Math.PI,
        scaleY: 300 / Math.PI,
        zoomable: false,
        grid: true
    });
}
//# sourceMappingURL=plot-element.js.map