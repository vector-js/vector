import Text from '../svg/text.js';
import Input from './input.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class Button extends Input {
    /**
    * The state of the checkbox
    */
    _count = 0;
    /**
    * True if the button is active
    */
    _active;
    // position of the button
    _x;
    _y;
    /**
    * The box that represents the area where the user clicks
    */
    box;
    /**
    * The text label associated with the button
    */
    label;
    /**
    * Constructs a button at the position (x,y)
    */
    constructor(x, y, str) {
        super();
        this._x = x;
        this._y = y;
        this._active = false;
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
        let temp = this;
        this.root.onmousedown = () => {
            temp.active = !this.active;
        };
        this.root.onmouseup = () => {
            temp.active = !this.active;
        };
    }
    /**
    * Returns the top left x position of this button.
    */
    get x() {
        return this._x;
    }
    /**
    * Sets the top left x position of this button.
    */
    set x(value) {
        this._x = value;
        this.root.setAttribute('transform', `translate(${this._x},${this._y})`);
    }
    /**
    * Returns the top left x position of this button.
    */
    get y() {
        return this._y;
    }
    /**
    * Sets the top left y position of this button.
    */
    set y(value) {
        this._y = value;
        this.root.setAttribute('transform', `translate(${this._x},${this._y})`);
    }
    /**
    * Returns how many times this button has been pressed. Count does not
    * increment until the button has been released.
    */
    get count() {
        return this._count;
    }
    /**
    * Returns true if the button is actively being pressed.
    */
    get active() {
        return this._active;
    }
    /**
    * Allows the user to synthetically "press" the button and put it into an
    * active state.
    */
    set active(value) {
        // if transitioning from an active to inactive state count the state change
        if (this.active && !value) {
            this._count++;
        }
        this._active = value;
        if (this._active) {
            this.box.style.fill = '#f8f8f8';
            this.box.style.stroke = '#333333';
            this.box.style.strokeWidth = '1px';
            this.label.style.fill = '#404040';
        }
        else {
            this.box.style.fill = '';
            this.label.style.fill = '';
        }
        this.onchange();
    }
    /**
    * Fires when the user clicks the left button on the button.
    */
    set onclick(handler) {
        this.root.onclick = handler;
        this.onchange();
    }
}
//# sourceMappingURL=button.js.map