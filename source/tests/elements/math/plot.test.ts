import Container from '../../container.js';
import {download, Interactive, Plot, Text} from '../../../index.js';

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

  describe('General', function() {
    it('sine', function() {
      let title =  new Text(interactive.width/2, 25, 'sin(');
      let span = title.tspan('x');
      span.setAttribute('text-anchor', 'middle');
      span.setAttribute('alignment-baseline', 'middle');
      span.style.fontFamily = 'KaTeX_Math';
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
    it('exponential', function() {
      interactive.width = 700;
      interactive.height = 700;

      plot = interactive.plot(Math.exp, {
        title: "Exponential Function",
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
      let f = (x:number) => { return x*x; };
      let scaleX = 45;
      let scaleY = 30;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        originY: 270,
        originX: 300
        // grid: false
      });
		});

    it('Cubic', function() {
      interactive.height = 700;
      let f = (x:number) => { return x*x*x; };
      let scaleX = 100;
      let scaleY = 10;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        height: 700,
        width: 700
      });
    });
		it('Hyperbola', function() {
      interactive.width = 700;
      interactive.height = 500;
      let f = (x:number) => { return 1/x; };
      let scaleX = 100;
      let scaleY = 100;
      plot = interactive.plot(f, {
        title: this.test.title,
        scaleX: scaleX,
        scaleY: scaleY,
        height: 500,
        originX: 0,
        originY: 400
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
