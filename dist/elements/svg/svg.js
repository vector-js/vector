import Element from './element.js';
import Circle from './circle.js';
import ClipPath from './clip-path.js';
import Defs from './definitions.js';
import Description from './description.js';
import Ellipse from './ellipse.js';
import Group from './group.js';
import Line from './line.js';
import Marker from './marker.js';
import MetaData from './meta-data.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';
import Symbol from './symbol.js';
import Text from './text.js';
import Title from './title.js';
import Use from './use.js';
import A from './a.js';
import Script from './script.js';
/**
* This class represents a SVG element. There are four geometric properties x, y,
* width, and height. The (x,y) properties only affect nested SVG elements.
*/
export default class SVG extends Element {
    /**
    * Constructs a svg element.
    */
    constructor(x, y, width, height) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        if (x) {
            svg.setAttributeNS(null, 'x', x.toString());
        }
        if (y) {
            svg.setAttributeNS(null, 'y', y.toString());
        }
        if (width) {
            svg.setAttributeNS(null, 'width', width.toString());
        }
        if (height) {
            svg.setAttributeNS(null, 'height', height.toString());
        }
        super(svg);
    }
    /**
    * Constructs and returns a SVG object within the DOM.  If the provided
    * argument is an HTMLElement appends the interactive within that element. If
    * the provided a value is a string, appends the interactive within the HTML
    * element with the corresponding ID. If no element is found throws an error.
    */
    static SVG(idOrElement, x, y, width, height) {
        // get the container element
        let container;
        if (typeof idOrElement == "string") {
            container = document.getElementById(idOrElement);
            if (container === null || container === undefined) {
                throw new Error(`There is no HTML element with the id: ${idOrElement}`);
            }
        }
        else {
            container = idOrElement;
        }
        // construct and append the svg
        let svg = new SVG(x, y, width, height);
        container.appendChild(svg.root);
        return svg;
    }
    /**
    * Return the width of this svg element.
    */
    get width() {
        // return this.root.width.baseVal.value;
        return parseInt(this.root.getAttribute('width'));
    }
    /**
    * Set the width of this svg element.
    */
    set width(value) {
        // this.root.width.baseVal.value = value;
        this.root.setAttributeNS(null, 'width', value.toString());
    }
    /**
    * Returns the height of this svg element.
    */
    get height() {
        // return this.root.height.baseVal.value;
        return parseInt(this.root.getAttribute('height'));
    }
    /**
    * Sets the height of this svg element to the provided value.
    */
    set height(value) {
        // this.root.height.baseVal.value = value;
        this.root.setAttributeNS(null, 'height', value.toString());
    }
    get x() {
        return this.root.x.baseVal.value;
    }
    set x(value) {
        this.root.x.baseVal.value = value;
    }
    get y() {
        return this.root.y.baseVal.value;
    }
    set y(value) {
        this.root.y.baseVal.value = value;
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
    // comment inherited from base class
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
        return this;
    }
    // comment inherited from base class
    getAttribute(name) {
        return this.root.getAttribute(name);
    }
    // descriptive elements
    description() {
        return this.appendChild(new Description());
    }
    metadata() {
        return this.appendChild(new MetaData());
    }
    title() {
        return this.appendChild(new Title());
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
    // typography elements
    text(x, y, str) {
        return this.appendChild(new Text(x, y, str));
    }
    // other elements
    /**
    * Constructs and appends an 'a' (link) element within this element.
    */
    a(href) {
        return this.appendChild(new A(href));
    }
    /**
    * Constructs and appends a 'clipPath' element within this element.
    */
    clipPath() {
        return this.appendChild(new ClipPath());
    }
    /**
    * Constructs and appends a 'marker' element within this element.
    */
    marker(refX, refY, width, height) {
        return this.appendChild(new Marker(refX, refY, width, height));
    }
    /**
    * Constructs and appends a 'script' element within this element.
    */
    script() {
        return this.appendChild(new Script());
    }
}
//# sourceMappingURL=svg.js.map