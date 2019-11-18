/**
* @ignore true
*/

import {Interactive, getScriptName} from '../../index.js';

// Initialize the interactive
let margin = 32;
let interactive = new Interactive(getScriptName());
// interactive.border = true;
interactive.originX = interactive.width/2 + margin;
interactive.originY = interactive.height/2 + margin;
interactive.width += 2*margin;
interactive.height += 2*margin;
// interactive.style.overflow = 'visible';

// Create three control points
let xAxis = interactive.line( -interactive.width/2 + margin, 0, interactive.width/2 - margin, 0);
let yAxis = interactive.line( 0, -interactive.height/2 + margin, 0, interactive.height/2 - margin);
let rectangle = interactive.rectangle(xAxis.x1, yAxis.y1, xAxis.x2 - xAxis.x1, yAxis.y2 - yAxis.y1);

interactive.circle(0,0,3).style.fill = '#404040';

let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');
xAxis.setAttribute('marker-end', `url(#${marker.id})`);
xAxis.setAttribute('marker-start', `url(#${marker.id})`);
yAxis.setAttribute('marker-end', `url(#${marker.id})`);
yAxis.setAttribute('marker-start', `url(#${marker.id})`);

let xAxisLabel = interactive.text( xAxis.x2 + 16, xAxis.y2, 'x');
xAxisLabel.setAttribute('alignment-baseline','middle');
let yAxisLabel = interactive.text( yAxis.x1, yAxis.y1 - 16, 'y');
yAxisLabel.setAttribute('text-anchor','middle');

let w = 50;
let h = 50;
for( let i = -5; i <= 5; i++ ) {
  let x = i*w;
  let vertical = interactive.line(x, -150, x, 150);
  vertical.style.strokeOpacity = '.2';
}

for( let i = -2; i <= 2; i++ ) {
  let y = i*h;
  let horizontal = interactive.line(-300, y, 300, y);
  horizontal.style.strokeOpacity = '.2';
}

let arrow = interactive.control(150, -100);
arrow.constrainWithinBox( xAxis.x1, yAxis.y1, xAxis.x2, yAxis.y2);
arrow.point.style.display = 'none';
let line = interactive.line(0,0,0,0);
interactive.input.appendChild(line);
line.setAttribute('marker-end', `url(#${marker.id})`);
line.addDependency(  arrow);
line.update = function() {
  line.x2 = arrow.x;
  line.y2 = arrow.y;
};
line.update();

// Create a line between the points
let triangle = interactive.path('');
triangle.style.fill = '#d8d8d8';
triangle.style.opacity = '.4';
triangle.addDependency( arrow);
triangle.update = function() {
  this.d = `M ${0} ${0} L ${arrow.x} ${0} L ${arrow.x} ${arrow.y}z`;
};
triangle.update();
