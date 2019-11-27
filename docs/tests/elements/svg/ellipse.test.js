import Ellipse from '../../../elements/svg/ellipse.js';
import Element from '../../../elements/svg/element.js';
describe('Ellipse', function () {
    describe('constructor', function () {
        it('should create a ellipse with a unique id and add it to the element controller', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            // chai.expect(ellipse.id).to.equal(`ellipse-0`);
            chai.expect(Element.controller.get(ellipse.id)).to.equal(ellipse);
            // chai.expect(Element.count).to.equal(1);
        });
        it('should create elements with different identifiers', function () {
            let ellipse1 = new Ellipse(100, 100, 100, 100);
            let ellipse2 = new Ellipse(100, 100, 100, 100);
            chai.expect(Element.controller.get(ellipse1.id)).to.equal(ellipse1);
            chai.expect(Element.controller.get(ellipse2.id)).to.equal(ellipse2);
        });
    });
    describe('getters/setters', function () {
        it('should get x radius', function () {
            let radius = 100;
            let ellipse = new Ellipse(100, 100, radius, 100);
            chai.expect(ellipse.rx).to.equal(100);
        });
        it('should set, then get new x radius', function () {
            let radius = 100;
            let ellipse = new Ellipse(100, 100, radius, 100);
            ellipse.rx = 200;
            chai.expect(ellipse.rx).to.equal(200);
        });
        it('should get y radius', function () {
            let radius = 50;
            let ellipse = new Ellipse(100, 100, 100, radius);
            chai.expect(ellipse.ry).to.equal(50);
        });
        it('should set, then get new y radius', function () {
            let radius = 50;
            let ellipse = new Ellipse(100, 100, 100, radius);
            ellipse.ry = 200;
            chai.expect(ellipse.ry).to.equal(200);
        });
        it('should get x and y radius', function () {
            let xRadius = 50;
            let yRadius = 75;
            let ellipse = new Ellipse(100, 100, xRadius, yRadius);
            chai.expect(ellipse.ry).to.equal(75);
            chai.expect(ellipse.rx).to.equal(50);
        });
        it('should set, then get x and y radius', function () {
            let xRadius = 50;
            let yRadius = 75;
            let ellipse = new Ellipse(100, 100, xRadius, yRadius);
            ellipse.ry = 200;
            ellipse.rx = 250;
            chai.expect(ellipse.ry).to.equal(200);
            chai.expect(ellipse.rx).to.equal(250);
        });
        it('should get cx', function () {
            let cx = 75;
            let ellipse = new Ellipse(cx, 100, 100, 100);
            chai.expect(ellipse.cx).to.equal(cx);
        });
        it('should set, then get new cx', function () {
            let cx = 75;
            let ellipse = new Ellipse(cx, 100, 100, 100);
            ellipse.cx = 175;
            chai.expect(ellipse.cx).to.equal(175);
        });
        it('should get cy', function () {
            let cy = 50;
            let ellipse = new Ellipse(100, cy, 100, 100);
            chai.expect(ellipse.cy).to.equal(cy);
        });
        it('should set, then get new cy', function () {
            let cy = 50;
            let ellipse = new Ellipse(100, cy, 100, 100);
            ellipse.cy = 150;
            chai.expect(ellipse.cy).to.equal(150);
        });
        it('should get default fill', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            chai.expect(ellipse.fill).to.equal('');
        });
        it('should set, then get new fill', function () {
            let fill = 'red';
            let ellipse = new Ellipse(100, 100, 100, 100);
            ellipse.fill = fill;
            chai.expect(ellipse.fill).to.equal('red');
        });
        it('should get default stroke', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            chai.expect(ellipse.stroke).to.equal('');
        });
        it('should set, then get new stroke', function () {
            let stroke = 'blue';
            let ellipse = new Ellipse(100, 100, 100, 100);
            ellipse.stroke = stroke;
            chai.expect(ellipse.stroke).to.equal('blue');
        });
    });
    describe('translate', function () {
        it('should create a ellipse and move it over 10, 10', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            ellipse.translate(10, 10);
            chai.expect(ellipse.cx).to.equal(110);
            chai.expect(ellipse.cy).to.equal(110);
        });
        it('should create a ellipse and translate by 0, maintaining the same position', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            ellipse.translate(0, 0);
            chai.expect(ellipse.cx).to.equal(100);
            chai.expect(ellipse.cy).to.equal(100);
        });
        it('should create a ellipse, move it over 10, then manually move the x', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            ellipse.translate(10, 10);
            chai.expect(ellipse.cx).to.equal(110);
            chai.expect(ellipse.cy).to.equal(110);
            ellipse.cx = 90;
            chai.expect(ellipse.cx).to.equal(90);
            chai.expect(ellipse.cy).to.equal(110);
        });
        it('should create a ellipse, translate it, manually move the x and y, then translate again', function () {
            let ellipse = new Ellipse(100, 100, 100, 100);
            ellipse.translate(10, 10);
            chai.expect(ellipse.cx).to.equal(110);
            chai.expect(ellipse.cy).to.equal(110);
            ellipse.cx = 90;
            ellipse.cy = 80;
            chai.expect(ellipse.cx).to.equal(90);
            chai.expect(ellipse.cy).to.equal(80);
            ellipse.translate(-100, -100);
            chai.expect(ellipse.cx).to.equal(-10);
            chai.expect(ellipse.cy).to.equal(-20);
        });
    });
});
//# sourceMappingURL=ellipse.test.js.map