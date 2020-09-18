import Container from '../container.js';
import {download, Interactive, Circle, Path } from '../../index.js';

/* import figures */
import {DegreesFigure} from '../../examples/figures/degrees.js';
import { TAU } from '../../util/constants.js';
// import katex from '/katex/katex.module.js';
import { AnimationPlayer } from '../../templates/animation-player.js';

describe('Degrees Scripts', function () {

  // create a new container before each test function
  let container: HTMLDivElement;
  let scripts = [];
  beforeEach(function() {
    container = Container.createContainer();
  });

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

  describe('Degrees Angle System', function(){
      it('Should Create a Nice Base Template', function() {

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

        // conditionally switch size based on available width
        let config = medium;

        let animationPlayer = new AnimationPlayer(container.id, {
          min:0,
          max:TAU,
          value: 0,
          width: config.width,
          loop:true
        });

        let figure = new DegreesFigure(animationPlayer.canvas, {
    			angle: 0,
    			radius: config.radius,
    			margin: config.margin,
          ticStep: config.ticStep,
          ticStepBig: config.ticStepBig,
          labelStep: config.labelStep
    		});

        animationPlayer.scrubber.addDependency(figure.point);

        animationPlayer.scrubber.update = () => {
          let angle = figure.getAngle();
          animationPlayer.scrubber.value = angle;
        };

        animationPlayer.scrubber.pushOnChange( () => {
          figure.setAngle(animationPlayer.scrubber.value);
        });

        // let step = TAU/72;
        // for( let i = 0; i <= TAU; i += step) {
        //   setTimeout( () => {
        //     figure.setAngle(i);
        //     download(container.id, `${ (i*360/TAU).toFixed(0)}-degrees.svg`);
        //   }, i*5000 );
        // }


      //   let start;
      //   let count = 0;
      //   let prev : number = 0;
      //   function animate( timestamp ) {
      //     if (start === undefined) {
      //       start = timestamp;
      //     }
      //
      //     let angle = (timestamp - start)/4096;
      //     let degree = Math.floor((angle*360/TAU % 360));
      //     figure.setAngle(angle);
      //     if ( degree != prev ) {
      //       katex.render(`\\theta = ${degree}\\degree`, div, {
      //         displayMode: true,
      //       });
      //     }
      //
      //
      //   	requestAnimationFrame(animate);
      //   }
      //   requestAnimationFrame(animate);
      // });

      // it('Should Create a Nice Base Template', function() {
      //
      //   let radius = 110;
      //
      //   let interactive = new Interactive(container.id, {
      //     width:320,
      //     height:320,
      //     originX:160,
      //     originY:160,
      //   });
      //   interactive.classList.add('default');
      //
      //   let labelGroup = interactive.group();
      //   let group = interactive.group();
      //
      //   let outside = interactive.circle(0, 0, radius);
      //   let inside = interactive.circle(0, 0, radius - 12.5);
      //   // inside.style.stroke = `#dddddd`;
      //
      //
      //   let clipPath = interactive.clipPath();
      //
      //   // The inner and outer circles must be drawn in different rotational directions
      //   clipPath.appendChild( new Path((`M ${outside.cx + outside.r} ${outside.cy} A ${outside.r} ${outside.r} 0 0 0 ${outside.cx - outside.r} ${outside.cy} A ${outside.r} ${outside.r} 0 0 0 ${outside.cx + outside.r} ${outside.cy} z M ${inside.cx + inside.r} ${inside.cy} A ${inside.r} ${inside.r} 0 0 1 ${inside.cx - inside.r} ${inside.cy} A ${inside.r} ${inside.r} 0 0 1 ${inside.cx + inside.r} ${inside.cy} z` )))
      //
      //   group.setAttribute('clip-path', `url(#${clipPath.id})`);
      //
      //   let space = 25;
      //   let n = 60;
      //   let count = 0;
      //   let labels = [];
      //   let rects = [];
      //   for( let i = 0; i <= n; i+=0.5 ) {
      //     let a = i/n*TAU;
      //     let x = radius*Math.cos(a);
      //     let y = -radius*Math.sin(a);
      //     let line = group.line(0, 0, x, y);
      //
      //     // Label breakdown
      //     if( count % 10 === 0) {
      //       let label = labelGroup.text( x + space*Math.cos(a), y - space*Math.sin(a), `${i*6}°`);
    	// 			label.classList.add('katex-main', 'text-middle');
      //
    	// 			let box = label.getBoundingBox();
    	// 			label.remove();
      //
    	// 			let rect = labelGroup.rectangle(box.x - 3, box.y - 3, box.width + 6, box.height + 6);
    	// 			rect.style.fill= '#ffffff';
    	// 			rect.style.stroke= 'none';
    	// 			labelGroup.appendChild(label);
      //       labels.push(label);
      //       rects.push(rect);
      //     }
      //
      //     // Color of tic marks
      //     if( count % 10 === 0) {
      //       line.style.stroke = `#404040`;
      //     } else if( count % 5 === 0) {
      //       line.style.stroke = `#808080`;
      //     } else {
      //       line.style.stroke = `#dddddd`;
      //     }
      //     count++;
      //   }
      //   labels[0].y -= 15;
      //   labels[labels.length - 1].y += 18;
      //   rects[0].y -= 18;
      //   rects[rects.length -1].y += 18;
      //
      //   // interactive.circle(0,0, radius + space);
      //
      //
      //
      //   let center = interactive.circle(0,0,3);
      //   center.style.fill = `#404040`;
      //   center.style.stroke = `none`;
      //
      //   let r1 = 25;
      //   let r2 = 50;
      //   for( let a = 0; a < TAU; a += TAU/4 ) {
      //     let line = interactive.line( r1*Math.cos(a), r1*Math.sin(a), r2*Math.cos(a), r2*Math.sin(a));
      //   }
      //
      // });
    });

  // describe('Degrees Angle System', function(){
  //   let denominators = [4];
  //   let names = ['fourths'];
  //   for( let j = 0; j < denominators.length; j++) {
  //     let denominator = denominators[j];
  //     let name = names[j];
  //     let count = 1;
  //     for( let i = 1/denominator*TAU; i < TAU; i += 1/denominator*TAU ) {
  //       describe(`figure ${count} over ${denominator}`, () => {
  //         // it(`${count} ${name} Radians`, () => {
  //         //   let id = container.id;
  //         //   let countTemp = count;
  //         //   let figure = new DegreesFigure(container.id, { label:false, angle:i, step:3, stepRadius:100/3, divide:denominator, margin:80 });
  //         //   scripts.push(() => {
  //         //     download(id, `figure-${countTemp}-${name}-radians-${figure.width}px`)
  //         //   });
  //         // });
  //
  //         it(`${count} ${name} Radians`, () => {
  //           let id = container.id;
  //           let countTemp = count;
  //           let figure = new DegreesFigure(container.id, { label:false, angle:i, divide:denominator, margin:100 });
  //           scripts.push(() => {
  //             download(id, `figure-${countTemp}-${name}-radians-${figure.width}px`)
  //           });
  //         });
  //       });
  //
  //       count++;
  //     }
  //   }});
});
});
