import Node from '../../../elements/graph/node.js';
import Element from '../../../elements/svg/element.js';

describe('Node', function () {
  describe('constructor', function () {
    it('should create a node with a unique id and add it to the element controller', function() {
      let node = new Node(100, 100, 100, 100, 'testNode');
      // chai.expect(circle.id).to.equal(`circle-0`);
      chai.expect(Element.controller.get(node.id)).to.equal(node);
      // chai.expect(Element.count).to.equal(1);
    });
  });

  describe('getters/setters', function () {

    it('should get cx', function() {
      let cx = 50;
      let node = new Node(cx, 100, 100, 100, 'testNode');
      chai.expect(node.cx).to.equal(cx);
    });
    it('should get cy', function() {
      let cy = 50;
      let node = new Node(100, cy, 100, 100, 'testNode');
      chai.expect(node.cy).to.equal(cy);
    });
    it('should get rx', function() {
      let rx = 50;
      let node = new Node(100, 100, rx, 100, 'testNode');
      chai.expect(node.rx).to.equal(rx);
    });
    it('should get ry', function() {
      let ry = 50;
      let node = new Node(100, 100, 100, ry, 'testNode');
      chai.expect(node.ry).to.equal(ry);
    });
    it('should get label', function() {
      let label = 'testing';
      let node = new Node(100, 100, 100, 100, label);
      chai.expect(node.label).to.equal(label);
    });

    it('should set rx, then get new value', function() {
      let rx = 50;
      let newRx = 150;
      let node = new Node(100, 100, rx, 100, 'testNode');
      chai.expect(node.rx).to.equal(rx);

      node.rx = newRx;
      chai.expect(node.rx).to.equal(newRx);
    });
    it('should set ry, then get new value', function() {
      let ry = 50;
      let newRy = 150;
      let node = new Node(100, 100, 100, ry, 'testNode');
      chai.expect(node.ry).to.equal(ry);

      node.ry = newRy;
      chai.expect(node.ry).to.equal(newRy);
    });
    it('should set label, then get new value', function() {
      let label = 'testing';
      let newLabel = 'newTest';
      let node = new Node(100, 100, 100, 100, label);
      chai.expect(node.label).to.equal(label);

      node.label = newLabel;
      chai.expect(node.label).to.equal(newLabel);
    });

  });

  describe('translate', function () {
    it('should create a node and move it over 10, 10', function() {
      let node = new Node(100, 100, 100, 100, 'testNode');
      node.translate(10, 10);
      chai.expect(node.cx).to.equal(110);
      chai.expect(node.cy).to.equal(110);
    });

    it('should create a node and translate by 0, maintaining the same position', function() {
      let node = new Node(100, 100, 100, 100, 'testNode');
      node.translate(0, 0);
      chai.expect(node.cx).to.equal(100);
      chai.expect(node.cy).to.equal(100);
    });

    it('should create a node and translate by 10, make sure the actual ellipse moves', function() {
      let node = new Node(100, 100, 100, 100, 'testNode');
      node.translate(10, 10);
      chai.expect(node.cx).to.equal(110);
      chai.expect(node.cy).to.equal(110);
      chai.expect(node.cx).to.equal(node.nodeEllipse.cx);
      chai.expect(node.cy).to.equal(node.nodeEllipse.cx);
    });

    it('should create a node and translate by 10, make sure the text moves', function() {
      let node = new Node(100, 100, 100, 100, 'testNode');
      node.translate(10, 10);
      chai.expect(node.cx).to.equal(110);
      chai.expect(node.cy).to.equal(110);
      chai.expect(node.cx).to.equal(node.nodeName.x);
      chai.expect(node.cy).to.equal(node.nodeName.y);
    });

    it('should create a node, translate it, manually move the x and y, then translate again', function() {
      let node = new Node(100, 100, 100, 100, 'testNode');
      node.translate(10, 10);
      chai.expect(node.cx).to.equal(110);
      chai.expect(node.cy).to.equal(110);

      node.translate(-20, -30)
      chai.expect(node.cx).to.equal(90);
      chai.expect(node.cy).to.equal(80);

      node.translate(-100, -100);
      chai.expect(node.cx).to.equal(-10);
      chai.expect(node.cy).to.equal(-20);
    });
  });
});
