import Element from './Element.js';
import Control from './Control.js';
import Line from './Line.js';
export default class Slider extends Element {
    min: number;
    max: number;
    line: Line;
    control: Control;
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x: number, y: number, width?: number, value?: number);
    value: number;
}
