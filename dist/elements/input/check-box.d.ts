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
    _value: boolean;
    /**
    * The box to be checked and unchecked
    */
    box: Rectangle;
    /**
    * The text label associated with the checkbox
    */
    label: Text;
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x: number, y: number, text: string, value: boolean);
    /**
    * Sets the value to true and visually checks the box.
    */
    set value(value: boolean);
    /**
    * Returns true if the box is checked, false if it is not.
    */
    get value(): boolean;
    /**
    * Converts the current true/false state of the checkbox to a zero or one.
    */
    number(): number;
    /**
    * Toggles the state of this check box.
    */
    toggle(): void;
}
