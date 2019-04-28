let id = 'svg-ellipse';
let svg = SVG.SVG(id);
svg.classList.add('window');

let ellipse = new Ellipse(0,0,0,0);
let l1 = new Line( 0, 0, 0, 0);
let l2 = new Line( 0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
let c0 = new Control( 300, 150);
let c1 = new Control( 450, 150);
let c2 = new Control( 300, 100);
let text = new Text( 110, 280, "");

ellipse.update = function() {
  this.cx = c0.x;
  this.cy = c0.y;
  this.rx = Math.abs(c1.x - c0.x);
  this.ry = Math.abs(c2.y - c0.y);
}
ellipse.update();
ellipse.addDependency(c0);
ellipse.addDependency(c1);
ellipse.addDependency(c2);

c1.update = function() {
  this.x += c0.dx;
  this.y += c0.dy;
}
c1.addDependency(c0);
c1.constrainToX();

c2.update = function() {
  this.x += c0.dx;
  this.y += c0.dy;
}
c2.addDependency(c0);
c2.constrainToY();

l1.update = function() {
  this.x1 = c0.x;
  this.y1 = c0.y;
  this.x2 = c1.x;
  this.y2 = c1.y;
}
l1.update();
l1.addDependency(c0);
l1.addDependency(c1);

l2.update = function() {
  this.x1 = c0.x;
  this.y1 = c0.y;
  this.x2 = c2.x;
  this.y2 = c2.y;
}
l2.update();
l2.addDependency(c0);
l2.addDependency(c2);

// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function() {
  let tag = `<tspan style="fill:purple">ellipse</tspan>`;
  let cx = `<tspan style="fill:#ab6f00">cx</tspan>`;
  let cy = `<tspan style="fill:#ab6f00">cy</tspan>`;
  let rx = `<tspan style="fill:#ab6f00">rx</tspan>`;
  let ry = `<tspan style="fill:#ab6f00">ry</tspan>`;
  this.contents = `&lt;${tag} ${cx}="${ellipse.cx} ${cy}="${ellipse.cy} ${rx}="${ellipse.rx} ${ry}="${ellipse.ry}"&gt`;
}
text.update();
text.addDependency(ellipse);
