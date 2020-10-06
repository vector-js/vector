import Shape from './shape'
import Element from './element'
import Circle from './circle'
import Ellipse from './ellipse'
import Line from './line'
import Rectangle from './rectangle'
import Group from './group'
import SVG from './svg'
import Definitions from './definitions'

/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Shape {

  // make the type of the root to be more specific
  // TODO: this crazy type conversion is because typescript is complaining that
  // the SVGPathElement does not have the right properties to be considered a
  // SVGGeometryElement, but the specification says that the path elements the
  // geometric shape... so what gives?
  root: any|SVGGeometryElement|SVGPathElement;

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

  attatchArrow( defs:Definitions, start:boolean = true ) {

    if ( defs === undefined ) {
      throw new Error(`Undefined definitions ${this}: ${this.id}`);
    }

    defs.root.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#404040; stroke:none;"></path></marker>`;

    if( start ) {
      this.setAttribute('marker-start', `url(#arrow)`);
    } else {
      this.setAttribute('marker-end', `url(#arrow)`);
    }
  }

  /**
  * Returns the path representation of the provided shape.
  */
  static getPath( shape:Shape ) : Path {

    if ( shape instanceof Circle ) {
      return new Path(`M ${shape.cx + shape.r} ${shape.cy} A ${shape.r} ${shape.r} 0 0 0 ${shape.cx - shape.r} ${shape.cy} A ${shape.r} ${shape.r} 0 0 0 ${shape.cx + shape.r} ${shape.cy}`);
    } else if ( shape instanceof Ellipse ) {
      throw Error('Not Implemented');
    } else if ( shape instanceof Line ) {
      throw Error('Not Implemented');
    } else if ( shape instanceof Path ) {
      throw Error('Not Implemented');
    } else if ( shape instanceof Rectangle ) {
      throw Error('Not Implemented');
    } else {
      throw Error('Not Implemented');
    }
  }
}
