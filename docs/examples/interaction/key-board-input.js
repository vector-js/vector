/**
* @title Keyboard Input
* @description This interactive demonstrates how key board input can be used to add interactivity.
* @tags [input]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.border = true;
let keys = [];
let textKeys = [];
for (let i = 0; i < 5; i++) {
    let x = i * 100 + 25;
    let y = 75 - 32;
    let rectangle = interactive.rectangle(x, y, 64, 64);
    rectangle.root.setAttribute('rx', '3px');
    12341;
    let text = interactive.text(x + 32, y + 32, (i + 1).toString());
    text.root.setAttribute('alignment-baseline', 'middle');
    text.root.setAttribute('text-anchor', 'middle');
    keys.push(rectangle);
    textKeys.push(text);
}
window.onkeydown = function (event) {
    let index = parseInt(event.key) - 1;
    if (index >= 0 && index < 5) {
        keys[index].root.style.fill = '#404040';
        textKeys[index].root.style.fill = '#ffffff';
    }
};
window.onkeyup = function (event) {
    let index = parseInt(event.key) - 1;
    if (index >= 0 && index < 5) {
        keys[index].root.style.fill = 'none';
        textKeys[index].root.style.fill = '';
    }
};
//# sourceMappingURL=key-board-input.js.map