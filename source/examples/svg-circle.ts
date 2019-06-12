import Interactive from '../Interactive.js';

let id = 'svg-circle';
let interactive = new Interactive(id);
interactive.window = true;

let circle = interactive.circle(0,0,0);
let l1 = interactive.line( 0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
let text = interactive.text( 25, 275, "");
let centerControl = interactive.control( 300, 150);
let radiusControl = interactive.control( 375, 150);

circle.update = function() {
  this.cx = centerControl.x;
  this.cy = centerControl.y;
  this.r = Math.abs(radiusControl.x - centerControl.x);
}
circle.update();
circle.addDependency(centerControl);
circle.addDependency(radiusControl);

radiusControl.update = function() {
  this.x += centerControl.dx;
  this.y += centerControl.dy;
}
radiusControl.addDependency(centerControl);
radiusControl.constrainToX();

l1.update = function() {
  this.x1 = centerControl.x;
  this.y1 = centerControl.y;
  this.x2 = radiusControl.x;
  this.y2 = radiusControl.y;
}
l1.update();
l1.addDependency(centerControl);
l1.addDependency(radiusControl);

// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function() {
  let tag = `<tspan style="fill:purple">circle</tspan>`;
  let cx = `<tspan style="fill:#ab6f00">cx</tspan>`;
  let cy = `<tspan style="fill:#ab6f00">cy</tspan>`;
  let r = `<tspan style="fill:#ab6f00">r</tspan>`;
  this.contents = `&lt;${tag} ${cx}="${circle.cx.toFixed(0)}
                              ${cy}="${circle.cy.toFixed(0)}
                              ${r}="${circle.r.toFixed(0)}"&gt`;
}
text.update();
text.addDependency(circle);
