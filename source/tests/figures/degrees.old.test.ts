import Container from '../container.js';
import {download } from '../../index.js';

/* import figures */
import {DegreesFigure} from '../../examples/figures/degrees.js';
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

  describe('Degrees Angle System', function(){
    let denominators = [4, 6, 8, 12, 24];
    let names = ['thirds', 'fourths', 'sixths', 'eigths', 'twelfths', 'twenty-fourths'];
    for( let j = 0; j < denominators.length; j++) {
      let denominator = denominators[j];
      let name = names[j];
      let count = 1;
      for( let i = 1/denominator*TAU; i < TAU; i += 1/denominator*TAU ) {
        describe(`figure ${count} over ${denominator}`, () => {
          // it(`${count} ${name} Radians`, () => {
          //   let id = container.id;
          //   let countTemp = count;
          //   let figure = new DegreesFigure(container.id, { label:false, angle:i, step:3, stepRadius:100/3, divide:denominator, margin:80 });
          //   scripts.push(() => {
          //     download(id, `figure-${countTemp}-${name}-radians-${figure.width}px`)
          //   });
          // });

          it(`${count} ${name} Radians`, () => {
            let id = container.id;
            let countTemp = count;
            let figure = new DegreesFigure(container.id, { label:false, angle:i, divide:denominator, margin:100 });
            scripts.push(() => {
              download(id, `figure-${countTemp}-${name}-radians-${figure.width}px`)
            });
          });
        });

        count++;
      }
    }});
});
