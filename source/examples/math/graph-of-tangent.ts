import {Interactive, getScriptName} from '../../index.js';
let interactive = new Interactive(getScriptName(),{
  height:600
});
interactive.plot(600, 600, Math.tan, {
  originX: 0,
  originY: 150,
  scaleX: 300/Math.PI,
  scaleY: 300/Math.PI,
  zoomable: false,
  grid:true
});
