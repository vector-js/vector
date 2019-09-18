/**
* @title SVG Transform
* @description
* @draft true
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
let rotate = interactive.control(2 * w, 0);
rotate.constrainToCircle(0, 0, 2 * w);
translateGroup.root.appendChild(scaleGroup.root);
scaleGroup.root.appendChild(rotateGroup.root);
rotateGroup.root.appendChild(group.root);
translateGroup.root.appendChild(scale.root);
scaleGroup.root.appendChild(rotate.root);
// translateGroup.root.appendChild(group.root);
let hidden = interactive.circle(0, 0, 0);
hidden.addDependency(scale);
hidden.update = function () {
    hidden.cx = -scale.x;
    hidden.cy = -scale.y;
};
scale.root.appendChild(hidden.root);
scale.addDependency(rotate);
scale.update = function () {
    scale.root.setAttribute('transform', `translate(${scale.x}, ${scale.y}) rotate(${getAngle()})`);
};
// let transformText = interactive.text( 150, interactive.maxY - 20, '');
// transformText.addDependency(scale, rotate, translate);
// transformText.update = function() {
//   let scaleX = scale.x/(2*w);
//   let scaleY = scale.y/(2*w);
//   transformText.contents = `translate(${translate.x}, ${translate.y}) `;
//   transformText.contents += `scale(${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}) `;
//   transformText.contents += `rotate(${getAngle()}) `;
//
// };
// transformText.root.setAttribute('alignment-baseline', 'middle');
// transformText.root.setAttribute('text-anchor', 'middle');
// transformText.update();
let translateText = interactive.text(150, interactive.maxY - 20, '');
translateText.addDependency(translate);
translateText.update = function () {
    translateText.contents = `translate(${translate.x}, ${translate.y}) `;
};
translateText.update();
translateGroup.addDependency(translateText);
translateGroup.update = function () {
    translateGroup.root.setAttribute('transform', translateText.contents);
};
let scaleText = interactive.text(150, interactive.maxY - 20, '');
scaleText.addDependency(scale);
scaleText.update = function () {
    let scaleX = scale.x / (2 * w);
    let scaleY = scale.y / (2 * w);
    scaleText.contents = `scale(${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}) `;
};
scaleText.update();
scaleGroup.addDependency(scaleText);
scaleGroup.update = function () {
    scaleGroup.root.setAttribute('transform', scaleText.contents);
};
let rotateText = interactive.text(150, interactive.maxY - 20, '');
rotateText.addDependency(rotate);
rotateText.update = function () {
    rotateText.contents = `rotate(${getAngle()}) `;
};
rotateText.update();
rotateGroup.addDependency(rotateText);
rotateGroup.update = function () {
    rotateGroup.root.setAttribute('transform', rotateText.contents);
};
function getAngle() {
    let angle;
    if (rotate.y <= 0) {
        angle = Math.abs(Math.atan2(rotate.y, rotate.x));
    }
    else {
        angle = Math.PI * 2 - Math.atan2(rotate.y, rotate.x);
    }
    return (360 - angle * 180 / Math.PI).toFixed(1);
}
//# sourceMappingURL=svg-transform-test.js.map