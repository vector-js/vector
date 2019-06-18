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
let id = 'unit-circle-test';
let angleInteractive = new Interactive(id);
angleInteractive.width = 250;
angleInteractive.height = 250;
angleInteractive.originX = angleInteractive.width/2;
angleInteractive.originY = angleInteractive.height/2;

// Create a circle
let angleCircle = angleInteractive.circle( 0, 0, 100);

// Create a control
let angleControl = angleInteractive.control( angleCircle.r*Math.cos(-1), angleCircle.r*Math.sin(-1));
angleControl.constrainToCircle( angleCircle.cx, angleCircle.cy, angleCircle.r);

// Create a path
let anglePath = angleInteractive.path('');
anglePath.root.style.fill = 'gray';
anglePath.root.style.fillOpacity = '.3';
anglePath.update = function() {
  let flag = (angleControl.y > 0) ? 1 : 0;
  anglePath.d = `M 0 0
            L ${angleCircle.r} 0
            L ${angleCircle.r/3} 0
            A ${angleCircle.r/3} ${angleCircle.r/3} 0 ${flag} 0 ${angleControl.x/3} ${angleControl.y/3}
            L ${angleControl.x} ${angleControl.y}
            z`;
};
anglePath.update();
anglePath.addDependency(angleControl);

// Create a point at the origin
let anglePoint = angleInteractive.circle( 0, 0, 3);
anglePoint.fill = 'black';

// Initialize the interactive
let triangleInteractive = new Interactive(id);
triangleInteractive.window = true;
triangleInteractive.width = 250;
triangleInteractive.height = 250;
triangleInteractive.originX = triangleInteractive.width/2;
triangleInteractive.originY = triangleInteractive.height/2;

// Create a circle
let triangleCircle = triangleInteractive.circle( 0, 0, 100);

// Create a control
let triangleControl = triangleInteractive.control( triangleCircle.r*Math.cos(-1), triangleCircle.r*Math.sin(-1));
triangleControl.constrainToCircle( triangleCircle.cx, triangleCircle.cy, triangleCircle.r);

// Create a path
let trianglePath = triangleInteractive.path('');
trianglePath.root.style.fill = 'gray';
trianglePath.root.style.fillOpacity = '.3';
trianglePath.update = function() {
  trianglePath.d = `M 0 0
            L ${triangleControl.x} 0
            L ${triangleControl.x} ${triangleControl.y}
            z`;
};
trianglePath.update();
trianglePath.addDependency(triangleControl);

// Create a point at the origin
let trianglePoint = triangleInteractive.circle( 0, 0, 3);
trianglePoint.fill = 'black';


// Initialize the interactive
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 600;
interactive.height = 600;
interactive.originX = interactive.width/2;
interactive.originY = 225;

// Create a circle
let circle = interactive.circle( 0, 0, 100);
let line = interactive.line( 0, 0, circle.r, 0);
let margin = 0;
let yAxis = interactive.line( 0, -(circle.r + margin), 0, circle.r + margin);
let xAxis = interactive.line( -(circle.r + margin), 0, circle.r + margin, 0);

// Create a control
let control = interactive.control( circle.r*Math.cos(-.25*Math.PI), circle.r*Math.sin(-.25*Math.PI));
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

let cosineCheckBox = interactive.checkBox( 75, 195, 'cosine', false);
let sineCheckBox = interactive.checkBox( 75, 195+ 25, 'sine', false);
let tangentCheckBox = interactive.checkBox( 75, 195+ 50, 'tangent', false);
let secantCheckBox = interactive.checkBox( 75, 195+ 75, 'secant', false);
let cosecantCheckBox = interactive.checkBox( 75, 195+ 100, 'cosecant', false);
let cotangentCheckBox = interactive.checkBox( 75, 195+ 125, 'cotangent', false);

