import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

let radius = 80;
let margin = 20;

let container = document.getElementById(getScriptName());
container.style.display = 'grid';
container.style.gridTemplateColumns = `${2*(radius + margin)}px ${2*Math.PI*radius}px`;
container.style.gridGap = '1rem';

// Initialize the interactive
let circleInteractive = new Interactive(getScriptName());
circleInteractive.width = 2*(radius + margin);
circleInteractive.height = 2*(radius + margin);
circleInteractive.border = true;
circleInteractive.originX = radius + margin;
circleInteractive.originY = radius + margin;
let xAxis = circleInteractive.line( -(radius + margin), 0, radius + margin, 0);
let yAxis = circleInteractive.line( 0, -(radius + margin), 0, radius + margin);
let circle = circleInteractive.circle( 0, 0, radius);
let control = circleInteractive.control( radius, 0);
control.constrainTo(circle);
let line = circleInteractive.line(0,0,radius,0);
line.addDependency(control);
line.update = function() {
  line.x2 = control.x;
  line.y2 = control.y;
};

let chartInteractive = new Interactive(getScriptName());
chartInteractive.width = 2*Math.PI*radius;
chartInteractive.height = 2*(radius + margin);
chartInteractive.border = true;
let graph = chartInteractive.graph(false);
graph.function = Math.sin;
graph.originX = 0;
graph.originY = chartInteractive.height/2;
graph.scale( 2*Math.PI/chartInteractive.width, chartInteractive.width/(2*Math.PI));

let info = new Interactive(getScriptName());
info.width = 2*(radius + margin);
info.height = 2*(radius + margin);
info.border = true;

let x = 20;
info.text( x, info.height*1/5, "θ = ...");
info.text( x, info.height*2/5, "x = ...");
info.text( x, info.height*3/5, "y = ...");
info.button( 3*x, info.height*4/5, "animate");

let functions = new Interactive(getScriptName());
functions.width = 2*Math.PI*radius;
functions.height = 2*(radius + margin);
functions.border = true;

// TODO: replace with radio input
let cosInput = functions.checkBox( x + 16, functions.height*2/6, "cos(θ)", false);
let sinInput = functions.checkBox( x + 16, functions.height*3/6, "sin(θ)", false);
let tanIpnut = functions.checkBox( x + 16, functions.height*4/6, "tan(θ)", false);
cosInput.onchange = function() {
  if( cosInput.value ) {
    graph.function = Math.cos;
    graph.draw();
  }
}
sinInput.onchange = function() {
  if( sinInput.value ) {
    graph.function = Math.sin;
    graph.draw();
  }
}
tanIpnut.onchange = function() {
  if( tanIpnut.value ) {
    graph.function = Math.tan;
    graph.draw();
  }
}


// TODO: replace with interchangeable functions katex or external SVG
functions.rectangle( 2*radius, functions.height*2/6, 300, functions.height*2/6);
