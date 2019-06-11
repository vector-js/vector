import Element from './Element.js';
import Rectangle from './Rectangle.js';
import Text from './Text.js';
export default class CheckBox extends Element {
    value: boolean;
    box: Rectangle;
    label: Text;
    /**
    * Constructs a control at the position (x,y)
    *
    * @param {number} x
    * @param {number} y
    * @param {string} label
    * @param {booelan} value
    */
    constructor(x: number, y: number, label: string, value: boolean);
    onchange(): void;
    /**
    * Converts the current true/false state of the checkbox to a zero or one.
    */
    number(): number;
    toggle(): void;
}
