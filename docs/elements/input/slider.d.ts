import Input from './input.js';
/**
* A horizontal slider is an object that allows for a control to be moved along
* a user- defined range. The slider has a minimum value and a maximum value
* which default to the range [0, 100].
*/
export default class Slider extends Input {
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
    constructor(x: number, y: number, width?: number, value?: number);
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
