/**
* @title Path Element
* @description This interactive demonstrates the path element.
* @tags [elements]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let line = interactive.path("M 50 50 Q 100 150 150 50");
//# sourceMappingURL=path-element.js.map