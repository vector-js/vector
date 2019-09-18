/**
* @title SVG Line
* @description This interactive demonstrates the SVG line element and its attributes.
* @date May 3, 2019
* @author Kurt Bruns
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 704;
let line = interactive.line(0, 0, 0, 0);
let c1 = interactive.control(150, 200);
let c2 = interactive.control(450, 100);
let text = interactive.text(25, 275, "");
line.update = function () {
    this.x1 = c1.x;
    this.y1 = c1.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
line.update();
line.addDependency(c1);
line.addDependency(c2);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">line</tspan>`;
    let x1 = `<tspan style="fill:#ab6f00">x1</tspan>`;
    let y1 = `<tspan style="fill:#ab6f00">y1</tspan>`;
    let x2 = `<tspan style="fill:#ab6f00">x2</tspan>`;
    let y2 = `<tspan style="fill:#ab6f00">y2</tspan>`;
    this.contents = `&lt;${tag} ${x1}="${line.x1.toFixed(0)}"
                              ${y1}="${line.y1.toFixed(0)}"
                              ${x2}="${line.x2.toFixed(0)}"
                              ${y2}="${line.y2.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(line);
//# sourceMappingURL=svg-line.js.map