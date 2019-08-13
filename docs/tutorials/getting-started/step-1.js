import Interactive from '/dist/Interactive.js';

let interactive = new Interactive("step-1");
interactive.window = true;
let control = interactive.control( 100, 100);
let text = interactive.text(100, 100, "(100,100)");
text.addDependency(control);
text.update = function() {
  this.contents = `(${control.x},${control.y})`;
};
