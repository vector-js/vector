import Container from '../container.js';

import cartesianCoordinateSystem from '../../examples/math/cartesian-coordinate-system.js';
import cartesianCoordinateSystemContinuous from '../../examples/math/cartesian-coordinate-system-continuous.js';
import exponentialTree from '../../examples/math/exponential-tree.js';
import unitCircle from '../../examples/math/unit-circle.js';
import polarCoordinateSystem from '../../examples/math/polar-coordinate-system.js';
import polarCoordinateSystemRadians from '../../examples/math/polar-coordinate-system-radians.js';
import primeFactorization from '../../examples/math/prime-factorization.js';
import riemannSum from '../../examples/math/riemann-sum.js';
import { download } from '../../index.js';

describe('Math Interactives', function () {

  // create a new container before each test function
  let container;
  beforeEach(function() {
    container = Container.createContainer();
  });

  describe('Interactives', function () {
    it('cartesian coordinate system discrete', function() {
      cartesianCoordinateSystem(container.id);
    });
    it('cartesian coordinate system continuous', function() {
      cartesianCoordinateSystemContinuous(container.id);
    });
    it('unit circle', function() {
      unitCircle(container.id, {});
    });
    it('prime factorization', function() {
      primeFactorization(container.id);
    });
    it('exponents logarithms and trees', function() {
      exponentialTree(container.id);
    });
    it('polar coordinate system', function() {
      polarCoordinateSystem(container.id);
    });
    it('polar coordinate system radians', function() {
      polarCoordinateSystemRadians(container.id);
    });
    it('riemann sum', function() {
      riemannSum(container.id);
    });

  });
});
