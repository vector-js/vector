import Container from '../container.js';

import grayscale from '../../examples/color/grayscale.js';
import colorWheel from '../../examples/color/color-wheel.js';
import colorCircle from '../../examples/color/color-circle.js';

describe('Color Theory Interactives', function () {

  // create a new container before each test function
  let container;
  beforeEach(function() {
    container = Container.createContainer();
  });

  describe('Interactives', function () {
    it('grayscale', function() {
      grayscale(container.id);
    });
    it('color wheel', function() {
      colorWheel(container.id);
    });
    it('color circle', function() {
      colorCircle(container.id);
    });
  });
});
