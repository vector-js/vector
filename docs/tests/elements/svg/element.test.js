import Element from '../../../elements/svg/element.js';
describe('Element', function () {
    describe('constructor', function () {
        it('should create an element with a unique id and add it to the element controller', function () {
            let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            let element0 = new Element(group);
            // chai.expect(element0.id).to.equal(`element-0`);
            chai.expect(Element.controller.get(element0.id)).to.equal(element0);
            chai.expect(Element.count).to.equal(1);
        });
        it('should create elements with successive identifiers', function () {
            let group1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            let group2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            let element1 = new Element(group1);
            let element2 = new Element(group2);
            // chai.expect(element1.id).to.equal(`element-1`);
            // chai.expect(element2.id).to.equal(`element-2`);
            chai.expect(Element.controller.get(element1.id)).to.equal(element1);
            chai.expect(Element.controller.get(element2.id)).to.equal(element2);
        });
        it('should store the root SVG element', function () {
            let root = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            let element = new Element(root);
            chai.expect(element.root).to.equal(root);
        });
    });
});
//# sourceMappingURL=element.test.js.map