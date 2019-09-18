/**
* @title SVG Path Quadratic Bezier Curve
* @description This interactive demonstrates the quadratic bezier command for a SVG path element. There are three control points that allow the user to control the shape of the bezier curve that is drawn.
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
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
let path = interactive.path('');
let c1 = interactive.control(150, 100);
let c2 = interactive.control(300, 200);
let c3 = interactive.control(450, 100);
let text = interactive.text(25, 275, "");
path.update = function () {
    path.d = `M ${c1.x} ${c1.y} Q ${c2.x} ${c2.y} ${c3.x} ${c3.y}`;
};
path.update();
path.addDependency(c1);
path.addDependency(c2);
path.addDependency(c3);
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
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">path</tspan>`;
    let d = `<tspan style="fill:#ab6f00">d</tspan>`;
    this.contents = `&lt;${tag} ${d}="M ${c1.x.toFixed(0)}
                                      ${c1.y.toFixed(0)}
                                    Q ${c2.x.toFixed(0)}
                                      ${c2.y.toFixed(0)}
                                      ${c3.x.toFixed(0)}
                                      ${c3.y.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(path);
//# sourceMappingURL=svg-path-bezier-quadratic.js.map