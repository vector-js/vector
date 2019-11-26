/**
* @title Interactive SVG Clip Path
* @description This interactive demonstrates how a clip path is applied to another element.
* @tags [svg]
*/

import {Interactive, getScriptName} from '../../index.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 736;
interactive.height = 300;
interactive.originX = 0;
interactive.originY = 0;

// Draw a grid of squares
let size = 30;
let counter = 0;
for (let i = 0; i < interactive.width/size; i++) {
  for (let j = 0; j < interactive.height/size; j++) {
      let rectangle = interactive.rectangle( i*size, j*size, size, size);
      rectangle.classList.add('default');
      if( counter % 2 == 0 ) {
        rectangle.style.fill = 'lightgray';
      }
      counter++;
  }
  counter++;
}

// TODO: hide a smiley face in one of the squares (:

// Create a control circle and modify its dimensions, also hide the display point
// TODO: in the future it probably will be best to be able to make a basic element draggable
let control = interactive.controlCircle( interactive.width/2, interactive.height/2);
control.handle.r = 50;
control.handle.style.strokeOpacity = '1';
control.point.style.display = 'none';

// TODO: this is hacky and should be replaced with a clip path element? or a wrapper or something?
let clipPath = interactive.clipPath();
let circle = clipPath.circle( interactive.width/2, interactive.height/2, 50);
circle.addDependency(control);
circle.update = function() {
  this.cx = control.x;
  this.cy = control.y;
}

interactive.background.root.setAttribute('clip-path', `url(#${clipPath.id})`);
