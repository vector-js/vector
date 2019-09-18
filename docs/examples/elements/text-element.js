/**
* @title Text Element
* @description This interactive demonstrates the text element.
* @tags [elements]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let line = interactive.text(50, 75, "My Text");
//# sourceMappingURL=text-element.js.map