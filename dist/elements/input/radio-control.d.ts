import Input from './input.js';
import CheckBox from './check-box.js';
/**
*  Radio Buttons with labels. Only one of the checkboxes will be checked at any given time.
*/
export default class RadioControl extends Input {
    list: CheckBox[];
    index: number;
    constructor(x: number, y: number, labels: string[], index?: number);
    get value(): string;
    getCurrentValue(): import("../svg/text.js").default;
    handleMouseDown(index: number): void;
}
