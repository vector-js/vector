import Container from '../container.js';
import {Interactive, Plot} from '../../index.js';

describe('Art', function () {

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

it('compound interest ', function() {
      interactive.width = 700;
      interactive.height = 400;

      function createExponential( P, r) {
        return (x) => { return P*Math.exp(r*x); }
      }

      /**
      * r - interest rate
      * n - number of times interest applied to period
      */
      let compound = function( p:number, r:number, n:number ) {
        return (x) => {
          return p*Math.pow((1 + r/n), Math.floor(n*x));
        }
      }

      let compound2 = function( p:number, r:number, n:number ) {
        return (x) => {
          // return p*Math.pow((1 + r/n), Math.floor(n*x));
          return p*Math.pow((1 + r/n),n*x);
        }
      }

      // Create a new graph object
      // let scalex = (interactive.width-100)/1;
      let scaley = 2.963;
      let scalex = (interactive.width - 100)/5;

      plot = interactive.plot( compound(100, 0.15, 1), {
        originX: 0,
        originY: (interactive.height - 100) + 100*scaley,
        width: interactive.width,
        height: interactive.height,
        scaleX: scalex,
        scaleY: scaley,
        zoomable: false,
        controls: false
      });

      plot.addFunction(compound2(100,0.15,1));
    });

    it('compound interest ', function() {
      interactive.width = 600;
      interactive.height = 332.012;

      function createExponential( P, r) {
        return (x) => { return P*Math.exp(r*x); }
      }

      /**
      * r - interest rate
      * n - number of times interest applied to period
      */
      let compound = function( p:number, r:number, n:number ) {
        return (x) => {
          return p*Math.pow((1 + r/n), Math.floor(n*x));
        }
      }

      let compound2 = function( p:number, r:number, n:number ) {
        return (x) => {
          // return p*Math.pow((1 + r/n), Math.floor(n*x));
          return p*Math.pow((1 + r/n),n*x);
        }
      }

      // Create a new graph object
      // let scalex = (interactive.width-100)/1;
      let scaley = 1;
      let scalex = 50;

      plot = interactive.plot( compound(100, 0.12, 1), {
        originX: 0,
        originY: (interactive.height - 100) + 100*scaley,
        width: interactive.width,
        height: interactive.height,
        scaleX: scalex,
        scaleY: scaley,
        zoomable: false,
        controls: false
      });

      plot.addFunction(createExponential(100,0.12));
    });


it('exponential function ', function() {
      interactive.width = (500/(Math.E - 1))*2 + 100;
      interactive.height = 600;

      function createExponential( r) {
        return (x) => { return Math.exp(r*x); }
      }

      /**
      * r - interest rate
      * n - number of times interest applied to period
      */
      let compound = function( p:number, r:number, n:number ) {
        return (x) => {
          return p*Math.pow((1 + r/n), Math.floor(n*x));
        }
      }

      let compound2 = function( p:number, r:number, n:number ) {
        return (x) => {
          // return p*Math.pow((1 + r/n), Math.floor(n*x));
          return Math.pow((1 + r/n),n*x);
        }
      }

      // Create a new graph object
      // let scalex = (interactive.width-100)/1;
      let scaley = 500/(Math.E - 1);
      let scalex = scaley;

      plot = interactive.plot( (x) => {return 0}, {
        originX: 0,
        originY: (interactive.height - 100) + 1*scaley,
        width: interactive.width,
        height: interactive.height,
        scaleX: scalex,
        scaleY: scaley,
        zoomable: false,
        controls: false
      });

      let paths = [];
      for( let i = .5; i <= 4; i *=2) {
        paths.push(plot.addFunction(createExponential(i)));
      }

      // for( let i = 0; i < paths.length; i++) {
      //   let value = (paths.length - i)/paths.length*255;
      //   paths[i].style.stroke = `rgb(${value}, ${value}, ${value})`
      // }
    });

    it('exponential growth constant', function() {
          interactive.width = 600;
          interactive.height = 600;

          function createExponential( r) {
            return (x) => { return Math.exp(r*x); }
          }

          /**
          * r - interest rate
          * n - number of times interest applied to period
          */
          let compound = function( p:number, r:number, n:number ) {
            return (x) => {
              return p*Math.pow((1 + r/n), Math.floor(n*x));
            }
          }

          let compound2 = function( p:number, r:number, n:number ) {
            return (x) => {
              // return p*Math.pow((1 + r/n), Math.floor(n*x));
              return Math.pow((1 + r/n),n*x);
            }
          }

          // Create a new graph object
          // let scalex = (interactive.width-100)/1;
          let scaley = 500/3;
          let scalex = 250;

          plot = interactive.plot( createExponential(Math.log(2)), {
            originX: 0,
            originY: (interactive.height - 100) + 1*scaley,
            width: interactive.width,
            height: interactive.height,
            scaleX: scalex,
            scaleY: scaley,
            zoomable: false,
            controls: false
          });
        });

    it('exponential function ', function() {
      interactive.width = 600;
      interactive.height = 600;

      function createExponential( r) {
        return (x) => { return Math.exp(r*x); }
      }

      /**
      * r - interest rate
      * n - number of times interest applied to period
      */
      let compound = function( p:number, r:number, n:number ) {
        return (x) => {
          return p*Math.pow((1 + r/n), Math.floor(n*x));
        }
      }

      let compound2 = function( p:number, r:number, n:number ) {
        return (x) => {
          // return p*Math.pow((1 + r/n), Math.floor(n*x));
          return Math.pow((1 + r/n),n*x);
        }
      }


      let slider = new Interactive(container.id, {width:interactive.width, height:50}).scrubber( 50, 25, {
        min:1,
        max:50,
        value:4,
        width:interactive.width - 100
      });

      // Create a new graph object
      // let scalex = (interactive.width-100)/2;
      let scalex = (interactive.width-100)/1;
      let scaley = 500/(Math.E - 1);
      plot = interactive.plot( (x) => {
            return Math.pow((1 + 1/slider.value), Math.floor(slider.value*x));
      }, {
        originX: 0,
        originY: (interactive.height - 100) + 1*scaley,
        width: interactive.width,
        height: interactive.height,
        scaleX: scalex,
        scaleY: scaley,
        zoomable: false,
        controls: false
      });
      plot.fPaths[0].style.strokeWidth = '1.5px';

      plot.addFunction(createExponential(1));
      plot.addFunction((x) => {
        return Math.pow((1 + 1/slider.value), slider.value*x);
      }).style.strokeDasharray = '6px';
      plot.addDependency(slider);
      plot.update = function() {
        plot.draw();
      };

      // let paths = [];
      // for( let i = 0; i <= 1; i += .25) {
      //   paths.push(plot.addFunction(createExponential(i)));
      // }
      //
      // for( let i = 0; i < paths.length; i++) {
      //   let value = (paths.length - i)/paths.length*255;
      //   paths[i].style.stroke = `rgb(${value}, ${value}, ${value})`
      // }
    });
  });
});