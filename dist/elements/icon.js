import Element from './element.js';
import SVG from '../svg.js';
export default class Icon extends Element {
    constructor(x, y) {
        super(SVG.Group());
        // TODO: make this a default behavior
        this.root.setAttribute('transform', `translate(${x}, ${y})`);
        this.root.classList.add('icon');
    }
}
//# sourceMappingURL=icon.js.map