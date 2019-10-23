import Shape from './shape.js';
/**
* A polygon is a closed shape defined by a series of points.
*/
export default class Polygon extends Shape {
    constructor(points) {
        let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttributeNS(null, 'points', points);
        super(polygon);
    }
    get points() {
        return this.root.getAttribute('points');
    }
}
//# sourceMappingURL=polygon.js.map