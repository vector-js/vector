import Element from '../elements/element.js';
import SVG from '../elements/svg.js';
describe('Element', function () {
    describe('constructor', function () {
        it('should create an element with a unique id and add it to the element controller', function () {
            let element0 = new Element(SVG.Group());
            chai.expect(element0.id).to.equal(`element-0`);
            chai.expect(Element.controller.get(element0.id)).to.equal(element0);
            chai.expect(Element.count).to.equal(1);
        });
        it('should create elements with successive identifiers', function () {
            let element1 = new Element(SVG.Group());
            let element2 = new Element(SVG.Group());
            chai.expect(element1.id).to.equal(`element-1`);
            chai.expect(element2.id).to.equal(`element-2`);
            chai.expect(Element.controller.get(element1.id)).to.equal(element1);
            chai.expect(Element.controller.get(element2.id)).to.equal(element2);
        });
        it('should store the root SVG element', function () {
            let root = SVG.Group();
            let element = new Element(root);
            chai.expect(element.root).to.equal(root);
        });
    });
});
//# sourceMappingURL=element.test.js.map