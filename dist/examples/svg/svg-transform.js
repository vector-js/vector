/**
* @title SVG Transform Attribute
* @description This interactive demonstrates how the transform attribute can be used to transform SVG elements
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 700;
interactive.height = 300;
interactive.border = true;
let w = 60;
interactive.originX = 75;
interactive.originY = 75;
let translateGroup = interactive.group();
let scaleGroup = interactive.group();
let rotateGroup = interactive.group();
let group = interactive.group();
let r1 = interactive.rectangle(0, 0, w, w);
let r2 = interactive.rectangle(w, 0, w, w);
let r3 = interactive.rectangle(0, w, w, w);
let r4 = interactive.rectangle(w, w, w, w);
group.root.appendChild(r1.root);
group.root.appendChild(r2.root);
group.root.appendChild(r3.root);
group.root.appendChild(r4.root);
r4.style.fill = '#d8d8d8';
r3.style.fill = '#aaaaaa';
r2.style.fill = '#555555';
r1.style.fill = '#333333';
group.style.opacity = '.7';
// group.style.strokeOpacity = '0';
let translate = interactive.control(0, 0);
let scale = interactive.control(2 * w, 2 * w);
let rotate = interactive.control(w, -20);
// scale.addDependency(translate);
// scale.update = function() {
//   scale.x += translate.dx;
//   scale.y += translate.dy;
// };
//
// rotate.addDependency(translate, group);
// rotate.update = function() {
//   rotate.x += translate.dx;
//   rotate.y += translate.dy;
//   let matrix = group.root.getCTM();
//   // rotate.constrainToCircle(0,0, Math.hypot(scale.x, scale.y));
// };
group.root.appendChild(scale.root);
group.addDependency(scale, translate);
group.update = function () {
    let scaleX = scale.x / (2 * w);
    let scaleY = scale.y / (2 * w);
    group.root.setAttribute('transform', `translate(${translate.x}, ${translate.y}) scale(${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}) `);
};
//# sourceMappingURL=svg-transform.js.map