import Input from './input.js';
export interface SliderOptions {
    width?: number;
    step?: number;
    min?: number;
    max?: number;
    value?: number;
}
/**
* A horizontal slider is an object that allows for a control to be moved along
* a user- defined range. The slider has a minimum value and a maximum value
* which default to the range [0, 1].
*/
export default class Slider extends Input {
    x: number;
    y: number;
    private _min;
    private _max;
    /**
    * Visually displays the possible positions along the range
    */
    private _line;
    private _control;
    /**
    * Constructs the slider at the position (x,y). The leftmost edge of the line
    * is placed at this location.
    */
    constructor(x: number, y: number, options: SliderOptions);
    /**
    * Returns the width of the display line
    */
    get width(): number;
    /**
    * Sets the width of the display line
    */
    set width(width: number);
    /**
    * Returns the value currently represented by this slider.
    */
    get value(): number;
    /**
    * Sets the value currently represented by this slider.
    */
    set value(n: number);
    set step(value: number);
    /**
    * Returns the minimum possible value of the range.
    */
    get min(): number;
    /**
    * Sets the minimum possible value of the range.
    */
    set min(value: number);
    /**
    * Returns the maximum possible value of the range.
    */
    get max(): number;
    /**
    * Returns the maximum possible value of the range.
    */
    set max(value: number);
    /**
    * Returns the length of the range represented by this slider.
    */
    get range(): number;
}
