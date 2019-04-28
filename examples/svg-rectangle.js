let id = 'svg-rectangle';
let svg = SVG.SVG(id);
svg.classList.add('window');

let rect = new Rectangle(0,0,0,0);
let c1 = new Control( 150, 100);
let c2 = new Control( 450, 200);
let text = new Text( 90, 280, "");

c2.update = function() {
  this.x += c1.dx;
  this.y += c1.dy;
}
c2.addDependency(c1);

rect.update = function() {
  this.x = Math.min(c1.x, c2.x);
  this.y = Math.min(c1.y, c2.y);
  this.width = Math.max(c1.x, c2.x) - rect.x;
  this.height = Math.max(c1.y, c2.y) - rect.y;
}
rect.update();
rect.addDependency(c1);
rect.addDependency(c2);

// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function() {
  let tag = `<tspan style="fill:purple">rect</tspan>`;
  let x = `<tspan style="fill:#ab6f00">x</tspan>`;
  let y = `<tspan style="fill:#ab6f00">y</tspan>`;
  let width = `<tspan style="fill:#ab6f00">width</tspan>`;
  let height = `<tspan style="fill:#ab6f00">height</tspan>`;
  this.contents = `&lt;${tag} ${x}="${rect.x} ${y}="${rect.y} ${width}="${rect.width} ${height}="${rect.height}"&gt`;
}
text.update();
text.addDependency(rect);
