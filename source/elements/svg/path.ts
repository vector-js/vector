import Shape from './shape.js';
import Circle from './circle.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Rectangle from './rectangle.js';

/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Shape {

  // make the type of the root to be more specific
  // TODO: this crazy type conversion is because typescript is complaining that
  // the SVGPathElement does not have the right properties to be considered a
  // SVGGeometryElement, but the specification says that the path elements the
  // geometric shape... so what gives?
  declare root: any|SVGGeometryElement|SVGPathElement;

  /**
  * Construct a new path element with a string of commands.
  */
  constructor( d:string ) {
    // TODO: see comment above the type of the root
    let path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path') as any;
    path.setAttribute('d', d);
    super(path);
  }

  /**
  * Returns the d attribute
  */
  get d():string {
    return this.root.getAttribute('d');
  }

  /**
  * Sets the d attribute
  */
  set d( d:string ) {
    this.root.setAttribute('d', d);
  }

  /**
  * Returns the path representation of the provided shape.
  */
  static getPath( shape:Shape ) : Path {

    throw Error('Not Implemented');

    if ( this instanceof Circle ) {
      throw Error('Not Implemented');
    } else if ( this instanceof Ellipse ) {
      throw Error('Not Implemented');
    } else if ( this instanceof Line ) {
      throw Error('Not Implemented');
    } else if ( this instanceof Path ) {
      throw Error('Not Implemented');
    } else if ( this instanceof Rectangle ) {
      throw Error('Not Implemented');
    }
  }
}
