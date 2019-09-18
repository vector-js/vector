/**
* @title SVG Rectangle Element
* @description This interactive demonstrates the SVG rectangle element and its attributes.
* @author Kurt Bruns
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 704;
let rect = interactive.rectangle(0, 0, 0, 0);
let c1 = interactive.control(150, 100);
let c2 = interactive.control(450, 200);
let text = interactive.text(25, 275, "");
c2.update = function () {
    this.x += c1.dx;
    this.y += c1.dy;
};
c2.addDependency(c1);
rect.update = function () {
    this.x = c1.x;
    this.y = c1.y;
    this.width = c2.x - c1.x;
    this.height = c2.y - c1.y;
};
rect.update();
rect.addDependency(c1);
rect.addDependency(c2);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">rect</tspan>`;
    let x = `<tspan style="fill:#ab6f00">x</tspan>`;
    let y = `<tspan style="fill:#ab6f00">y</tspan>`;
    let width = `<tspan style="fill:#ab6f00">width</tspan>`;
    let height = `<tspan style="fill:#ab6f00">height</tspan>`;
    this.contents = `&lt;${tag} ${x}="${rect.x.toFixed(0)}
                              ${y}="${rect.y.toFixed(0)}
                              ${width}="${rect.width.toFixed(0)}
                              ${height}="${rect.height.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(rect);
//# sourceMappingURL=svg-rectangle.js.map