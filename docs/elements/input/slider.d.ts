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
    /**
    * Sets the width of the display line
    */
    width: number;
    /**
    * Returns the value currently represented by this slider.
    */
    /**
    * Sets the value currently represented by this slider.
    */
    value: number;
    step: number;
    /**
    * Returns the minimum possible value of the range.
    */
    /**
    * Sets the minimum possible value of the range.
    */
    min: number;
    /**
    * Returns the maximum possible value of the range.
    */
    /**
    * Returns the maximum possible value of the range.
    */
    max: number;
    /**
    * Returns the length of the range represented by this slider.
    */
    readonly range: number;
}
