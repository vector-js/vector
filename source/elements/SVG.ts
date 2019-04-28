export default class SVG {

  // Store a number for generating unique ids
  static count : number  = 0;

  // Namespace for creating svg elements
  private static namespace : string = 'http://www.w3.org/2000/svg';

  // The root element where all svg elements will be created
  // TODO: this should probably be changed in the long term
  private static svg : SVGElement;

  static strokeHex: string = '#000000';
  static fillHex: string = '#aeaeae';


  get strokeHex() : string
  {
    return SVG.strokeHex;
  }
  set strokeHex(s: string){
    SVG.strokeHex = s;
  }
  get fillHex() : string
  {
    return SVG.fillHex;
  }
  set fillHex(s: string){
    SVG.fillHex = s;
  }

  static SVG( id:string, width:number = 600, height:number = 300 ) : SVGElement {

    let root = document.getElementById(id);
    if( root == null ) {
      throw new Error(`There is no HTMLElement with the identifier ${id}`);
    }

    let svg = document.createElementNS( this.namespace, 'svg') as SVGElement;
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('width',width.toString());
    svg.setAttribute('height',height.toString());
    root.appendChild(svg);
    SVG.svg = svg;
    return SVG.svg;
  }

  static Text( x:number, y:number, str:string ) : SVGTextElement {
    let text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x.toString());
    text.setAttribute('y', y.toString());
    text.innerHTML = str;

    SVG.svg.appendChild(text);
    return text;
  }

  /**
  * Constructs a rectangle with the provided attributes.
  */
  static Rectangle( x:number, y:number, width:number, height:number ) : SVGRectElement {
    let rect = document.createElementNS( this.namespace, 'rect') as SVGRectElement;
    rect.setAttribute('customCount', this.count.toString());
    this.count++;
    rect.setAttribute('x', x.toString());
    rect.setAttribute('y', y.toString());
    rect.setAttribute('width', width.toString());
    rect.setAttribute('height', height.toString());
    rect.classList.add('default');

    SVG.svg.appendChild(rect);
    return rect;
  }
  static clearCounter()
  {
    SVG.count = 0;
  }

  static Ellipse(cx:number,cy:number,rx:number,ry:number) : SVGEllipseElement{
    let ell = document.createElementNS( this.namespace, 'ellipse') as SVGEllipseElement;
    ell.setAttribute('customCount', this.count.toString());
    this.count++;
    ell.setAttribute('cx', cx.toString());
    ell.setAttribute('cy', cy.toString());
    ell.setAttribute('rx', rx.toString());
    ell.setAttribute('ry', ry.toString());
    ell.classList.add('default');

    SVG.svg.appendChild(ell);
    return ell;
  }

  static Line(x1: number, y1: number, x2: number, y2: number): SVGLineElement {

    let line = document.createElementNS(SVG.namespace, 'line') as SVGLineElement;

    // line.style.fill = SVG.fillHex;
    // line.style.stroke = SVG.strokeHex;
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.classList.add('default');

    SVG.svg.appendChild(line);
    return line;
  }

  /**
  *
  */
  static Circle( cx: number, cy: number, radius: number, classes:string[] = ['default']): SVGCircleElement {

    // create element and assign unique id
    let circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle');
    this.count++;

    // initialize attribute values
    circle.cx.baseVal.value = cx;
    circle.cy.baseVal.value = cy;
    circle.r.baseVal.value = radius;
    circle.classList.add( ... classes );

    // add into root svg element
    SVG.svg.appendChild(circle);
    return circle;
  }

  static Group( classes:string[] = ['default'] ): SVGGElement {

    // create element and assign unique id
    let group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g');
    group.classList.add( ... classes );

    // add into root svg element
    SVG.svg.appendChild(group);
    return group;
  }

  static Path( d:string, classes:string[] = ['default']) : SVGPathElement {

    // create element and assign unique id
    let path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.classList.add( ... classes );

    // add into root svg element
    SVG.svg.appendChild(path);
    return path;
  }

}
