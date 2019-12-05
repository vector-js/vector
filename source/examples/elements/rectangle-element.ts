/**
* @title Rectangle Element
* @description This interactive demonstrates the rectangle element.
* @tags [elements]
*/

import {Interactive, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let rectangle = interactive.rectangle( 50, 50, 100, 50);
rectangle.classList.add('default');
