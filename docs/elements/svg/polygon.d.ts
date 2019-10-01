import Element from '../element.js';
/**
* A polygon is a closed shape defined by a series of points.
*/
export default class Polygon extends Element {
    root: SVGPolygonElement;
    constructor(points: string);
    readonly points: string;
}
