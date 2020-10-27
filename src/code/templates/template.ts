import { BaseElement } from "../elements/base-element";
import Input from "../elements/input/input";
import Slider from "../elements/input/slider";
import Interactive from "../elements/interactive";


/**
 * 
 */
export class Template { 

	container:HTMLElement;

	constructor(idOrElment:string|HTMLElement) {
		
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
  
  addRegion() : HTMLDivElement {
    let region = document.createElement('div');
    region.classList.add('region');
    return this.container.appendChild(region);
  }

	addContainer( region:HTMLDivElement ) : HTMLDivElement {
		return Template.addContainer(region);
	}

	addSlider( region:HTMLDivElement, min:number, max:number, value:number) : HTMLInputElement {
		return Template.addSlider(region, min, max, value);
	}

	addCheckbox( region:HTMLDivElement,value:boolean, name:string) : HTMLInputElement {
		return Template.addCheckbox(region, value, name);
	}

	addVariableDisplay( region:HTMLDivElement, variable:string, control:Input) : HTMLDivElement {
		return Template.addVariableDisplay(region, variable, control);
	}

	static addContainer( region:HTMLDivElement ) : HTMLDivElement {
		let container = document.createElement('div');
		container.classList.add('display-box');
		return region.appendChild(container);
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

	static addVariableDisplay( region:HTMLDivElement, variable:string, control:Input) : HTMLDivElement {

		let container = document.createElement('div');
		container.classList.add('display-box');
		region.appendChild(container);

		let bbox = region.getBoundingClientRect();
		let interactive = new Interactive(container, {
			width: 200,
			height: 50
		});

		interactive.root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
		interactive.root.setAttribute('width', '100%');

		if( control instanceof Slider ) {
			let text = interactive.text(interactive.width/2, 25, '');
			text.classList.add('katex-main', 'text-middle');
			text.tspan(variable).classList.add('katex-variable');
			text.tspan(' = ');
			let value = text.tspan(`${Math.floor(control.value)}`);
			text.addDependency(control);
			text.update = () => {
				value.text = `${Math.floor(control.value)}`;
			};
		} else {
			throw new Error('Not Implemented');
		}

		return container;
	}
}
