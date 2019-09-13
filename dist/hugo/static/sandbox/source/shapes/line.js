import SVG from './svg';
import Element from './element';
export default class Line extends Element {
    constructor(x1, y1, x2, y2) {
        super();
        this.root = SVG.Line(x1, y1, x2, y2);
    }
    get fill() {
        return this.root.style.fill;
    }
    set fill(fill) {
        this.root.style.fill = fill;
    }
    get stroke() {
        return this.root.style.stroke;
    }
    set stroke(stroke) {
        this.root.style.stroke = stroke;
    }
    get x1() {
        return this.root.x1.baseVal.value;
    }
    set x1(x1) {
        this.root.x1.baseVal.value = x1;
    }
    get y1() {
        return this.root.y1.baseVal.value;
    }
    set y1(y1) {
        this.root.y1.baseVal.value = y1;
    }
    get x2() {
        return this.root.x2.baseVal.value;
    }
    set x2(x2) {
        this.root.x2.baseVal.value = x2;
    }
    get y2() {
        return this.root.y2.baseVal.value;
    }
    set y2(y2) {
        this.root.y2.baseVal.value = y2;
    }
    translate(x, y) {
        this.root.x1.baseVal.value += x;
        this.root.y1.baseVal.value += y;
        this.root.x2.baseVal.value += x;
        this.root.y2.baseVal.value += y;
    }
}
//# sourceMappingURL=line.js.map