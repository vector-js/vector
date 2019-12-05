/**
* @title Random Colored Countires
* @description Randomly colors the countries in the world.
* @tags [maps]
*/

import {Interactive, getScriptName} from '../../index.js';
import * as data from './maps-json.js';

let interactive = new Interactive(getScriptName());
interactive.width = 768;
let map = interactive.map(data.globalData);

let countries = map.getAllFeaturePaths();

countries.forEach(element => {
    element.style.fill = getRandomColor();
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}