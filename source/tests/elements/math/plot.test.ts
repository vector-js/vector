import Container from '../../container.js';
import Interactive from '../../../interactive.js';
// import {download} from '../../../index.js';
// (window as any).download = download;

describe('Plot', function () {

	// initialize testing section
  let container : HTMLElement;
	let interactive : Interactive;

	// create a new interactive before each function
  beforeEach(function() {
    container = Container.createContainer();
		interactive = new Interactive(container);
  });

  describe('User Events', function() {
    it('should create a plot without zoom & pan events', function(){
      interactive.plot(600, 300, Math.sin, {
        originX: 0,
        originY: 150,
        scaleX: 300/Math.PI,
        scaleY: 300/Math.PI,
        zoomable: false,
        grid:true
      });
    });
    it('should create a plot without a display point', function(){
      interactive.plot(600, 300, Math.sin, {
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
      let scaleX = 15;
      let scaleY = 15;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
		});

		it('quadratic', function() {
      let f = (x:number) => { return x*x; };
      let scaleX = 15;
      let scaleY = 5;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
		});

    it('cubic', function() {
      let f = (x:number) => { return x*x*x; };
      let scaleX = 30;
      let scaleY = 5;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
    });

		it('hyperbola', function() {
      let f = (x:number) => { return 1/x; };
      let scaleX = 30;
      let scaleY = 30;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
		});

		it('exponential', function() {
      let f = Math.exp;
      let scaleX = 10;
      let scaleY = 10;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
		});
		it('natural logarithm', function() {
      let f = Math.log;
      let scaleX = 15;
      let scaleY = 15;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
		});
    it('floor', function() {
      let f = Math.floor;
      let scaleX = 50;
      let scaleY = 50;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        grid:true
      });
    });
    it('ceiling', function() {
      let f = Math.ceil;
      let scaleX = 50;
      let scaleY = 50;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        grid:true
      });
    });
    it('round', function() {
      let f = Math.round;
      let scaleX = 50;
      let scaleY = 50;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        grid:true
      });
    });
    it('square root', function() {
      let f = Math.sqrt;
      let scaleX = 50;
      let scaleY = 50;
      interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        grid:true
      });
    });
    it('sine', function() {
      let f = Math.sin;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      interactive.plot(600, 300, f, {
        originX: 0,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true
      });
    });
		it('cosine', function() {
      let f = Math.cos;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      interactive.plot(600, 300, f, {
        originX: 0,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        grid:true
      });
		});
    it('tangent', function() {
      interactive.height = 600;
      let f = Math.tan;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: false,
        grid:true,
        displayPoint:false
      });
    });
    it('arcsine', function() {
      let f = Math.asin;
      let scaleX = 300/Math.PI;
      let scaleY = 150/(Math.PI/2);
      interactive.plot(600, 300, f, {
        originX: 300,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        displayPoint: false,
        grid:true
      });
    });

    it('arctangent', function() {
      let f = Math.atan;
      let scaleX = 300/Math.PI;
      let scaleY = 150/(Math.PI/2);
      interactive.plot(600, 300, f, {
        originX: 300,
        originY: 150,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        displayPoint: false,
        grid:true
      });
    });
    it('cosecant', function() {
      interactive.height = 600;
      let f = (x) => { return 1/Math.sin(x)};
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: false,
        displayPoint:false,
        grid: true
      });
    });
    it('secant', function() {
      interactive.height = 600;
      let f = (x) => { return 1/Math.cos(x)};
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: false,
        grid: true
      });
    });
    it('cotangent', function() {
      interactive.height = 600;
      let f = (x) => { return 1/Math.tan(x)};
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      interactive.plot(600, 600, f, {
        originX: 0,
        originY: 300,
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: false,
        grid: true
      });
    });

  });

  describe('Grid Lines', function(){
    it('should display grid lines every 1 unit', function() {
      let f = Math.tan;
      let scaleX = 300/Math.PI;
      let scaleY = 300/Math.PI;
      let plot = interactive.plot(600, 300, f, {
        scaleX: scaleX,
        scaleY: scaleY,
        originX: 0,
        originY: 150,
        zoomable: true,
        border: true,
        grid:true
      });
      // for( let i = -10; i <= 10; i++) {
      //   for( let j = -10; j <= 10; j++) {
      //     let rect = plot.viewPort.rectangle(i,j,1,1);
      //     rect.root.setAttribute('vector-effect','non-scaling-stroke');
      //     rect.style.stroke = '#aaaaaa';
      //   }
      // }
    });
  });
});
