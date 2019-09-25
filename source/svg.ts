import { getURL } from './util.js';
import Element from './elements/element.js';

/**
* This wrapper class provides static methods for creating SVG Elements.
*/
export default class SVG extends Element {

  root: SVGSVGElement;

  /**
  * Constructs a svg element.
  */
  constructor() {
    super(SVG.SVG());
  }

  get width() {
    return this.root.width.baseVal.value;
  }

  set width( value:number ) {
    this.root.width.baseVal.value = value;
  }

  get height() {
    return this.root.height.baseVal.value;
  }

  set height( value:number ) {
    this.root.height.baseVal.value = value;
  }

  /**
  * Constructs and returns a SVG element. The default dimensions is 600 by 300
  * units.
  */
  static SVG( width:number = 600, height:number = 300 ) : SVGElement {

    let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('width',width.toString());
    svg.setAttribute('height',height.toString());
    return svg;
  }

  /**
  * Returns a SVGTextElement element with the provided attributes.
  */
  static Text( x:number, y:number, str:string ) : SVGTextElement {

    let text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x.toString());
    text.setAttribute('y', y.toString());
    if( str != undefined ) {
      text.innerHTML = str;
    }
    return text;
  }

  /**
  * Returns a SVGTSpanElement element with the provided attributes.
  */
  static TSpan( str:string ) : SVGTSpanElement {
    let tspan = document.createElementNS( 'http://www.w3.org/2000/svg', 'tspan');
    tspan.innerHTML = str;
    return tspan;
  }

  /**
  * Returns a SVGRectElement with the provided attributes.
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
  * Returns a SVGEllipseElement with the provided attributes.
  */
  static Ellipse(cx:number,cy:number,rx:number,ry:number) : SVGEllipseElement{

    let ell = document.createElementNS( 'http://www.w3.org/2000/svg', 'ellipse');
    ell.setAttribute('cx', cx.toString());
    ell.setAttribute('cy', cy.toString());
    ell.setAttribute('rx', rx.toString());
    ell.setAttribute('ry', ry.toString());
    ell.classList.add('default');
    return ell;
  }

  /**
  * Returns a SVGLineElement element with the provided attributes.
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
  * Returns a SVGCircleElement element with the provided attributes.
  */
  static Circle( cx: number, cy: number, radius: number): SVGCircleElement {

    let circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle');
    circle.cx.baseVal.value = cx;
    circle.cy.baseVal.value = cy;
    circle.r.baseVal.value = radius;
    return circle;
  }

  /**
  * Constructs a group element with the provided attributes.
  */
  static Group(): SVGGElement {

    let group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g');
    return group;
  }

  /**
  * Constructs a path element with the provided attributes.
  */
  static Path( d:string ) : SVGPathElement {

    let path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    return path;
  }

  /**
  * Constructs and returns a clip path element.
  */
  static ClipPath() : SVGClipPathElement {
    let clipPath = document.createElementNS( 'http://www.w3.org/2000/svg', 'clipPath');
    return clipPath;
  }

  /**
  * Constructs a defs element.
  */
  static Defs() : SVGDefsElement {
    let defs = document.createElementNS( 'http://www.w3.org/2000/svg', 'defs');
    return defs;
  }

  static Symbol() : SVGSymbolElement {
    return document.createElementNS( 'http://www.w3.org/2000/svg', 'symbol');
  }

  static Use() : SVGUseElement {
    return document.createElementNS( 'http://www.w3.org/2000/svg', 'use');
  }


  /**
  * Parses and returns the SVG documented represented by the string argument..
  */
  static parseSVG( svg:string ) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(svg, 'image/svg+xml');
    return (doc.documentElement as unknown) as SVGElement;
  }

  /**
  * Returns a promise containing the svg at the provided url.
  */
  static async getSVG( url:string ) : Promise<SVGElement> {
    let svg = await getURL(url);
    return SVG.parseSVG(svg);
  }
}
