import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map("world",768,300);