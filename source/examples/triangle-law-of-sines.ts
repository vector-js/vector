// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../Interactive.js';
import SVG from '../SVG.js';

// Initialize the interactive
let id = 'triangle-with-angles';
let interactive = new Interactive(id);
interactive.window = true;

// Create three control points
let p1 = interactive.control(250,200);
let p2 = interactive.control(300,100);
let p3 = interactive.control(350,200);

// Draw little angle displays
addAngleDisplayBetweenPoints( p1, p3, p2);
addAngleDisplayBetweenPoints( p2, p1, p3);
addAngleDisplayBetweenPoints( p3, p2, p1);

// Draw a triangle for the clip path
let triangle = interactive.path('');
triangle.addDependency(p1);
triangle.addDependency(p2);
triangle.addDependency(p3);
triangle.update = function() {
  this.d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
};
triangle.update();

let line = interactive.line(0,0,0,0);
line.addDependency(p1);
line.addDependency(p2);
line.addDependency(p3);
line.update = function() {
  line.x1 = p1.x;
  line.y1 = p1.y;

  let slope = (p3.y - p2.y)/(p3.x - p2.x);
  console.log(slope);
  line.x2 = line.x1 + 50;
  line.y2 = (line.y1 + 50*slope);
};

// adds a display angle between points
function addAngleDisplayBetweenPoints( p1, p2, p3) {
  // Create a path
  let path = interactive.path('');
  path.root.style.fill = 'grey';
  path.root.style.fillOpacity = '.2';
  path.update = function() {
    let a1 = Math.atan2( p2.y - p1.y, p2.x - p1.x);
    let a2 = Math.atan2( p3.y - p1.y, p3.x - p1.x);
    let angle = normalize( a2 - a1);
    let largeArcFlag = ( angle > Math.PI ) ? false : true;
    let r = 25;
    let x1 = r*Math.cos(a1) + p1.x;
    let y1 = r*Math.sin(a1) + p1.y;
    let x2 = r*Math.cos(a2) + p1.x;
    let y2 = r*Math.sin(a2) + p1.y;
    path.d = `M ${p1.x} ${p1.y}
              L ${p2.x} ${p2.y}
              L ${x1} ${y1}
              A ${r} ${r} 0 ${+largeArcFlag} 0 ${x2} ${y2}
              L ${p3.x} ${p3.y}
              z`;
  };
  path.update();
  path.addDependency(p1);
  path.addDependency(p2);
  path.addDependency(p3);
}

/**
* Normalizes the angle to be within the range [0, 2 PI].
*/
function normalize( angle:number ) : number {
  if( angle > 0 ) {
    return angle;
  } else {
    return 2*Math.PI + angle;
  }
}
