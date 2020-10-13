import Input from "../elements/input/input";
import Slider from "../elements/input/slider";
import Interactive from "../elements/interactive";


/**
 * 
 */
export class Template { 

	constructor() {
		
	}

	addContainer( region:HTMLDivElement ) : Interactive {
		return Template.addContainer(region);
	}

	addSlider( region:HTMLDivElement, min:number, max:number, value:number) : Slider {
		return Template.addSlider(region, min, max, value);
	}

	addVariableDisplay( region:HTMLDivElement, variable:string, control:Input) : HTMLDivElement {
		return Template.addVariableDisplay(region, variable, control);
	}

	static addContainer( region:HTMLDivElement ) : Interactive {
		let container = document.createElement('div');
		container.classList.add('display-box');
		let bbox = region.getBoundingClientRect();
		let interactive = new Interactive(container, {
		  height:40,
		  width: 200
		});
		region.appendChild(container);
		return interactive;
	}

	/**
	 *
	 */
	static addSlider( region:HTMLDivElement, min:number, max:number, value:number) : Slider {

		let container = document.createElement('div');
		container.classList.add('display-box');

		// get a handle on the parent and resize if necessary
		let bbox = region.getBoundingClientRect();
		let interactive = new Interactive(container, {
			height:20,
			width: bbox.width - 30
		});
		interactive.root.style.overflow = 'visible';

		let slider = interactive.slider(10, 10, {
			min:min,
			max:max,
			value:value,
			width: bbox.width - 50
		});
		// interactive.root.style.border = '1px solid #808080';
		interactive.root.style.borderRadius = '5px';
		interactive.root.style.padding = '10px';

		region.appendChild(container);

		return slider;
	}

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
