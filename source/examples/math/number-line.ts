/**
* @title Number Line
* @description This interactive demonstrates the cartesian coordinate system.
* @tags [math]
*/


import {Interactive, getScriptName, download} from '../../index.js';

/**
* A point has an x position and y position
*/
class Point {
    x:number;
    y:number;
}

// Initialize the interactive
let margin = 32;
let interactive = new Interactive(getScriptName(), {
  height:100
});
interactive.originX = interactive.width/2 + margin;
interactive.originY = interactive.height/2 + margin;
interactive.width += 2*margin;
interactive.height += 2*margin;
// interactive.style.overflow = 'visible';

// Create three control points
let point = interactive.control(0,0);
let xAxis = interactive.line( -interactive.width/2 + margin, 0, interactive.width/2 - margin, 0);
point.constrainWithinBox( xAxis.x1, 0, xAxis.x2, 0);
let boxConstraint = point.constrain;
point.constrain = ( o:Point, n:Point) : Point => {

  // first snap to grid
  let x = 50*Math.round(n.x/50);

  // then constrain within box
  let p = boxConstraint({x:x, y:n.x}, {x:x, y:n.y});

  return {x:p.x, y:p.y};
}

let text = interactive.text(150, 150, "myText");
text.style.textAnchor = 'middle';
text.style.alignmentBaseline = 'middle';
text.addDependency(point);
text.update = function() {
  this.x = point.x;
  this.y = point.y - 32;
  this.contents = `${point.x/50}`;
};
text.update();

let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');
xAxis.setAttribute('marker-end', `url(#${marker.id})`);
xAxis.setAttribute('marker-start', `url(#${marker.id})`);

let xAxisLabel = interactive.text( xAxis.x2 + 16, xAxis.y2, 'x');
xAxisLabel.setAttribute('alignment-baseline','middle');

let xPosition = interactive.line( 0, 0, 0, 0);
xPosition.style.stroke = 'cornflowerblue';
xPosition.addDependency( point );
xPosition.update = function(){
  this.x1 = point.x;
  this.x2 = point.x;
  this.y2 = point.y;
};

let yPosition =  interactive.line(0, 0, 0, 0);
yPosition.style.stroke = 'cornflowerblue';
yPosition.addDependency( point );
yPosition.update = function(){
  this.y1 = point.y;
  this.x2 = point.x;
  this.y2 = point.y;
};

let w = 50;
let h = 50;
// for( let i = -6; i <= 6; i++) {
//   let x = i*w;
//   let circle = interactive.circle(x,0, 8);
//   circle.style.opacity = '.1';
//   circle.style.fill = 'rgb(58	167	87)';
// }

for( let i = -5; i <= 5; i++ ) {
  let x = i*w;
  interactive.line(x, -6, x, 6);
  let number = interactive.text(x, 32, i.toString());
  number.style.textAnchor = 'middle';
  number.style.alignmentBaseline = 'middle';
}


point.translate( 150, -100);

interactive.circle(0,0,3).style.fill = '#404040';
