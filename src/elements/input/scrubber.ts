import { Slider } from './slider'
import { SliderOptions } from './slider'
import { Group } from '../svg/group'

export interface ScrubberOptions extends SliderOptions {
  loop:boolean
}

/**
* A scubber element has
*/
export class Scrubber extends Slider {

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
  constructor( x:number, y:number, options:ScrubberOptions) {

    let defaultOptions = {
      width: 486,
      loop: false
    }

    // combine the default configuration with the user's configuration
    let config = { ...defaultOptions, ...options};

    // make room for the player button
    let circleRadius = 14;
    config.width = config.width - 28;

    super(x + 6 + 2*circleRadius, y, config);

    this.active = false;
    this.loop = config.loop;
    this.done = false;

    let playCircle = this.circle(0, 0, circleRadius);
    playCircle.style.fill = '#eeeeee';
    playCircle.style.stroke = '#333333';
    playCircle.style.strokeWidth = '1px';
    playCircle.classList.add('animation-button')

    let radius = 6;
    let playTriangle = this.path(` M ${radius} ${0}
                                  L ${radius*Math.cos(-2*Math.PI/3)} ${radius*Math.sin(-2*Math.PI/3)}
                                  L ${radius*Math.cos(-4*Math.PI/3)} ${radius*Math.sin(-4*Math.PI/3)}
                                  Z`);
    playTriangle.style.fill = '#333333';

    this.playButton = this.group();
    this.playButton.appendChild(playCircle);
    this.playButton.appendChild(playTriangle);
    this.playButton.circle(0,0,20).style.opacity = '0';
    this.playButton.setAttribute('transform', `translate( ${x}, ${y})`);

    let pauseCircle = this.circle(0, 0, circleRadius);
    pauseCircle.style.fill = '#eeeeee';
    pauseCircle.style.stroke = '#333333';
    pauseCircle.style.strokeWidth = '1px';

    // TODO: style the lines with rounded end points
    let size = 6;
    let pauseLines = this.path(` M ${-size/2} ${-4}
                                L ${-size/2} ${4}
                                M ${size/2} ${-4}
                                L ${size/2} ${4}`);
    pauseLines.style.stroke = '#333333';
    pauseLines.style.strokeWidth = '2';
    pauseLines.style.strokeLinecap = 'round';

    this.pauseButton = this.group();
    this.pauseButton.style.display = 'none';
    this.pauseButton.appendChild(pauseCircle);
    this.pauseButton.appendChild(pauseLines);
    this.pauseButton.circle(0,0,20).style.opacity = '0';
    this.pauseButton.setAttribute('transform', `translate( ${x}, ${y})`);

    let scrubber = this;
    this.playButton.root.addEventListener('click', function(){
      scrubber.playButton.style.display = 'none';
      scrubber.pauseButton.style.display = '';
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

  setValue( n:number ) {
    if( n < this.min ) {
      this.value = this.min;
    } else if ( n > this.max && this.loop ) {
      this.value = n % this.max;
    } else if ( n > this.max ){
      this.value = this.max;
    } else {
      this.value = n;
    }
    this.onchange();
  }

  getValue() : number {
    return this.value;
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
      let start;
      let prev;
      let step = function( timestamp: number ) {
        if( start === undefined) {
          start = timestamp;
          prev = 0;
        }
        const elapsed = timestamp - start;

        scrubber.value += stepSize;
        if( scrubber.value >= scrubber.max && !scrubber.loop ) {
          scrubber.value = scrubber.max;
          scrubber.pause();
          // TODO: change play icon to reset icon
          scrubber.done = true;
          scrubber.onchange();
        } else {
          scrubber.value = scrubber.value % scrubber.max;
          scrubber.onchange();
          prev = elapsed;
          scrubber.requestID = window.requestAnimationFrame(step);
        }
      }

      // start animating
      window.requestAnimationFrame(step);
    }
  }

  pause() {
    this.active = false;
    this.pauseButton.style.display = 'none';
    this.playButton.style.display = '';
    window.cancelAnimationFrame(this.requestID);
  }
}
