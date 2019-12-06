import Slider from './slider.js';
import { SliderOptions } from './slider.js';
import Group from '../svg/group.js';
/**
* A scubber element has
*/
export default class Scrubber extends Slider {
    /**
    * Represents weather the scrubber is active and animating.
    */
    active: boolean;
    /**
    * If set to true starts the scrubber at the beginning when it reaches the end.
    */
    loop: boolean;
    /**
    * Set to true if the scrubber reaches the end of the animation
    */
    done: boolean;
    /**
    * Play button group
    */
    playButton: Group;
    /**
    * Pause button group
    */
    pauseButton: Group;
    requestID: number;
    /**
    * Constructs a new scrubber element at the (x,y) position.
    */
    constructor(x: number, y: number, options: SliderOptions);
    play(): void;
    pause(): void;
}
