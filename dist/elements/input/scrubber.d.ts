import Slider from './slider.js';
import Group from '../svg/group.js';
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
    *
    */
    constructor(x: number, y: number, width?: number);
    play(): void;
    pause(): void;
}
