/**
* @title Normal Distribution Plot
* @description This interactive demonstrates the plot element
* @tags [elements]
* @ignore true
*/

import {Interactive} from '../../index.js';

export default function main( id:string ) {

  // Initialize the interactive
  let interactive = new Interactive(id);
  interactive.width = 600;
  interactive.height = 300;

  let sigma = 1;
  let mu = 0;
  let fn = (x:number) => { return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp((-1/2)*(Math.pow((x-mu)/sigma,2))) }

  // Create a new graph object
  let scale = 300/Math.PI;
  interactive.plot( fn, {
    originX: 0,
    originY: 150,
    scaleX: scale,
    scaleY: scale,
    zoomable: false,
    controls: false
  });
}


