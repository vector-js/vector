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
        let child = element.description();
        chai.expect(child.root.tagName === 'desc');
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a metadata element', function () {
        let child = element.metadata();
        chai.expect(child.root.tagName === 'metaData');
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a title element', function () {
        let child = element.title();
        chai.expect(child.root.tagName === 'title');
        chai.expect(element.root.contains(child.root));
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
        let child = element.circle(1, 2, 3);
        chai.expect(child.cx).to.equal(1);
        chai.expect(child.cy).to.equal(2);
        chai.expect(child.r).to.equal(3);
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append an ellipse element', function () {
        let child = element.ellipse(1, 2, 3, 4);
        chai.expect(child.cx).to.equal(1);
        chai.expect(child.cy).to.equal(2);
        chai.expect(child.rx).to.equal(3);
        chai.expect(child.ry).to.equal(4);
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a line element', function () {
        let child = element.line(1, 2, 3, 4);
        chai.expect(child.x1).to.equal(1);
        chai.expect(child.y1).to.equal(2);
        chai.expect(child.x2).to.equal(3);
        chai.expect(child.y2).to.equal(4);
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a path element', function () {
        let child = element.path('M 1 2 L 3 4');
        chai.expect(child.d).to.equal('M 1 2 L 3 4');
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a polygon element', function () {
        let child = element.polygon('1,2 3,4');
        chai.expect(child.points).to.equal('1,2 3,4');
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a rectangle element', function () {
        let child = element.rectangle(1, 2, 3, 4);
        chai.expect(child.x).to.equal(1);
        chai.expect(child.y).to.equal(2);
        chai.expect(child.width).to.equal(3);
        chai.expect(child.height).to.equal(4);
        chai.expect(element.root.contains(child.root));
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
        let defs = element.defs();
        chai.expect(element.root.contains(defs.root));
    });
    it('should create and append a group element', function () {
        let group = element.group();
        chai.expect(element.root.contains(group.root));
    });
    it('should create and append a svg element', function () {
        let child = element.svg(1, 2, 3, 4);
        chai.expect(child.x).to.equal(1);
        chai.expect(child.y).to.equal(2);
        chai.expect(child.width).to.equal(3);
        chai.expect(child.height).to.equal(4);
        chai.expect(element.root.contains(child.root));
    });
    it('should create and append a use element', function () {
        let child = element.use(1, 2, 3, 4);
        chai.expect(child.x).to.equal(1);
        chai.expect(child.y).to.equal(2);
        chai.expect(child.width).to.equal(3);
        chai.expect(child.height).to.equal(4);
        chai.expect(element.root.contains(child.root));
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
        let child = element.text(1, 2, 'hello-world');
        chai.expect(child.x).to.equal(1);
        chai.expect(child.y).to.equal(2);
        chai.expect(child.contents).to.equal('hello-world');
        chai.expect(element.root.contains(child.root));
    });
    it('created text elements should be able to creat tspan elements', function () {
        let child = element.text(1, 2, ''); // TODO: allow default parameter?
        let tspan = child.tspan('child-tspan');
        chai.expect(tspan.text).to.equal('child-tspan');
        chai.expect(element.root.contains(tspan.root));
    });
    it('created tspan elements should be able to creat tspan elements', function () {
        let child = element.text(1, 2, ''); // TODO: allow default parameter?
        let tspan1 = child.tspan('t1');
        let tspan2 = tspan1.tspan('t2');
        chai.expect(tspan2.text).to.equal('t2');
        chai.expect(child.root.contains(tspan1.root));
        chai.expect(child.root.contains(tspan2.root));
        chai.expect(tspan1.root.contains(tspan2.root));
    });
};
export var aTest = function () {
    let element = null;
    beforeEach(function () {
        element = this.element;
    });
    it('should be able to create and append a \'a\' element', function () {
        chai.expect(typeof element.a === "function").to.be.true;
        // let a = element.a('example.com') as A;
        // chai.expect(a.constructor.name === 'A').to.be.true;
    });
};
//# sourceMappingURL=content-model.test.js.map