import Circle from './circle.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Element from '../element.js';
export default class ClipPath extends Element {
    constructor() {
        let clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        super(clipPath);
    }
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
}
//# sourceMappingURL=clip-path.js.map