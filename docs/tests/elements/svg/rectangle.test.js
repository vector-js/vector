import Rectangle from '../../../elements/svg/rectangle.js';
import Element from '../../../elements/svg/element.js';
describe('Rectangle', function () {
    describe('constructor', function () {
        it('should create a rectangle with a unique id and add it to the element controller', function () {
            let rect = new Rectangle(100, 101, 100, 200);
            chai.expect(Element.controller.get(rect.id)).to.equal(rect);
        });
        it('should create elements with successive identifiers', function () {
            let rect1 = new Rectangle(100, 101, 100, 200);
            let rect2 = new Rectangle(100, 101, 100, 200);
            chai.expect(Element.controller.get(rect1.id)).to.equal(rect1);
            chai.expect(Element.controller.get(rect2.id)).to.equal(rect2);
        });
    });
    describe('getters/setters', function () {
        it('should get width', function () {
            let w = 100;
            let rect = new Rectangle(100, 100, w, 200);
            chai.expect(rect.width).to.equal(100);
        });
        it('should set, then get new width', function () {
            let w = 100;
            let rect = new Rectangle(100, 100, w, 200);
            rect.width = 200;
            chai.expect(rect.width).to.equal(200);
        });
        it('should get height', function () {
            let h = 100;
            let rect = new Rectangle(100, 100, 100, h);
            chai.expect(rect.width).to.equal(100);
        });
        it('should set, then get new height', function () {
            let h = 100;
            let rect = new Rectangle(100, 100, 100, h);
            rect.height = 200;
            chai.expect(rect.height).to.equal(200);
        });
        it('should get x', function () {
            let x = 75;
            let rect = new Rectangle(x, 100, 100, 100);
            chai.expect(rect.x).to.equal(75);
        });
        it('should set, then get new x', function () {
            let x = 75;
            let rect = new Rectangle(x, 100, 100, 100);
            rect.x = 85;
            chai.expect(rect.x).to.equal(85);
        });
        it('should get y', function () {
            let y = 75;
            let rect = new Rectangle(100, y, 100, 100);
            chai.expect(rect.y).to.equal(75);
        });
        it('should set, then get new y', function () {
            let y = 75;
            let rect = new Rectangle(100, y, 100, 100);
            rect.y = 85;
            chai.expect(rect.y).to.equal(85);
        });
        it('should get default fill', function () {
            let rect = new Rectangle(100, 100, 100, 100);
            chai.expect(rect.fill).to.equal('');
        });
        it('should set, then get new fill', function () {
            let fill = 'red';
            let rect = new Rectangle(100, 100, 100, 100);
            rect.fill = fill;
            chai.expect(rect.fill).to.equal('red');
        });
        it('should get default stroke', function () {
            let rect = new Rectangle(100, 100, 100, 100);
            chai.expect(rect.stroke).to.equal('');
        });
        it('should set, then get new stroke', function () {
            let stroke = 'blue';
            let rect = new Rectangle(100, 100, 100, 100);
            rect.stroke = stroke;
            chai.expect(rect.stroke).to.equal('blue');
        });
    });
    describe('translate', function () {
        it('should create a rectangle and move it over 10, 10', function () {
            let rect = new Rectangle(100, 100, 100, 100);
            rect.translate(10, 10);
            chai.expect(rect.x).to.equal(110);
            chai.expect(rect.y).to.equal(110);
        });
        it('should create a rectangle and translate by 0, maintaining the same position', function () {
            let rect = new Rectangle(100, 100, 100, 100);
            rect.translate(0, 0);
            chai.expect(rect.x).to.equal(100);
            chai.expect(rect.y).to.equal(100);
        });
        it('should create a rectangle, move it over 10, then manually move the x', function () {
            let rect = new Rectangle(100, 100, 100, 100);
            rect.translate(10, 10);
            chai.expect(rect.x).to.equal(110);
            chai.expect(rect.y).to.equal(110);
            rect.x = 90;
            chai.expect(rect.x).to.equal(90);
            chai.expect(rect.y).to.equal(110);
        });
        it('should create a rectangle, translate it, manually move the x and y, then translate again', function () {
            let rect = new Rectangle(100, 100, 100, 100);
            rect.translate(10, 10);
            chai.expect(rect.x).to.equal(110);
            chai.expect(rect.y).to.equal(110);
            rect.x = 90;
            rect.y = 80;
            chai.expect(rect.x).to.equal(90);
            chai.expect(rect.y).to.equal(80);
            rect.translate(-100, -100);
            chai.expect(rect.x).to.equal(-10);
            chai.expect(rect.y).to.equal(-20);
        });
    });
});
//# sourceMappingURL=rectangle.test.js.map