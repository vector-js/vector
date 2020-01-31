/**
* @title Color Wheel
* @description This interactive demonstrates the possible hues as modeled by the color wheel. A slider allows the user to control the number of hues displayed along the perimeter of the circle.
* @tags [color]
* @ignore false
*/

import {Interactive} from '../../index.js';

// Tau represents a full roation around the circle
let TAU = 2*Math.PI;

/**
* This function generated a trapezoidal wave function shifted by the number t.
*/
function trapezoidalWave( t:number ) {
  return (a:number) => {
    let x = (a - t) % 1;
    // let x = (a - t);
    if( x < 0 ) {
      return 0;
    } else if ( x < 1/6 ) {
      return 6*x;
    } else if ( x <= 1/2 ) {
      return 1;
    } else if ( x < 2/3 ) {
      return 4 - 6*x;
    } else {
      return 0;
    }
  }
}

/**
* Constructs a 600 by 600 interactive demonstrating the color wheel.
*/
export default function main( id:string ) {

  let interactive = new Interactive(id, {
    width:720,
    height:600,
    originX: 360,
    originY: 300
  });

  let radius = 250;
  let width = 50;
  // let n = 256*2;

  let slider = interactive.slider( -radius, 280, {
    width:2*radius,
    min:3,
    max:100,
    value: 6.999 // TODO: this is a bug with arithmetic
  });

  let circle = interactive.circle(0, 0, radius);
  circle.classList.add('default');
  circle.style.stroke = 'none';

  let group = interactive.group();
  group.addDependency(slider);
  group.update = function() {

    // Clear the current state of the color wheel
    while( group.root.firstChild ) {
      group.root.removeChild(group.root.firstChild);
    }

    // Redraw the circle
    let d = 1/Math.floor(slider.value);
    for( let a = 0; a < 1; a += d) {
      let angle = TAU*a;
      let x = Math.cos(angle - TAU*d/2);
      let y = Math.sin(angle - TAU*d/2);
      let x2 = Math.cos(angle + TAU*d/2);
      let y2 = Math.sin(angle + TAU*d/2);

      let r = trapezoidalWave(-1/3)(a)*255;
      let g = trapezoidalWave( 0/6)(a)*255;
      let b = trapezoidalWave( 1/3)(a)*255;

      let path = group.path(`M ${(circle.r - width)*x} ${(circle.r - width)*y} L ${(circle.r - width)*x2} ${(circle.r - width)*y2} L ${circle.r*x2} ${circle.r*y2} L ${circle.r*x} ${circle.r*y} Z`);
      path.style.fill = `rgb(${r}, ${g}, ${b})`
      path.style.stroke = `rgb(${r}, ${g}, ${b})`
    }
  };
  group.update();
}
