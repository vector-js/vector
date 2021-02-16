import { Group } from "../elements/svg/group";
import { Artboard, Configuration } from "./artboard";

/**
 * A responsive SVG document that is optimized to prevent cumulative layout shift in the browser 
 * and draw SVG documents within a horizontally constrained vertical layout.
 */
export class ResponsiveArtboard extends Artboard {

	private _grid : Group;
	private _lines1 : Group;
	private _lines2 : Group;
	private _lines3 : Group;

	// static lightStroke = 'var(--light1)';
	// static mediumStroke = 'var(--light2)';
  // static darkStroke = 'var(--light3)';

  // Darker
  // static lightStroke = '#f0f0f0';
	// static mediumStroke = '#d0d0d0';
	// static darkStroke = '#a0a0a0';
  
  static lightStroke = '#f8f8f8';
	static mediumStroke = '#f0f0f0';
	static darkStroke = '#dddddd';

	/**
	 * Constructs a responsive SVG Document that is optimized to prevent cumulative layout shift in 
	 * the browser. The width and height measurements are used to define 1) the aspect ratio of the 
	 * rendered SVG and 2) the internal coordinate system used for drawing. The maxWidth argument 
	 * optionally specifies the maximum display width of the SVG, otherwise the default is to fill 
	 * the availablespace.
	 */
	constructor( container:string|HTMLElement, config:Configuration = {} ) {

		let defaultConfig = {
		origin: 'default',
		align: 'left',
		responsive: true,
		}

		// Combine default with custom config. where custom has precedence
		config = { ...defaultConfig, ...config};

		// Construct a SVG with the provided dimensions
		super(container, config);

		// Fill available space
		if( config.responsive ) {
			this.classList.add('responsive');
		}

		if( config.maxWidth ) {
			// Added px unit because firefox fails to set max-width if no unit is specified
			this.root.style.maxWidth = `${config.maxWidth}px`;
			switch(config.align) {
				case 'center':
					this.root.style.margin = 'auto';
					break;
				case 'right':
						this.root.style.marginLeft = 'auto';
						break;
				case 'left':
						this.root.style.marginRight = 'auto';
						break;
				default:
					console.log(`Unknown alignment option: ${config.align}.`)
					// throw new Error(`Unknown alignment option: ${config.align}.`);
			}
		}

		// Define the origin used for drawing
		switch(config.origin) {
			case 'center':
				this.setViewBox(-this.width/2, -this.height/2, this.width, this.height);
				break;
			case 'centerY':
				this.setViewBox(0, -this.height/2, this.width, this.height);
				break;
			case 'topLeft':
			case 'default':
				this.setViewBox(0, 0, this.width, this.height);
				break;
			default:
				throw new Error(`Unrecognized origin: ${origin}. Please provide a valid orign`);
		}
	}


	/**
	 * This helper method draws a grid to visualize the coordinate system used for drawing SVG 
	 * ELements.
	 */
	drawGrid( border:boolean = true, origin:boolean = true) {

    let magnitue = 50;
    let spacing1 = magnitue; // full unit
    let spacing2 = magnitue/2; // half unit
    let spacing3 = magnitue/10; // full unit magnitude -1

		if( !this._grid ) {
			this._grid = this.group();
			this._lines1 = this._grid.group();
			this._lines2 = this._grid.group();
			this._lines3 = this._grid.group();

			this._lines1.style.stroke = ResponsiveArtboard.lightStroke;
			this._lines2.style.stroke = ResponsiveArtboard.mediumStroke;
			this._lines3.style.stroke = ResponsiveArtboard.darkStroke;

			let viewBox = this.root.viewBox.baseVal;
			let x = viewBox.x;
			let y = viewBox.y;
			let width = viewBox.width;
			let height = viewBox.height;
			let xMax = x + width;
			let yMax = y + height;
				
			if( origin ) {
				let origin = this._grid.circle(0,0,3);
				origin.classList.add('outline')
				origin.style.fill = 'var(--green)';
			}
				
			for( let i = Math.floor(x/spacing3)*spacing3; i <= xMax; i += spacing3) {
			
				let group;
				if( i % spacing1 === 0) {
					group = this._lines3;
				} else if ( i % spacing2 === 0) {
					group = this._lines2;
				} else {
					group = this._lines1;;
				}
				group.line(i, y, i, yMax);
			}
			for( let i = Math.floor(y/spacing3)*spacing3; i <= yMax; i += spacing3) {
			
				let group;
				if( i % spacing1 === 0) {
					group = this._lines3;
				} else if ( i % spacing2 === 0) {
					group = this._lines2;
				} else {
					group = this._lines1;;
				}
				group.line(x, i, xMax, i);
			}

			if( border ) {
				let rect = this.rect(x,y,width, height);
				rect.style.strokeWidth = '2px';
				rect.style.stroke = '#dddddd';
				rect.style.fill = 'none';
			}
		}
	}
}