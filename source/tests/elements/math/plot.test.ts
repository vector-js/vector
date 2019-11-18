import Container from '../../container.js';
import {download, Interactive, Plot} from '../../../index.js';
(window as any).download = download;

describe('Plot', function () {

	// initialize testing section
  let container : HTMLElement;
	let interactive : Interactive;
  let plot : Plot;

	// create a new interactive before each function
  beforeEach(function() {
    container = Container.createContainer();
		interactive = new Interactive(container);
  });

  afterEach(function(){
    plot.export(); // for exporting not testing
  });

  describe('User Events', function() {
    it('should create a plot without zoom & pan events', function(){
      plot = interactive.plot(600, 300, Math.sin, {
        originX: 0,
        originY: 150,
        scaleX: 300/Math.PI,
        scaleY: 300/Math.PI,
        zoomable: false,
        grid:true
      });
    });
    it('should create a plot without a display point', function(){
      plot = interactive.plot(600, 300, Math.sin, {
        originX: 0,
        originY: 150,
        scaleX: 300/Math.PI,
        scaleY: 300/Math.PI,
        displayPoint: false,
        zoomable: false,
        grid:true
      });
    });
  });

  describe('Functions', function () {

		it('linear', function() {
      let f = (x:number) => { return x; };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        displayPoint: true,
        zoomable: true
      });
		});

		it('quadratic', function() {
      let f = (x:number) => { return x*x; };
      let scaleX = 45;
      let scaleY = 30;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 270,
        originX: 300
        // grid: false
      });
		});

    it('cubic', function() {
      let f = (x:number) => { return x*x*x; };
      let scaleX = 30;
      let scaleY = 10;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
		it('hyperbola', function() {
      let f = (x:number) => { return 1/x; };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
		});
		it('natural logarithm', function() {
      let f = Math.log;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 150,
        originX: 50
      });
		});
    it('exponential', function() {
      interactive.width = 700;
      interactive.height = 700;
      let f = Math.log;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(700, 700, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 400,
        originX: 300
      });
    });
    it('floor', function() {
      let f = Math.floor;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('ceiling', function() {
      let f = Math.ceil;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('round', function() {
      let f = Math.round;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('absolute value', function() {
      let f = Math.abs;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('square root', function() {
      let f = Math.sqrt;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('sine', function() {
      let f = Math.sin;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      plot = interactive.plot(600, 300, f, {
        originX: 0,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
		it('cosine', function() {
      let f = Math.cos;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      plot = interactive.plot(600, 300, f, {
        originX: 0,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY
      });
		});
    it('tangent', function() {
      interactive.height = 600;
      let f = Math.tan;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      plot = interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY,
        displayPoint: true,
        zoomable: true
      });
    });
    it('arcsine', function() {
      let f = Math.asin;
      let scaleX = 300/Math.PI;
      let scaleY = 150/(Math.PI/2);
      interactive.plot(600, 300, f, {
        originX: 300,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });

    it('arctangent', function() {
      let f = Math.atan;
      let scaleX = 300/Math.PI;
      let scaleY = 150/(Math.PI/2);
      plot = interactive.plot(600, 300, f, {
        originX: 300,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('cosecant', function() {
      interactive.height = 600;
      let f = (x) => { return 1/Math.sin(x)};
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      plot = interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('secant', function() {
      interactive.height = 600;
      let f = (x) => { return 1/Math.cos(x)};
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      plot = interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('cotangent', function() {
      interactive.height = 600;
      let f = (x) => { return 1/Math.tan(x)};
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      plot = interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
  });

  describe('Grid Lines', function(){
    it('should display grid lines every .1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 101;
      let scaleY = 101;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every .1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 100;
      let scaleY = 100;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every .1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every .1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 99;
      let scaleY = 99;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every .1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 11;
      let scaleY = 11;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 10;
      let scaleY = 10;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 9;
      let scaleY = 9;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 1 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 5;
      let scaleY = 5;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 10 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 1.1;
      let scaleY = 1.1;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = 1;
      let scaleY = 1;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = .9;
      let scaleY = .9;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = .5;
      let scaleY = .5;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = .11;
      let scaleY = .11;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = .10;
      let scaleY = .10;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = .09;
      let scaleY = .09;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('should display grid lines every 100 unit', function() {
      let f = (x:number) => x*x;
      let scaleX = .05;
      let scaleY = .05;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('zooming', function() {
      let f = (x:number) => x*x;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        displayPoint: true
      });
    });
  });
});
