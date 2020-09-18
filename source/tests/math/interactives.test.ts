import Container from '../container.js';

import cartesianCoordinateSystem from '../../examples/math/cartesian-coordinate-system.js';
import cartesianCoordinateSystemContinuous from '../../examples/math/cartesian-coordinate-system-continuous.js';
import circleDefinedByThreePoints from '../../examples/math/circle-defined-by-three-points.js';
import compoundInterest from '../../examples/math/compound-interest.js';
import cosineFunction from '../../examples/math/cosine.js';
import degrees from '../../examples/math/degrees.js';
import exponentialTree from '../../examples/math/exponential-tree.js';
import exponentialTreeNew from '../../examples/math/exponential-tree-new.js';
import lineThroughTwoPoints from '../../examples/math/line-defined-by-two-points.js';
import modularArithmeticNumberLine from '../../examples/math/modular-arithmetic-number-line.js';
import modularArithmeticWheel from '../../examples/math/modular-arithmetic-wheel.js';
import modularArithmeticWheelBig from '../../examples/math/modular-arithmetic-wheel-big.js';
import polarCoordinateSystem from '../../examples/math/polar-coordinate-system.js';
import polarCoordinateSystemRadians from '../../examples/math/polar-coordinate-system-radians.js';
import primeFactorizationTree from '../../examples/math/prime-factorization.js';
import tauRadians from '../../examples/math/tau-radians.js';
import radians from '../../examples/math/radians.js';
import riemannSum from '../../examples/math/riemann-sum.js';
import triangle from '../../examples/math/triangle-general.js';
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

  describe('General Triangle', function(){
    it('triangle', function() {
      triangle(container.id);
    });
  });

  describe('Compound Interest', function(){
    it('compound interest', function() {
      compoundInterest(container.id);
    });
  });

  describe('Cartesian Coordinate System', function(){
    it('cartesian coordinate system discrete', function() {
      cartesianCoordinateSystem(container.id);
    });
    it('cartesian coordinate system continuous', function() {
      cartesianCoordinateSystemContinuous(container.id);
    });
  });

  describe('Polar Coordinate System', function(){
    it('degrees', function() {
      degrees(container.id);
    });
    it('tau radians', function() {
      tauRadians(container.id);
    });
    it('radians', function() {
      radians(container.id);
    });
    it('polar coordinate system', function() {
      polarCoordinateSystem(container.id);
    });
    it('polar coordinate system radians', function() {
      polarCoordinateSystemRadians(container.id);
    });
  });

  describe('Geometry', function(){
    it('line through two points', function() {
      lineThroughTwoPoints(container.id);
    });
  });

  describe('Unit Circle', function(){
    it('unit circle', function() {
      unitCircle(container.id, {});
    });
    it('unit circle sine', function() {
      unitCircleSine(container.id);
    });
    it('unit circle cosine', function() {
      unitCircleCosine(container.id);
    });
    it('unit circle angle', function() {
      unitCircleAngle(container.id);
    });
    it('unit circle right triangle', function() {
      unitCircleRightTriangle(container.id);
    });
    it('Cosine function', function() {
      cosineFunction(container.id);
    });
  });

  describe('Miscellanious', function () {

    it('circle defined by three points', function() {
      circleDefinedByThreePoints(container.id);
    });

    it('prime factorization tree', function() {
      primeFactorizationTree(container.id);
    });

    it('exponents logarithms and trees', function() {
      exponentialTree(container.id);
    });

    it('exponents logarithms and trees new', function() {
      exponentialTreeNew(container.id);
    });


    it('riemann sum', function() {
      riemannSum(container.id);
    });

  });

  describe('Modular Arithmetic Interactive', function(){
    it('default configuration', function() {
      modularArithmeticWheel(container.id);
    });
    it('without slider', function() {
      modularArithmeticWheel(container.id);
    });
    it('with set highlighting', function() {
      modularArithmeticWheel(container.id);
    });
  });

  describe('Modular Arithmetic', function(){
    it('modular arithmetic wheel default', function() {
      modularArithmeticWheel(container.id);
    });

    it('modular arithmetic wheel new', function() {
      modularArithmeticWheel(container.id, {
        rotations:7,
        width: 900,
        height:900,
        max:12,
        radius:60,
        spacing:.25,
        fontSize: 18
      });
    });
    it('modular arithmetic wheel', function() {
      modularArithmeticWheel(container.id);
    });
    it('modular arithmetic wheel', function() {
      modularArithmeticWheel(container.id, {
        rotations:4,
        modulo:3,
        width:700,
        height:700,
        max:12,
        radius:75,
        spacing: .25
      });
      modularArithmeticWheel(container.id, {
        rotations:3,
        modulo:3,
        width:700,
        height:700,
        max:16,
        radius:75,
        spacing: 1
      });
      modularArithmeticWheel(container.id, {
        rotations:7,
        modulo:3,
        width:1200,
        height:1200,
        max:16,
        radius:75,
        spacing: 1
      });
    });
    it('modular arithmetic modulos', function() {
      modularArithmeticWheel(container.id, {
        rotations:3,
        modulo: 4,
        width:350,
        height:350,
        radius:55,
        max:10
      });
      modularArithmeticWheel(container.id, {
        rotations:3,
        modulo: 5,
        width:350,
        height:350,
        radius:55
      });
    });
  });
});
