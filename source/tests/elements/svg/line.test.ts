import Line from '../../../elements/svg/line.js';
import Element from '../../../elements/svg/element.js';

describe('Line', function () {
  describe('constructor', function () {
    it('should create a line with a unique id and add it to the element controller', function() {
      let line = new Line(100, 100, 100, 100);
      chai.expect(Element.controller.get(line.id)).to.equal(line);
    });
    it('should create elements with different identifiers', function() {
      let line1 = new Line(100, 100, 100, 100);
      let line2 = new Line(100, 100, 100, 100);
      chai.expect(Element.controller.get(line1.id)).to.equal(line1);
      chai.expect(Element.controller.get(line2.id)).to.equal(line2);
    });
  });

  describe('getters/setters', function () {

    it('should get x1', function() {
      let x1 = 50;
      let line = new Line(x1, 100, 100, 100);
      chai.expect(line.x1).to.equal(50);
    });
    it('should set, then get new x1', function() {
      let x1 = 50;
      let line = new Line(x1, 100, 100, 100);
      line.x1 = 200;
      chai.expect(line.x1).to.equal(200);
    });

    it('should get y1', function() {
      let y1 = 50;
      let line = new Line(100, y1, 100, 100);
      chai.expect(line.y1).to.equal(50);
    });
    it('should set, then get new y1', function() {
      let y1 = 50;
      let line = new Line(100, y1, 100, 100);
      line.y1 = 200;
      chai.expect(line.y1).to.equal(200);
    });

    it('should get x2', function() {
      let x2 = 50;
      let line = new Line(100, 100, x2, 100);
      chai.expect(line.x2).to.equal(50);
    });
    it('should set, then get new x2', function() {
      let x2 = 50;
      let line = new Line(100, 100, x2, 100);
      line.x2 = 200;
      chai.expect(line.x2).to.equal(200);
    });

    it('should get y2', function() {
      let y2 = 50;
      let line = new Line(100, 100, 100, y2);
      chai.expect(line.y2).to.equal(50);
    });
    it('should set, then get new y2', function() {
      let y2 = 50;
      let line = new Line(100, 100, 100, y2);
      line.y2 = 200;
      chai.expect(line.y2).to.equal(200);
    });

    it('should get x1 and y1, make sure they are different', function() {
      let x1 = 50;
      let y1 = 75;

      let line = new Line(x1, y1, 100, 100);
      chai.expect(line.x1).to.equal(50);
      chai.expect(line.y1).to.equal(75);

    });
    it('should set, then get new x1 and y1, make sure they changed individually', function() {
      let x1 = 50;
      let y1 = 75;

      let line = new Line(x1, y1, 100, 100);
      chai.expect(line.x1).to.equal(50);
      chai.expect(line.y1).to.equal(75);
      line.x1 = 200;
      line.y1 = 250;

      chai.expect(line.x1).to.equal(200);
      chai.expect(line.y1).to.equal(250);
    });

    it('should get x2 and y2, make sure they are different', function() {
      let x2 = 50;
      let y2 = 75;

      let line = new Line(100, 100, x2, y2);
      chai.expect(line.x2).to.equal(50);
      chai.expect(line.y2).to.equal(75);

    });
    it('should set, then get new x2 and y2, make sure they changed individually', function() {
      let x2 = 50;
      let y2 = 75;

      let line = new Line(100, 100, x2, y2);
      chai.expect(line.x2).to.equal(50);
      chai.expect(line.y2).to.equal(75);
      line.x2 = 200;
      line.y2 = 250;

      chai.expect(line.x2).to.equal(200);
      chai.expect(line.y2).to.equal(250);
    });

    it('should get x1 and x2, make sure they are different', function() {
      let x1 = 50;
      let x2 = 75;

      let line = new Line(x1, 100, x2, 100);
      chai.expect(line.x1).to.equal(50);
      chai.expect(line.x2).to.equal(75);

    });
    it('should set, then get new x1 and x2, make sure they changed individually', function() {
      let x1 = 50;
      let x2 = 75;

      let line = new Line(x1, 100, x2, 100);
      chai.expect(line.x1).to.equal(50);
      chai.expect(line.x2).to.equal(75);
      line.x1 = 200;
      line.x2 = 250;

      chai.expect(line.x1).to.equal(200);
      chai.expect(line.x2).to.equal(250);
    });

    it('should get y1 and y2, make sure they are different', function() {
      let y1 = 50;
      let y2 = 75;

      let line = new Line(100, y1, 100, y2);
      chai.expect(line.y1).to.equal(50);
      chai.expect(line.y2).to.equal(75);

    });
    it('should set, then get new y1 and y2, make sure they changed individually', function() {
      let y1 = 50;
      let y2 = 75;

      let line = new Line(100, y1, 100, y2);
      chai.expect(line.y1).to.equal(50);
      chai.expect(line.y2).to.equal(75);
      line.y1 = 200;
      line.y2 = 250;

      chai.expect(line.y1).to.equal(200);
      chai.expect(line.y2).to.equal(250);
    });


    it('should get default fill', function() {
      let line = new Line(100, 100, 100, 100);
      chai.expect(line.fill).to.equal('');
    });
    it('should set, then get new fill', function() {
      let fill = 'red';
      let line = new Line(100, 100, 100, 100);
      line.fill = fill;
      chai.expect(line.fill).to.equal('red');
    });

    it('should get default stroke', function() {
      let line = new Line(100, 100, 100, 100);
      chai.expect(line.stroke).to.equal('');
    });
    it('should set, then get new stroke', function() {
      let stroke = 'blue';
      let line = new Line(100, 100, 100, 100);
      line.stroke = stroke;
      chai.expect(line.stroke).to.equal('blue');
    });
  });

  describe('translate', function () {
    it('should create a line and move it over 10, 10', function() {
      let line = new Line(100, 75, 50, 25);
      line.translate(10, 10);
      chai.expect(line.x1).to.equal(110);
      chai.expect(line.y1).to.equal(85);
      chai.expect(line.x2).to.equal(60);
      chai.expect(line.y2).to.equal(35);
    });
    it('should create a line and translate by 0, maintaining the same position', function() {
      let line = new Line(100, 75, 50, 25);
      line.translate(0, 0);
      chai.expect(line.x1).to.equal(100);
      chai.expect(line.y1).to.equal(75);
      chai.expect(line.x2).to.equal(50);
      chai.expect(line.y2).to.equal(25);
    });
    it('should create a line, move it over 10, then manually move the x', function() {
      let line = new Line(100, 75, 50, 25);
      line.translate(10, 10);
      chai.expect(line.x1).to.equal(110);
      chai.expect(line.y1).to.equal(85);
      chai.expect(line.x2).to.equal(60);
      chai.expect(line.y2).to.equal(35);

      line.x1 = 90;
      chai.expect(line.x1).to.equal(90);
      chai.expect(line.y1).to.equal(85);
      chai.expect(line.x2).to.equal(60);
      chai.expect(line.y2).to.equal(35);
    });
    it('should create a line, translate it, manually move the x and y, then translate again', function() {
      let line = new Line(100, 75, 50, 25);
      line.translate(10, 10);
      chai.expect(line.x1).to.equal(110);
      chai.expect(line.y1).to.equal(85);
      chai.expect(line.x2).to.equal(60);
      chai.expect(line.y2).to.equal(35);

      line.x1 = 90;
      line.y1 = 80;
      chai.expect(line.x1).to.equal(90);
      chai.expect(line.y1).to.equal(80);
      chai.expect(line.x2).to.equal(60);
      chai.expect(line.y2).to.equal(35);

      line.translate(-100, -100);
      chai.expect(line.x1).to.equal(-10);
      chai.expect(line.y1).to.equal(-20);
      chai.expect(line.x2).to.equal(-40);
      chai.expect(line.y2).to.equal(-65);
    });
  });
});
