import { BaseElement } from "../elements/base-element";
import { Input } from "../elements/input/input";
import { Slider } from "../elements/input/slider";
import { Artboard } from "../index";

interface Configuration {
  artboard?:Artboard;
}

/**
 * 
 */
export class Layout extends BaseElement { 

  artboard:Artboard;
  container:HTMLElement;

  constructor(idOrElment:string|HTMLElement, config: Configuration = {}) {

    super();

    // If the user passes in a string identifier check to see if such an
    // element exists in the current document.
    this.container= null;
    if (typeof idOrElment == "string") {
        this.container = document.getElementById(idOrElment);
        if( this.container === null || this.container === undefined ) {
            throw new Error(`There is no HTML element with the id: ${idOrElment}`);
        }
    } else {
        this.container = idOrElment;
    }
  }

  /**
   * Returns the HTML element associated with the id or element, throws error otherwise
   * @param idOrElement 
   */
  static getContainer( idOrElement ) : HTMLElement {

      // If the user passes in a string identifier check to see if such an
      // element exists in the current document.
      let container:HTMLElement= null;
      if (typeof idOrElement == "string") {
        container = document.getElementById(idOrElement);
          if( container === null || container === undefined ) {
              throw new Error(`There is no HTML element with the id: ${idOrElement}`);
          }
      } else {
        container = idOrElement;
      }
      return container
  }
  
  addRegion() : HTMLDivElement {
    let region = document.createElement('div');
    region.classList.add('region');
    return this.container.appendChild(region);
  }

  addButton( region:HTMLDivElement, name:string ) : HTMLButtonElement {
    return Layout.addButton(region, name);
  }

  addContainer( region:HTMLDivElement ) : HTMLDivElement {
    return Layout.addContainer(region);
  }

  addSlider( region:HTMLDivElement, min:number, max:number, value:number) : HTMLInputElement {
    return Layout.addSlider(region, min, max, value);
  }

  addCheckbox( region:HTMLDivElement,value:boolean, name:string) : HTMLInputElement {
    return Layout.addCheckbox(region, value, name);
  }

  addVariableDisplay( region:HTMLDivElement, variable:string, control:Input, accuracy:number = 0) : HTMLDivElement {
    return Layout.addVariableDisplay(region, variable, control, accuracy);
  }
  
  addCustomVariableDisplay( region, variable, valueFunction) {
    let container = document.createElement('div');
    container.classList.add('display-box');
    region.appendChild(container);

    let bbox = region.getBoundingClientRect();
    let interactive = new Artboard(container, {
      width: 200,
      height: 50,
      responsive: false
    });

    // interactive.root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    // interactive.root.setAttribute('width', '100%');

    let text = interactive.text( 16, 25, '');
    text.classList.add('katex-main');
    text.style.dominantBaseline = 'middle';
    text.tspan(variable).classList.add('katex-variable');
    text.tspan(' = ');
    let value = text.tspan( valueFunction() );
    text.addDependency(this);
    text.update = () => {
      value.text = valueFunction();
    };
    return container;
  }

  static addContainer( region:HTMLDivElement ) : HTMLDivElement {
    let container = document.createElement('div');
    container.classList.add('display-box');
    return region.appendChild(container);
  }
  
  /**
   *
   */
  static addButton( region:HTMLDivElement, name:string) : HTMLButtonElement {

    let button = document.createElement('button');
    button.innerText = name;

    region.appendChild(button);

    return button;
  }

  /**
   *
   */
  static addCheckbox( region:HTMLDivElement, value:boolean, name:string) : HTMLInputElement {

    let container = document.createElement('div');
    container.classList.add('display-box');
    container.style.padding = '0.5rem';
    container.style.display = 'flex';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.checked = value;
    checkbox.name = name;

    let label = document.createElement('label');
    label.setAttribute('for', name);
    label.innerText = name;
    label.style.paddingLeft = '0.5rem';

    region.appendChild(container);
    container.appendChild(checkbox);
    container.appendChild(label);

    return checkbox;
  }

  /**
   *
   */
  static addSlider( region:HTMLDivElement, min:number, max:number, value:number) : HTMLInputElement {

    let container = document.createElement('div');
    container.classList.add('display-box');
    container.style.padding = '0.5rem';

    let slider = document.createElement('input');
    slider.type = 'range'
    slider.min = min.toFixed();
    slider.max = max.toFixed();
    slider.value = value.toFixed();
    return region
    .appendChild(container)
    .appendChild(slider);
  }

  // 	/**
  //  *
  //  */
  // static addSlider( region:HTMLDivElement, min:number, max:number, value:number) : Slider {

  // 	let container = document.createElement('div');
  // 	container.classList.add('display-box');

  // 	// get a handle on the parent and resize if necessary
  // 	let bbox = region.getBoundingClientRect();
  // 	let interactive = new Interactive(container, {
  // 		height:20,
  // 		width: bbox.width - 30
  // 	});
  // 	interactive.root.style.overflow = 'visible';

  // 	let slider = interactive.slider(10, 10, {
  // 		min:min,
  // 		max:max,
  // 		value:value,
  // 		width: bbox.width - 50
  // 	});
  // 	// interactive.root.style.border = '1px solid #808080';
  // 	interactive.root.style.borderRadius = '5px';
  // 	interactive.root.style.padding = '10px';

  // 	region.appendChild(container);

  // 	return slider;
  // }

  static addVariableDisplay( region:HTMLDivElement, variable:string, control:Input, accuracy:number = 0) : HTMLDivElement {

    let container = document.createElement('div');
    container.classList.add('display-box');
    region.appendChild(container);

    let bbox = region.getBoundingClientRect();
    let interactive = new Artboard(container, {
      width: 200,
      height: 50,
      responsive: false
    });


    if( control instanceof Slider ) {
      let text = interactive.text( 16, 25, '');
      text.classList.add('katex-main');
      text.style.dominantBaseline = 'middle';
      text.tspan(variable).classList.add('katex-variable');
      text.tspan(' = ');
      let value = text.tspan(control.value.toFixed(accuracy));
      text.addDependency(control);
      text.update = () => {
        value.text = control.value.toFixed(accuracy);
      };
    } else {
      throw new Error('Not Implemented');
    }

    return container;
  }
  

}
