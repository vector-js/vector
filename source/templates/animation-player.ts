import Interactive from '../elements/interactive.js';
import Scrubber from '../elements/input/scrubber.js';

/**
* Renders a "playable" interactive within the HTML element with the provided ID.
* A playable interactive contains a
*/
export class AnimationPlayer {

parent:HTMLElement;
container:HTMLDivElement;
canvas:HTMLDivElement;
controls:HTMLDivElement;
playButton:HTMLDivElement;
slider:HTMLInputElement;

scrubberInteractive:Interactive;
scrubber:Scrubber;

constructor(id:string, config:any)  {

  // get a handle on the parent and create elements
  this.parent = document.getElementById(id);
  let width = this.parent.getBoundingClientRect().width;

  this.container = document.createElement('div');
  this.canvas = document.createElement('div');
  this.controls = document.createElement('div');

  this.container.classList.add('animation-container');
  this.canvas.classList.add('animation-canvas');
  this.controls.classList.add('animation-controls');

  // append children
  this.container.appendChild(this.canvas);
  this.container.appendChild(this.controls);
  this.parent.appendChild(this.container);

  this.playButton = document.createElement('div');
  this.playButton.classList.add('animation-button');
  this.controls.appendChild(this.playButton);

  this.slider = document.createElement('input');
  this.slider.type = 'range';
  this.slider.min = '1';
  this.slider.max = '100';
  this.slider.value = '1';
  this.slider.classList.add('animation-slider');
  this.controls.appendChild(this.slider);

  // this.scrubberInteractive = new Interactive(this.controls, {
  //   width: width,
  //   height: 50
  // });
  //
	// this.scrubber = this.scrubberInteractive.scrubber( 16, 25, {
  //   min:1,
  //   max:100,
  //   value:1,
  //   width:width - 50,
  //   loop:false
  // });
}
}