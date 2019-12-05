/**
*
*/

import {Interactive} from '../../index.js';

/**
* Creates a graph of the sine function within the element with the provided id.
*/
export default function main( id:string ) {

	let interactive = new Interactive(id);
	interactive.width = 700;
	interactive.height = 400;
	// interactive.rectangle(0,0,interactive.width,interactive.height);
	let plot = interactive.plot(Math.sin, {
		title: "Sine Function",
		originX: 0,
		originY: 150,
		scaleX: 300/Math.PI,
		scaleY: 300/Math.PI,
		zoomable: false,
		grid:true
	});
}