let secant = interactive.line(0, 0, 0, 0);
secant.addDependency(control);
secant.addDependency(secantCheckBox);
secant.update = function() {
  this.x2 = circle.r/(control.x/circle.r);
  if( secantCheckBox.value ) {
    this.root.style.stroke = 'red';
    this.root.style.strokeWidth = '2px';

  } else {
    this.root.style.stroke = '';
    this.root.style.strokeWidth = '';
  }
};
secant.update();

let cosine = interactive.line(0, 0, 0, 0);
cosine.addDependency(control);
cosine.addDependency(cosineCheckBox);
cosine.addDependency(secantCheckBox);
cosine.update = function() {
  this.x2 = control.x;
  this.root.style.strokeOpacity = '1';
  if( secantCheckBox.value ) {
    this.root.style.strokeOpacity = '0';
  } else if( cosineCheckBox.value ) {
    this.root.style.stroke = 'red';
    this.root.style.strokeWidth = '2px';
  } else {
    this.root.style.stroke = '';
    this.root.style.strokeWidth = '';
  }
};
cosine.update();

let sine = interactive.line(0, 0, 0, 0);
sine.addDependency(control);
sine.addDependency(sineCheckBox);
sine.update = function() {
  this.x1 = control.x;
  this.x2 = control.x;
  this.y2 = control.y;
  if( sineCheckBox.value ) {
    this.root.style.stroke = 'red';
    this.root.style.strokeWidth = '2px';
  } else {
    this.root.style.stroke = '';
    this.root.style.strokeWidth = '';
  }
};
sine.update();

let tangent = interactive.line(0, 0, 0, 0);
tangent.addDependency(control);
tangent.addDependency(tangentCheckBox);
tangent.update = function() {
  this.x1 = control.x;
  this.y1 = control.y;
  this.x2 = circle.r/(control.x/circle.r);
  if( tangentCheckBox.value ) {
    this.root.style.stroke = 'red';
    this.root.style.strokeWidth = '2px';
  } else {
    this.root.style.stroke = '';
    this.root.style.strokeWidth = '';
  }
};
tangent.update();

let cotangent = interactive.line(0, 0, 0, 0);
cotangent.addDependency(control);
cotangent.addDependency(cotangentCheckBox);
cotangent.update = function() {
  this.y1 = circle.r/(control.y/circle.r);
  this.x2 = control.x;
  this.y2 = control.y;
  if( cotangentCheckBox.value ) {
    this.root.style.stroke = 'red';
    this.root.style.strokeWidth = '2px';
  } else {
    this.root.style.stroke = '';
    this.root.style.strokeWidth = '';
  }
};
cotangent.update();

let cosecant = interactive.line(0, 0, 0, 0);
cosecant.addDependency(control);
cosecant.addDependency(cosecantCheckBox);
cosecant.update = function() {
  this.y2 = circle.r/(control.y/circle.r);
  if( cosecantCheckBox.value ) {
    this.root.style.stroke = 'red';
    this.root.style.strokeWidth = '2px';
  } else {
    this.root.style.stroke = '';
    this.root.style.strokeWidth = '';
  }
};
cosecant.update();

// Create a point at the origin
let point = interactive.circle( 0, 0, 3);
point.fill = 'black';

triangleControl.onchange = function() {
  angleControl.x = triangleControl.x;
  angleControl.y = triangleControl.y;
  control.x = triangleControl.x;
  control.y = triangleControl.y;
  triangleControl.updateDependents();
  angleControl.updateDependents();
  control.updateDependents();
}

angleControl.onchange = function() {
  triangleControl.x = angleControl.x;
  triangleControl.y = angleControl.y;
  control.x = triangleControl.x;
  control.y = triangleControl.y;
  triangleControl.updateDependents();
  angleControl.updateDependents();
  control.updateDependents();
}

control.onchange = function() {
  triangleControl.x = control.x;
  triangleControl.y = control.y;
  angleControl.x = control.x;
  angleControl.y = control.y;
  triangleControl.updateDependents();
  angleControl.updateDependents();
  control.updateDependents();
}
