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
  active : boolean;

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
  playButton : Group;

  /**
  * Pause button group
  */
  pauseButton : Group;

  requestID:number;

  // TODO: When the scrubber control is grabbed, active should be set to false and the animation cycle should be stopped.
  // TODO: Reset done variable when the control is changed
  // TODO: Show darker line of progress

  /**
  * Constructs a new scrubber element at the (x,y) position.
  */
  constructor( x:number, y:number, options:SliderOptions) {

    let defaultOptions = {
      width: 486
    }

    // combine the default configuration with the user's configuration
    let config = { ...defaultOptions, ...options};

    // make room for the play & pause button
    config.width = config.width - 80;

    super(x + 80, y, config);

    this.active = false;
    this.loop = false;
    this.done = false;

    let circleRadius = 16;
    let playCircle = this.circle(0, 0, circleRadius);
    playCircle.style.fill = '#eeeeee';
    playCircle.style.stroke = '#333333';
    playCircle.style.strokeWidth = '1px';

    let radius = 8;
    let playTriangle = this.path(` M ${radius} ${0}
                                  L ${radius*Math.cos(-2*Math.PI/3)} ${radius*Math.sin(-2*Math.PI/3)}
                                  L ${radius*Math.cos(-4*Math.PI/3)} ${radius*Math.sin(-4*Math.PI/3)}
                                  Z`);
    playTriangle.style.fill = '#333333';

    this.playButton = this.group();
    this.playButton.appendChild(playCircle);
    this.playButton.appendChild(playTriangle);
    this.playButton.setAttribute('transform', `translate( ${x}, ${y})`);

    let pauseCircle = this.circle(0, 0, circleRadius);
    pauseCircle.style.fill = '#eeeeee';
    pauseCircle.style.stroke = '#333333';
    pauseCircle.style.strokeWidth = '1px';

    // TODO: style the lines with rounded end points
    let pauseLines = this.path(` M ${-3.5} ${-5}
                                L ${-3.5} ${5}
                                M ${3.5} ${-5}
                                L ${3.5} ${5}`);
    pauseLines.style.stroke = '#333333';
    pauseLines.style.strokeWidth = '2';
    pauseLines.style.strokeLinecap = 'round';

    this.pauseButton = this.group();
    this.pauseButton.appendChild(pauseCircle);
    this.pauseButton.appendChild(pauseLines);
    this.pauseButton.setAttribute('transform', `translate( ${x + 42}, ${y})`);

    let scrubber = this;
    this.playButton.root.addEventListener('click', function(){
      scrubber.play();
    });
    this.pauseButton.root.addEventListener('click', function(){
      scrubber.pause();
    });
    let fn = this.onchange;
    this.onchange = function() {
      if( scrubber.value == scrubber.max ) {
        scrubber.done = true;
      } else {
        scrubber.done = false;
      }
      fn();
    };
  }

  play() {
    if( !this.active ) {
      let scrubber = this;
      scrubber.active = true;

      if( this.done) {
        this.value = this.min;
        this.done = false;

        // TODO: change this.done to true when the control is "scrubbed" to the end
      }

      let stepSize = .0025*scrubber.range;
      let step = function( timestamp) {
        scrubber.value = (scrubber.value + stepSize);
        if( scrubber.value > scrubber.max && !scrubber.loop ) {
          scrubber.value = scrubber.max;
          scrubber.pause();
          // TODO: change play icon to reset icon
          scrubber.done = true;
          scrubber.onchange();
        } else {
          scrubber.value = scrubber.value % scrubber.max;
          scrubber.onchange();
          scrubber.requestID = window.requestAnimationFrame(step);
        }
      }

      // start animating
      window.requestAnimationFrame(step);
    }
  }

  pause() {
    this.active = false;
    window.cancelAnimationFrame(this.requestID);
  }
}
