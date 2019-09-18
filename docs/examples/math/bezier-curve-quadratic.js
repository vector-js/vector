/**
* @title Quadratic Bezier Curve
* @description This interactive demonstrates a quadratic bezier curve.
* @tags [math]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.window = true;
let l1 = interactive.line(0, 0, 0, 0);
let l2 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
let path = interactive.path('');
let c1 = interactive.control(150, 100);
let c2 = interactive.control(300, 200);
let c3 = interactive.control(450, 100);
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
//# sourceMappingURL=bezier-curve-quadratic.js.map