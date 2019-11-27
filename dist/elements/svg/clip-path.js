import Circle from './circle.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Element from './element.js';
import Description from './description.js';
import MetaData from './meta-data.js';
import Title from './title.js';
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
        return this.appendChild(new Rectangle(x, y, width, height));
    }
    description() {
        return this.appendChild(new Description());
    }
    metadata() {
        return this.appendChild(new MetaData());
    }
    title() {
        return this.appendChild(new Title());
    }
}
//# sourceMappingURL=clip-path.js.map