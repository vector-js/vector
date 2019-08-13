import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.svg.style.border = "1px solid grey";
let line = interactive.line(50, 25, 150, 125);
//# sourceMappingURL=line-element.js.map