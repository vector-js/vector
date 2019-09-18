/**
* @title Checkbox Element
* @description This interactive demonstrates the checkbox element.
* @tags [elements, input]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let checkBox = interactive.checkBox(100, 75, "My Checkbox", false);
//# sourceMappingURL=check-box-element.js.map