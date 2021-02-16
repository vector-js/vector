import { GridArtboard } from "../../artboards/grid";
import { Group } from "../../elements/svg/group";
import { Path } from "../../elements/svg/path";
import { Rectangle } from "../../elements/svg/rectangle";

type FunctionType = (x:number) => number;

/**
 * Configuration passed the the plot constructor
 */
interface Configuration {

	// These dimensions affect the visible area of the plot
	x?:number
	y?:number
	width?:number
	height?:number

	// These dimensions affect the coordinate system used for plotting
	internalX?:number
	internalY?:number
	internalWidth?:number
	internalHeight?:number

	// Toggles weather the plot fills the available space
  responsive?:boolean
  origin?:string
  title?:string
  grid?:boolean
  border?:Boolean
  
  // Initial function to draw
  f:FunctionType
	
}

/**
 * A plot visualizes one or more one-to-one functinos.
 */
export class Plot extends GridArtboard {

  /**
   * Array of functions paths
   */
  functionPaths:Path[];

  /**
   * Array of functions
   */
  functions: FunctionType[];

	/**
	 * The group (layer) used to place the path above the grid and such
	 */
	fnGroup:Group;

  /**
   * Rectangle used to draw the border
   */
  border:Rectangle;

  constructor(container:string|HTMLElement, config:Configuration) {

    // default configuration
    let defaultConfig = {
      grid: true
    }

    // choose users config over default
    config = { ...defaultConfig, ...config};

    super(container, config);
    
    if( config.grid ) {
      this.drawGridLines()
    }

    if( config.border ) {
      this.drawBorder()
    }

    this.fnGroup = this.group();
    this.functionPaths = [];
    this.functions = [];

    this.setAttribute('preserveAspectRatio', 'none');

    this.addFunction(config.f);
    this.draw();

  }

  addFunction( f:FunctionType ):Path {

    let path = this.fnGroup.path('');
    path.classList.add('non-scaling-stroke');

    this.functions.push(f);
    this.functionPaths.push(path);

    return path;
  }

  /**
   * Calls the function inverting the y-coordinate and removing non-finite output.
   */
  call( fn:FunctionType, input:number ) {
    let output = -fn(input);
    if( isFinite(output) ) {
      return output;
    } else {
      return 0;
    }
  }

	/**
	 * Draws the plot of the function for all x-values in the view ports range 
	 */
	draw() {

		let spacing = 0;
    let bbox = this.root.getBoundingClientRect();
    let x1 = bbox.x + spacing;
    let x2 = bbox.x + bbox.width - spacing;
    
    let ctm = this.getInternalSVG().root.getScreenCTM();
    let inverse = ctm.inverse();
		let point = this.getInternalSVG().root.createSVGPoint();
    
    for( let i = 0; i < this.functions.length; i++) {

      let fn = this.functions[i];
      
      point.x = x1;
      point.y = 0;
      let p = point.matrixTransform(inverse);
      let d : string = `M ${p.x} ${this.call(fn, p.x)}`;
  
      // Loop through each pixel, convert the x-position to the internal coordinates, call the 
      // function and add to the path
      for( let x = x1; x < x2; x++) {
        point.x = x;
        p = point.matrixTransform(inverse);
        d += `L ${p.x} ${this.call(fn, p.x)}`;
        // TODO: trim huge y values
      }
  
      this.functionPaths[i].d = d;
    }
	}
}
