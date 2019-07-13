// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../Interactive.js';

// Initialize the interactive
let id = 'point-where-two-lines-intersect';
let interactive = new Interactive(id);
interactive.window = true;

// Create three control points
let p1 = interactive.control(300,200);
let p2 = interactive.control(300,100);
let p3 = interactive.control(350,200);
let p4 = interactive.control(100,100);

let point = interactive.circle(0,100,3);
point.root.style.fill = '#333333';
point.addDependency(p1, p2, p3, p4);
point.update = function() {
  let slope1 = (p2.y - p1.y)/(p2.x - p1.x);
  let slope2 = (p4.y - p3.y)/(p4.x - p3.x);
  let x = ((p4.y - p4.x*slope2) - (p2.y - p2.x*slope1))/(slope1 - slope2);

  if( !isFinite(slope1)) {
    this.cx = p1.x;
    this.cy = p3.y + slope2*(this.cx - p3.x);
  } else if ( !isFinite(slope2)) {
    this.cx = p3.x;
    this.cy = p1.y + slope1*(this.cx - p1.x);
  } else {
    this.cx = x;
    this.cy = p1.y + slope1*(this.cx - p1.x);
  }
};
point.update();

addLineBetweenPoints(p1, p2);
addLineBetweenPoints(p3, p4);

// Draws a line between two points
function addLineBetweenPoints( point1, point2) {
  let line = interactive.line(0,0,0,0);
  line.addDependency(point1, point2);
  line.update = function() {
    let slope = (point2.y - point1.y)/(point2.x - point1.x);
    let b = point2.y - slope*point2.x;

    if( isFinite(slope)) {
      this.x1 = interactive.minX - 10 ;
      this.y1 = slope*this.x1 + b;
      this.x2 = interactive.width + 10 ;
      this.y2 = slope*this.x2 + b;
    } else {
      this.x1 = point1.x;
      this.y1 = interactive.minY - 10;
      this.x2 = point1.x;
      this.y2 = interactive.maxY + 10;
    }
  };
  line.update();
  return line;
}
