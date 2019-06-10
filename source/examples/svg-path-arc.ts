/**
* This interactive demonstrates the quadratic bezier command for a SVG path
* element. There are three control points that allow the user to control the
* shape of the bezier curve that is drawn.
*
* @title SVG Path Arc
* @date May 3, 2019
* @author Kurt Bruns
*/

import Interactive from '../Interactive.js';

let id = 'svg-path-arc';
let interactive = new Interactive(id);
interactive.window = true;

let path = interactive.path('');
let text = interactive.text( 120, 280, "");
let start = interactive.control( 100, 120);
let control = interactive.control( 200, 120);
let rx = interactive.slider( 400, 30, 150, 75);
let ry = interactive.slider( 400, 60, 150, 75);

// TODO: possibly remove the x-axis-rotation because why would you ever use it?
let xAxisRotation = interactive.slider( 400, 90, 150, 0);
let largeArcFlag = interactive.checkBox( 400, 120, "large-arc-flag", false);
let sweepFlag = interactive.checkBox( 400, 150, "sweep-flag", false);

path.update = function() {
  path.d = `M ${start.x}
              ${start.y}
            A ${rx.value}
              ${ry.value}
              ${xAxisRotation.value}
              ${largeArcFlag.number()}
              ${sweepFlag.number()}
              ${control.x}
              ${control.y}`;
}
path.update();
path.addDependency(start);
path.addDependency(control);
path.addDependency(rx);
path.addDependency(ry);
path.addDependency(xAxisRotation);
path.addDependency(largeArcFlag);
path.addDependency(sweepFlag);

// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function() {
  let tag = `<tspan style="fill:purple">path</tspan>`;
  let d = `<tspan style="fill:#ab6f00">d</tspan>`;
  this.contents = `&lt;${tag} ${d}="M ${start.x}
                                      ${start.y}
                                    A ${rx.value.toFixed(0)}
                                      ${ry.value.toFixed(0)}
                                      ${xAxisRotation.value.toFixed(0)}
                                      ${largeArcFlag.number()}
                                      ${sweepFlag.number()}
                                      ${control.x.toFixed(0)}
                                      ${control.y.toFixed(0)}"&gt`;
}
text.update();
text.addDependency(path);
