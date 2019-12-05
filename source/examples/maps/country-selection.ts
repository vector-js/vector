/**
* @title Country Selection
* @description Type in the names of the countries seperated by commas into the text box. When you hit enter they will be drawn.
* @tags [maps]
*/

import {Interactive, getScriptName} from '../../index.js';
import * as data from './maps-json.js';

let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map(data.globalData,"",{fill: '#6be88c',
                                              stroke: 'white',
                                              strokeWidth: 0.3});

let inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
let input = document.createElement('input');
input.type = 'text';
input.value = '';
input.id = getScriptName() + '-text-input';
input.classList.add('input');
interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
inputContainer.appendChild(input);

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        map.draw(input.value);
        let t = map.root.getBBox();
    }
  });
