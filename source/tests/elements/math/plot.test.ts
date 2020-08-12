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


  describe('Functions', function () {
		it('Linear', function() {
      let f = (x:number) => { return x; };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
      });
		});

		it('Quadratic', function() {
      interactive.width = 500;
      interactive.height = 500;
      let f = (x:number) => { return x*x; };
      let scaleX = 400/6;
      let scaleY = 400/6;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        width: 500,
        height: 500,
        originY: 400/2 + 2*scaleY,
        originX: 200
        // grid: false
      });
		});

		it('Cubic Curve', function() {
      interactive.width = 500;
      interactive.height = 500;
      let f = (x:number) => { return x*x*x; };
      let scaleX = 50;
      let scaleY = 20;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        width: 500,
        height: 500,
        originY: 400/2,
        originX: 400/2
        // grid: false
      });
		});

    it('Polynomial', function() {
      interactive.width = 500;
      interactive.height = 500;
      let f = (x:number) => { return (-0.2*x*x*x*x + .5*x*x*x + x*x -3*x)*.8; };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        width: 500,
        height: 500,
        originY: 400/2,
        originX: 400/2
        // grid: false
      });
    });

		it('Natural Logarithm', function() {
      let f = Math.log;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 150,
        originX: 50
      });
		});
    it('Logarithm Base 2', function() {
      let f = (x:number) => { return Math.log(x)/Math.log(2) };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 250,
        originX: 50
      });
    });
    it('Logarithm Base 3', function() {
      let f = (x:number) => { return Math.log(x)/Math.log(3) };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 250,
        originX: 50
      });
    });
    it('Logarithm Base 10', function() {
      interactive.width = 700;
      interactive.height = 700;
      let f = (x:number) => { return Math.log(x)/Math.log(10) };
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        width:700,
        height:700,
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 300,
        originX: 0
      });
    });
    it('Floor Function', function() {
      let f = Math.floor;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('Ceiling Function', function() {
      let f = Math.ceil;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('Round Function', function() {
      let f = Math.round;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('Absolute Value', function() {
      let f = Math.abs;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
    it('Square Root', function() {
      let f = Math.sqrt;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY
      });
    });
  });
  describe('Trigonometric Functions', function(){
    describe('500px', function(){

      afterEach(function(){
        // let title = plot.plotTitle.contents.toLowerCase().replace(' ', '-');
        // plot.drawTrimmed()
        // download(interactive.root.parentElement.id, title);
      });

      describe('Circle Functions', function(){
        beforeEach(function() {
          interactive.width = 500;
          interactive.height = 300;
        });
        it('Cosine', function() {
          let f = Math.cos;
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: 0,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
        });
        it('Sine', function() {
          interactive.width = 500;
          interactive.height = 300;
          let f = Math.sin;
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: 0,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
        });
        it('Tangent', function() {
          interactive.height = interactive.width;
          let f = Math.tan;
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: 0,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
        });
        it('Secant', function() {
          interactive.height = interactive.width;
          let f = (x) => { return 1/Math.cos(x)};
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: 0,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
          plot.addFunction(Math.cos).style.strokeDasharray = '6';
        });
        it('Cosecant', function() {
          interactive.height = interactive.width;
          let f = (x) => { return 1/Math.sin(x)};
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: 0,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
          plot.addFunction(Math.sin).style.strokeDasharray = '6';
        });
        it('Cotangent', function() {
          interactive.height = interactive.width;
          let f = (x) => { return 1/Math.tan(x)};
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: 0,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
          plot.addFunction(Math.tan).style.strokeDasharray = '6';
        });
        it('Arc Cosine', function() {
          interactive.height = 400;
          let f = Math.acos;
          let scaleX = 300/Math.PI;
          let scaleY = 300/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100),
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
        });
        it('Arc Sine', function() {
          interactive.height = 400;
          let f = Math.asin;
          let scaleX = 300/Math.PI;
          let scaleY = 300/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
        });
        it('Arc Tangent', function() {
          interactive.height = 400;
          let f = Math.atan;
          let scaleX = 200/Math.PI;
          let scaleY = 200/Math.PI;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scaleX,
            scaleY: scaleY
          });
        });
      });
      describe('Hyperbolic Functions', function(){
        let width = 500;
        // let scale = (width - 100)/(2*Math.PI);
        let scale = 400/6;
        beforeEach( function() {
          interactive.width = width;
          interactive.height = width;
        });

        afterEach(function(){
          // let title = plot.plotTitle.contents.toLowerCase().replace(' ', '-');
          // plot.drawTrimmed()
          // download(interactive.root.parentElement.id, title);
        });
        it('Hyperbola', function() {
          let f = (x:number) => { return 1/x; };
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
        });
        it('Unit Hyperbola 1/2x', function() {
          let f = (x:number) => { return 1/(2*x); };
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
        });
        it('Unit Hyperbola', function() {
          let f1 = (x:number) => { return -Math.sqrt(-1 + x*x); };
          let f2 = (x:number) => { return Math.sqrt(-1 + x*x); };
          plot = interactive.plot(f1, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
          plot.addFunction(f2);
        });
        it('Hyperbolic Cosine', function() {
          let f = Math.cosh;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2 + 2*scale,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
        });
        it('Hyperbolic Sine', function() {
          let f = Math.sinh;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
        });
        it('Hyperbolic Tangent', function() {
          interactive.height = width - 100;
          let f = Math.tanh;
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
        });
        it('Hyperbolic Secant', function() {
          let f = (x) => { return 1/Math.cosh(x)};
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2 + 2*scale,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
          plot.addFunction(Math.cosh).style.strokeDasharray = '6';
        });
        it('Hyperbolic Cosecant', function() {
          let f = (x) => { return 1/Math.sinh(x)};
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
          plot.addFunction(Math.sinh).style.strokeDasharray = '6';
        });
        it('Hyperbolic Cotangent', function() {
          let f = (x) => { return 1/Math.tanh(x)};
          plot = interactive.plot(f, {
            title: this.test.title,
            originX: (interactive.width - 100)/2,
            originY: (interactive.height - 100)/2,
            width: interactive.width,
            height: interactive.height,
            scaleX: scale,
            scaleY: scale
          });
          plot.addFunction(Math.tanh).style.strokeDasharray = '6';
        });
      });
    });
    describe('Circle Functions 600px', function(){
      let width = 600;
      let scale = (width - 100)/(2*Math.PI);
      beforeEach(function() {
        interactive.width = 600;
        interactive.height = 400;
      });
      it('Cosine', function() {
        let f = Math.cos;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Sine', function() {
        let f = Math.sin;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Tangent', function() {
        interactive.height = interactive.width;
        let f = Math.tan;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });

      it('Secant', function() {
        interactive.height = interactive.width;
        let f = (x) => { return 1/Math.cos(x)};
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
        plot.addFunction(Math.cos).style.strokeDasharray = '6';
      });
      it('Cosecant', function() {
        interactive.height = interactive.width;
        let f = (x) => { return 1/Math.sin(x)};
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
        plot.addFunction(Math.sin).style.strokeDasharray = '6';
      });
      it('Cotangent', function() {
        interactive.height = interactive.width;
        let f = (x) => { return 1/Math.tan(x)};
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
        plot.addFunction(Math.tan).style.strokeDasharray = '6';
      });
      it('Arc Cosine', function() {
        interactive.height = (interactive.width+100)/2;
        let f = Math.acos;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100),
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Arc Sine', function() {
        interactive.height = (interactive.width+100)/2;
        let f = Math.asin;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Arc Tangent', function() {
        interactive.height = (interactive.width+100)/2;
        let f = Math.atan;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
    });
    describe('Hyperbolic Functions 600px', function(){
      let width = 600;
      // let scale = (width - 100)/(2*Math.PI);
      let scale = 500/6;
      beforeEach( function() {
        interactive.width = width;
        interactive.height = width;
      });
      it('Hyperbolic Cosine', function() {
        let f = Math.cosh;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2 + 2*scale,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Hyperbolic Sine', function() {
        let f = Math.sinh;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Hyperbolic Tangent', function() {
        interactive.height = width - 100;
        let f = Math.tanh;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
      });
      it('Hyperbolic Secant', function() {
        let f = (x) => { return 1/Math.cosh(x)};
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2 + 2*scale,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
        plot.addFunction(Math.cosh).style.strokeDasharray = '6';
      });
      it('Hyperbolic Cosecant', function() {
        let f = (x) => { return 1/Math.sinh(x)};
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: (interactive.width - 100)/2,
          originY: (interactive.height - 100)/2,
          width: interactive.width,
          height: interactive.height,
          scaleX: scale,
          scaleY: scale
        });
        plot.addFunction(Math.sinh).style.strokeDasharray = '6';
      });
    });
    describe('Circle Functions', function() {
      it('Cosine', function() {
        let f = Math.cos;
        let scaleX = 300/Math.PI;
        let scaleY = 300/Math.PI;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: 150,
          scaleX: scaleX,
          scaleY: scaleY
        });
      });
      it('Sine', function() {
        let f = Math.sin;
        let scaleX = 300/Math.PI;
        let scaleY = 300/Math.PI;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: 150,
          scaleX: scaleX,
          scaleY: scaleY
        });
      });
      it('Tangent', function() {
        interactive.height = 700;
        let f = Math.tan;
        let scaleX = 300/Math.PI;
        let scaleY = 300/Math.PI;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: 300,
          scaleX: scaleX,
          scaleY: scaleY,
          height: 700,
          width: 700
        });
      });
      it('ArcSine', function() {
        let f = Math.asin;
        let scaleX = 300/Math.PI;
        let scaleY = 150/(Math.PI/2);
        interactive.plot(f, {
          title: this.test.title,
          originX: 300,
          originY: 150,
          scaleX: scaleX,
          scaleY: scaleY
        });
      });

      it('ArcTangent', function() {
        let f = Math.atan;
        let scaleX = 300/Math.PI;
        let scaleY = 150/(Math.PI/2);
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 300,
          originY: 150,
          scaleX: scaleX,
          scaleY: scaleY
        });
      });
      it('Cosecant', function() {
        interactive.height = 700;
        let f = (x) => { return 1/Math.sin(x)};
        let scaleX = 300/Math.PI;
        let scaleY = 300/Math.PI;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: 300,
          scaleX: scaleX,
          scaleY: scaleY,
          height:700,
          width:700
        });
      });
      it('Secant', function() {
        interactive.height = 700;
        let f = (x) => { return 1/Math.cos(x)};
        let scaleX = 300/Math.PI;
        let scaleY = 300/Math.PI;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: 300,
          width: 700,
          height: 700,
          scaleX: scaleX,
          scaleY: scaleY
        });
      });
      it('Cotangent', function() {
        interactive.height = 700;
        let f = (x) => { return 1/Math.tan(x)};
        let scaleX = 300/Math.PI;
        let scaleY = 300/Math.PI;
        plot = interactive.plot(f, {
          title: this.test.title,
          originX: 0,
          originY: 300,
          width: 700,
          height: 700,
          scaleX: scaleX,
          scaleY: scaleY
        });
      });
    });
    describe('Hyperbola Functions', function() {
      it('Hyperbola Quadrant 1', function() {
        interactive.width = 700;
        interactive.height = 700;
        let f = (x:number) => { return 1/x; };
        let scaleX = 100;
        let scaleY = 100;
        plot = interactive.plot(f, {
          title: this.test.title,
          scaleX: scaleX,
          scaleY: scaleY,
          height: 600,
          originX: 0,
          originY: 400
        });
      });
      it('Hyperbola', function() {
        interactive.width = 1000;
        interactive.height = 1000;
        let f = (x:number) => { return Math.sqrt(2)/(2*x); };
        let scaleX = 100;
        let scaleY = 100;
        plot = interactive.plot(f, {
          title: this.test.title,
          scaleX: scaleX,
          scaleY: scaleY,
          width: 1000,
          height: 1000
        });
      });
      it('Hyperbola2', function() {
        interactive.width = 700;
        interactive.height = 700;
        let f = (x:number) => { return -Math.sqrt(-1 + x*x); };
        let scaleX = 100;
        let scaleY = 100;
        plot = interactive.plot(f, {
          title: this.test.title,
          scaleX: scaleX,
          scaleY: scaleY,
          height: 700
        });
      });
      it('Hyperbolic Sine', function() {
        interactive.width = 700;
        interactive.height = 700;
        let f = (x:number) => { return Math.sinh(x); };
        let scaleX = 100;
        let scaleY = 100;
        plot = interactive.plot(f, {
          title: this.test.title,
          scaleX: scaleX,
          scaleY: scaleY,
          height: 700
        });
      });
      it('Hyperbolic Cosine', function() {
        interactive.width = 700;
        interactive.height = 700;
        let f = (x:number) => { return Math.cosh(x); };
        let scaleX = 100;
        let scaleY = 100;
        plot = interactive.plot(f, {
          title: this.test.title,
          originY: 500,
          originX: 300,
          scaleX: scaleX,
          scaleY: scaleY,
          height: 700,
          width: 700
        });
      });
      it('Hyperbolic Tangent', function() {
        interactive.width = 700;
        interactive.height = 700;
        let f = (x:number) => { return Math.tanh(x); };
        let scaleX = 100;
        let scaleY = 100;
        plot = interactive.plot(f, {
          title: this.test.title,
          scaleX: scaleX,
          scaleY: scaleY,
          height: 700
        });
      });
    });
  });

  describe('Experimental', function(){
    it('gridline zooming', function() {
      let f = (x:number) => x*x;
      let scaleX = 50;
      let scaleY = 50;
      plot = interactive.plot(f, {
        scaleX: scaleX,
        scaleY: scaleY,
        zoomable: true,
        displayPoint: true
      });
    });
    it('should create a plot without zoom & pan events', function(){
      plot = interactive.plot(Math.sin, {
        originX: 0,
        originY: 150,
        scaleX: 300/Math.PI,
        scaleY: 300/Math.PI,
        zoomable: false,
        grid:true
      });
    });
    it('should create a plot without a display point', function(){
      plot = interactive.plot(Math.sin, {
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

  describe('Grid Lines', function(){

    it('should display at reasonable intervals', function() {

      let div = document.body.appendChild(document.createElement('div'));
      div.style.margin = 'auto';
      div.style.display = 'block';
      div.style.width = '1600px';
      let f = (x:number) => x*x;
      let scale = 1000;
      let delta = 0.00001;
      let size = 400;
      let config = {
        width:size,
        height:size
      }

      for( let i = 0; i < 6; i++ ) {

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale + delta}`,
          scaleX: scale + delta,
          scaleY: scale + delta,
          width: 400,
          height: 400
        });

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale}`,
          scaleX: scale,
          scaleY: scale,
          width: 400,
          height: 400
        });

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale - delta}`,
          scaleX: scale - delta,
          scaleY: scale - delta,
          width: 400,
          height: 400
        });

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale/2}`,
          scaleX: scale/2,
          scaleY: scale/2,
          width: 400,
          height: 400
        });

        scale /= 10;
      }
    });

    it('labels display at reasonable intervals', function() {

      let div = document.body.appendChild(document.createElement('div'));
      div.style.margin = 'auto';
      div.style.display = 'block';
      div.style.width = '1600px';
      let br = div.appendChild(document.createElement('div'));
      br.style.background = '#333333';
      br.style.height = '1rem';
      br.style.width = '100%';
      br.style.marginTop = '3rem';
      br.style.marginBottom = '3rem';
      let f = (x:number) => x*x;
      let scale = 0.025;
      let delta = 0.00001;
      let size = 400;
      let config = {
        width:400,
        height:400
      }

      for( let i = 0; i < 6; i++ ) {

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale/2}`,
          scaleX: scale/2,
          scaleY: scale/2,
          width: 400,
          height: 400
        });

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale}`,
          scaleX: scale,
          scaleY: scale,
          width: 400,
          height: 400
        });

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale + delta}`,
          scaleX: scale + delta,
          scaleY: scale + delta,
          width: 400,
          height: 400
        });

        plot = new Interactive(div, config).plot(f, {
          title: `scale: ${scale*2}`,
          scaleX: scale*2,
          scaleY: scale*2,
          width: 400,
          height: 400
        });

        scale *= 10;
      }
    });
  });
});
