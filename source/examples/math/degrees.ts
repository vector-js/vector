/**
* @ignore true
*/

import {Interactive} from '../../index.js';

// Extend math object
const TAU = 2*Math.PI;

export default function main( id:string ) {

  // Initialize the interactive
  // let margin = 32;
  let interactive = new Interactive(id);
  interactive.border = false;
  interactive.width = 350;
  interactive.height = 350;
  interactive.originX = interactive.width/2;
  interactive.originY = interactive.height/2;
  interactive.style.overflow = 'visible';

  // Create three control points
  let point = interactive.control(0,0);
  let radius = 45;
  let n = 3;
  let border = interactive.circle(0,0,n*radius);
  border.style.fill = 'none';
  border.style.stroke = '#333333';

  // Create a path
  let path = interactive.path('');
  path.addDependency(point);
  path.root.style.fill = 'rgb(236,236,236)';
  path.style.stroke = '#333333';
  path.update = function() {
    let flag = (point.y > 0) ? 1 : 0;
    let angle = getAngle();
    path.d = `M 0 0
              L ${radius} 0
              A ${radius} ${radius} 0 ${flag} 0 ${radius*Math.cos(angle)} ${-radius*Math.sin(angle)}
              z`;
  };
  path.update();


  point.constrainTo( border);

  let group = interactive.group();
  group.style.strokeOpacity = '.2';
  group.root.setAttribute('vector-effect','non-scaling-stroke');
  for( let i = 0; i <= n; i++) {
    let circle = group.circle(0,0, i*radius);
    circle.style.fill = 'none';
    circle.style.stroke = '#333333';
  }

  for( let i = 0; i <= 360; i += 30) {
    let angle = i*TAU/360;
    let x = border.r*Math.cos(angle);
    let y = border.r*Math.sin(angle);
    group.line(0, 0, x, -y);
    let cx = x + 20*Math.cos(angle);
    let cy = -y - 20*Math.sin(angle);
    if( i === 0 ) {
      cy -= 16;
    } else if (i === 360) {
      cy += 16;
    }
    let label = group.text( cx, cy, `${i.toString()}°`);
    label.style.alignmentBaseline = 'middle';
    label.style.textAnchor = 'middle';
  }

  point.translate( 3*radius*Math.cos(TAU/6), -3*radius*Math.sin(TAU/6));

  let radiusLine =  interactive.line(0, 0, 0, 0);
  radiusLine.style.stroke = 'cornflowerblue';
  radiusLine.addDependency( point );
  radiusLine.update = function(){
    this.x2 = point.x;
    this.y2 = point.y;
  };
  radiusLine.update();

  interactive.circle(0,0,3).style.fill = '#404040';
  let textGroup = interactive.group();
  let rectangle = textGroup.rectangle(0,0, 64, 30);
  rectangle.style.fill = '#f8f8f8';
  rectangle.style.borderRadius = '6px';
  rectangle.style.stroke = '#333333';
  rectangle.style.strokeWidth = '1px';
  let text = textGroup.text(18, 20, "myText");
  textGroup.addDependency(point);
  textGroup.update = function() {
    let x = point.x;
    let y = point.y - 30;
    textGroup.setAttribute('transform', `translate(${x},${y})`)
    text.contents = `${(360*getAngle()/TAU).toFixed(0)}°`;
  };
  textGroup.update();

  // Gets the normalized angle between zero and tau. TODO: Maybe transform the
  // coordinate system so that the positive y-direction is up instead of down.
  // UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
  // as expected: the text element was upside down, but maybe that could be
  // reversed? bleh.
  function getAngle() : number {
    if( point.y <= 0 ) {
      return Math.abs(Math.atan2( point.y, point.x));
    } else {
      return TAU - Math.atan2( point.y, point.x);
    }
  }

}
