import { Rectangle } from "../../index";
import { ResponsiveArtboard } from "../../artboards/responsive";
import { TAU } from "../../util/constants";
import {Group} from "../../elements/svg/group";
import {Path} from "../../elements/svg/path";
import {SVG} from "../../elements/svg/svg";

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
  origin?:string
	title?:string
	
}

/**
 * A plot
 * 
 * The viewport is defined by a position (x,y) relative to its parent, which only applies to nested
 * SVGs.
 */
export class Plot extends ResponsiveArtboard {

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
   * Rectangle used to draw the border
   */
  border:Rectangle;

	/**
	 * Nested SVG to fix firefox bug with viewbox
	 */
	private internalSVG:SVGSVGElement;

	/**
	 * Contructs a SVG plot within the corresponding HTML Element and draws a plot of the function.
	 */
	constructor(container:string|HTMLElement, fn:(x:number) => number, config : PlotConfiguration ) {

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
			internalHeight:300,
      
      origin: 'center'
		}

		// choose users config over default
		config = { ...defaultConfig, ...config};

		super(container, config);
		this.x = config.x;
		this.y = config.y;
    this.classList.add('grid');

    // Store a reference to fix firefox viewbox issue
		if( navigator.userAgent.indexOf("Firefox") > -1 ) {
			this.internalSVG = this.appendChild(new SVG()).root as SVGSVGElement;
		} else {
			this.internalSVG = this.root;
    }

		this.fn = fn;
		this.classList.add('non-scaling-stroke', 'outline');		
		this.setViewBox(config.internalX, config.internalY, config.internalWidth, config.internalHeight);

		this.gridGroup = this.group();
		this.axisGroup = this.group();

		// Draw axis
		let line2 = this.axisGroup.line(0,0,TAU, 0);

    this.fnGroup = this.group();
    this.fnGroup.classList.add('non-scaling-stroke');
    this.fnPath = this.fnGroup.path('');
    this.fnPath.setAttribute('vector-effect', 'non-scaling-stroke');
	}

	/**
	 * Converts a point in the SVG's coordinate system to the screen's coordinate system.
	 */
	screenToSVG(screenX, screenY) {
		let p = this.internalSVG.createSVGPoint()
		p.x = screenX
		p.y = screenY
		return p.matrixTransform(this.internalSVG.getScreenCTM().inverse());
	}
	
	/**
	 * Converts a point in the screen's coordinate system to the SVG's coordinate system.
	 */
	SVGToScreen(svgX, svgY) {		
		let p = this.internalSVG.createSVGPoint()
		p.x = svgX
		p.y = svgY
		return p.matrixTransform(this.internalSVG.getScreenCTM());
  }
  
  	/**
	 * Converts a point in the screen's coordinate system to the SVG's coordinate system.
	 */
	SVGToRelative(svgX:number, svgY:number) {
    
    let bbox = this.root.getBoundingClientRect();
    let svg = this.internalSVG;
		let p = svg.createSVGPoint()
		p.x = svgX
		p.y = svgY
    let point = p.matrixTransform(svg.getScreenCTM())
    point.x -= bbox.left
    point.y -= bbox.top
    return point
  }
  
  call( input:number ) {
    let output = -this.fn(input);
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
    
    let ctm = this.internalSVG.getScreenCTM();
    let inverse = ctm.inverse();
		let point = this.internalSVG.createSVGPoint();
    
    point.x = x1;
    point.y = 0;
    let p = point.matrixTransform(inverse);
    let d : string = `M ${p.x} ${this.call(p.x)}`;
    console.log(x1);
    console.log(d);

		// Loop through each pixel, convert the x-position to the internal coordinates, call the 
		// function and add to the path
		for( let x = x1; x < x2; x++) {
			point.x = x;
      p = point.matrixTransform(inverse);
      d += `L ${p.x} ${this.call(p.x)}`;
      // TODO: trim huge y values
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

		this.border = this.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    this.border.style.strokeWidth = '2';
    this.border.setAttribute('vector-effect','non-scaling-sroke');
		// rect.style.strokeWidth = '3'; // For 1.5px stroke
	}
}

