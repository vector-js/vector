import Element from './element.js';
import SVG from '../svg.js';
import { Shape, Structural, Descriptive } from '../mixins.js';
/**
* A group is a sctructural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
class Group extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor() {
        super(SVG.Group());
    }
}
export default class extends Descriptive(Shape(Structural(Group))) {
}
//# sourceMappingURL=group.js.map