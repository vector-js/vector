import { SVGResponsiveTemplate } from "../../templates/svg-responsive";
import { TAU } from "../../util/constants";
import Group from "../svg/group";
import Path from "../svg/path";
import SVG from "../svg/svg";

/**
 * Configuration passed the the plot constructor
 */
export interface PlotConfiguration {

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
	
	title?:string
	
}

/**
 * A plot
 * 
 * The viewport is defined by a position (x,y) relative to its parent, which only applies to nested
 * SVGs.
 */
export class Plot extends SVGResponsiveTemplate {

	/**
	 * A one-to-one function
	 */
	fn:(x:number) => number;
	
	/**
	 * The path used to draw the function
	 */
	fnPath:Path;
	
	/**
	 * The group (layer) used to place the path above the grid and such
	 */
	fnGroup:Group;

	/**
	 * Contains the axis to sit above the grid
	 */
	axisGroup:Group;

	/**
	 * Contains the axis to sit above the grid
	 */
	gridGroup:Group;

	/**
	 * Nested SVG to fix firefox bug with viewbox
	 */
	private _svg:SVG;

	/**
	 * Contructs a SVG plot within the corresponding HTML Element and draws a plot of the function.
	 */
	constructor(element:string|HTMLElement, fn:(x:number) => number, config : PlotConfiguration ) {

		// Default values 
		let defaultConfig : PlotConfiguration = {

			// view port
			x:0,
			y:0,
			width:600,
			height:300,

			// internal coordinates
			internalX:-300,
			internalY:-150,
			internalWidth:600,
			internalHeight:300
			
		}

		// choose users config over default
		config = { ...defaultConfig, ...config};

		super(config.width, config.height, {
			origin:'center',
			responsive: config.responsive
		});
		this.x = config.x;
		this.y = config.y;
		this.appendSelfWithin(element);

		this._svg = this.appendChild(new SVG());
		this.fn = fn;
		this.classList.add('non-scaling-stroke', 'outline');		
		this.setViewBox(config.internalX, config.internalY, config.internalWidth, config.internalHeight);

		this.gridGroup = this.group();
		this.axisGroup = this.group();

		// Draw axis
		let line2 = this.axisGroup.line(0,0,TAU, 0);

		this.fnGroup = this.group();
		this.fnPath = this.fnGroup.path('');
	}

	/**
	 * Converts a point in the SVG's coordinate system to the screen's coordinate system.
	 */
	screenToSVG(screenX, screenY) {
		let svg:SVGSVGElement;
		if( navigator.userAgent.indexOf("Firefox") > -1 ) {
			svg = this._svg.root;
		} else {
			svg = this.root;
		}
				let p = svg.createSVGPoint()
		p.x = screenX
		p.y = screenY
		return p.matrixTransform(svg.getScreenCTM().inverse());
	}
	
	/**
	 * Converts a point in the screen's coordinate system to the SVG's coordinate system.
	 */
	SVGToScreen(svgX, svgY) {
		let svg:SVGSVGElement;
		if( navigator.userAgent.indexOf("Firefox") > -1 ) {
			svg = this._svg.root;
		} else {
			svg = this.root;
		}
		
		let p = svg.createSVGPoint()
		p.x = svgX
		p.y = svgY
		return p.matrixTransform(svg.getScreenCTM());
	}

	/**
	 * Draws the plot of the function for all x-values in the view ports range 
	 */
	draw() {
		let svg:SVGSVGElement;
		if( navigator.userAgent.indexOf("Firefox") > -1 ) {
			svg = this._svg.root;
		} else {
			svg = this.root;
		}

		// store the transformation matrix
		let rect = svg.getBoundingClientRect();
		let ctm = svg.getScreenCTM();
		let point = svg.createSVGPoint();
		let inverse = ctm.inverse();
		
		// calculate the starting position of the path
		let margin = 1;
		point.x = rect.x - margin;
		point.y = 0;
		let p0 = point.matrixTransform(inverse);
		let d : string = `M ${p0.x} ${-this.fn(p0.x)}`;

		// Loop through each pixel, convert the x-position to the internal coordinates, call the 
		// function and add to the path
		for( let x = rect.x - margin; x < rect.x + rect.width + margin; x++) {
			point.x = x;
			let p = point.matrixTransform(inverse);
			d += `L ${p.x} ${-this.fn(p.x)} `;
		}

		this.fnPath.d = d;
	}

	/**
	 * Draws a border around the plot SVG that does not change the dimensions of the plot object.
	 */
	drawBorder() {

		// Or use clipping path
		let spacing = 0;
		let bbox = this.root.getBoundingClientRect();
		let p1 = this.screenToSVG(bbox.x + spacing, bbox.y + spacing);
		let p2 = this.screenToSVG(bbox.width + bbox.x - spacing, bbox.height + bbox.y - spacing);

		let rect = this.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
		rect.style.strokeWidth = '2';
		// rect.style.strokeWidth = '3'; // For 1.5px stroke
	}


}

/**
 * An extension of the plot object that specializes in drawing a tau scaled coordinate system
 */
export class TrigPlot extends Plot {
	constructor( e, f, c = {}) {

		let defaultConfig = {
			width: 432,
			height: 216,
		
			internalX:0,
			internalY:-1,
			internalWidth: TAU,
			internalHeight: 2,
	 
			responsive:true
		}

		c = {...defaultConfig, ...c};

		super(e, f, c)

		this.draw()
		this.drawCustomGrid()
		this.drawBorder()

	}

	drawCustomGrid() {
		
		let bbox = this.root.getBoundingClientRect();
		let p1 = this.screenToSVG(bbox.x, bbox.y);
		let p2 = this.screenToSVG(bbox.width + bbox.x, bbox.height + bbox.y);
		
		let group3 = this.gridGroup.group();
		group3.style.stroke = '#f8f8f8'
		
		let group2 = this.gridGroup.group();
		group2.style.stroke = '#f0f0f0'

		let group1 = this.gridGroup.group();
		group1.style.stroke = '#dddddd'
		// group1.style.stroke = '#f0f0f0'

		// group2.style.stroke = '#dddddd'

		let n = 100;
		for( let i = 0; i <= n; i ++ ) {
			// let x = (i/10);
			let x = (i/n)*TAU;
			if( i % 25 === 0) {
				group1.line(x, p1.y, x, p2.y);
			} else if( i % 5 === 0 ) {
				group2.line(x, p1.y, x, p2.y);
			} else {
				group3.line(x, p1.y, x, p2.y);
			}
		}

		let startY = Math.ceil(p1.y*10);
		let endY = Math.ceil(p2.y*10);
		for( let i = startY; i < endY; i++) {
			let y = i/10;
			if( i % 10 === 0 ) {
				group1.line(p1.x, y, p2.x, y);
			} else if( i % 5 === 0) {
				group2.line(p1.x, y, p2.x, y);
			} else {
				group3.line(p1.x, y, p2.x, y);
			}
		}
	}

}
