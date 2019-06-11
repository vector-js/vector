/**
* This interactive demonstrates the SVG ellipse element and its attributes.
*
* @title SVG Ellipse
* @date May 3, 2019
* @author Kurt Bruns
*/

import Interactive from '../Interactive.js';

let id = 'svg-circle';
let interactive = new Interactive(id);
interactive.window = true;

let circle = interactive.circle(0,0,0);
let l1 = interactive.line( 0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
let text = interactive.text( 25, 275, "");
let c0 = interactive.control( 300, 150);
let c1 = interactive.control( 375, 150);

circle.update = function() {
  this.cx = c0.x;
  this.cy = c0.y;
  this.r = Math.abs(c1.x - c0.x);
}
circle.update();
circle.addDependency(c0);
circle.addDependency(c1);

c1.update = function() {
  this.x += c0.dx;
  this.y += c0.dy;
}
c1.addDependency(c0);
c1.constrainToX();

l1.update = function() {
  this.x1 = c0.x;
  this.y1 = c0.y;
  this.x2 = c1.x;
  this.y2 = c1.y;
}
l1.update();
l1.addDependency(c0);
l1.addDependency(c1);

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
