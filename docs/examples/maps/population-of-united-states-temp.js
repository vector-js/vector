// /**
// * @title Population of the United States
// * @description Every state of the United States colored by its population relative to the total population of the united states.
// * @input Input the name of the map you want to see, and the size of the map.
// * @tags [maps]
// * @weight 3
// */
//
// import {Interactive, getScriptName, Element} from '../../index.js';
// import * as data from './maps-json.js';
// import * as population from './population-data.js';
//
// // create elements
// let interactive = new Interactive(getScriptName(), {
//   width:760,
//   height:400
// });
// let map = interactive.map(data.usData);
// let text = interactive.text(interactive.width/3,32,"");
// text.tspan("Population of ");
// let textPopulation = text.tspan("");
//
// // create a population map of state names -> state populations
// let populationData = population.data;
// let populationMap = new Map();
// for( let i = 0; i < populationData.length; i++) {
//   let state = populationData[i].State;
//   let statePopulation = populationData[i].Population;
//   populationMap.set(state, statePopulation);
// }
//
// // calculate the range in populations for coloring each state
// let minPopulation = populationData[0].Population;
// let maxPopulation = populationData[populationData.length - 1 ].Population;
// let range = maxPopulation - minPopulation;
//
// // color and register event listeners for each state
// map.features.forEach(function(feature, name) {
//
//   let population = populationMap.get(name);
//   let value = (population - minPopulation) / range;
//   let color = value*255;
//   feature.style.fill = `rgb(${color} ${color} ${color})`;
//
//   // highlight the state on mouse over
//   feature.root.onmouseover = function(event:MouseEvent) {
//     feature.style.fill = 'cornflowerblue';
//     textPopulation.text = `${name} is ${population}`;
//   };
//
//   // remove highlighting on mouse leave
//   feature.root.onmouseout = function(event:MouseEvent) {
//     feature.style.fill = `rgb(${color} ${color} ${color})`;
//     textPopulation.text = "";
//   };
// });
//# sourceMappingURL=population-of-united-states-temp.js.map