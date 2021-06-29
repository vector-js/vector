import Rectangle from '../svg/rectangle.js';
import Text from '../svg/text.js';
import Input from './input.js';
/**
* A checkbox with an label. The can be checked, unchecked, and related to other
* elements.
*/
export default class CheckBox extends Input {
    /**
    * The state of the checkbox
    */
    _value = false;
    /**
    * The box to be checked and unchecked
    */
    box;
    /**
    * The text label associated with the checkbox
    */
    label;
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y, text, value) {
        super();
        this.root.setAttribute('transform', `translate(${x},${y})`);
        this.box = new Rectangle(-6.5, -6.5, 13, 13);
        this.box.root.setAttribute('rx', '2px');
        this.label = new Text(18, 1, text);
        this.label.root.setAttribute('alignment-baseline', 'middle');
        this.root.appendChild(this.box.root);
        this.root.appendChild(this.label.root);
        let temp = this;
        this.value = value;
        this.box.root.onmousedown = function () {
            temp.toggle();
        };
        this.addDependency(this.box);
    }
    /**
    * Sets the value to true and visually checks the box.
    */
    set value(value) {
        if (this._value = value) {
            this.box.style.fill = '#404040';
        }
        else {
            this.box.style.fill = '';
        }
        this.onchange();
    }
    /**
    * Returns true if the box is checked, false if it is not.
    */
    get value() {
        return this._value;
    }
    /**
    * Converts the current true/false state of the checkbox to a zero or one.
    */
    number() {
        return this.value ? 1 : 0;
    }
    /**
    * Toggles the state of this check box.
    */
    toggle() {
        this.value = !this.value;
    }
}
//# sourceMappingURL=check-box.js.map