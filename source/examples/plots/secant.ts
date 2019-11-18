/**
* @title Secant Plot
* @description This interactive demonstrates the plot element
* @tags [elements]
*/

import {Interactive, getScriptName} from '../../index.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 600;
interactive.height = 600;

// Create a new graph object
let scale = 300/Math.PI;
let secant = (x) => { return 1/Math.cos(x) };
interactive.plot(600, 600, secant, {
  originX: 0,
  originY: 300,
  scaleX: scale,
  scaleY: scale,
  zoomable: false,
  controls: false
});
