import Element from './element.js';
import Circle from './circle.js';
import SVG from './svg.js';
/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element {
    description() {
        throw new Error("Method not implemented.");
    }
    metadata() {
        throw new Error("Method not implemented.");
    }
    title() {
        throw new Error("Method not implemented.");
    }
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor() {
        super(SVG.Group());
    }
    // Structural methods
    defs() {
        throw new Error("Method not implemented.");
    }
    group() {
        return this.appendChild(new Group());
    }
    svg() {
        return this.appendChild(new SVG());
    }
    use() {
        throw new Error("Method not implemented.");
    }
    // Shape methods
    circle(cx, cy, r) {
        return this.appendChild(new Circle(cx, cy, r));
    }
    ellipse() {
        throw new Error("Method not implemented.");
    }
    line() {
        throw new Error("Method not implemented.");
    }
    path() {
        throw new Error("Method not implemented.");
    }
    polygon() {
        throw new Error("Method not implemented.");
    }
    rectangle() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=group.js.map