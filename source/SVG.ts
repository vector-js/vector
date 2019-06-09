/**
* This wrapper class provides static methods for creating SVG Elements. As it is
* elements are creating and appending into the current SVG document.
*/
export default class SVG {

  /**
  * Constructs a
  */
  static SVG( id:string, width:number = 600, height:number = 300 ) : SVGElement {

    // create the svg element
    let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('width',width.toString());
    svg.setAttribute('height',height.toString());
    return svg;
  }

  /**
  * Constructs a text element at the position (x,y) with the provided string.
  */
  static Text( x:number, y:number, str:string ) : SVGTextElement {

    // create the text element
    let text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x.toString());
    text.setAttribute('y', y.toString());
    text.innerHTML = str;
    return text;
  }

  /**
  * Constructs a rectangle with the provided attributes.
  */
  static Rectangle( x:number, y:number, width:number, height:number ) : SVGRectElement {

    // constructs and initializes the rectangle
    let rect = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x.toString());
    rect.setAttribute('y', y.toString());
    rect.setAttribute('width', width.toString());
    rect.setAttribute('height', height.toString());
    rect.classList.add('default');
    return rect;
  }

  /**
  * Constructs an ellipse with the provided attributes.
  */
  static Ellipse(cx:number,cy:number,rx:number,ry:number) : SVGEllipseElement{

    // constructs and initializes the ellipse
    let ell = document.createElementNS( 'http://www.w3.org/2000/svg', 'ellipse');
    ell.setAttribute('cx', cx.toString());
    ell.setAttribute('cy', cy.toString());
    ell.setAttribute('rx', rx.toString());
    ell.setAttribute('ry', ry.toString());
    ell.classList.add('default');
    return ell;
  }

  /**
  * Constructs a line element with the provided attributes.
  */
  static Line(x1: number, y1: number, x2: number, y2: number): SVGLineElement {

    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.classList.add('default');
    return line;
  }

  /**
  * Constructs a circle element with the provided attributes.
  */
  static Circle( cx: number, cy: number, radius: number, classes:string[] = ['default']): SVGCircleElement {

    let circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle');
    circle.cx.baseVal.value = cx;
    circle.cy.baseVal.value = cy;
    circle.r.baseVal.value = radius;
    circle.classList.add( ... classes );
    return circle;
  }

  /**
  * Constructs a group element with the provided attributes.
  */
  static Group( classes:string[] = [] ): SVGGElement {

    // create element and assign unique id
    let group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g');
    group.classList.add( ... classes );
    return group;
  }

  /**
  * Constructs a path element with the provided attributes.
  */
  static Path( d:string, classes:string[] = ['default']) : SVGPathElement {

    // create element and assign unique id
    let path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.classList.add( ... classes );
    return path;
  }

}
