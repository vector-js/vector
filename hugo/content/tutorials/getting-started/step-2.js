import Interactive from '/dist/Interactive.js';

let interactive = new Interactive("step-2");
interactive.window = true;
let control = interactive.control( 100, 100);
let text = interactive.text(0, 0, "");
text.addDependency(control);
text.update = function() {
  this.x = control.x + 15;
  this.y = control.y - 15;
  this.contents = `(${control.x},${control.y})`;
};
text.update();
