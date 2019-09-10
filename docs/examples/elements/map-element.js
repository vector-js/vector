/**
* @title Map Element
* @description This interactive demonstrates the interactive world map element.
* @tags [elements, mapping]
*/
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map("canada", 768, 300);
let inputContainer = document.createElement('div');
inputContainer.style.width = '100%';
inputContainer.style.height = '2rem';
inputContainer.style.marginBottom = '1rem';
let input = document.createElement('input');
input.type = 'text';
input.value = '';
input.id = getScriptName() + '-text-input';
input.style.width = '100%';
input.style.height = '2rem';
input.style.paddingLeft = '8px';
input.style.webkitAppearance = 'textfield';
input.style.border = '1px solid grey';
input.style.borderRadius = '4px';
input.style.fontSize = '14px';
interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
inputContainer.appendChild(input);
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        let bbb = document.getElementById('map-element');
        let t = document.getElementsByClassName('country');
        let stop = t.length;
        let i = 0;
        for (i = 0; i < stop; i = (i + 1) % t.length) {
            bbb.children[0].children[0].removeChild(t[i]);
        }
        map = interactive.map(input.value, 768, 300);
    }
});
//# sourceMappingURL=map-element.js.map