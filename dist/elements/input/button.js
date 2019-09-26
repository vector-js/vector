import Text from '../svg/text.js';
import Input from './input.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class Button extends Input {
    /**
    * Constructs a button at the position (x,y)
    */
    constructor(x, y, str) {
        super();
        /**
        * The state of the checkbox
        */
        this._count = 0;
        this.root.setAttribute('transform', `translate(${x},${y})`);
        this.root.classList.add('button');
        // Create a text element
        this.label = new Text(0, 1, str);
        this.label.root.setAttribute('alignment-baseline', 'middle');
        this.label.root.style.textAnchor = 'middle';
        // TODO: why is this.text.root.textLength returning zero?
        this.box = this.rectangle(0, -16, this.label.length * 2 + 16, 32);
        this.box.root.setAttribute('rx', '2px');
        this.label.x = this.box.x + this.box.width / 2;
        this.appendChild(this.label);
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