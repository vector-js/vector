import Shape from './shape.js';
/**
* A polygon is a closed shape defined by a series of points.
*/
export default class Polygon extends Shape {
    root: SVGPolygonElement;
    constructor(points: string);
    get points(): string;
}
