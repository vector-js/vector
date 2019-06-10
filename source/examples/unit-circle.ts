/**
* An interactive to demonstrate how the radius of a circle can be used to
* measure the angle between two rays.
*
* @title Unit Circle Right Triangle
* @date June 9, 2019
* @author Kurt Bruns
*/

import Interactive from '../Interactive.js';

// Initialize the interactive
let id = 'unit-circle';
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 600;
interactive.height = 600;
interactive.originX = interactive.width/2;
interactive.originY = 200;

// Create a circle
let circle = interactive.circle( 0, 0, 125);
let line = interactive.line( 0, 0, circle.r, 0);

// Create a control
let control = interactive.control( circle.r*Math.cos(-1), circle.r*Math.sin(-1));
control.constrainToCircle( circle.cx, circle.cy, circle.r);

// Create a path
let path = interactive.path('');
path.root.style.fillOpacity = '.3';
path.update = function() {
  path.d = `M 0 0
            L ${control.x} 0
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);

// Create a point at the origin
let point = interactive.circle( 0, 0, 3);
point.fill = 'black';


function getAngle() : string {
  let angle: number;
  if( control.y <= 0 ) {
    angle = Math.abs(Math.atan2( control.y, control.x));
  } else {
    angle = Math.PI*2 - Math.atan2( control.y, control.x);
  }
  return angle.toFixed(2) + ' rad';
}

let xCoord = -180;
let yCoord = 200;

// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let angle = interactive.text( xCoord, yCoord + 0, "test");
angle.root.style.whiteSpace = 'pre';
angle.addDependency(control);
angle.update = function() {
  angle.contents = `θ =  ${getAngle()}`;
};
angle.update();

// Display the x cordinate
let x = interactive.text( xCoord, yCoord + 25, "test");
x.root.style.whiteSpace = 'pre';
x.addDependency(control);
x.update = function() {
  x.contents = `x = ${control.x > 0 ? ' ' : ''}${(control.x/circle.r).toFixed(2)}`;
};
x.update();

let y = interactive.text( xCoord, yCoord + 50, "test");
y.root.style.whiteSpace = 'pre';
y.addDependency(control);
y.update = function() {
  y.contents = `y = ${control.y <= 0 ? ' ' : ''}${(-control.y/circle.r).toFixed(2)}`;
};
y.update();

let cosine = interactive.checkBox( 75, 195, 'cosine', false);
let sine = interactive.checkBox( 75, 195+ 25, 'sine', false);
let tangent = interactive.checkBox( 75, 195+ 50, 'tangent', false);
let secant = interactive.checkBox( 75, 195+ 75, 'secant', false);
let cosecant = interactive.checkBox( 75, 195+ 100, 'cosecant', false);
let cotangent = interactive.checkBox( 75, 195+ 125, 'cotangent', false);
