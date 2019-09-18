/**
* @title Area Between Two Vectors
* @description This interactive demonstrates the area formed between two vectors.
* @tags [math]
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.window = true;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.height / 2;
;
// Create a control
let c0 = interactive.control(-180, 50);
let c1 = interactive.control(-20, -60);
let c2 = interactive.control(50, 80);
// Create a path
let path = interactive.path('');
path.root.style.fill = 'rgb(236,236,236)';
path.update = function () {
    path.d = `M ${c0.x} ${c0.y}
            L ${c1.x} ${c1.y}
            L ${c2.x - c0.x + c1.x} ${c2.y - c0.y + c1.y}
            L ${c2.x} ${c2.y}
            Z`;
};
path.update();
path.addDependency(c0);
path.addDependency(c1);
path.addDependency(c2);
let arrow1 = interactive.path('');
arrow1.addDependency(c0);
arrow1.addDependency(c1);
arrow1.update = function () {
    let r = 8;
    let angle = Math.atan2(c1.y - c0.y, c1.x - c0.x);
    this.d = `M ${c1.x + 1.3 * r * Math.cos(angle)} ${c1.y + 1.3 * r * Math.sin(angle)}
  L ${c1.x + r * Math.cos(angle - 2 * Math.PI / 3)} ${c1.y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${c1.x + r * Math.cos(angle + 2 * Math.PI / 3)} ${c1.y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow1.root.style.fill = '#0366EE';
arrow1.root.style.stroke = 'none';
arrow1.update();
let arrow2 = interactive.path('');
arrow2.addDependency(c0);
arrow2.addDependency(c2);
arrow2.update = function () {
    let r = 8;
    let angle = Math.atan2(c2.y - c0.y, c2.x - c0.x);
    this.d = `M ${c2.x + 1.3 * r * Math.cos(angle)} ${c2.y + 1.3 * r * Math.sin(angle)}
  L ${c2.x + r * Math.cos(angle - 2 * Math.PI / 3)} ${c2.y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${c2.x + r * Math.cos(angle + 2 * Math.PI / 3)} ${c2.y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow2.root.style.fill = '#0366EE';
arrow2.root.style.stroke = 'none';
arrow2.update();
c1.addDependency(c0);
c1.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c2.addDependency(c0);
c2.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
//# sourceMappingURL=area-between-two-vectors.js.map