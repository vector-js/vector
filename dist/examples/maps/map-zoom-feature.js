/**
* @title Map Zoom
* @description Type in the names of the countries you want to zoom in on and press enter. This interactive is case-sensitive.
* @tags [maps]
*/
import { Interactive, getScriptName } from '../../index.js';
import * as data from './maps-json.js';
let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map(data.globalData, "", { fill: 'red',
    stroke: 'white',
    strokeWidth: 0.5 });
let inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
let input = document.createElement('input');
input.type = 'text';
input.value = '';
input.id = getScriptName() + '-text-input';
input.classList.add('input');
interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
inputContainer.appendChild(input);
let prev = "";
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        if (prev != "")
            map.getPathForFeatureName(prev).style.fill = 'red';
        if (input.value != "" && map.getPathForFeatureName(input.value)) {
            prev = input.value;
            map.setViewBoxToFeature(input.value);
            map.getPathForFeatureName(input.value).style.fill = 'blue';
        }
        else {
            map.resetViewBox();
        }
    }
});
//# sourceMappingURL=map-zoom-feature.js.map