/**
 * An extension of the plot object that specializes in drawing a tau scaled coordinate system
 */
export class TrigPlot extends Plot {
	constructor( e, f, c = {}) {

		let defaultConfig = {
			// width: 432,
      // height: 216,
      width: 720 - 96,
			height: 144*2,
      // width: 720,
      // height: 144*3  - 96,
      
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
		// this.drawBorder()

	}

	drawCustomGrid() {
		
		let bbox = this.root.getBoundingClientRect();
		let p1 = this.screenToSVG(bbox.x, bbox.y);
		let p2 = this.screenToSVG(bbox.width + bbox.x, bbox.height + bbox.y);
		
		let group3 = this.gridGroup.group();
		group3.style.stroke = '#f8f8f8'
		
		let group2 = this.gridGroup.group();
		group2.style.stroke = '#eeeeee'

		let group1 = this.gridGroup.group();
		group1.style.stroke = '#e0e0e0'
		// group1.style.stroke = '#f0f0f0'

		// group2.style.stroke = '#dddddd'

    let n = 100;
    let step1 = 10;
    let step2 = 5;
		for( let i = 0; i <= n; i ++ ) {
			// let x = (i/10);
			let x = p1.x + (i/n)*TAU;
			if( i % step1 === 0) {
				group1.line(x, p1.y, x, p2.y);
			} else if( i % step2 === 0 ) {
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
  
  drawCustomGrid2() {
		
		let bbox = this.root.getBoundingClientRect();
		let p1 = this.screenToSVG(bbox.x, bbox.y);
		let p2 = this.screenToSVG(bbox.width + bbox.x, bbox.height + bbox.y);
		
		let group3 = this.gridGroup.group();
		group3.style.stroke = '#f8f8f8'
		
		let group2 = this.gridGroup.group();
		group2.style.stroke = '#eeeeee'

		let group1 = this.gridGroup.group();
		group1.style.stroke = '#e0e0e0'
		// group1.style.stroke = '#f0f0f0'

		// group2.style.stroke = '#dddddd'

    let n = 180;
    let step = 15;
    let step2 = 5;
    // let n = 360;
    // let step = 30;
    // let step2 = 10;
		for( let i = 0; i <= n; i ++ ) {
			// let x = (i/10);
			let x = (i/n)*TAU;
			if( i % step === 0) {
				group1.line(x, p1.y, x, p2.y);
			} else if( i % step2 === 0 ) {
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
  
  drawCustomGrid3() {
		
		let bbox = this.root.getBoundingClientRect();
		let p1 = this.screenToSVG(bbox.x, bbox.y);
		let p2 = this.screenToSVG(bbox.width + bbox.x, bbox.height + bbox.y);
		
		let group3 = this.gridGroup.group();
		group3.style.stroke = '#f8f8f8'
		
		let group2 = this.gridGroup.group();
		group2.style.stroke = '#eeeeee'

		let group1 = this.gridGroup.group();
		group1.style.stroke = '#e0e0e0'
		// group1.style.stroke = '#f0f0f0'

		// group2.style.stroke = '#dddddd'

    let n = 100;
    let step1 = 10;
    let step2 = 5;
		for( let i = -40; i <= n; i ++ ) {
			// let x = (i/10);
			let x = (i/10);
			if( i % step1 === 0) {
				group1.line(x, p1.y, x, p2.y);
			} else if( i % step2 === 0 ) {
				group2.line(x, p1.y, x, p2.y);
			} else {
				group3.line(x, p1.y, x, p2.y);
			}
		}

		let startY = Math.ceil(p1.y*100);
		let endY = Math.ceil(p2.y*100);
		for( let i = startY; i < endY; i++) {
			let y = i/100*TAU;
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
