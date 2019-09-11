import SVG from '../SVG.js';
import Button from '../elements/Button.js';
import Element from '../elements/Element.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class Stepper extends Element {
    constructor(x1, y1, x2, y2, length) {
        super();
        this.length = length;
        this.counter = 0;
        this.root = SVG.Group();
        this.root.id = this.id;
        this.backButton = new Button(x1, y1, "Previous");
        this.forwardButton = new Button(x2, y2, "Next");
        this.root.appendChild(this.backButton.root);
        this.root.appendChild(this.forwardButton.root);
    }
}
//# sourceMappingURL=Stepper.js.map