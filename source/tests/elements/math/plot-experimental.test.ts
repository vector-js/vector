import Container from '../../container.js';
import {download, Interactive, Plot, Text, saveSVG, floor} from '../../../index.js';

describe('Plot', function () {

	// initialize testing section
  let container : HTMLElement;
	let interactive : Interactive;
  let plot : Plot;

	// create a new interactive before each function
  beforeEach(function() {
    container = Container.createContainer();
		interactive = new Interactive(container, {
      width:700,
      height:400
    });
  });

  afterEach(function(){
    plot.export(); // for exporting not testing
  });

it('normal distribution examples', function() {
	interactive.width = 900;
	interactive.height = 350;

	let sigma = .1;
	let mu = 0;
	function createNormal( mu:number, sigma:number) {
		return (x:number) => { return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp((-1/2)*(Math.pow((x-mu)/sigma,2))) }
	}

	// Create a new graph object
	let scalex = 50;
	let scaley = 500;
	plot = interactive.plot( createNormal( 3, 1), {
		originX: 0,
		originY: 250,
		width: interactive.width,
		height: interactive.height,
		scaleX: scalex,
		scaleY: scaley,
		zoomable: false,
		controls: false
	});
	plot.addFunction(createNormal(6,2));
	plot.addFunction(createNormal(9,3));

});
it('CDF examples', function() {
	interactive.width = 900;
	interactive.height = 350;

	function createCDF( mean, variance) {
		return (x) => {
			return cdf(x, mean, variance);
		}
	}

	function cdf(x, mean, variance) {
		return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
	}

	function erf(x) {
		// save the sign of x
		var sign = (x >= 0) ? 1 : -1;
		x = Math.abs(x);

		// constants
		var a1 =  0.254829592;
		var a2 = -0.284496736;
		var a3 =  1.421413741;
		var a4 = -1.453152027;
		var a5 =  1.061405429;
		var p  =  0.3275911;

		// A&S formula 7.1.26
		var t = 1.0/(1.0 + p*x);
		var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
		return sign * y; // erf(-x) = -erf(x);
	}

	// Create a new graph object
	let scalex = 50;
	let scaley = 250;
	plot = interactive.plot( createCDF( 3, 1), {
		originX: 0,
		originY: 250,
		width: interactive.width,
		height: interactive.height,
		scaleX: scalex,
		scaleY: scaley,
		zoomable: false,
		controls: false
	});
	plot.addFunction(createCDF( 6, 4));
	plot.addFunction(createCDF( 9, 9));

});

it('normal distribution examples', function() {
	interactive.width = 740;
	interactive.height = 350;

	let sigma = .1;
	let mu = 0;
	function createNormal( mu:number, sigma:number) {
		return (x:number) => { return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp((-1/2)*(Math.pow((x-mu)/sigma,2))) }
	}

	// Create a new graph object
	let scalex = 80;
	let scaley = 500;
	plot = interactive.plot( createNormal( 0, 1), {
		originX: (interactive.width-100)/2,
		originY: 250,
		width: interactive.width,
		height: interactive.height,
		scaleX: scalex,
		scaleY: scaley,
		zoomable: false,
		controls: false
	});

});

		it('CDF examples', function() {
	interactive.width = 740;
	interactive.height = 350;

	function createCDF( mean, variance) {
		return (x) => {
			return cdf(x, mean, variance);
		}
	}

	function cdf(x, mean, variance) {
		return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
	}

	function erf(x) {
		// save the sign of x
		var sign = (x >= 0) ? 1 : -1;
		x = Math.abs(x);

		// constants
		var a1 =  0.254829592;
		var a2 = -0.284496736;
		var a3 =  1.421413741;
		var a4 = -1.453152027;
		var a5 =  1.061405429;
		var p  =  0.3275911;

		// A&S formula 7.1.26
		var t = 1.0/(1.0 + p*x);
		var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
		return sign * y; // erf(-x) = -erf(x);
	}

	// Create a new graph object
	let scalex = 80;
	let scaley = 250;
	plot = interactive.plot( createCDF( 0, 1), {
		originX: (interactive.width-100)/2,
		originY: 250,
		width: interactive.width,
		height: interactive.height,
		scaleX: scalex,
		scaleY: scaley,
		zoomable: false,
		controls: false
	});
	// plot.addFunction(createCDF( 6, 4));
	// plot.addFunction(createCDF( 9, 9));

});

it('normal distribution', function() {
	interactive.width = 700;
	interactive.height = 250;

	let sigma = 2;
	let mu = 0;
	let fn = (x:number) => { return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp((-1/2)*(Math.pow((x-mu)/sigma,2))) }

	// Create a new graph object
	let scalex = 50;
	let scaley = 500;
	plot = interactive.plot( fn, {
		originX: (interactive.width-100)/2,
		originY: 150,
		width: interactive.width,
		height: interactive.height,
		scaleX: scalex,
		scaleY: scaley,
		zoomable: false,
		controls: false
	});
});

it('normal distribution', function() {
	interactive.width = 700;
	interactive.height = 250;

	let sigma = 3;
	let mu = 0;
	let fn = (x:number) => { return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp((-1/2)*(Math.pow((x-mu)/sigma,2))) }

	// Create a new graph object
	let scalex = 50;
	let scaley = 500;
	plot = interactive.plot( fn, {
		originX: (interactive.width-100)/2,
		originY: 150,
		width: interactive.width,
		height: interactive.height,
		scaleX: scalex,
		scaleY: scaley,
		zoomable: false,
		controls: false
	});
});
// it('normal distribution art', function() {
//   interactive.width = 1500;
//   interactive.height = 600;
//
//   let sigma = .1;
//   let mu = 0;
//   function createNormal( mu:number, sigma:number) {
//     return (x:number) => { return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp((-1/2)*(Math.pow((x-mu)/sigma,2))) }
//   }
//   // Create a new graph object
//   let scalex = 50;
//   let scaley = 500;
//   plot = interactive.plot( (x) => {return 0;} , {
//     originX: (interactive.width-100)/2,
//     originY: 500,
//     width: interactive.width,
//     height: interactive.height,
//     scaleX: scalex,
//     scaleY: scaley,
//     zoomable: false,
//     controls: false
//   });
//   // let value = 0;
//   // let min = 1;
//   // let max = 5;
//   // let prev = createNormal(0, max)
//   // for( let i = max; i >= min; i -= .2) {
//   //   value = (i - min)/max*255;
//   //   prev = (x:number) => { return prev(x) + createNormal(0, i)(x) };
//   //   plot.addFunction(prev).style.stroke = `rgb(${value}, ${value}, ${value})`;
//   // }
//
//   // plot.addFunction(createNormal(0, 5));
//   // plot.addFunction((x:number) => { return createNormal(0, 5)(x) + createNormal(0,4)(x)});
//   // plot.addFunction((x:number) => { return createNormal(0, 5)(x) + createNormal(0, 4)(x) + createNormal(0,3)(x)});
//
//
//   for( let i = 20; i >= 3; i--) {
//     let fn = (x:number) => {
//       let sum = 0;
//       for( let j = 3; j <= i; j ++) {
//         sum += createNormal(0, j)(x);
//       }
//       return sum;
//     }
//     plot.addFunction(fn);
//   }
//
//
// });


it('sine', function() {
	let title =  new Text(interactive.width/2, 25, 'sin(');
	let span = title.tspan('x');
	span.setAttribute('text-anchor', 'middle');
	span.setAttribute('alignment-baseline', 'middle');
	span.style.fontFamily = 'KaTeX_Main-Regular, KaTeX_Main';
	title.contents += ')';
	title.setAttribute('alignment-baseline', 'middle');
	title.setAttribute('text-anchor', 'middle');

	plot = interactive.plot(Math.sin, {
		title: title,
		originX: 0,
		originY: 150,
		scaleX: 300/Math.PI,
		scaleY: 300/Math.PI,
		zoomable: false,
		grid:true
	});
});
describe( 'compound interest', function(){
	it('compound interest', function() {
		interactive.width = 700;
		interactive.height = 700;

		/**
		* r - interest rate
		* n - number of times interest applied to period
		*/
		let compound = function( p:number, r:number, n:number ) {
			return (x) => {
				return p*Math.pow((1 + r/n),Math.floor(n*x));
				// return Math.pow((1 + r/n),n*x);
			}
		}

		let r = 0.15;
		let p =100;
		plot = interactive.plot((x)=>{return p*Math.pow(Math.E, r*x)}, {
			title: "Exponential Function",
			originX: 0,
			originY: 500,
			height: 500,
			width: 600,
			scaleX: 50,
			scaleY: 1,
			zoomable: false,
			grid:true
		});
		plot.addFunction(compound(p, r, 1));
		plot.addFunction(compound(p, r, 4));
		plot.addFunction(compound(p, r, 12));
	});

	it('compound interest 2', function() {
		interactive.width = 700;
		interactive.height = 700;

		/**
		* r - interest rate
		* n - number of times interest applied to period
		*/
		let compound = function( p:number, r:number, n:number ) {
			return (x) => {
				return p*Math.pow((1 + r/n),n*x);
				// return Math.pow((1 + r/n),n*x);
			}
		}

		let r = 0.15;
		let p =1;
		plot = interactive.plot((x)=>{return p*Math.pow(Math.E, r*x)}, {
			title: "Exponential Function",
			originX: 0,
			originY: 400,
			height: 500,
			width: 500,
			scaleX: 25,
			scaleY: 25,
			zoomable: false,
			grid:true
		});
		// plot.addFunction(compound(p, r, .125/4));
		// plot.addFunction(compound(p, r, .125/2));
		let delta = .01;
		let max = 100;
		let min = 0;
		let paths = [];
		for( let i = min; i < max; i += delta ) {
			paths.push(plot.addFunction(compound(p, r, i)));
			delta *= 1.1;
			// console.log(delta);
		}
		for( let i = 0; i < paths.length; i++) {
			let value = (paths.length - i)/paths.length*255;
			paths[i].style.stroke = `rgb(${value}, ${value}, ${value})`
		}
	});
});


it('exponential', function() {
	interactive.width = 700;
	interactive.height = 700;

	plot = interactive.plot(Math.exp, {
		title: this.test.title,
		originX: 300,
		originY: 300,
		height: 700,
		width: 700,
		scaleX: 50,
		scaleY: 50,
		zoomable: false,
		grid:true
	});
});
});
