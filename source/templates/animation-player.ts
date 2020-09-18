import Interactive from '../elements/interactive.js';
import Scrubber from '../elements/input/scrubber.js';

export interface AnimationPlayerOptions {
  width?:number;
  min?:number;
  max?:number;
  value?:number;
  loop?:boolean;
}

/**
* Renders a "playable" interactive within the HTML element with the provided ID.
* A playable interactive contains a
*/
export class AnimationPlayer {

parent:HTMLElement;
root:HTMLDivElement;
container:HTMLDivElement;
canvas:HTMLDivElement;
controls:HTMLDivElement;
playButton:HTMLDivElement;
sliderContainer:HTMLDivElement;
slider:HTMLInputElement;

scrubberInteractive:Interactive;
scrubber:Scrubber;

min:number;
max:number;
value:number;
loop:boolean;


constructor(id:string, options:AnimationPlayerOptions )  {

  let defaultOptions : AnimationPlayerOptions = {
    width: 600
  }

  // combine the default configuration with the user's configuration
  let config = { ...defaultOptions, ...options };

  // get a handle on the parent and resize if necessary
  this.parent = document.getElementById(id);
  let bbox = this.parent.getBoundingClientRect();
  let width = config.width > bbox.width ? bbox.width : config.width ;
  if (width < 300) {
    width = 300;
  }

  this.root = document.createElement('div');
  this.container = document.createElement('div');
  this.canvas = document.createElement('div');
  this.controls = document.createElement('div');

  this.root.classList.add('animation-root');
  this.container.classList.add('animation-container');
  this.canvas.classList.add('animation-canvas');
  this.controls.classList.add('animation-controls');

  // append children
  this.container.appendChild(this.canvas);
  this.container.appendChild(this.controls);
  this.root.appendChild(this.container);
  this.parent.appendChild(this.root);

  this.root.style.width = `${width}px`;

  this.scrubberInteractive = new Interactive(this.controls, {
    width: width,
    height: 50
  });

  this.scrubber = this.scrubberInteractive.scrubber( 25, 25, {
    min:config.min,
    max:config.max,
    value:config.value,
    width:width - 50,
    loop:config.loop
  });


  //
  // this.playButton = document.createElement('div');
  // this.playButton.classList.add('animation-button');
  // this.controls.appendChild(this.playButton);



  //

}
}