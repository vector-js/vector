/**
* @title Plot Element
* @description This interactive demonstrates the plot element
* @tags [elements]
*/

import {Interactive} from '../../index.js';

/**
* Creates a graph of the sine function within the element with the provided id.
*/
export default function main( id:string ) {

	let interactive = new Interactive(id);
	interactive.width = 700;
	interactive.height = 400;

	let scale = 300/Math.PI;
	interactive.plot(Math.sin, {
		title: "Sine Function",
		originX: 0,
		originY: 150,
		scaleX: scale,
		scaleY: scale,
	});
}
