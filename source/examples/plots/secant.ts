/**
* @title Secant Plot
* @description This interactive demonstrates the plot element
* @tags [elements]
* @ignore true
*/

import {Interactive} from '../../index.js';

export default function main( idOrElement:string|HTMLElement ){

  // Initialize the interactive
  let interactive = new Interactive( idOrElement );
  interactive.width = 700;
  interactive.height = 700;

  // Create a new graph object
  let scale = 300/Math.PI;

  let plot2 = interactive.plot(Math.cos, {
    width: 700,
    height: 700,
    originX: 0,
    originY: 300,
    scaleX: scale,
    scaleY: scale,
    zoomable: false,
    controls: false,
    grid: false,
    labels: false
  });
  plot2.fPath.style.stroke = '#1bc075';

  let secant = (x) => { return 1/Math.cos(x) };
  let plot = interactive.plot(secant, {
    title: "Secant Function",
    width: 700,
    height: 700,
    originX: 0,
    originY: 300,
    scaleX: scale,
    scaleY: scale,
    zoomable: false,
    controls: false
  });


}
