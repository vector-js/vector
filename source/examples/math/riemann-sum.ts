/**
* @ignore true
*/


import { Interactive, Point } from '../../index.js';

export default function main( id:string ) {

  // let scale = 300/Math.PI;
  let n = 15;
  let scale = 100;
  let interactive = new Interactive(id);
  interactive.height = 500;
  interactive.width = 736;

  let plot = interactive.plot(700, 400, (x:number) => { return Math.cos(x) + x/3 + .5; }, {
    scaleX : scale,
    scaleY : scale,
    originX : 0,
    originY : 400
  });

  let path = plot.staticGroup.path('');
  let control1 = interactive.control(100,0);
  let control2 = interactive.control(500,0);

  plot.staticGroup.appendChild(control1);
  plot.staticGroup.appendChild(control2);

  control1.constrain = (oldPos, newPos) : Point => {
    let x = newPos.x;
    if (x < 0 ) {
      x = 0;
    } else if ( x > 700) {
      x = 700;
    }

    let y = -plot.call(x);
    return {x:x, y:y};
  };
  control2.constrain = (oldPos, newPos) : Point => {
    let x = newPos.x;
    if (x < 0 ) {
      x = 0;
    } else if ( x > 700) {
      x = 700;
    }
    let y = -plot.call(x);
    return {x:x, y:y};
  };

  control1.translate(100, 0);
  control2.translate(500, 0);


  path.addDependency(control1, control2);
  path.style.fill = '#f8f8f8';
  path.style.fillOpacity = '.5';
  path.update = function() {
    let start = control1.x < control2.x ? control1 : control2;
    let end = control1.x < control2.x ? control2 : control1;

    let x = start.x;
    let y = -plot.call(x);
    let prev = y;
    let delta = (end.x - start.x)/n;
    if( delta !== 0 ) {
      path.d = `M ${start.x} 0 `;
      for( ; x <= end.x; x += delta) {
        y = -plot.call(x);
        path.d += `L ${x} ${prev} L ${x} 0 L ${x} ${y}`;
        prev = y;
      }
      path.d += `L ${end.x} ${y} L ${end.x} ${end.y} L ${end.x} 0 Z`;
    } else {
      path.d = `M ${start.x} ${end.x} L ${start.x} 0`;
    }

  }
  path.update();

}
