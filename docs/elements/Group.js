import Element from './Element.js';
import SVG from '../SVG.js';
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
        super();
        this.root = SVG.Group();
        this.root.id = this.id;
        this.style = this.root.style;
    }
}
//# sourceMappingURL=Group.js.map