import Polygon from '../../../elements/svg/polygon.js';
import Element from '../../../elements/svg/element.js';
describe('Polygon', function () {
    describe('constructor', function () {
        it('should create a polygon with a unique id and add it to the element controller', function () {
            let polygon = new Polygon("100, 50 200, 60 300, 70");
            chai.expect(Element.controller.get(polygon.id)).to.equal(polygon);
        });
        it('should create elements with different identifiers', function () {
            let polygon1 = new Polygon("100, 50 200, 60 300, 70");
            let polygon2 = new Polygon("100, 50 200, 60 300, 70");
            chai.expect(Element.controller.get(polygon1.id)).to.equal(polygon1);
            chai.expect(Element.controller.get(polygon2.id)).to.equal(polygon2);
        });
    });
    describe('points properly set up', function () {
        it('should work with an empty string', function () {
            let pointString = "";
            let polygon = new Polygon(pointString);
            let points = polygon.points;
            chai.expect(points).to.equal(pointString);
        });
        it('should return correct points', function () {
            let pointString = "100, 50 200, 60 300, 70";
            let polygon = new Polygon(pointString);
            let points = polygon.points;
            chai.expect(points).to.equal(pointString);
        });
        it('should still contain duplicate points', function () {
            let pointString = "100, 50 100, 50 300, 70";
            let polygon = new Polygon(pointString);
            let points = polygon.points;
            chai.expect(points).to.equal(pointString);
        });
        it('should not be equal to a different order of points', function () {
            let pointString = "100, 50 200, 60 300, 70";
            let pointString2 = "200, 60 100, 50 300, 70";
            let polygon = new Polygon(pointString);
            let points = polygon.points;
            chai.expect(points).to.not.equal(pointString2);
        });
    });
});
//# sourceMappingURL=polygon.test.js.map