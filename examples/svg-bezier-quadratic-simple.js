let svg = new SVG('quadratic-bezier');
let path = new Path('');
let c1 = new Control( 100, 100);
let c2 = new Control( 150, 150);
let c3 = new Control( 200, 100);

path.update = function() {
  path.d = `M ${c1.x} ${c1.y} Q ${c2.x} ${c2.y} ${c3.x} ${c3.y}`;
}
path.update();

path.addDependency(c1);
path.addDependency(c2);
path.addDependency(c3);
