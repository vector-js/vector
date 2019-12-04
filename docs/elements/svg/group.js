import Element from './element.js';
import A from './a.js';
import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Defs from './definitions.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import SVG from './svg.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';
import Description from './description.js';
import MetaData from './meta-data.js';
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
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    // Descriptive methods
    description() {
        return this.appendChild(new Description());
    }
    metadata() {
        return this.appendChild(new MetaData());
    }
    title() {
        return this.appendChild(new Title());
    }
    // Structural methods
    defs() {
        return this.appendChild(new Defs());
    }
    group() {
        return this.appendChild(new Group());
    }
    svg(x, y, width, height) {
        return this.appendChild(new SVG(x, y, width, height));
    }
    symbol() {
        return this.appendChild(new Symbol());
    }
    use(x, y, width, height) {
        return this.appendChild(new Use(x, y, width, height));
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
    polygon(points) {
        return this.appendChild(new Polygon(points));
    }
    rectangle(x, y, width, height) {
        return this.appendChild(new Rectangle(x, y, width, height));
    }
    // other methods
    /**
    * Constructs and appends a text element within this element.
    */
    text(x, y, str) {
        return this.appendChild(new Text(x, y, str));
    }
    /**
    * Constructs and appends an 'a' (link) within this element.
    */
    a(href) {
        return this.appendChild(new A(href));
    }
    /**
    * Constructs and appends a clipPath within this element
    */
    clipPath() {
        return this.appendChild(new ClipPath());
    }
}
//# sourceMappingURL=group.js.map