import Interactive from '../index.js';
import Container from './container.js';
import { Element, Plot } from '../index.js';

describe('Plot', function () {

	// initialize testing section
  let container : HTMLElement;
	let interactive : Interactive;

	// create a new interactive before each function
  beforeEach(function() {
    container = Container.createContainer();
		interactive = new Interactive(container);
		interactive.border = true;
  });

  describe('Functions', function () {

		it('linear', function() {
			let plot = interactive.plot(true, 600, 300, 5, 5);
			plot.function = (x) => { return x; };
			plot.draw();
		});

		it('quadratic', function() {
			let plot = interactive.plot(true, 600, 300, 15, 5);
			plot.function = (x) => { return x*x; };
			plot.draw();
		});

		it('hyperbola', function() {
			let plot = interactive.plot(true, 600, 300, 30, 30);
			plot.function = (x) => { return 1/x; };
			plot.draw();
		});

		it('exp', function() {
			let plot = interactive.plot(true, 600, 300, 10, 10);
			plot.function = Math.exp;
			plot.draw();
		});

		it('ln', function() {
			let plot = interactive.plot(true, 600, 300, 15, 15);
			plot.function = Math.log;
			plot.draw();
		});

    it('sin', function() {
			let plot = interactive.plot(true, 600, 300, 300/Math.PI, 300/Math.PI);
			plot.function = Math.sin;
			plot.draw();
    });

		it('cos', function() {
			let plot = interactive.plot(true, 600, 300, 300/Math.PI, 300/Math.PI);
			plot.function = Math.cos;
			plot.draw();
		});

		it('tan', function() {
			let plot = interactive.plot(true, 600, 300, 300/Math.PI, 300/Math.PI);
			plot.function = Math.tan;
			plot.draw();
    });

  });
});
