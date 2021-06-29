import Shape from './shape.js';

/**
* A polygon is a closed shape defined by a series of points.
*/
export default class Polygon extends Shape {

  declare root: SVGPolygonElement

  constructor( points:string ) {
    let polygon = document.createElementNS( 'http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttributeNS(null, 'points', points);
    super(polygon);
  }

  get points() : string {
    return this.root.getAttribute('points');
  }
}
