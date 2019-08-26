import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.style.border = "1px solid grey";

let question = interactive.text( 50, 55, "Would you like more coffee?");
let response = interactive.text( 50, 105, `Coffee, you think I want more coffee? <tspan style="font-weight:600">Boy</tspan> do I need more coffee.`);
// let response = interactive.text( 50, 105, `Coffee, you think I want more coffee?`);
//
// let emphasis = interactive.tspan(`Boy`);
// // emphasis.root.style
// response.root.appendChild(interactive.tspan(`Boy`).attr())
