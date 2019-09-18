/**
* @title Scrubber Element
* @description This interactive demonstrates the animation scrubber element.
* @tags [elements, input]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// let test = new Interactive(getScriptName());
// test.width = 768;
// test.height = 200;
// test.svg.style.border = "1px solid grey";
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
interactive.root.style.borderRadius = "4px";
let scrubber = interactive.scrubber(100, 75, 468);
scrubber.width = interactive.root.getBoundingClientRect().width - 300;
window.addEventListener('resize', () => {
    let value = scrubber.value;
    scrubber.width = interactive.root.getBoundingClientRect().width - 300;
    scrubber.value = value;
});
//
// interactive.height = 50;
// interactive.root.style.border = "1px solid grey";
// interactive.root.style.borderRadius = "4px";
// let scrubber = interactive.scrubber( 25, 25, 100);
// scrubber.width = interactive.root.getBoundingClientRect().width - 128;
//
// window.addEventListener('resize', () => {
//   let value = scrubber.value;
//   scrubber.width = interactive.root.getBoundingClientRect().width - 128;
//   scrubber.value = value;
// });
//# sourceMappingURL=scrubber-element.js.map