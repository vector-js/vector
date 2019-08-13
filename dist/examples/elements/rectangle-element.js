import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.svg.style.border = "1px solid grey";
let line = interactive.rectangle(50, 50, 100, 50);
//# sourceMappingURL=rectangle-element.js.map