/**
* @title SVG Path Cubic Bezier Curve
* @description This interactive demonstrates the cubic bezier command for a SVG path element. There are four control points that allow the user to control the shape of the bezier curve that is drawn.
* @date May 3, 2019
* @author Kurt Bruns
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 704;
let l1 = interactive.line(0, 0, 0, 0);
let l2 = interactive.line(0, 0, 0, 0);
let l3 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
l3.stroke = 'cornflowerblue';
let path = interactive.path('');
let c1 = interactive.control(150, 100);
let c2 = interactive.control(150, 200);
let c3 = interactive.control(450, 200);
let c4 = interactive.control(450, 100);
let text = interactive.text(25, 275, "");
path.update = function () {
    path.d = `M ${c1.x} ${c1.y} C ${c2.x} ${c2.y} ${c3.x} ${c3.y} ${c4.x} ${c4.y}`;
};
path.update();
path.addDependency(c1);
path.addDependency(c2);
path.addDependency(c3);
path.addDependency(c4);
l1.update = function () {
    this.x1 = c1.x;
    this.y1 = c1.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
l1.update();
l1.addDependency(c1);
l1.addDependency(c2);
l2.update = function () {
    this.x1 = c2.x;
    this.y1 = c2.y;
    this.x2 = c3.x;
    this.y2 = c3.y;
};
l2.update();
l2.addDependency(c2);
l2.addDependency(c3);
l3.update = function () {
    this.x1 = c3.x;
    this.y1 = c3.y;
    this.x2 = c4.x;
    this.y2 = c4.y;
};
l3.update();
l3.addDependency(c3);
l3.addDependency(c4);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class. Added toFixed function call for
// tablet and mobile using non-integer numbers, maybe there is a better way?
text.update = function () {
    let tag = `<tspan style="fill:purple">path</tspan>`;
    let d = `<tspan style="fill:#ab6f00">d</tspan>`;
    this.contents = `&lt;${tag} ${d}="M ${c1.x.toFixed(0)}
                                      ${c1.y.toFixed(0)}
                                    C ${c2.x.toFixed(0)}
                                      ${c2.y.toFixed(0)}
                                      ${c3.x.toFixed(0)}
                                      ${c3.y.toFixed(0)}
                                      ${c4.x.toFixed(0)}
                                      ${c4.y.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(path);
//# sourceMappingURL=svg-path-bezier-cubic.js.map