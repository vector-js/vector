import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.svg.style.border = "1px solid grey";
interactive.svg.style.marginLeft ="0";
let checkBox = interactive.checkBox( 100, 75, "My Checkbox", false);
