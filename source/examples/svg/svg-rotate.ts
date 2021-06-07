/**
* @title SVG Transform Rotate Attribute
* @description This interactive how the rotate transformation can be applied to a SVG element.
* @tags [svg]
*/

import {Interactive, getScriptName} from '../../index.js';

let interactive = new Interactive(getScriptName());
interactive.width = 736;
interactive.height = 300;
interactive.border = true;
let w = 50;
interactive.originX = interactive.width/2;
interactive.originY = interactive.height/2;
let group = interactive.group();
let r1 = interactive.rectangle(0,0,w,w);
let r2 = interactive.rectangle(w,0,w,w);
let r3 = interactive.rectangle(0,w,w,w);
let r4 = interactive.rectangle(w,w,w,w);
group.root.appendChild( r1.root);
group.root.appendChild( r2.root);
group.root.appendChild( r3.root);
group.root.appendChild( r4.root);
r4.style.fill = '#d8d8d8';
r3.style.fill = '#aaaaaa';
r2.style.fill = '#555555';
r1.style.fill = '#333333';
group.style.opacity = '.7';

let control = interactive.control(2*w, 0);
control.constrainToCircle(0,0,2*w);


let rotateText = interactive.text( 75, interactive.maxY - 20, '');
rotateText.addDependency(control);
rotateText.update = function() {
  rotateText.contents = `rotate(${getAngle()})`;
};
rotateText.root.setAttribute('dominant-baseline', 'middle');
rotateText.root.setAttribute('text-anchor', 'middle');
rotateText.update();

group.addDependency(rotateText);
group.update = function() {
  group.root.setAttribute('transform', rotateText.contents);
};

function getAngle() : string {
  let angle: number;
  if( control.y <= 0 ) {
    angle = Math.abs(Math.atan2( control.y, control.x));
  } else {
    angle = Math.PI*2 - Math.atan2( control.y, control.x);
  }

  return (360 -angle*180/Math.PI).toFixed(1);
}
