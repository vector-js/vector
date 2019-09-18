import Element from './element.js';
import SVG from '../svg.js';
/**
* A group is a sctructural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor() {
        super(SVG.Group());
    }
}
//# sourceMappingURL=group.js.map