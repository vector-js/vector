import Container from '../container.js';
import modularArithmeticWheel from '../../examples/math/modular-arithmetic-wheel.js';
import {download} from '../../index.js'

describe('Modular Arithmetic Wheel Script', function () {

  // create a new container before each test function
  let container:HTMLDivElement;
  beforeEach(function() {
    container = Container.createContainer();
    container.style.display = 'none';
  });

  describe('Generate Wheels of 2-16 modulos', function(){
    it('modular arithmetic wheel', function() {
      // for( let i = 11; i <= 17; i++ ) {
      //   modularArithmeticWheel(container.id, {
      //     rotations:4,
      //     modulo:i,
      //     width:612,
      //     height:792,
      //     max:16,
      //     radius:50,
      //     spacing: 1,
      //     fontSize: 16
      //   });
      //   download(container.id, `modulo-${i.toString().padStart(2, '0')}.svg`);
      //   while( container.firstChild ) {
      //     container.removeChild(container.firstChild);
      //   }
      // }
    });
  });
});
