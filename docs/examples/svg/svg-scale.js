/**
* @title SVG Transform Scale Attribute
* @description This interactive how the scale transformation can be applied to a SVG element.
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
let control = interactive.control(2 * w, 2 * w);
let scaleText = interactive.text(75, interactive.maxY - 20, '');
scaleText.addDependency(control);
scaleText.update = function () {
    let scaleX = control.x / (2 * w);
    let scaleY = control.y / (2 * w);
    scaleText.contents = `scale(${scaleX.toFixed(2)}, ${scaleY.toFixed(2)})`;
};
scaleText.root.setAttribute('alignment-baseline', 'middle');
scaleText.root.setAttribute('text-anchor', 'middle');
scaleText.update();
group.addDependency(scaleText);
group.update = function () {
    group.root.setAttribute('transform', scaleText.contents);
};
//# sourceMappingURL=svg-scale.js.map