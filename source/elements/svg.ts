import { Descriptive, Shape, Structural, Typography } from '../content-model.js';
import Element from './element.js';
import Circle from './circle.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Rectangle from './rectangle.js';
import Group from './group.js';
import Text from './text.js';

/**
* This wrapper class provides static methods for creating SVG Elements. Each
* element has a content model
*/
export default class SVG extends Element implements Descriptive, Shape, Structural, Typography {

  // make the type of the root more specific
  root: SVGSVGElement;

  /**
  * Constructs a svg element.
  */
  constructor() {
    super(SVG.SVG());
  }

  /**
  * Return the width of this svg element.
  */
  get width() {
    return this.root.width.baseVal.value;
  }

  /**
  * Set the width of this svg element.
  */
  set width( value:number ) {
    this.root.width.baseVal.value = value;
  }

  /**
  * Returns the height of this svg element.
  */
  get height() {
    return this.root.height.baseVal.value;
  }

  /**
  * Sets the height of this svg element to the provided value.
  */
  set height( value:number ) {
    this.root.height.baseVal.value = value;
  }

  get viewBox() : string {
    return this.root.getAttribute('viewBox');
  }

  set viewBox( value:string ) {
    this.root.setAttribute('viewBox', value);
  }

  setViewBox( x:number, y:number, width:number, height:number ) {
    this.viewBox = `${x} ${y} ${width} ${height}`;
  }

  // descriptive elements

  description(): void {
    throw new Error("Method not implemented.");
  }
  metadata(): void {
    throw new Error("Method not implemented.");
  }
  title(): void {
    throw new Error("Method not implemented.");
  }

  // shape elements

  circle(cx: number, cy: number, r: number): Circle {
    throw new Error("Method not implemented.");
  }
  ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse {
    throw new Error("Method not implemented.");
  }
  line(x1: number, y1: number, x2: number, y2: number): Line {
    throw new Error("Method not implemented.");
  }
  path(d: string): Path {
    throw new Error("Method not implemented.");
  }
  polygon(points: string): void {
    throw new Error("Method not implemented.");
  }
  rectangle(x: number, y: number, width: number, height: number): Rectangle {
    throw new Error("Method not implemented.");
  }

  // structural elements

  defs(): void {
    throw new Error("Method not implemented.");
  }
  group(): Group {
    return this.appendChild(new Group());
  }
  svg(): SVG {
    return this.appendChild(new SVG());
  }
  use(): void {
    throw new Error("Method not implemented.");
  }

  // typography elements

  text(x: number, y: number, str: string): Text {
    return this.appendChild(new Text(x, y, str));
  }

  // static methods

  /**
  * Constructs and returns a SVG element. The default dimensions is 600 by 300
  * units.
  */
  static SVG( width:number = 600, height:number = 300 ) : SVGElement {

    let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
    // svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttributeNS(null, 'width',width.toString());
    svg.setAttributeNS(null, 'height',height.toString());
    return svg;
  }

  /**
  * Returns a SVGTextElement element with the provided attributes.
  */
  static Text( x:number, y:number, str:string ) : SVGTextElement {

    let text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text');
    text.setAttributeNS(null, 'x', x.toString());
    text.setAttributeNS(null, 'y', y.toString());
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

    let rect = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'x', x.toString());
    rect.setAttributeNS(null, 'y', y.toString());
    rect.setAttributeNS(null, 'width', width.toString());
    rect.setAttributeNS(null, 'height', height.toString());
    rect.classList.add('default');
    return rect;
  }

  /**
  * Returns a SVGEllipseElement with the provided attributes.
  */
  static Ellipse(cx:number,cy:number,rx:number,ry:number) : SVGEllipseElement{

    let ell = document.createElementNS( 'http://www.w3.org/2000/svg', 'ellipse');
    ell.setAttributeNS(null, 'cx', cx.toString());
    ell.setAttributeNS(null, 'cy', cy.toString());
    ell.setAttributeNS(null, 'rx', rx.toString());
    ell.setAttributeNS(null, 'ry', ry.toString());
    ell.classList.add('default');
    return ell;
  }

  /**
  * Returns a SVGLineElement element with the provided attributes.
  */
  static Line(x1: number, y1: number, x2: number, y2: number): SVGLineElement {

    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttributeNS(null, 'x1', x1.toString());
    line.setAttributeNS(null, 'y1', y1.toString());
    line.setAttributeNS(null, 'x2', x2.toString());
    line.setAttributeNS(null, 'y2', y2.toString());
    line.classList.add('default');
    return line;
  }

  /**
  * Returns a SVGCircleElement element with the provided attributes.
  */
  static Circle( cx: number, cy: number, radius: number): SVGCircleElement {

    let circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle');
    circle.setAttributeNS(null, 'cx', cx.toString());
    circle.setAttributeNS(null, 'cy', cy.toString());
    circle.setAttributeNS(null, 'r', radius.toString());
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

  /**
  * Constructs a symbol element.
  */
  static Symbol() : SVGSymbolElement {
    return document.createElementNS( 'http://www.w3.org/2000/svg', 'symbol');
  }

  /**
  * Constructs a use element.
  */
  static Use() : SVGUseElement {
    return document.createElementNS( 'http://www.w3.org/2000/svg', 'use');
  }

  /**
  * Parses and returns the SVG documented represented by the string argument.
  */
  static parseSVG( svg:string ) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(svg, 'image/svg+xml');
    return (doc.documentElement as unknown) as SVGElement;
  }
}
