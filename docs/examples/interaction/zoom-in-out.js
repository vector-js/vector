/**
* @title Zoom and Pan Interactive
* @description This interactive demonstrates how to zoom in and out on a specific point.
* @input The input to this interactive is the scroll wheel of the mouse, the mouse click, and the mouse position.
* @tags []
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
let bbox = interactive.root.getBoundingClientRect();
let width = 704 > bbox.width ? bbox.width : 704;
let height = 300 > bbox.height ? bbox.height : 300;
interactive.width = width;
interactive.height = height;
let zoomIntensity = .02;
let scale = 1;
let originx = 0;
let originy = 0;
let visibleWidth = interactive.width;
let visibleHeight = interactive.height;
interactive.setViewBox(originx, originy, visibleWidth, visibleHeight);
let margin = 50;
let w = 20;
let h = 20;
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let x = i * w + width / 2 - 5;
        let y = j * h + margin;
        interactive.rectangle(x, y, w, h);
        // rectangle.root.setAttribute('vector-effect','non-scaling-stroke');
    }
}
interactive.root.addEventListener('wheel', function (event) {
    event.preventDefault();
    // calculate the position of the mouse over the interactive
    let br = interactive.root.getBoundingClientRect();
    let x = event.clientX - br.left;
    let y = event.clientY - br.top;
    // calculate the zoom direction
    let wheel = event.deltaY < 0 ? 1 : -1;
    let zoom = Math.exp(wheel * zoomIntensity);
    // let zoom = Math.log10(Math.abs(event.deltaY));
    originx -= x / (scale * zoom) - x / scale;
    originy -= y / (scale * zoom) - y / scale;
    scale *= zoom;
    visibleWidth = width / scale;
    visibleHeight = height / scale;
    interactive.setViewBox(originx, originy, visibleWidth, visibleHeight);
});
let active = false;
let prevX = 0;
let prevY = 0;
interactive.root.addEventListener('mousedown', function (event) {
    active = true;
    prevX = event.clientX;
    prevY = event.clientY;
});
interactive.root.addEventListener('mouseup', function (event) {
    active = false;
});
interactive.root.addEventListener('mousemove', function (event) {
    if (active) {
        let deltaX = event.clientX - prevX;
        let deltaY = event.clientY - prevY;
        originx -= deltaX / scale;
        originy -= deltaY / scale;
        prevX = event.clientX;
        prevY = event.clientY;
        interactive.setViewBox(originx, originy, visibleWidth, visibleHeight);
    }
});
// xAxis.addStartArrow();
// xAxis.addEndArrow();
//# sourceMappingURL=zoom-in-out.js.map