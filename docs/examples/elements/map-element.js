/**
* @title Map Element
* @description This interactive demonstrates the interactive world map element.
* @tags [elements, maps]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map("", 768, 300);
let inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
let input = document.createElement('input');
input.type = 'text';
input.value = '';
input.id = getScriptName() + '-text-input';
input.classList.add('input');
interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
inputContainer.appendChild(input);
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        map.clearPaths();
        map = interactive.map(input.value, 768, 300);
    }
});
//# sourceMappingURL=map-element.js.map