import Container from '../container.js';
import grayscale from '../../examples/color/grayscale.js';
import colorSpectrum from '../../examples/color/color-spectrum.js';
import colorWheel from '../../examples/color/color-wheel.js';
import colorCircle from '../../examples/color/color-circle.js';
describe('Color Theory Interactives', function () {
    // create a new container before each test function
    let container;
    beforeEach(function () {
        container = Container.createContainer();
    });
    describe('Interactives', function () {
        // it('Color Spectrum', function(){
        //
        //   let interactive = new Interactive(container, {
        //     width:600,
        //     height:150
        //   });
        //   let r = trapezoidalWave(-1/3, 1, 1);
        //   let g = trapezoidalWave( 0/3, 1, 1);
        //   let b = trapezoidalWave( 1/3, 1, 1);
        //
        //   // visualize the red green and blue values over the spectrum
        //   let plot;
        //   plot = helper( trapezoidalWave(-TAU*1/3, 2, TAU), container, {
        //     scaleX: 300/Math.PI,
        //     scaleY: 150/Math.PI,
        //     originY: 150,
        //     grid:false
        //   });
        //   let str = plot.fPath.d;
        //   plot.fPath.d = 'M -1200 0 ' + str.substr( str.indexOf('L'), str.length) + 'L 1200 0';
        //   plot.fPath.style.fill = 'rgb(255, 0, 0)';
        //   plot = helper( trapezoidalWave(TAU*0/3, 2, TAU), container, {
        //     scaleX: 300/Math.PI,
        //     scaleY: 150/Math.PI,
        //     originY: 150,
        //     grid:false
        //   });
        //   plot.fPath.style.fill = 'rgb(0, 255, 0)';
        //   plot = helper( trapezoidalWave(TAU*1/3, 2, TAU), container, {
        //     scaleX: 300/Math.PI,
        //     scaleY: 150/Math.PI,
        //     originY: 150,
        //     grid:false
        //   });
        //   plot.fPath.style.fill = 'rgb(0, 0, 255)';
        //
        //   let slider = interactive.slider(25, 125, {
        //     min: 6,
        //     max: 32,
        //     value: 6,
        //     width: interactive.width - 50,
        //   });
        //   // let n = 6;
        //   // let n = interactive.width/8;
        //
        //   let group = interactive.group();
        //   group.addDependency(slider);
        //   group.update = function() {
        //
        //     // Clear the current state of the color wheel
        //     while( group.root.firstChild ) {
        //       group.root.removeChild(group.root.firstChild);
        //     }
        //
        //     // Redraw the color spectrum
        //     let n = Math.floor(slider.value);
        //     let width = interactive.width/n;
        //     let height = 100;
        //     for( let i = 0; i < n; i ++){
        //       let v = i/(n);
        //       let x = interactive.width*(i/n);
        //       let rect = interactive.rectangle(x, 0, width, height);
        //       let rv = r(v)*255;
        //       let gv = g(v)*255;
        //       let bv = b(v)*255;
        //       rect.style.fill = `rgb(${rv}, ${gv}, ${bv})`;
        //     }
        //   };
        //   group.update();
        // });
        it('gray scale', function () {
            grayscale(container.id, { n: 6 });
            grayscale(container.id, { n: 60 });
            grayscale(container.id, { n: 360 });
        });
        it('color spectrum', function () {
            colorSpectrum(container.id);
            colorSpectrum(container.id, { n: 60 });
            colorSpectrum(container.id, { n: 360 });
        });
        it('color wheel', function () {
            colorWheel(container.id);
        });
        it('color circle', function () {
            colorCircle(container.id);
        });
    });
});
//# sourceMappingURL=color.test.js.map