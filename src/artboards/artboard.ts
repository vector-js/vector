
// basic elements
import { Input } from '../elements/input/input'

// svg elements
import { SVG } from '../elements/svg/svg'
import { Element } from '../elements/svg/element'
import { Group } from '../elements/svg/group'

// input elements
import { Button } from '../elements/input/button'
import { CheckBox } from '../elements/input/check-box'
import { Control } from '../elements/input/control'
import { ControlCircle } from '../elements/input/control-circle'
import { RadioControl } from '../elements/input/radio-control'
import { DropdownControl } from '../elements/input/dropdown-control'
import { Scrubber, ScrubberOptions } from '../elements/input/scrubber'
import { Slider, SliderOptions } from '../elements/input/slider'
import { HoverBox } from '../elements/input/hover-box'

// graph elements
// import Node from '../elements/graph/node'
// import Edge from '../elements/graph/edge'
// import Graph, {GraphOptions} from '../elements/graph/graph'

// math elements
import { Label } from '../elements/visual/label'
import { Definitions } from '../elements/svg/definitions'
import { Marker } from '../elements/svg/marker'

export type alignment = 'left' | 'center' | 'right';

export interface Configuration {
  
  x?:number,
  y?:number,
  width?:number,
  height?:number
  maxWidth?:number,

  origin?:string;
  responsive?:boolean;
  align?:string | alignment;

}

/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
export class Artboard extends SVG {

  /**
  * The container element for this interactive.
  */
	container:HTMLElement;

  /**
  * The input groups sits on top of the background group and ensures that
  * input elements will always visually appear above background elements.
  */
  input:Group;

  /**
  * The background is where everything that is not a primary control is drawn.
  */
  background:Group;

	/**
	* This group contains symbols that can be reused within this interactive.
	*/
	private symbols:Group;

	/**
	* Maps icon names to ids.
	*/
	private icons:Set<string>;

	// definitions
  private _definitions:Definitions;

  /**
  * Constructs a new interactive object and appends it into the DOM. If the
  * provided argument is an HTMLElement appends the interactive within that
  * element. If the provided a value is a string, appends the interactive within
  * the HTML element with the corresponding ID. If no element is found throws an
  * error.
  */
 constructor( container:string|HTMLElement, config:Configuration = {} ) {

    // default configuration
    let defaultConfig:Configuration = {
      width:(2*144),
      height:(2*144)/16*9,
      align:'left',
      origin:'default',
      responsive: true
    };

    // Combine default with custom config
    config = { ...defaultConfig, ...config};

    // Construct the svg document 
    super(config.width, config.height);

    this.container = this.appendSelfWithin(container) as HTMLElement;

    // create and append the root svg element and group elements
    this.container.appendChild(this.root);
    this.root.classList.add('artboard');

		// Have to create and manually append because overridden append child will
		// throw an error.
		this.background = new Group();
		this.input = new Group();
		this.root.appendChild(this.background.root);
		this.root.appendChild(this.input.root)

    // // prevent the default behavior of selecting text
    // this.container.addEventListener('mousedown', function( event:MouseEvent ) {
    //   event.preventDefault();
    // });
  }

	/**
	* Returns definitions for this interactive. If undefined, creates and appends
	* a new element.
	*
	* TODO: move this up to the SVG level?
	*/
	get definitions() : Definitions {
		if ( this._definitions === undefined ) {
			return super.appendChild(new Definitions());
		} else {
			return this._definitions;
		}
	}

  /**
  * Appends the element within the interactive. If the element is an "input"
  * element, places the element in the input group so that visually the element
  * is always placed above other graphical elements.
  */
  appendChild<T extends Element>( child:T ) : T {
    if( child instanceof Input ) {
      this.input.appendChild(child);
    } else {
      this.background.appendChild(child);
    }
    return child;
  }

  /**
   * Adds an arrow marker element to the defintions.
   */
  arrow() : Marker {
    let marker = this._definitions.marker(10, 5, 10, 10);
    marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
    marker.setAttribute('orient', 'auto-start-reverse');
    return marker;
  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  button( x:number, y:number, label:string ) : Button {
    return this.appendChild(new Button(x, y, label));
  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  checkBox( x:number, y:number, label:string, value:boolean ) : CheckBox {
    return this.appendChild( new CheckBox(x, y, label, value));
  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  radioControl(x:number, y:number, labels: string[], index: number = 0) : RadioControl {
    return this.appendChild(new RadioControl(x, y, labels, index));
  }

	/**
	* Creates a dropdown input at the position (x,y) within this interactive.
	*/
	dropdownControl(x: number, y: number, optionLabels: string[], defaultIndex: number) : DropdownControl {
		return this.appendChild(new DropdownControl(x, y, optionLabels, defaultIndex));
	}

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  control( x:number, y:number ) : Control {
    return this.appendChild(new Control( x, y));
  }

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  controlCircle( x:number, y:number ) : Control {
    return this.appendChild(new ControlCircle( x, y));
  }

  hoverBox(str: string) : HoverBox{
    return this.appendChild(new HoverBox(str));
  }

	label( x:number, y:number, str:string ) {
		let label = this.appendChild(new Label(x,y,str));
		label.drawBackgroundRectangle();
		return label;
	}

  /**
  * Creates a slider input within this interactive
  */
  slider(x: number, y: number, options:SliderOptions) : Slider {
    return this.appendChild(new Slider(x, y, options));
  }

  /**
  * Creates a scrubber with a play and pause button at the position (x,y).
  */
  scrubber(x:number, y:number, options:ScrubberOptions ) : Scrubber {
    return this.appendChild(new Scrubber( x, y, options));
  }
}
