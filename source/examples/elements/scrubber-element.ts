import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

// let test = new Interactive(getScriptName());
// test.width = 768;
// test.height = 200;
// test.svg.style.border = "1px solid grey";

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 50;
interactive.svg.style.border = "1px solid grey";
interactive.svg.style.borderRadius = "4px";
let scrubber = interactive.scrubber( 25, 25, 100);
scrubber.width = interactive.svg.getBoundingClientRect().width - 128;

window.addEventListener('resize', () => {
  let value = scrubber.value;
  scrubber.width = interactive.svg.getBoundingClientRect().width - 128;
  scrubber.value = value;
});
