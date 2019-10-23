import Circle from '../../../elements/svg/circle.js';
import Element from '../../../elements/svg/element.js';
import { descriptiveElements, clipPathElement, markerElement, scriptElement } from './content-model.test.js';

describe('Circle', function () {
  describe('constructor', function () {
    it('should create a circle with a unique id and add it to the element controller', function() {
      let circle = new Circle(100, 100, 100);
      // chai.expect(circle.id).to.equal(`circle-0`);
      chai.expect(Element.controller.get(circle.id)).to.equal(circle);
      // chai.expect(Element.count).to.equal(1);
    });
    it('should create elements with successive identifiers', function() {
      let circle1 = new Circle(100, 100, 100);
      let circle2 = new Circle(100, 100, 100);
      // chai.expect(circle1.id).to.equal(`circle-1`);
      // chai.expect(circle2.id).to.equal(`circle-2`);
      chai.expect(Element.controller.get(circle1.id)).to.equal(circle1);
      chai.expect(Element.controller.get(circle2.id)).to.equal(circle2);
    });
  });

  // NOTE: we have chosen to diverge from the SVG specification of the content model for a circle elemnt
  // describe('content model', function(){
  //   let element : Circle;
  //   beforeEach(function() {
  //     element = new Circle(1,2,3);
  //     this.element = element;
  //   });
  //   // grouped elements
  //   // descriptiveElements();
  //   // individual elements
  //   // clipPathElement();
  //   // markerElement();
  //   // scriptElement();
  //   // styleElement(); // TODO: this conflicts with current style property
  // });

  describe('getters/setters', function () {

    it('should get radius', function() {
      let radius = 100;
      let circle = new Circle(100, 100, radius);
      chai.expect(circle.r).to.equal(100);
    });
    it('should set, then get new radius', function() {
      let radius = 100;
      let circle = new Circle(100, 100, radius);
      circle.r = 200;
      chai.expect(circle.r).to.equal(200);
    });

    it('should get cx', function() {
      let cx = 75;
      let circle = new Circle(cx, 100, 100);
      chai.expect(circle.cx).to.equal(cx);
    });
    it('should set, then get new cx', function() {
      let cx = 75;
      let circle = new Circle(cx, 100, 100);
      circle.cx = 175;
      chai.expect(circle.cx).to.equal(175);
    });

    it('should get cy', function() {
      let cy = 50;
      let circle = new Circle(100, cy, 100);
      chai.expect(circle.cy).to.equal(cy);
    });
    it('should set, then get new cy', function() {
      let cy = 50;
      let circle = new Circle(100, cy, 100);
      circle.cy = 150;
      chai.expect(circle.cy).to.equal(150);
    });

    it('should get default fill', function() {
      let circle = new Circle(100, 100, 100);
      chai.expect(circle.fill).to.equal('');
    });
    it('should set, then get new fill', function() {
      let fill = 'red';
      let circle = new Circle(100, 100, 100);
      circle.fill = fill;
      chai.expect(circle.fill).to.equal('red');
    });

    it('should get default stroke', function() {
      let circle = new Circle(100, 100, 100);
      chai.expect(circle.stroke).to.equal('');
    });
    it('should set, then get new stroke', function() {
      let stroke = 'blue';
      let circle = new Circle(100, 100, 100);
      circle.stroke = stroke;
      chai.expect(circle.stroke).to.equal('blue');
    });
  });

  describe('translate', function () {
    it('should create a circle and move it over 10, 10', function() {
      let circle = new Circle(100, 100, 100);
      circle.translate(10, 10);
      chai.expect(circle.cx).to.equal(110);
      chai.expect(circle.cy).to.equal(110);
    });
    it('should create a circle and translate by 0, maintaining the same position', function() {
      let circle = new Circle(100, 100, 100);
      circle.translate(0, 0);
      chai.expect(circle.cx).to.equal(100);
      chai.expect(circle.cy).to.equal(100);
    });
    it('should create a circle, move it over 10, then manually move the x', function() {
      let circle = new Circle(100, 100, 100);
      circle.translate(10, 10);
      chai.expect(circle.cx).to.equal(110);
      chai.expect(circle.cy).to.equal(110);

      circle.cx = 90;
      chai.expect(circle.cx).to.equal(90);
      chai.expect(circle.cy).to.equal(110);
    });
    it('should create a circle, translate it, manually move the x and y, then translate again', function() {
      let circle = new Circle(100, 100, 100);
      circle.translate(10, 10);
      chai.expect(circle.cx).to.equal(110);
      chai.expect(circle.cy).to.equal(110);

      circle.cx = 90;
      circle.cy = 80;
      chai.expect(circle.cx).to.equal(90);
      chai.expect(circle.cy).to.equal(80);

      circle.translate(-100, -100);
      chai.expect(circle.cx).to.equal(-10);
      chai.expect(circle.cy).to.equal(-20);
    });
  });
});
