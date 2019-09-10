/**
* @title Animate Along Path
* @description This interactive demonstrates how a element can be animated along a path.
*/


import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 225;
interactive.border = true;

//Hard coded  in the string for the path. Obviously, fix this later.
let pathString = "M417.73,36.71v10.4h-8.5V36.71h8.5l27.49,17.83a30.28,30.28,0,0,0-4,.71,20.62,20.62,0,0,0-6.2,2.6,14.38,14.38,0,0,0-4.5,4.55,11.56,11.56,0,0,0-.6,1.09,11.56,11.56,0,0,1,.6-1.09,14.38,14.38,0,0,1,4.5-4.55,20.62,20.62,0,0,1,6.2-2.6,30.28,30.28,0,0,1,4-.71c.94-.09,1.88-.14,2.81-.14a40.87,40.87,0,0,1,8.1.75,18.78,18.78,0,0,1,6.55,2.6,13.4,13.4,0,0,1,4.55,5,19.05,19.05,0,0,1,2,7.85h-8.5a8.14,8.14,0,0,0-4.1-6.8,12.56,12.56,0,0,0-3.75-1.45,19.32,19.32,0,0,0-4.15-.45,25.26,25.26,0,0,0-3.85.3,13,13,0,0,0-3.55,1,7.19,7.19,0,0,0-2.6,2,5,5,0,0,0-1,3.25,4.8,4.8,0,0,0,1.55,3.65,12.22,12.22,0,0,0,4,2.4,34.61,34.61,0,0,0,5.4,1.6q3,.64,6,1.35a63.83,63.83,0,0,1,6.25,1.7,20.58,20.58,0,0,1,5.4,2.65,12.91,12.91,0,0,1,3.8,4.15,12.16,12.16,0,0,1,1.45,6.2,14.42,14.42,0,0,1-1.95,7.8,15.24,15.24,0,0,1-5.1,5,21.27,21.27,0,0,1-7.1,2.65,42,42,0,0,1-7.85.75,36.35,36.35,0,0,1-8.2-.9,20.05,20.05,0,0,1-6.9-3,15.1,15.1,0,0,1-4.8-5.4,18.65,18.65,0,0,1-2-8.15h8.5a9.59,9.59,0,0,0,1.3,4.75,9.07,9.07,0,0,0,3.15,3.1,14,14,0,0,0,4.4,1.65,25.44,25.44,0,0,0,5,.5,31.2,31.2,0,0,0,4.2-.3,15.46,15.46,0,0,0,4-1.1,7.63,7.63,0,0,0,3.05-2.35,6.26,6.26,0,0,0,1.2-4,5.65,5.65,0,0,0-2.5-5,21.4,21.4,0,0,0-6.25-2.75q-3.75-1-8.15-1.9a42.84,42.84,0,0,1-8.15-2.4,16.82,16.82,0,0,1-6.25-4.35q-2.5-2.81-2.5-7.8a13,13,0,0,1,1.15-5.61L417.73,55.6h-8.5v0h8.5v58.2q0,6.9-3.35,10T405.33,127a22.44,22.44,0,0,1-4.3-.4v-7.3l.85.15a5.9,5.9,0,0,0,.75,0h1.8c1.87,0,3.13-.52,3.8-1.55s1-2.89,1-5.55v-6.35l-15.3-9.85v11.1h-11.1V96.2h11.1l15.3,9.85V70.94L383.72,54.39h0q-6.9-.19-11.4,2.8a23.05,23.05,0,0,0-7.6,9.3h-.2V55.6h-8v0h8V66.5h.2a23.05,23.05,0,0,1,7.6-9.3q4.5-3,11.4-2.8v9a24.11,24.11,0,0,0-8.7,1.4,13.71,13.71,0,0,0-5.8,4.1,17.08,17.08,0,0,0-3.2,6.55,35.23,35.23,0,0,0-1,8.85v23h-8.5V71.61L336.15,58.48h0a23.68,23.68,0,0,0-3.57-2,26.32,26.32,0,0,0-25.21,2,25.9,25.9,0,0,1,3.56-2,29,29,0,0,1,21.65,0,23.68,23.68,0,0,1,3.57,2,22,22,0,0,1,4.28,3.77,23.9,23.9,0,0,1,4.8,8.6,34.33,34.33,0,0,1,1.6,10.65q0,1.13-.06,2.22l-9.15-5.94a31,31,0,0,1,.21,3.68,25.5,25.5,0,0,1-1.25,8.35,17.28,17.28,0,0,1-3.45,6.1A14.71,14.71,0,0,1,328,99.66a15.67,15.67,0,0,1-12.5,0,14.89,14.89,0,0,1-5.15-3.75,17.59,17.59,0,0,1-3.45-6.1,28.51,28.51,0,0,1,0-16.7A18.31,18.31,0,0,1,310.33,67a14.91,14.91,0,0,1,5.15-3.8,15.67,15.67,0,0,1,12.5,0,14.72,14.72,0,0,1,5.15,3.8,18,18,0,0,1,3.45,6.15,22.81,22.81,0,0,1,1,4.67l9.15,5.94c0,.07,0,.14,0,.21a32.67,32.67,0,0,1-1.53,8.17,25.58,25.58,0,0,1-2,4.59,23.4,23.4,0,0,1-2.8,4,22.24,22.24,0,0,1-7.85,5.7,29.61,29.61,0,0,1-21.65,0,22.25,22.25,0,0,1-7.9-5.7,24.24,24.24,0,0,1-4.8-8.55,34.17,34.17,0,0,1-1.6-10.6,34.63,34.63,0,0,1,1.6-10.65,24.2,24.2,0,0,1,4.8-8.6,21.89,21.89,0,0,1,4.34-3.8L279.73,40.1h-8.5V55.6h-8.8v7.5h8.8v0h-8.8V55.6h8.8V40.1h8.5V55.6H290v7.5h-10.3V95.2a9.58,9.58,0,0,0,.25,2.4,2.51,2.51,0,0,0,.95,1.4,4.26,4.26,0,0,0,1.95.65,28.47,28.47,0,0,0,3.25.15H290v7.5h-6.5a30.55,30.55,0,0,1-5.65-.45,8.35,8.35,0,0,1-3.8-1.65,7.11,7.11,0,0,1-2.15-3.4,19.89,19.89,0,0,1-.7-5.8V80.65L258.14,72.2a20.62,20.62,0,0,0-2.4-8,18,18,0,0,0-4.85-5.55,20.12,20.12,0,0,0-6.8-3.25,31.28,31.28,0,0,0-8.25-1.05,25,25,0,0,0-10.7,2.15,21.26,21.26,0,0,0-7.65,5.9,24.72,24.72,0,0,0-4.25,7.84,24.72,24.72,0,0,1,4.25-7.84,21.26,21.26,0,0,1,7.65-5.9,25,25,0,0,1,10.7-2.15,31.28,31.28,0,0,1,8.25,1.05,20.12,20.12,0,0,1,6.8,3.25,18,18,0,0,1,4.85,5.55,20.62,20.62,0,0,1,2.4,8h-8.8a11.9,11.9,0,0,0-12.8-10.3,15.86,15.86,0,0,0-7.7,1.7,13.61,13.61,0,0,0-5,4.5,18.79,18.79,0,0,0-2.65,6.45,34.73,34.73,0,0,0-.8,7.55,28.61,28.61,0,0,0,.85,7,18.62,18.62,0,0,0,2.65,6.05,13.37,13.37,0,0,0,4.7,4.25,14,14,0,0,0,6.9,1.6q6.3,0,9.85-3.3a15,15,0,0,0,4.35-9.3h8.7Q257,98,251.29,103.2t-15.65,5.2a27,27,0,0,1-10.45-1.9,20.26,20.26,0,0,1-7.6-5.4,23.2,23.2,0,0,1-4.6-8.35,34.6,34.6,0,0,1-1.55-10.65,37.94,37.94,0,0,1,1.5-10.85q.13-.48.3-1h0L196.81,59.72a23.35,23.35,0,0,0-3.29-2.47,21.2,21.2,0,0,0-11.45-2.85,23.58,23.58,0,0,0-9.75,2,23,23,0,0,0-7.7,5.6,25.42,25.42,0,0,0-4.53,7.2,25.42,25.42,0,0,1,4.53-7.2,23,23,0,0,1,7.7-5.6,23.58,23.58,0,0,1,9.75-2,21.2,21.2,0,0,1,11.45,2.85,23.35,23.35,0,0,1,3.29,2.47,22.14,22.14,0,0,1,4,4.78,28.46,28.46,0,0,1,3.8,9.6,41.42,41.42,0,0,1,.88,8.16q0,.88,0,1.74H182.91l-11.63-7.54h-4.54a17.46,17.46,0,0,1,1.3-5.65,15.11,15.11,0,0,1,3-4.65A13.74,13.74,0,0,1,175.59,63a14.89,14.89,0,0,1,5.95-1.15A14.68,14.68,0,0,1,187.39,63a14.85,14.85,0,0,1,4.6,3.1,14.62,14.62,0,0,1,3.1,4.65,17.73,17.73,0,0,1,1.35,5.7H171.28L182.91,84H166.77a20.69,20.69,0,0,0,.8,6.45,14.71,14.71,0,0,0,2.9,5.4,14.35,14.35,0,0,0,5.1,3.75,17.67,17.67,0,0,0,7.3,1.4,14.69,14.69,0,0,0,8.85-2.5,12.08,12.08,0,0,0,4.55-7.6h8.4q-1.69,8.7-7.5,13.1t-14.6,4.4a26.65,26.65,0,0,1-10.75-2,21.21,21.21,0,0,1-7.65-5.6,24,24,0,0,1-4.65-8.6,41.86,41.86,0,0,1-1.75-10.9,31.14,31.14,0,0,1,1.8-10.8c.17-.44.34-.87.52-1.3h0L108.77,35.9l20.4,61.9h.2L150,35.9h9.9l-25.4,71.4h-10.8L98.57,35.9h10.2";

