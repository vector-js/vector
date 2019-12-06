/**
* @title Scrubber Element
* @description This interactive demonstrates the animation scrubber element.
* @tags [elements, input]
*/

import {Interactive, getScriptName} from '../../index.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
interactive.root.style.borderRadius = "4px";
let scrubber = interactive.scrubber( 100, 75, {});
scrubber.width = interactive.root.getBoundingClientRect().width - 300;

window.addEventListener('resize', () => {
  let value = scrubber.value;
  scrubber.width = interactive.root.getBoundingClientRect().width - 300;
  scrubber.value = value;
});
