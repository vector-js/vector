import {Interactive, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.plot(600, 300, Math.sin, {
  originX: 0,
  originY: 150,
  scaleX: 300/Math.PI,
  scaleY: 300/Math.PI,
  zoomable: false,
  grid:true
});