let control = interactive.control(0, 0);

let scrubber = interactive.scrubber(100, 175, 468);

let path = interactive.path(pathString)

//Need these to automate the process, do not if you are using scrubber

// var counter = 0;
//
// var direction = true;

var pathLength = path.root.getTotalLength();

//This will draw the path. Have not figure out how to integreate it with the scrubber yet

// let pathRoot = path.root.getPathSegAtLength();
//
// pathRoot.style.transition = pathRoot.style.webkitTransition =
//   'none';
// // Set up the starting positions
// pathRoot.style.strokeDasharray = pathLength + ' ' + pathLength;
// pathRoot.style.strokeDashoffset = '' + pathLength;
// // Trigger a layout so styles are calculated & the browser
// // picks up the starting position before animating
// pathRoot.getBoundingClientRect();
// // Define our transition
// pathRoot.style.transition = pathRoot.style.webkitTransition =
//   'stroke-dashoffset 2s ease-in-out';
// // Go!
// pathRoot.style.strokeDashoffset = '0';
//
function moveControl() {

  //Need this to automate the process, do not if you are using scrubber

	// if (counter >= 1) {
  //
	// 	direction = false;
	// } else if (counter < 0) {
  //
	// 	direction = true;
	// }
  //
	// if (direction) {
	// 	counter += 0.001;
	// } else {
	// 	counter -= 0.001;
	// }



  let currentPosition = scrubber.value / (scrubber.max - scrubber.min)

  control.translate(path.root.getPointAtLength(currentPosition * pathLength).x, path.root.getPointAtLength(currentPosition * pathLength).y);

	requestAnimationFrame(moveControl);
}
requestAnimationFrame(moveControl);