import Text from '../../../elements/svg/text.js';
import Element from '../../../elements/svg/element.js';

describe('Text', function () {
  describe('constructor', function () {
    it('should create a text with a unique id and add it to the element controller', function() {
      let text = new Text(100, 100, "test");
      // chai.expect(text.id).to.equal(`text-0`);
      chai.expect(Element.controller.get(text.id)).to.equal(text);
      // chai.expect(Element.count).to.equal(1);
    });
    it('should create elements with different identifiers', function() {
      let text1 = new Text(100, 100, "test");
      let text2 = new Text(100, 100, "test");
      chai.expect(Element.controller.get(text1.id)).to.equal(text1);
      chai.expect(Element.controller.get(text2.id)).to.equal(text2);
    });
  });

  describe('getters/setters', function () {

    it('should get x position', function() {
      let x = 50;
      let text = new Text(x, 100, "test");
      chai.expect(text.x).to.equal(50);
    });
    it('should set, then get new x position', function() {
      let x = 50;
      let text = new Text(x, 100, "test");
      text.x = 200;
      chai.expect(text.x).to.equal(200);
    });

    it('should get y position', function() {
      let y = 50;
      let text = new Text(100, y, "test");
      chai.expect(text.y).to.equal(50);
    });
    it('should set, then get new y position', function() {
      let y = 50;
      let text = new Text(100, y, "test");
      text.y = 200;
      chai.expect(text.y).to.equal(200);
    });

    it('should get contents', function() {
      let textString = "Testing";
      let text = new Text(100, 100, textString);
      chai.expect(text.contents).to.equal("Testing");
    });
    it('should work with empty contents', function() {
      let textString = "";
      let text = new Text(100, 100, textString);
      chai.expect(text.contents).to.equal("");
    });
    it('should set, then get new y position', function() {
      let firstText = "first";
      let text = new Text(100, 100, firstText);
      chai.expect(text.contents).to.equal("first");

      text.contents = "second";
      chai.expect(text.contents).to.equal("second");
    });

    // TODO: why is this failiing?
    // it('created text elements should be able to create tspan elements', function() {
    //   let child = this.element.text(1, 2, ''); // TODO: allow default parameter?
    //   let tspan = child.tspan('child-tspan');
    //   chai.expect(tspan.text).to.equal('child-tspan');
    //   chai.expect(this.element.root.contains(tspan.root));
    // });

    //
    // it('should get proper length', function() {
    //   let textString = "Testing";
    //   let text = new Text(100, 100, textString);
    //   chai.expect(text.length).to.equal(7);
    // });
    // it('length should work with empty contents', function() {
    //   let textString = "";
    //   let text = new Text(100, 100, textString);
    //   chai.expect(text.length).to.equal(0);
    // });
    // it('length should work with spaces', function() {
    //   let textString = "   hello   ";
    //   let text = new Text(100, 100, textString);
    //   chai.expect(text.length).to.equal(11);
    // });
    // it('should set, then get new y position', function() {
    //   let firstText = "first";
    //   let text = new Text(100, 100, firstText);
    //   chai.expect(text.length).to.equal(text.);
    //
    //   text.contents = "second";
    //   chai.expect(text.length).to.equal(6);
    // });
  });

  // describe('translate', function () {
  //   it('should create a text and move it over 10, 10', function() {
  //     let text = new Text(100, 100, 100, 100);
  //     text.translate(10, 10);
  //     chai.expect(text.cx).to.equal(110);
  //     chai.expect(text.cy).to.equal(110);
  //   });
  //   it('should create a text and translate by 0, maintaining the same position', function() {
  //     let text = new Text(100, 100, 100, 100);
  //     text.translate(0, 0);
  //     chai.expect(text.cx).to.equal(100);
  //     chai.expect(text.cy).to.equal(100);
  //   });
  //   it('should create a text, move it over 10, then manually move the x', function() {
  //     let text = new Text(100, 100, 100, 100);
  //     text.translate(10, 10);
  //     chai.expect(text.cx).to.equal(110);
  //     chai.expect(text.cy).to.equal(110);
  //
  //     text.cx = 90;
  //     chai.expect(text.cx).to.equal(90);
  //     chai.expect(text.cy).to.equal(110);
  //   });
  //   it('should create a text, translate it, manually move the x and y, then translate again', function() {
  //     let text = new Text(100, 100, 100, 100);
  //     text.translate(10, 10);
  //     chai.expect(text.cx).to.equal(110);
  //     chai.expect(text.cy).to.equal(110);
  //
  //     text.cx = 90;
  //     text.cy = 80;
  //     chai.expect(text.cx).to.equal(90);
  //     chai.expect(text.cy).to.equal(80);
  //
  //     text.translate(-100, -100);
  //     chai.expect(text.cx).to.equal(-10);
  //     chai.expect(text.cy).to.equal(-20);
  //   });
  // });
});
