/**
* @title Rectangle Element
* @description This interactive demonstrates the rectangle element.
* @tags [elements]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let line = interactive.rectangle(50, 50, 100, 50);
//# sourceMappingURL=rectangle-element.js.map