import Interactive from '../elements/interactive'
import Scrubber from '../elements/input/scrubber'
import { Template } from './template';

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
export class AnimationPlayer extends Template {

root:HTMLDivElement;

main:HTMLDivElement;
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

  constructor(idOrElement:string|HTMLElement, options:AnimationPlayerOptions = {})  {

    super(idOrElement)

    let defaultOptions : AnimationPlayerOptions = {
      width: 600
    }

    // combine the default configuration with the user's configuration
    let config = { ...defaultOptions, ...options };

    // get a handle on the parent and resize if necessary
    let bbox = this.container.getBoundingClientRect();
    let width = config.width > bbox.width ? bbox.width : config.width ;
    if (width < 300) {
      width = 300;
    }
  
    this.root = document.createElement('div');
    this.main = document.createElement('div');
    this.controls = document.createElement('div');

    this.root.classList.add('animation-root');
    this.main.classList.add('animation-main');
    this.controls.classList.add('animation-controls');

    // append children
    this.root.appendChild(this.main);
    this.root.appendChild(this.controls);
    this.container.appendChild(this.root);

    this.root.style.width = `${width}px`;

    this.scrubberInteractive = new Interactive(this.controls, {
      width: width,
      height: 50,
      origin: 'default',
      responsive: false
    });

    this.scrubber = this.scrubberInteractive.scrubber( 25, 25, {
      min:config.min,
      max:config.max,
      value:config.value,
      width:width - 50,
      loop:config.loop
    });
  }
}