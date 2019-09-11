import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let stepper = interactive.stepper(75, 75, 200, 75);
//# sourceMappingURL=stepper-element.js.map