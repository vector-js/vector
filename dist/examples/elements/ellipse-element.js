/**
* @title Ellipse Element
* @description This interactive demonstrates the ellipse element.
* @tags [elements]
*/
import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let ellipse = interactive.ellipse(100, 75, 80, 40);
ellipse.classList.add('default');
//# sourceMappingURL=ellipse-element.js.map