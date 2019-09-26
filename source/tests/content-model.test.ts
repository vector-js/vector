import { Descriptive, Shape, Structural, Typography } from '../elements/svg-content-model.js';

/**
* Tests that the provided element correctly implements the "descriptive" content
* model. Meaning that descriptive elements can be created within the element.
*/
export var descriptiveTests = function() {

  let element:Descriptive = null;
  beforeEach(function(){
    element = this.element as Descriptive;
  });
  it('should create and append a description element', function() {
    chai.expect.fail('not implemented');
  });
  it('should create and append a metadata element', function() {
    chai.expect.fail('not implemented');
  });
  it('should create and append a title element', function() {
    chai.expect.fail('not implemented');
  });
};

/**
* Tests that the provided element correctly implements the "shape" content
* model. Meaning that shape elements can be created within the element.
*/
export var shapeTests = function() {

  let element:Shape = null;
  beforeEach(function(){
    element = this.element as Shape;
  });

  it('should create and append a circle element', function() {
    let circle = element.circle(50, 50, 40);
    chai.expect(element.root.contains(circle.root));
  });
  it('should create and append an ellipse element', function() {
    let ellipse = element.ellipse(50, 50, 40, 20);
    chai.expect(element.root.contains(ellipse.root));
  });
  it('should create and append a line element', function() {
    let line = element.line(10, 10, 90, 90);
    chai.expect(element.root.contains(line.root));
  });
  it('should create and append a path element', function() {
    let child = element.path('');
    chai.expect(element.root.contains(child.root));
  });
  it('should create and append a polygon element', function() {
    chai.expect.fail('not implemented');
  });
  it('should create and append a path element', function() {
    let rectangle = element.rectangle(10, 10, 80, 80);
    chai.expect(element.root.contains(rectangle.root))
  });
};

/**
* Tests that the provided element correctly implements the "structural" content
* model. Meaning that structural elements can be created within the element.
*/
export var structuralTests = function() {

  let element:Structural = null;
  beforeEach(function(){
    element = this.element as Structural;
  });

  it('should create and append a defs element', function() {
    let defs = element.defs();
    chai.expect(element.root.contains(defs.root));
  });
  it('should create and append a group element', function() {
    let group = element.group();
    chai.expect(element.root.contains(group.root));
  });
  it('should create and append a svg element', function() {
    let child = element.svg();
    chai.expect(element.root.contains(child.root));
  });
  it('should create and append a use element', function() {
    let child = element.use();
    chai.expect(element.root.contains(child.root));
  });
};

/**
* Tests that the provided element correctly implements the "typography" content
* model. Meaning that structural elements can be created within the element.
*/
export var typographyTests = function() {

  let element:Typography = null;
  beforeEach(function(){
    element = this.element as Typography;
  });

  it('should create and append a text element', function() {
    chai.expect.fail('not implemented');
  });
  it('created text elements should be able to creat tspan elements', function() {
    // TODO: text.tspan();
    chai.expect.fail('not implemented');
  });
  it('created tspan elements should be able to creat tspan elements', function() {
    // TODO: tspan.tspan();
    chai.expect.fail('not implemented');
  });
};
