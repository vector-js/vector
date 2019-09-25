import Group from './elements/group.js';
import SVG from './svg.js';
import Circle from './elements/circle.js';
export { Descriptive, Shape, Structural };
/**
* Adds functions for creating descriptive elements to the base class.
*/
function Descriptive(Base) {
    return class extends Base {
        /**
        * Creates and appends a description element within this element.
        */
        description() {
            throw new Error('not implemented');
        }
        /**
        * Creates and appends a metadata element within this element.
        */
        metadata() {
            throw new Error('not implemented');
        }
        /**
        * Creates and appends a title element within this element.
        */
        title() {
            throw new Error('not implemented');
        }
    };
}
/**
* Adds functions for creating shape elements to the base class.
*/
function Shape(Base) {
    return class extends Base {
        /**
        * Constructs and appends a circle within this element.
        */
        circle(cx, cy, r) {
            let circle = new Circle(cx, cy, r);
            this.root.appendChild(circle.root);
            return circle;
        }
        ellipse() {
            throw new Error('not implemented');
        }
        line() {
            throw new Error('not implemented');
        }
        path() {
            throw new Error('not implemented');
        }
        polygon() {
            throw new Error('not implemented');
        }
        rectangle() {
            throw new Error('not implemented');
        }
    };
}
/**
* Adds functions for creating structural elements to the base class.
*/
function Structural(Base) {
    return class extends Base {
        defs() {
            throw new Error('not implemented');
        }
        group() {
            let group = new Group();
            this.root.appendChild(group.root);
            return group;
        }
        svg() {
            let svg = new SVG();
            this.root.appendChild(svg.root);
            return svg;
        }
        use() {
            throw new Error('not implemented');
        }
    };
}
//# sourceMappingURL=mixins.js.map