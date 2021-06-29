import Rectangle from '../svg/rectangle.js';
import Text from '../svg/text.js';
import Input from './input.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class Button extends Input {
    /**
    * The state of the checkbox
    */
    _count: number;
    /**
    * True if the button is active
    */
    _active: boolean;
    _x: number;
    _y: number;
    /**
    * The box that represents the area where the user clicks
    */
    box: Rectangle;
    /**
    * The text label associated with the button
    */
    label: Text;
    /**
    * Constructs a button at the position (x,y)
    */
    constructor(x: number, y: number, str: string);
    /**
    * Returns the top left x position of this button.
    */
    get x(): number;
    /**
    * Sets the top left x position of this button.
    */
    set x(value: number);
    /**
    * Returns the top left x position of this button.
    */
    get y(): number;
    /**
    * Sets the top left y position of this button.
    */
    set y(value: number);
    /**
    * Returns how many times this button has been pressed. Count does not
    * increment until the button has been released.
    */
    get count(): number;
    /**
    * Returns true if the button is actively being pressed.
    */
    get active(): boolean;
    /**
    * Allows the user to synthetically "press" the button and put it into an
    * active state.
    */
    set active(value: boolean);
    /**
    * Fires when the user clicks the left button on the button.
    */
    set onclick(handler: (event: MouseEvent) => void);
}
