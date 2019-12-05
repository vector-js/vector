/**
* @title Cosine Plot
* @description This interactive demonstrates the plot element
* @tags [elements]
* @ignore true
*/
import { Interactive, getScriptName } from '../../index.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 600;
interactive.height = 300;
// Create a new graph object
let scale = 300 / Math.PI;
interactive.plot(Math.cos, {
    originX: 0,
    originY: 150,
    scaleX: scale,
    scaleY: scale,
    zoomable: false,
    controls: false
});
//# sourceMappingURL=cosine.js.map