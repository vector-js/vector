import Element from '../element.js';
import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Ellipse from './ellipse.js';
import Group from './group.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import Text from './text.js';
import Use from './use.js';
/**
* This class represents a svg element.
*/
export default class SVG extends Element {
    /**
    * Constructs a svg element.
    */
    constructor(width, height) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        if (width) {
            svg.setAttributeNS(null, 'width', width.toString());
        }
        if (height) {
            svg.setAttributeNS(null, 'height', height.toString());
        }
        super(svg);
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
    set width(value) {
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
    set height(value) {
        this.root.height.baseVal.value = value;
    }
    get viewBox() {
        return this.root.getAttribute('viewBox');
    }
    set viewBox(value) {
        this.root.setAttribute('viewBox', value);
    }
    setViewBox(x, y, width, height) {
        this.viewBox = `${x} ${y} ${width} ${height}`;
    }
    // descriptive elements
    description() {
        throw new Error("Method not implemented.");
    }
    metadata() {
        throw new Error("Method not implemented.");
    }
    title() {
        throw new Error("Method not implemented.");
    }
    // shape elements
    circle(cx, cy, r) {
        return this.appendChild(new Circle(cx, cy, r));
    }
    ellipse(cx, cy, rx, ry) {
        return this.appendChild(new Ellipse(cx, cy, rx, ry));
    }
    line(x1, y1, x2, y2) {
        return this.appendChild(new Line(x1, y1, x2, y2));
    }
    path(d) {
        return this.appendChild(new Path(d));
    }
    polygon(points) {
        return this.appendChild(new Polygon(points));
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new Rectangle(x, y, width, height));
    }
    // structural elements
    defs() {
        throw new Error("Method not implemented.");
    }
    group() {
        return this.appendChild(new Group());
    }
    svg() {
        return this.appendChild(new SVG());
    }
    symbol() {
        return this.appendChild(new Symbol());
    }
    use() {
        return this.appendChild(new Use());
    }
    // typography elements
    text(x, y, str) {
        return this.appendChild(new Text(x, y, str));
    }
    // other elements
    clipPath() {
        return this.appendChild(new ClipPath());
    }
}
//# sourceMappingURL=svg.js.map