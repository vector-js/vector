/**
* @ignore true
*/


// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive} from '../../index.js';

export default function main(id:string) {

  // Initialize the interactive
  // let margin = 32;
  let interactive = new Interactive(id, {
    width:350,
    height:350
  });
  interactive.border = false;
  interactive.originX = interactive.width/2;
  interactive.originY = interactive.width/2;
  interactive.style.overflow = 'visible';
  interactive.classList.add('default');

  // Create three control points
  let point = interactive.control(0,0);
  let radius = 128;
  let n = 1;
  let border = interactive.circle(0,0,n*radius);

  // Create a path
  let path = interactive.path('');
  path.addDependency(point);
  path.root.style.fill = 'rgb(236,236,236)';
  path.update = function() {
    let flag = (point.y > 0) ? 1 : 0;
    let angle = getAngle();
    let r = 48;
    path.d = `M 0 0
              L ${r} 0
              A ${r} ${r} 0 ${flag} 0 ${r*Math.cos(angle)} ${-r*Math.sin(angle)}
              z`;
  };
  path.update();


  point.constrainTo( border);

  let group = interactive.group();
  group.style.strokeOpacity = '.2';
  group.root.setAttribute('vector-effect','non-scaling-stroke');
  let r = radius;
  for( let i = 0; i <= n; i++) {

    let circle = group.circle(0,0, i*r);

    if( i > 0 && i < n ) {
      let tempAngle = 0*Math.PI/n;
      group.text( circle.r*Math.cos(tempAngle)+ 4, -circle.r*Math.sin(tempAngle) - 8, i.toString());
    }
  }

  for( let i = 0; i <= 2*Math.PI; i++) {
    let x = border.r*Math.cos(i);
    let y = border.r*Math.sin(i);
    group.line(0, 0, x, -y);
    let label = group.text( x + 20*Math.cos(i), -y - 20*Math.sin(i), i.toString());
    label.style.alignmentBaseline = 'middle';
    label.style.textAnchor = 'middle';
  }

  point.translate( 3*radius*Math.cos(2), -3*radius*Math.sin(2));

  let radiusLine =  interactive.line(0, 0, 0, 0);
  radiusLine.style.stroke = 'cornflowerblue';
  radiusLine.addDependency( point );
  radiusLine.update = function(){
    this.x2 = point.x;
    this.y2 = point.y;
  };
  radiusLine.update();

  interactive.circle(0,0,3).style.fill = '#404040';
  let textGroup = interactive.text(150, 150,'');
  textGroup.style.fontSize = '19px';
  let text = textGroup.tspan('');
  text.style.fontFamily = 'KaTeX_Main-Regular, KaTeX_Main;';
  text.classList.add('math');

  textGroup.addDependency(point);
  textGroup.update = function() {
    this.x = point.x + 15;
    this.y = point.y - 15;
    text.text = `${getAngle().toFixed(2)}`;
  };
  textGroup.update();
  let rSpan = textGroup.tspan(' rad');
  rSpan.style.fontFamily = 'KaTeX_Main-Regular, KaTeX_Main;';

  let rText = interactive.text(radius/2, -15, "r");
  rText.style.fontFamily = 'KaTeX_Math-Italic, KaTeX_Math';
  rText.style.fontStyle = 'italic';
  rText.style.fontSize = '22px';

  console.log(rSpan);
  console.log(rSpan.classList.add('math'));


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
