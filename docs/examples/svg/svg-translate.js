/**
* @title SVG Transform Translate Attribute
* @description This interactive how the translate transformation can be applied to a SVG element.
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 700;
interactive.height = 300;
interactive.border = true;
let w = 50;
interactive.originX = interactive.width / 2 - w;
interactive.originY = interactive.height / 2 - w;
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
let control = interactive.control(0, 0);
let translateText = interactive.text(75, interactive.maxY - 20, '');
translateText.addDependency(control);
translateText.update = function () {
    translateText.contents = `translate(${control.x}, ${control.y})`;
};
translateText.root.setAttribute('alignment-baseline', 'middle');
translateText.root.setAttribute('text-anchor', 'middle');
translateText.update();
group.addDependency(translateText);
group.update = function () {
    group.root.setAttribute('transform', translateText.contents);
};
//# sourceMappingURL=svg-translate.js.map