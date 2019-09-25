/**
* Tests that the provided element correctly implements the "descriptive" content
* model. Meaning that descriptive elements can be created within the element.
*/
export var descriptiveTests = function () {
    let element = null;
    beforeEach(function () {
        element = this.element;
    });
    it('should create and append a description element', function () {
        chai.expect.fail('not implemented');
    });
    it('should create and append a metadata element', function () {
        chai.expect.fail('not implemented');
    });
    it('should create and append a title element', function () {
        chai.expect.fail('not implemented');
    });
};
/**
* Tests that the provided element correctly implements the "shape" content
* model. Meaning that shape elements can be created within the element.
*/
export var shapeTests = function () {
    let element = null;
    beforeEach(function () {
        element = this.element;
    });
    it('should create and append a circle element', function () {
        let circle = element.circle(50, 50, 40);
        chai.expect(element.root.contains(circle.root));
    });
    it('should create and append an ellipse element', function () {
        let ellipse = element.ellipse(50, 50, 40, 20);
        chai.expect(element.root.contains(ellipse.root));
    });
    it('should create and append a line element', function () {
        let line = element.line(10, 10, 90, 90);
        chai.expect(element.root.contains(line.root));
    });
    it('should create and append a path element', function () {
        let child = element.path('');
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a polygon element', function () {
        chai.expect.fail('not implemented');
    });
    it('should create and append a path element', function () {
        let rectangle = element.rectangle(10, 10, 80, 80);
        chai.expect(element.root.contains(rectangle.root));
    });
};
/**
* Tests that the provided element correctly implements the "structural" content
* model. Meaning that structural elements can be created within the element.
*/
export var structuralTests = function () {
    let element = null;
    beforeEach(function () {
        element = this.element;
    });
    it('should create and append a defs element', function () {
        chai.expect.fail('not implemented');
    });
    it('should create and append a group element', function () {
        chai.expect.fail('not implemented');
    });
    it('should create and append a svg element', function () {
        chai.expect.fail('not implemented');
    });
    it('should create and append a use element', function () {
        chai.expect.fail('not implemented');
    });
};
/**
* Tests that the provided element correctly implements the "typography" content
* model. Meaning that structural elements can be created within the element.
*/
export var typographyTests = function () {
    let element = null;
    beforeEach(function () {
        element = this.element;
    });
    it('should create and append a text element', function () {
        chai.expect.fail('not implemented');
    });
    it('created text elements should be able to creat tspan elements', function () {
        // TODO: text.tspan();
        chai.expect.fail('not implemented');
    });
    it('created tspan elements should be able to creat tspan elements', function () {
        // TODO: tspan.tspan();
        chai.expect.fail('not implemented');
    });
};
//# sourceMappingURL=content-model.test.js.map