import Rectangle from '../svg/rectangle.js';
import Text from '../svg/text.js';
import Input from './input.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class HoverBox extends Input {
    box: Rectangle;
    label: Text;
    _x: number;
    _xBound: number;
    _y: number;
    _yBound: number;
    constructor(str: string);
    set x(value: number);
    set y(value: number);
    setBounds(x: number, y: number): void;
    setText(str: string): void;
    updatePosition(x: number, y: number): void;
    showHoverBox(): void;
    hideHoverBox(): void;
}
