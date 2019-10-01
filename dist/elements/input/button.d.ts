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
    * Fires when the user clicks the left button on the button.
    */
    onclick: (event: MouseEvent) => void;
}
