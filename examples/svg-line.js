let id = 'svg-line';
let svg = SVG.SVG(id);
svg.classList.add('window');

let line = new Line( 0, 0, 0, 0);
let c1 = new Control( 150, 200);
let c2 = new Control( 450, 100);
let text = new Text( 110, 280, "");

line.update = function() {
  this.x1 = c1.x;
  this.y1 = c1.y;
  this.x2 = c2.x;
  this.y2 = c2.y;
}
line.update();
line.addDependency(c1);
line.addDependency(c2);

// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function() {
  let tag = `<tspan style="fill:purple">line</tspan>`;
  let x1 = `<tspan style="fill:#ab6f00">x1</tspan>`;
  let y1 = `<tspan style="fill:#ab6f00">y1</tspan>`;
  let x2 = `<tspan style="fill:#ab6f00">x2</tspan>`;
  let y2 = `<tspan style="fill:#ab6f00">y2</tspan>`;
  this.contents = `&lt;${tag} ${x1}="${line.x1} ${y1}="${line.y1} ${x2}="${line.x2} ${y2}="${line.y2}"&gt`;
}
text.update();
text.addDependency(line);
