import Container from '../container.js';
import {download, Interactive, Circle, Path, Control, Rectangle } from '../../index.js';

/* import figures */
import { DegreesFigure, Configuration } from '../../examples/figures/degrees.js';
import { PolarCoordinatesFigure } from '../../examples/figures/polar-coordinate-system.js';
import { TAU } from '../../util/constants.js';
import UnitCircle from '../../examples/math/unit-circle.js';
import UnitCircleCosine from '../../examples/math/unit-circle-cosine.js';
import UnitCircleSine from '../../examples/math/unit-circle-sine.js';
// import katex from '/katex/katex.module.js';
import { AnimationPlayer } from '../../templates/animation-player.js';
import { StandardAngleFigure } from '../../examples/figures/standard-angle.js';
import Grid from '../../elements/math/grid.js';


describe('Math Figures', function () {

  // create a new container before each test function
  let container: HTMLDivElement;
  let scripts = [];
  beforeEach(function() {
    container = Container.createContainer();
  });

  let sizes = ['default', 'small', 'medium', 'large'];
  // let sizes = ['default', 'small'];

  before(function() {
    (window as any).download = download;
  });

  after(function() {
    (window as any).run = () => {
      for( let i = 0; i < scripts.length; i++) {
        scripts[i]();
      }
    };
  });

  function viewAngle(width:number, control:Control, symbol:string, color:string){

    let interactive = new Interactive(container.id, {
      width:width,
      height: 50
    });

    let angle1 = interactive.text(interactive.width/2, 25, '');
    angle1.classList.add('katex-main', 'text-middle');
    let theta = angle1.tspan(symbol);
    theta.classList.add('katex-variable');
    theta.style.fill = color;
    angle1.tspan(' = ');
    let angleValue = angle1.tspan(`${(control.displayAngle/TAU).toFixed(3)}`);
    angle1.tspan('τ').classList.add('katex-variable');
    angle1.addDependency(control);
    angle1.update = () => {
      angleValue.text = `${(control.displayAngle/TAU).toFixed(3)}`;
    };
  }

  describe('Default Sizes ', function(){
    it('Cartesian Coordinate System', function(){
        let grid = new Grid({
          x:0,
          y:0,
          width:500,
          height:500,
          scaleX:50,
          scaleY:50
        });
        container.appendChild(grid.root);
        grid.classList.add('interactive');

        let canvas : HTMLCanvasElement = document.createElement('canvas');
        container.appendChild(canvas);
        let context : CanvasRenderingContext2D = canvas.getContext("2d");
        canvas.width = grid.viewPort.width;
        canvas.height = grid.viewPort.height;
        (window as any).populate = function() {
          let id = context.getImageData(0, 0, canvas.width, canvas.height);
          let pixels = id.data;

          for( let x = 0; x <= canvas.width; x++) {
            for ( let y = 0; y <= canvas.height; y++) {
              let index = (y * id.width + x) * 4;
              let value = Math.floor(((Math.atan2(-(y-199), (x-199)) + TAU) % TAU)/TAU*255);
              pixels[index + 0] = 255-value;
              pixels[index + 1] = 0;
              pixels[index + 2] = value;
              pixels[index + 3] = 255;
            }
          }
          context.putImageData(id, 0, 0);
        }

        let circle = grid.staticGroup.circle(0,0,50);
        circle.classList.add('default');
        circle.style.stroke = '#808080';

        let line = grid.staticGroup.line(0,0,0,0);
        line.classList.add('default');

        let arrow = grid.staticGroup.path(`M -12 -6 L 0 0 L -12 6 L -10 0z`);
        let path = grid.staticGroup.path('');
        let control = new Control(50,-100);
        // control.handle.r = 18;
        control.constrainWithin(new Rectangle(-200, -200, 400, 400));
        grid.staticGroup.appendChild(control);

        // circle.addDependency(control)
        // circle.update = () => {
        //   circle.r = Math.hypot(control.x, control.y);
        // };
        // circle.update();

        line.addDependency(control)
        line.update = () => {
          line.x2 = control.x;
          line.y2 = control.y;
        };
        line.update();

        path.classList.add('default');
        path.addDependency(control);
        // path.root.style.fill = `rgb(0, 0, 255)`;
        path.root.style.fill = `#000000`;
        path.root.style.fillOpacity = '0.10';
        // path.attatchArrow( this.defs(), false);

        // path.root.style.stroke = 'none';
        path.update = () => {
          let a = control.displayAngle;

          let largeArc = (a > TAU/2 ) ? 1 : 0;
          let sweepFlag = 0;
          // let largeArc = (angle > TAU/2 ) ? 0 : 0;
          // let sweepFlag = (angle > TAU/2 ) ? 1 : 0;

          // let x = control.x;
          // let y = control.y;
          // let r = Math.hypot(x,y);
          let x = 50*Math.cos(a);
          let y = -50*Math.sin(a);
          let r = 50;

          path.d = `M ${x} ${y}
                    L 0 0
                    L ${r} 0
                    A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${x} ${y}`;
        };
        path.update();

        arrow.style.fill = `#404040`;
        arrow.style.stroke = 'none';
        arrow.addDependency(control);
        arrow.update = () => {

          let a = control.displayAngle;
          // if (a > TAU/2) {
          //   a += TAU/2;
          // }
          // let x = control.x;
          // let y = control.y;
          let x = 50*Math.cos(a);
          let y = -50*Math.sin(a);

          arrow.setAttribute(`transform`, `translate(${x}, ${y}) rotate(${ - a * 360 / TAU - 90})`);
        }
        arrow.update();

        let interactive = new Interactive(container.id, {
          width:grid.width,
          height: 50
        });

        let angle1 = interactive.text(interactive.width/2, 25, '');
        angle1.classList.add('katex-main', 'text-middle');
        angle1.tspan('atan2(');
        let yLabel = angle1.tspan('y');
        angle1.tspan(',');
        let xLabel = angle1.tspan('x');
        angle1.tspan(')');
        angle1.tspan(' = ');
        // let angleValue = angle1.tspan(`${(Math.atan2(-control.y, control.x)/TAU).toFixed(3)}`);
        let angleValue = angle1.tspan(`${(control.displayAngle/TAU).toFixed(3)}`);
        angle1.tspan('τ').classList.add('katex-variable');
        angle1.addDependency(control);
        angle1.update = () => {
          xLabel.text = `${(control.x/50).toFixed(2)}`;
          yLabel.text = `${(-control.y/50).toFixed(2)}`;
          angleValue.text = `${(control.displayAngle/TAU).toFixed(3)}`;
        };

    });
    it('Two Vectors', function(){
      let figure = new PolarCoordinatesFigure(container.id, {
        pointAngle:TAU/3,
        radius:300
      });
      // figure.point.constrainTo(new Circle(0,0,150));
      let p1 = figure.point;
      let p2 = figure.addPoint(2, 2*TAU/3, '#c74440');

      figure.labelGroup.style.fill = '#a0a0a0';

      viewAngle(figure.width, p1, 'α', '#0366EE');
      viewAngle(figure.width, p2, 'β', '#c74440');

      // temp(p1, '#c74440');
      // temp(p2, '#0366EE');
      // p1.updateDependents();
      // p2.updateDependents();

      let interactive = new Interactive(container.id, {
        width:figure.width,
        height: 50
      });

      // let angleBetween = function( c1:Control, c2:Control, normalize:boolean = true) {
      //   if (normalize) {
      //     return ((c2.angle - c1.angle)+ TAU) % TAU;
      //   } else {
      //     return c2.angle - c1.angle;
      //   }
      // }

      let angleBetween = function( c1:Control, c2:Control, normalize:boolean = false) {

        // return Math.acos( (c1.x*c2.x + c1.y*c2.y)/(Math.hypot(c1.x, c1.y)*Math.hypot(c2.x,c2.y))


        let scale = Math.hypot(c1.x, c1.y)*Math.hypot(c2.x, c2.y);
        let y = (c1.y*c2.x - c1.x*c2.y);
        let x = (c1.x*c2.x + c1.y*c2.y);
        if ( normalize ) {
          return (Math.atan2( y, x) + TAU) % TAU;
        } else {
          return Math.atan2( y, x);
        }
        // return Math.atan2( y, x);

        //   let difference = Math.atan2(Math.sin(a)*Math.cos(b) - Math.cos(a)*Math.sin(b), Math.cos(a)*Math.cos(b) + Math.sin(a)*Math.sin(b));

        // if (normalize) {
        //   return ((c2.angle - c1.angle) + TAU) % TAU;
        // } else {
        //   return c2.angle - c1.angle;
        // }
      }

      // let point = figure.control(0,0);
      // point.addDependency(p1,p2);
      // point.update = () => {
      //   // let a = Math.atan2((p2.x*p2.y + p2.y*p2.x), (p1.x*p2.x - p1.y*p2.y))
      //   let a = p1.angle;
      //   let b = p2.angle;
      //   // sum
      //   // point.x = 100*(Math.cos(a)*Math.cos(b) - Math.sin(a)*Math.sin(b));
      //   // point.y = 100*(Math.sin(a)*Math.cos(b) + Math.cos(a)*Math.sin(b));
      //
      //   // difference
      //   point.y = 100*(Math.sin(a)*Math.cos(b) - Math.cos(a)*Math.sin(b));
      //   point.x = 100*(Math.cos(a)*Math.cos(b) + Math.sin(a)*Math.sin(b));
      //   let difference = Math.atan2(Math.sin(a)*Math.cos(b) - Math.cos(a)*Math.sin(b), Math.cos(a)*Math.cos(b) + Math.sin(a)*Math.sin(b));
      //   console.log(difference/TAU);
      // };
      // point.update();

      let angle1 = interactive.text(interactive.width/2, 25, '');
      angle1.classList.add('katex-main', 'text-middle');
      angle1.tspan('θ').classList.add('katex-variable');
      angle1.tspan(' = ');
      let angleValue = angle1.tspan(`${(angleBetween(p1,p2)/TAU).toFixed(3)}`);
      angle1.tspan('τ').classList.add('katex-variable');
      angle1.addDependency(p1, p2);
      angle1.update = () => {
        angleValue.text = `${(angleBetween(p1,p2)/TAU).toFixed(3)}`;
      };

    });
    it('Degrees Angle System', function(){
      new StandardAngleFigure(container.id, StandardAngleFigure.degrees);
    });
    it('Radians Angle System', function(){
      new StandardAngleFigure(container.id);
    });
    it('Polar Coordinates (Radians)', function(){
      new PolarCoordinatesFigure(container.id);
    });
    it('Polar Coordinates (Degrees)', function(){
      new PolarCoordinatesFigure(container.id, PolarCoordinatesFigure.degrees);
    });
    it('Unit Circle', function(){
      new UnitCircle(container.id, {});
    });
    it('Unit Circle (Cosine)', function(){
      new UnitCircleCosine(container.id);
    });
    it('Unit Circle (Sine)', function(){
      new UnitCircleSine(container.id);
    });
  });

	describe('Degrees Angle System', function(){

    let small = {
      radius: 100,
      width: 300,
      margin:50,
      ticStep: 2.5,
      ticStepBig: 10,
      labelStep: 30
    };

    let medium = {
      radius: 110,
      width:400,
      margin:60,
      ticStep: small.ticStep,
      ticStepBig: small.ticStepBig,
      labelStep: small.labelStep
    }

    let large = {
      radius: 200,
      width:500,
      margin:50,
      ticStep: 1,
      ticStepBig: 10,
      labelStep: 30
    }

    let config : any = {
      'default': DegreesFigure.default,
      'small': small,
      'medium': medium,
      'large': large
    };

    for( let i = 0; i < sizes.length; i++) {
  	  it(`Base Template (${sizes[i]})`, function() {
        let figure = new DegreesFigure(container.id, config[sizes[i]]);
  		});
    }
	});

	describe('Standard Angle (Radians)', function(){

    let small = {
      radius: 100,
      width: 300,
  		margin:50,
  		radians: true,
  		tics: 100,
  		ticStepBig: 5,
  		labelStep: 10,
  		min: 0,
  		max: TAU,
  		value: TAU/8,
  		loop: true
  	}

    let medium = {
      radius: 110,
      width:400,
      margin:60,
  		radians: true,
  		tics: 100,
  		ticStepBig: 5,
  		labelStep: 10,
  		min: 0,
  		max: TAU,
  		value: TAU/8,
  		loop: true
  	}

    let large = {
      radius: 200,
      width:600,
      margin:60,
  		radians: true,
      tics: 100,
  		ticStepBig: 5,
  		labelStep: 10,
      labelDigits: 1,
  		min: 0,
  		max: TAU,
  		value: TAU/8,
  		loop: true
  	}

    let config : any = {
      'default': StandardAngleFigure.default,
      'small': small,
      'medium': medium,
      'large': large
    };

    for( let i = 0; i < sizes.length; i++) {
  	  it(`Base Template (${sizes[i]})`, function() {
        let figure = new StandardAngleFigure(container.id, config[sizes[i]]);
  		});
    }
	});

	describe('Standard Angle (Degrees)', function(){

    let small = {
      radius: 100,
      width: 300,
  		margin:50,
  		radians: false,
  		tics: 180,
  		ticStepBig: 5,
  		labelStep: 15,
  		min: 0,
  		max: TAU,
  		value: TAU/12,
  		loop: true
  	}

    let medium = {
      radius: 110,
      width:400,
      margin:60,
      radians: false,
  		tics: 180,
  		ticStepBig: 5,
  		labelStep: 15,
  		min: 0,
  		max: TAU,
  		value: TAU/12,
  		loop: true
  	}

    let large = {
      radius: 200,
      width:600,
      margin:60,
      radians: false,
  		tics: 360,
  		ticStepBig: 10,
  		labelStep: 30,
  		min: 0,
  		max: TAU,
  		value: TAU/12,
  		loop: true
  	}

    let config : any = {
      'default': StandardAngleFigure.degrees,
      'small': small,
      'medium': medium,
      'large': large
    };

    for( let i = 0; i < sizes.length; i++) {
  	  it(`Base Template (${sizes[i]})`, function() {
        let figure = new StandardAngleFigure(container.id, config[sizes[i]]);
  		});
    }
	});

  describe( 'Polar Coordinate System', function() {
    it('Polar Coordinate System (Degrees)', function(){
      new PolarCoordinatesFigure(container.id, {
        labelStep:72,
        ticStepBig: 10
      });
    });
  });

});
