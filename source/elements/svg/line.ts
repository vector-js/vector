import Shape from './shape.js';

/**
* A circle is a basic shape element with a start and end position.
*
* Geometric Properties:
*   - x1
*   - y1
*   - x2
*   - y2
*/
export default class Line extends Shape {

  // make the type of the root to be more specific
  declare root: SVGLineElement;

  /**
  * Constructs a line between the points (x1, y1) and (x2, y2)
  */
  constructor(x1: number, y1: number, x2: number, y2: number) {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttributeNS(null, 'x1', x1.toString());
    line.setAttributeNS(null, 'y1', y1.toString());
    line.setAttributeNS(null, 'x2', x2.toString());
    line.setAttributeNS(null, 'y2', y2.toString());
    super(line);
  }

  /**
  * Returns the x position of the start position
  */
  get x1(): number {
    return this.root.x1.baseVal.value;
  }

  /**
  * Sets the x position of the start position
  */
  set x1(x1: number) {
    this.root.x1.baseVal.value = x1;
  }

  /**
  * Returns the y position of the start position
  */
  get y1(): number {
    return this.root.y1.baseVal.value;
  }

  /**
  * Sets the y position of the start position
  */
  set y1(y1: number) {
    this.root.y1.baseVal.value = y1;
  }

  /**
  * Returns the x position of the end position
  */
  get x2(): number {
    return this.root.x2.baseVal.value;
  }

  /**
  * Sets the x position of the end position
  */
  set x2(x2: number) {
    this.root.x2.baseVal.value = x2;
  }

  /**
  * Returns the y position of the end position
  */
  get y2(): number {
    return this.root.y2.baseVal.value;
  }

  /**
  * Sets the y position of the end position
  */
  set y2(y2: number) {
    this.root.y2.baseVal.value = y2;
  }

  /*
  * Translates the position of the line to a new position from its current
  * position. TODO: this is inconsistent with other translate methods within
  * the elements. Probably best to conform to how SVG implements translate with
  * the transform attribute, and then implement a move method or something.
  */
  translate(x: number, y: number) {
    this.root.x1.baseVal.value += x;
    this.root.y1.baseVal.value += y;
    this.root.x2.baseVal.value += x;
    this.root.y2.baseVal.value += y;
  }

  /**
  * Returns the fill style of this line
  */
  get fill() : string{
   return this.root.style.fill;
  }

  /**
  * Sets the fill style of this line
  */
  set fill(s:string){
   this.root.style.fill = s;
  }

  /**
  * Returns the stroke style of this line
  */
  get stroke() : string{
   return this.root.style.stroke;
  }

  /**
  * Sets the stroke style of this line
  */
  set stroke(s: string){
   this.root.style.stroke = s;
  }
}
