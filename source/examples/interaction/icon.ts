/**
* @title
* @description
* @tags []
*/

import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 200;
interactive.border = true;

let i1 = interactive.icon(100, 100, 'animation');
let i2 = interactive.icon(150, 150, 'control');
let i3 = interactive.icon(200, 150, 'animation');
// console.log(i1, i2, i3);

// let circle = interactive.group().circle(100,100,50);
let group = interactive.group();
console.log(interactive, group.group(), group.circle(100,100,50));
console.log(group.group().group().group().group());
console.log(group.svg());
// let svg = new SVG();
// svg.circle(50,50,100);
// console.log(svg, svg.root);
