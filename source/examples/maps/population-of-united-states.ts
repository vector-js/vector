/**
* @title Population of the United States
* @description Every state of the United States colored by population density.
* @input Input the name of the map you want to see, and the size of the map.
* @tags [maps]
* @weight 1
*/

import {Interactive, getScriptName, Element} from '../../index.js';
import * as data from './maps-json.js';
import * as population from './population-data.js';

let interactive = new Interactive(getScriptName(), {
  width:720,
  height:400
});
let map = interactive.map(data.usData);

let text = interactive.text(430,25,"");
let title = interactive.text(270,25,"Population Density of ")

let states = map.getFeatureElements();
let populationData = population.data;
let populationMap = new Map();
for( let i = 0; i < populationData.length; i++) {
  let state = populationData[i].State;
  let statePopulation = populationData[i].Population;
  populationMap.set(state, statePopulation);
}

let minPopulation = populationData[0].Population;
let maxPopulation = populationData[populationData.length - 1 ].Population;
let range = maxPopulation - minPopulation;

let test = 0;
states.forEach(element => {
    let islands = map.getFeatureElements();
    let name = element.getAttribute('name');
    let population = populationMap.get(name);
    let value = (population - minPopulation) / range;
    let color = value*255;
    element.setAttribute('style', `stroke: #3333333; stroke-width:0.15px; fill:rgb(${color} ${color} ${color})`);

    element.addEventListener("mouseenter", function(){
        islands.forEach(inner => {
            if(inner.getAttribute("name") == element.getAttribute("name")){
                inner.setAttribute("style",`stroke: #3333333; stroke-width:0.15px; fill:cornflowerblue;`);
            }
        });
        text.contents = `${name} : ${population}`;
    });


    element.addEventListener("mouseleave", function(){
        islands.forEach(inner => {
            if(inner.getAttribute("name") == element.getAttribute("name")){
              element.setAttribute('style', `stroke: #3333333; stroke-width:0.15px; fill:rgb(${color} ${color} ${color})`);
            }
        });
        text.contents = "";
    });
});

console.log(test);

function getColor(d) {
	return d > 1000 ? '#800026' :
	       d > 500  ? '#BD0026' :
	       d > 200  ? '#E31A1C' :
	       d > 100  ? '#FC4E2A' :
	       d > 50   ? '#FD8D3C' :
	       d > 20   ? '#FEB24C' :
	       d > 10   ? '#FED976' :
	                  '#FFEDA0';
}
