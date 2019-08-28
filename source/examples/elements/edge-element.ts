import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let node1 = interactive.node( 75, 75, 50,  "My Node");
let node2 = interactive.node( 200, 75, 50,  "My Node");
let edge = interactive.edge(node1, node2, false);
