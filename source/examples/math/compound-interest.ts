/**
* @title Compound Interest
* @description
* @tags [math]
* @weight 2
*/

import { Interactive, Point } from '../../index.js';

export default function main( id:string ) {

  // default configuration
  let r = 4;

	/**
	* p - principle amount
	* r - interest rate
	* n - number of times interest applied to period
	*/
	let FutureValue = function( p:number, r:number, n:number ) {
		return (x) => {
			// return p*Math.pow((1 + r/n),Math.floor(n*x));
			return p*Math.pow((1 + r/n),n*x);
		}
	}

	let FutureValueIterative = function( p:number, r:number, n:number ) {
		return (x) => {
			return p*Math.pow((1 + r/n),Math.floor(n*x));
			// return Math.pow((1 + r/n),n*x);
		}
	}

  let interactive = new Interactive(id);
  interactive.height = 500;
  interactive.width = 600;

  let slider = interactive.scrubber( 24, 475, {
    min:0,
    max:100,
    value:r,
    width:interactive.width - 75
  });
	let fn = FutureValueIterative(1, 1, slider.value);

	let plot = interactive.plot(fn, {
		title: "Compound Interest",
		scaleX: 500/2.30258509299,
		scaleY: 30,
		originX: 0,
		originY: 300,
		height: 400,
		width: 600,
		zoomable: false,
		grid:true
	});
	plot.addFunction((x)=>{return Math.pow(Math.E, x)});

	plot.addDependency(slider);
	plot.update = function() {
		plot.setFunction(0, FutureValueIterative(1, 1, slider.value));
		plot.draw();
	}
}
