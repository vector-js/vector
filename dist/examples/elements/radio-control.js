import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 350;
interactive.root.style.border = "1px solid grey";
let radio = interactive.radioControl(["1", "2", "3", "4", "5", "6", "7"], 100, 100);
//# sourceMappingURL=radio-control.js.map