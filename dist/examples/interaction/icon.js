/**
* @title
* @description
* @tags []
*/
import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 200;
interactive.border = true;
let control1 = interactive.control(100, 100);
let i1 = interactive.icon(100, 100, 'animation');
let i2 = interactive.icon(150, 150, 'control');
let i3 = interactive.icon(200, 150, 'animation');
// console.log(i1, i2, i3);
// let circle = interactive.group().circle(100,100,50);
let g1 = interactive.group();
let g2 = g1.group();
let c1 = g1.circle(100, 100, 50);
let svg = g1.svg();
let control2 = interactive.control(200, 200);
// let svg = new SVG();
// svg.circle(50,50,100);
// console.log(svg, svg.root);
//# sourceMappingURL=icon.js.map