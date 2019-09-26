import Element from '../element.js';
import Circle from './circle.js';
import Path from './path.js';
import Line from './line.js';
import Ellipse from './ellipse.js';
import Use from './use.js';
import SVG from './svg.js';
import Defs from './defs.js';
import Rectangle from './rectangle.js';
import Text from './text.js';
/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor() {
        let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        super(group);
    }
    // Descriptive methods
    symbol() {
        throw new Error("Method not implemented.");
    }
    description() {
        throw new Error("Method not implemented.");
    }
    metadata() {
        throw new Error("Method not implemented.");
    }
    title() {
        throw new Error("Method not implemented.");
    }
    // Structural methods
    defs() {
        return this.appendChild(new Defs());
    }
    group() {
        return this.appendChild(new Group());
    }
    svg() {
        return this.appendChild(new SVG());
    }
    use() {
        return this.appendChild(new Use());
    }
    // Shape methods
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
    polygon() {
        throw new Error("Method not implemented.");
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new Rectangle(x, y, width, height));
    }
    // other methods
    text(x, y, str) {
        return this.appendChild(new Text(x, y, str));
    }
}
//# sourceMappingURL=group.js.map