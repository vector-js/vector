import SVG from './SVG';
import Element from './Element';

export default class Line extends Element {

  root: SVGLineElement;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    super();
    this.root = SVG.Line(x1, y1, x2, y2);
    this.root.id = this.id;
  }

  get fill(): string {
    return this.root.style.fill;
  }

  set fill(fill: string) {
    this.root.style.fill = fill;
  }

  get stroke(): string {
    return this.root.style.stroke;
  }

  set stroke(stroke: string) {
    this.root.style.stroke = stroke;
  }

  get x1(): number {
    return this.root.x1.baseVal.value;
  }

  set x1(x1: number) {
    this.root.x1.baseVal.value = x1;
  }

  get y1(): number {
    return this.root.y1.baseVal.value;
  }

  set y1(y1: number) {
    this.root.y1.baseVal.value = y1;
  }

  get x2(): number {
    return this.root.x2.baseVal.value;
  }

  set x2(x2: number) {
    this.root.x2.baseVal.value = x2;
  }

  get y2(): number {
    return this.root.y2.baseVal.value;
  }

  set y2(y2: number) {
    this.root.y2.baseVal.value = y2;
  }

  translate(x: number, y: number) {
    this.root.x1.baseVal.value += x;
    this.root.y1.baseVal.value += y;
    this.root.x2.baseVal.value += x;
    this.root.y2.baseVal.value += y;
  }

}
