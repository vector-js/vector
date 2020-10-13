
// basic elements
import Input from './input/input'

// svg elements
import Element from './svg/element'
import SVG from './svg/svg'
import Group from './svg/group'

// input elements
import Button from './input/button'
import CheckBox from './input/check-box'
import Control from './input/control'
import ControlCircle from './input/control-circle'
import RadioControl from './input/radio-control'
import DropdownControl from './input/dropdown-control'
import Scrubber, { ScrubberOptions } from './input/scrubber'
import Slider, { SliderOptions } from './input/slider'
import HoverBox from './input/hover-box'

// graph elements
// import Node from '../elements/graph/node'
// import Edge from '../elements/graph/edge'
// import Graph, {GraphOptions} from '../elements/graph/graph'

// math elements
import Plot, { PlotOptions } from '../elements/math/plot'
import { Label } from './visual/label'
import Definitions from './svg/definitions'

export interface InteractiveOptions {
	width?:number,
	height?:number,
	originX?:number,
	originY?:number,
	border?:boolean
}

/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
export default class Interactive extends SVG {

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

  // internal variables
  private _width:number;
  private _height:number;
  private _originX:number;
  private _originY:number;

	// definitions
  private _definitions:Definitions;

  /**
  * Constructs a new interactive object and appends it into the DOM. If the
  * provided argument is an HTMLElement appends the interactive within that
  * element. If the provided a value is a string, appends the interactive within
  * the HTML element with the corresponding ID. If no element is found throws an
  * error.
  */
  constructor( value:string | HTMLElement, options:InteractiveOptions = {} ) {
    super();

    // If the user passes in a string identifier check to see if such an
    // element exists in the current document.
    if (typeof value == "string") {
      this.container = document.getElementById(value);
      if( this.container === null || this.container === undefined ) {
        throw new Error(`There is no HTML element with the id: ${value}`);
      }
    } else {
      this.container = value;
    }

    // create and append the root svg element and group elements
    this.container.appendChild(this.root);
    this.root.classList.add('interactive');

		// Have to create and manually append because overridden append child will
		// throw an error.
		this.background = new Group();
		this.input = new Group();
		this.root.appendChild(this.background.root);
		this.root.appendChild(this.input.root)

		// default configuration options
    let defaultOptions:InteractiveOptions = {
      originX:0,
      originY:0,
      width:600,
      height:300,
      border:false
    };

		// combine the default configuration with the user's configuration
    let config = { ...defaultOptions, ...options};
		this._originX = config.originX;
		this._originY = config.originY;
		this._width = config.width;
		this._height = config.height;

    this.root.setAttribute('width', this._width.toString());
    this.root.setAttribute('height', this._height.toString());
    // this.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    // this.setViewBox( -this._originX, -this._originY, this._width, this._height );
    this.window = false;
		this.border = config.border;

    // prevent the default behavior of selecting text
    this.container.addEventListener('mousedown', function( event:MouseEvent ) {
      event.preventDefault();
    });
  }

  // /**
  // * Sets the width of this interactive area.
  // */
  // set width( value:number ){
  //   this._width = value;
  //   this.root.setAttribute('width', value.toString());
  //   this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  // }

  // /**
  // * Returns the width of this interactive area.
  // */
  // get width():number {
  //   return this._width;
  // }

  // /**
  // * Sets the height of this interactive area.
  // */
  // set height( value:number ){
  //   this._height = value;
  //   this.root.setAttribute('height', value.toString());
  //   this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  // }

  // /**
  // * Returns the height of this interactive area.
  // */
  // get height():number {
  //   return this._height;
  // }

  /**
  * Sets the x coordinate of the origin.
  */
  set originX( value:number) {
    this._originX = value;
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  }

  /**
  * Returns the value of the x-coordinate of the origin.
  */
  get originX():number {
    return this._originX;
  }

  /**
  * Sets the y coordinate of the origin.
  */
  set originY( value:number) {
    this._originY = value;
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  }

  /**
  * Returns the value of the x-coordinate of the origin.
  */
  get originY():number {
    return this._originY;
  }

  /**
  * If set to true, styles the interactive to float on top of the background.
  * This feature is good for interactives where elements can be dragged out of
  * the bounds of the container element.
  */
  set window( value:boolean ) {
    if( value ){
      this.root.classList.add('window');
    } else {
      this.root.classList.remove('window');
    }
  }

  /**
  * If set to true, draws a minimal border around the interactive.
  */
  set border( value:boolean ) {
    if( value ){
      this.root.classList.add('border');
    } else {
      this.root.classList.remove('border');
    }
  }

  /**
  * Returns the minimum x-coordinate of this interactive.
  */
  get minX() : number {
    return -this.originX;
  }

  /**
  * Returns the minimum y-coordinate of this interactive.
  */
  get minY() : number {
    return -this.originY;
  }

  /**
  * Returns the maximum x-coordinate of this interactive.
  */
  get maxX() : number {
    return this.minX + this._width;
  }

  /**
  * Returns the maximum y-coordinate of this interactive.
  */
  get maxY() : number {
    return this.minY + this._height;
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
  * Creates a nested interactive within this interactive
  */
  interactive( x:number, y:number, options:InteractiveOptions = {} ) : Interactive {
    let obj = new Interactive(this.id, options);
		// TODO: standardize this
    obj.root.setAttribute('x', x.toString());
    obj.root.setAttribute('y', y.toString());
    return obj;
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

  /**
  * Creates a plot within this interactive at the position (x,y).
  */
  plot(fn:(x:number)=>number, options:PlotOptions ) : Plot {
    return this.appendChild(new Plot(fn, options));
  }

  // /**
  // * Creates a graph element within this interactive
  // */
  // graph(options:GraphOptions) : Graph {
  //   return this.appendChild(new Graph(options));
  // }

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
