/**
* @title Load External SVG
* @description This interactive demonstrates how to load and use an external svg.
* @tags [svg, maps]
*/

import {Interactive, getScriptName} from '../../index.js';
import { getURL } from '../../util/file.js';
import { parseSVG } from '../../util/svg.js';

let map = getURL('/maps/united-states.svg');
let data = getURL('/maps/us-population-data.json');

Promise.all([map, data]).then(function(response) {

  let myInteractive = new Interactive(getScriptName(), {
    width: 736,
    height: 400
  });
  let svg = myInteractive.background.root.appendChild(parseSVG(response[0]));
  let bbox = (svg as SVGGraphicsElement).getBBox();
  myInteractive.setViewBox( bbox.x, bbox.y, bbox.width, bbox.height);

  let json = JSON.parse(response[1]);

  // calculate the min, max, and range of population
  let max = json.data[0].Population;
  let min = json.data[json.data.length -1 ].Population;
  let range = max - min;

  // loop through the states an color each based on their population
  for( let i = 0; i < json.data.length; i++) {

    let population = json.data[i].Population;
    let value = (population - min) / range;
    let state = svg.querySelector(`#${json.data[i].ID}`) as SVGPathElement;
    let color = 255 - value*255;
    state.style.fill = `rgb(${color} ${color} ${255})`;
  }

}).catch(function(error){
  throw error;
});