import Interactive from '../Interactive.js';
import { getScriptName } from '../Util.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 600;
interactive.height = 300;
interactive.border = true;

let functionText = '(x) => { return Math.sin(x); }';

// Create a new graph object
let graph = interactive.graph();
graph.function = eval(functionText);
graph.originX = 0;
graph.originY = interactive.height/2;
graph.scale( 2*Math.PI/interactive.width, interactive.width/(2*Math.PI));

// Function input
let functionInput = document.createElement('input');
functionInput.type = 'text';
functionInput.name = 'function';
functionInput.value = functionText;
functionInput.style.width = '584px';
functionInput.style.fontSize = '16px';
functionInput.style.border = '1px solid grey';
functionInput.style.fontFamily = 'monospace';
functionInput.style.height = '32px';
functionInput.style.marginBottom = '8px';
functionInput.style.padding = '0 .5rem';

functionInput.onchange = function() {
  graph.function = eval(functionInput.value);
  graph.draw();
};

interactive.container.prepend(functionInput);
