import Container from '../container.js';

import cartesianCoordinateSystem from '../../examples/math/cartesian-coordinate-system.js';
import cartesianCoordinateSystemContinuous from '../../examples/math/cartesian-coordinate-system-continuous.js';
import circleDefinedByThreePoints from '../../examples/math/circle-defined-by-three-points.js';
import degrees from '../../examples/math/degrees.js';
import exponentialTree from '../../examples/math/exponential-tree.js';
import polarCoordinateSystem from '../../examples/math/polar-coordinate-system.js';
import polarCoordinateSystemRadians from '../../examples/math/polar-coordinate-system-radians.js';
import primeFactorization from '../../examples/math/prime-factorization.js';
import radians from '../../examples/math/radians.js';
import riemannSum from '../../examples/math/riemann-sum.js';
import unitCircle from '../../examples/math/unit-circle.js';
import unitCircleAngle from '../../examples/math/unit-circle-angle.js';
import unitCircleCosine from '../../examples/math/unit-circle-cosine.js';
import unitCircleRightTriangle from '../../examples/math/unit-circle-right-triangle.js';
import unitCircleSine from '../../examples/math/unit-circle-sine.js';

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
    it('circle defined by three points', function() {
      circleDefinedByThreePoints(container.id);
    });
    it('degrees', function() {
      degrees(container.id);
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
    it('radians', function() {
      radians(container.id);
    });
    it('riemann sum', function() {
      riemannSum(container.id);
    });
    it('unit circle', function() {
      unitCircle(container.id, {});
    });
    it('unit circle angle', function() {
      unitCircleAngle(container.id);
    });
    it('unit circle cosine', function() {
      unitCircleCosine(container.id);
    });
    it('unit circle right triangle', function() {
      unitCircleRightTriangle(container.id);
    });
    it('unit circle sine', function() {
      unitCircleSine(container.id);
    });

  });
});
