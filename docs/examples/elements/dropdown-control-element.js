/**
* @title Dropdown Control Element
* @description This interactive demonstrates the dropdown control element.
* @tags [elements, input]
*/
import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
interactive.dropdownControl(20, 36, ["red", "green", "blue"], 0);
//# sourceMappingURL=dropdown-control-element.js.map