/**
* @title Line Element
* @description This interactive demonstrates the ellipse element.
* @tags [elements]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let line = interactive.line(50, 25, 150, 125);
//# sourceMappingURL=line-element.js.map