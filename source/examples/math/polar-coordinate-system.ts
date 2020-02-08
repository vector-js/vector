/**
* @title Polar Coordinate System
* @description This interactive demonstrates the polar coordinate system. The polar coordinate system represents the position of a point using a radius and the angle relative to the origin.
* @tags [math]
* @weight 3
*/

import {Interactive} from '../../index.js';

export default function main( id:string ) {

  // Create the constant TAU
  const TAU = 2*Math.PI;

  // Initialize the interactive
  let margin = 32;
  let interactive = new Interactive(id);
  interactive.border = false;
  interactive.originX = interactive.width/2;
  interactive.originY = interactive.width/2;
  interactive.height = interactive.width;
  interactive.style.overflow = 'visible';
  interactive.classList.add('default');

  // Create three control points
  let point = interactive.control(0,0);
  let radius = 50;
  let n = 4;
  let border = interactive.circle(0,0,n*radius);

  // Create a path
  let path = interactive.path('');
  path.addDependency(point);
  path.root.style.fill = 'rgb(236,236,236)';
  path.update = function() {
    let flag = (point.y > 0) ? 1 : 0;
    let angle = getAngle();
    let r = 50;
    path.d = `M 0 0
              L ${r} 0
              A ${r} ${r} 0 ${flag} 0 ${r*Math.cos(angle)} ${-r*Math.sin(angle)}
              z`;
  };
  path.update();



  let xAxis = interactive.line( -border.r - margin, 0, border.r + margin, 0);
  let yAxis = interactive.line( 0, -border.r - margin, 0, border.r + margin);
  // let rectangle = interactive.rectangle(xAxis.x1, yAxis.y1, xAxis.x2 - xAxis.x1, yAxis.y2 - yAxis.y1);
  point.constrainWithin( border);

  let marker = interactive.marker(10, 5, 10, 10);
  marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
  marker.setAttribute('orient', 'auto-start-reverse');
  xAxis.setAttribute('marker-end', `url(#${marker.id})`);
  xAxis.setAttribute('marker-start', `url(#${marker.id})`);
  yAxis.setAttribute('marker-end', `url(#${marker.id})`);
  yAxis.setAttribute('marker-start', `url(#${marker.id})`);

  let right = interactive.text( xAxis.x2 + 16, xAxis.y2, '0, τ');
  right.setAttribute('alignment-baseline','middle');
  let top = interactive.text( yAxis.x1, yAxis.y1 - 16, 'τ/4');
  top.setAttribute('text-anchor','middle');
  let left = interactive.text( xAxis.x1 - 32, xAxis.y2, 'τ/2');
  left.setAttribute('alignment-baseline','middle');
  let bottom = interactive.text( yAxis.x1, yAxis.y2 + 32, '3/4τ');
  bottom.setAttribute('text-anchor','middle');


  let group = interactive.group();
  group.style.strokeOpacity = '.2';
  group.root.setAttribute('vector-effect','non-scaling-stroke');
  let r = 50;
  for( let i = 0; i <= n; i++) {
    let circle = group.circle(0,0, i*r);
    if( i > 0 && i < n ) {
      let tempAngle = 0*Math.PI/n;
      group.text( circle.r*Math.cos(tempAngle)+ 4, -circle.r*Math.sin(tempAngle) + 20, i.toString());
    }
  }
  for( let angle = 0; angle <= TAU; angle += TAU/8 ) {
    let x = border.r*Math.cos(angle);
    let y = border.r*Math.sin(angle);
    group.line(-x, -y, x, y);
  }

  point.translate( 2*r*Math.cos(TAU/8), -2*r*Math.sin(TAU/8));

  let radiusLine =  interactive.line(0, 0, 0, 0);
  radiusLine.style.stroke = 'cornflowerblue';
  radiusLine.addDependency( point );
  radiusLine.update = function(){
    this.x2 = point.x;
    this.y2 = point.y;
  };
  radiusLine.update();

  interactive.circle(0,0,3).style.fill = '#404040';
  let text = interactive.text(150, 150, "myText");
  text.addDependency(point);
  text.update = function() {
    this.x = point.x + 15;
    this.y = point.y - 15;
    this.contents = `(${Math.hypot(point.y/50, point.x/50).toFixed(2)}, ${(getAngle()/(2*Math.PI)).toFixed(3)}τ)`;
  };
  text.update();

  // Gets the normalized angle between zero and tau. TODO: Maybe transform the
  // coordinate system so that the positive y-direction is up instead of down.
  // UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
  // as expected: the text element was upside down, but maybe that could be
  // reversed? bleh.
  function getAngle() : number {
    if( point.y <= 0 ) {
      return Math.abs(Math.atan2( point.y, point.x));
    } else {
      return Math.PI*2 - Math.atan2( point.y, point.x);
    }
  }

}
