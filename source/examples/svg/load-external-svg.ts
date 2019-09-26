/**
* @title Load External SVG
* @description This interactive demonstrates how to load and use an external svg.
* @tags [svg]
*/

import Interactive, {getScriptName} from '../../index.js';

let myInteractive = new Interactive(getScriptName());

let svg = myInteractive.loadSVG('/resources/maps/united-states.svg');
svg.then(function(data){
  let bbox = data.root.getBBox();
  myInteractive.setViewBox( bbox.x, bbox.y, bbox.width, bbox.height);
  console.log(data);
})
