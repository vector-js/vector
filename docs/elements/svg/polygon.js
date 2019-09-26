import Element from '../element.js';
/**
* A polygon is a closed shape defined by a series of points.
*/
export default class Polygon extends Element {
    constructor(points) {
        let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        super(polygon);
    }
}
//# sourceMappingURL=polygon.js.map