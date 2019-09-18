/**
* @title Interactive SVG Circle
* @description This interactive demonstrates the basic properties of the SVG Circle Element.
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 704;
let circle = interactive.circle(0, 0, 0);
let l1 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
let text = interactive.text(25, 275, "");
let centerControl = interactive.control(300, 150);
let radiusControl = interactive.control(375, 150);
circle.update = function () {
    this.cx = centerControl.x;
    this.cy = centerControl.y;
    this.r = Math.abs(radiusControl.x - centerControl.x);
};
circle.update();
circle.addDependency(centerControl);
circle.addDependency(radiusControl);
radiusControl.update = function () {
    this.x += centerControl.dx;
    this.y += centerControl.dy;
};
radiusControl.addDependency(centerControl);
radiusControl.constrainToX();
l1.update = function () {
    this.x1 = centerControl.x;
    this.y1 = centerControl.y;
    this.x2 = radiusControl.x;
    this.y2 = radiusControl.y;
};
l1.update();
l1.addDependency(centerControl);
l1.addDependency(radiusControl);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">circle</tspan>`;
    let cx = `<tspan style="fill:#ab6f00">cx</tspan>`;
    let cy = `<tspan style="fill:#ab6f00">cy</tspan>`;
    let r = `<tspan style="fill:#ab6f00">r</tspan>`;
    this.contents = `&lt;${tag} ${cx}="${circle.cx.toFixed(0)}"
                              ${cy}="${circle.cy.toFixed(0)}"
                              ${r}="${circle.r.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(circle);
export default {
    title: 'Interactive SVG Circle',
    description: 'This interactive demonstrates the basic properties of the SVG Circle Element. It has on control point which controls the position of the center of the circle and another control point which controls the length of the radius.',
    interactive: interactive,
    input: [
        centerControl,
        radiusControl
    ],
    tags: ['svg', 'circle']
};
//# sourceMappingURL=svg-circle.js.map