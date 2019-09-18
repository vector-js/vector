import SVG from '../svg.js';
import Rectangle from '../elements/rectangle.js';
import Text from '../elements/text.js';
import Element from '../elements/element.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class Button extends Element {
    /**
    * Constructs a button at the position (x,y)
    */
    constructor(x, y, text) {
        super(SVG.Group());
        /**
        * The state of the checkbox
        */
        this._count = 0;
        this.root.setAttribute('transform', `translate(${x},${y})`);
        this.root.classList.add('button');
        // Create a text element
        this.text = new Text(0, 1, text);
        this.text.root.setAttribute('alignment-baseline', 'middle');
        this.text.root.style.textAnchor = 'middle';
        // TODO: why is this.text.root.textLength returning zero?
        this.box = new Rectangle(0, -16, this.text.length * 2 + 16, 32);
        this.box.root.setAttribute('rx', '2px');
        this.text.x = this.box.x + this.box.width / 2;
        this.root.appendChild(this.box.root);
        this.root.appendChild(this.text.root);
    }
    /**
    * Fires when the user clicks the left button on the button.
    */
    set onclick(handler) {
        this.root.onclick = handler;
    }
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange() {
        this.updateDependents();
    }
}
//# sourceMappingURL=button.js.map