/**
* @title Unit Circle Angle
* @description An interactive to demonstrate how a point along the circumference of the unit circle also defines an angle in the polar coordinate system.
* @tags [math]
* @date June 9, 2019
* @author Kurt Bruns
*/

import {Interactive} from '../../index.js';
// @ts-ignore
import katex from '/katex/katex.module.js';

export default function main(id:string) {

  // Initialize the interactive
  let interactive = new Interactive(id);
  interactive.window = false;
  interactive.width = 250;
  interactive.height = 250;
  interactive.originX = interactive.width/2;
  interactive.originY = interactive.height/2;
  interactive.classList.add('center');

  // Create a circle
  let circle = interactive.circle( 0, 0, 100);
  circle.classList.add('default');

  // Create a control
  let control = interactive.control( circle.r*Math.cos(-1), circle.r*Math.sin(-1));
  control.constrainToCircle( circle.cx, circle.cy, circle.r);

  // Gets the normalized angle between zero and tau. TODO: Maybe transform the
  // coordinate system so that the positive y-direction is up instead of down.
  // UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
  // as expected: the text element was upside down, but maybe that could be
  // reversed? bleh.
  function getAngle( degrees = false) : number {
    let angle: number;
    if( control.y <= 0 ) {
      angle = Math.abs(Math.atan2( control.y, control.x));
    } else {
      angle = Math.PI*2 - Math.atan2( control.y, control.x);
    }

    if( degrees ) {
      return (angle*180/Math.PI);
    } else {
      return angle;
    }
  }

  // Create Katex component
  let theta = document.createElement('div');
  document.getElementById(id).appendChild(theta);

  // Create a path
  let path = interactive.path('');
  path.classList.add('default');
  path.root.style.fill = 'rgb(236,236,236)';
  path.update = function() {
    let flag = (control.y > 0) ? 1 : 0;
    path.d = `M 0 0
              L ${circle.r} 0
              L ${circle.r/3} 0
              A ${circle.r/3} ${circle.r/3} 0 ${flag} 0 ${control.x/3} ${control.y/3}
              L ${control.x} ${control.y}
              z`;
    katex.render(`\\theta = ${getAngle().toFixed(2)} \\text{ radians}`, theta, {
      displayMode: true,
    });
  };
  path.update();
  path.addDependency(control);

  // Create a point at the origin
  let point = interactive.circle( 0, 0, 3);
  point.fill = 'black';

}
