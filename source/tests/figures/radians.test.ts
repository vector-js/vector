import Container from '../container.js';
import {download } from '../../index.js';

/* import figures */
import {RadiansFigure} from '../../examples/figures/radians.js';
import { TAU } from '../../util/constants.js';

describe('Math Figures', function () {

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

  describe('Radian Angle System', function(){
    describe('Numeric Angles', function() {
      for( let angle = 0; angle < 7; angle++ ) {
        it(`${angle} Radians 300px`, function() {
          let id = container.id;
          new RadiansFigure(container.id, { label:false, angle:angle, step:3, stepRadius:100/3 });
          scripts.push(() => {
            download(id, `figure-${angle}-radians-300px`)
          });
        });
      }

      for( let angle = 0; angle < 7; angle++ ) {
        it(`${angle} Radians 400px`, function() {
          let id = container.id;
          new RadiansFigure(container.id, { label:false, angle:angle });
          scripts.push(() => {
            download(id, `figure-${angle}-radians-400px`)
          });
        });
      }
    });

    describe('Special Angles', function(){

      let angles = [['pi', Math.PI], ['tau', 2*Math.PI]];

      for( let i = 0; i < angles.length; i++ ) {

        let name : string | number = angles[i][0];
        let value : any | number = angles[i][1];

        it(`${name} Radians 300px`, function() {
          let id = container.id;
          new RadiansFigure(container.id, { label:false, angle:value, step:3, stepRadius:100/3 });
          scripts.push(() => {
            download(id, `figure-${name}-radians-300px`)
          });
        });
      }

      for( let i = 0; i < angles.length; i++ ) {

        let name : string | number = angles[i][0];
        let value : any | number = angles[i][1];

        it(`${name} Radians 400px`, function() {
          let id = container.id;
          new RadiansFigure(container.id, { label:false, angle:value });
          scripts.push(() => {
            download(id, `figure-${name}-radians-400px`)
          });
        });
      }
    });

    describe('Fractions of the whole', function(){

      let denominators = [3, 4, 6, 8, 12, 24];
      let names = ['thirds', 'fourths', 'sixths', 'eigths', 'twelfths', 'twenty-fourths'];
      for( let j = 0; j < denominators.length; j++) {
        let denominator = denominators[j];
        let name = names[j];
        let count = 0;
        for( let i = 0; i < TAU; i += 1/denominator*TAU ) {
          describe(`figure ${count} over ${denominator}`, () => {
            it(`${count} ${name} Radians`, () => {
              let id = container.id;
              let countTemp = count;
              let figure = new RadiansFigure(container.id, { label:false, angle:i, step:3, stepRadius:100/3, divide:denominator, margin:80 });
              scripts.push(() => {
                download(id, `figure-${countTemp}-${name}-radians-${figure.width}px`)
              });
            });

            it(`${count} ${name} Radians`, () => {
              let id = container.id;
              let countTemp = count;
              let figure = new RadiansFigure(container.id, { label:false, angle:i, divide:denominator, margin:100 });
              scripts.push(() => {
                download(id, `figure-${countTemp}-${name}-radians-${figure.width}px`)
              });
            });
          });

          count++;
        }
      }});
  });
});
