import { alignment } from "./artboard";
import { ResponsiveArtboard } from "./responsive";

import { Rectangle } from "../elements/svg/rectangle";
import { Group } from "../elements/svg/group";
import { SVG } from "../elements/svg/svg";

/**
 * Configuration passed the the plot constructor
 */
export interface GridConfiguration {

	// These dimensions affect the visible area of the plot
	x?:number
	y?:number
	width?:number
  height?:number
  maxWidth?:number

	// These dimensions affect the coordinate system used for plotting
	internalX?:number
	internalY?:number
	internalWidth?:number
	internalHeight?:number

	// Toggles weather the plot fills the available space of the container
	responsive?:boolean
	
  title?:string
  align?:alignment
  origin?:string
}

/**
 * A grid object allows a user to specify an internal coordinate system used for drawing.  
 */
export class GridArtboard extends ResponsiveArtboard {

	/**
	 * Contains the grid lines
	 */
  gridGroup:Group;
  
	/**
	 * Contains the axis lines
	 */
	axisGroup:Group;

  /**
   * Foreground
   */
  foreground:Group;

  /**
   * 
   */
  border:Rectangle;

	/**
	 * Nested SVG to fix firefox bug with viewbox
	 */
	private internalSVG:SVG;
  private internalViewBox: SVGAnimatedRect;

	/**
	 * Contructs a SVG plot within the corresponding HTML Element and draws a plot of the function.
	 */
	constructor(container:string|HTMLElement, config : GridConfiguration ) {

		// Default values 
		let defaultConfig : GridConfiguration = {

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
      
      align: 'left',
      origin:'default',
      responsive: true
    }

		// choose users config over default
    config = { ...defaultConfig, ...config};

    // if no max-width specified, default to specified width
    if (!config.maxWidth) { config.maxWidth = config.width };
    
		super(container, config);
    
    this.classList.add('grid');
		this.x = config.x;
		this.y = config.y;

    // Create an internal SVG to do the heavy lifting
    this.setViewBox(config.internalX, config.internalY, config.internalWidth, config.internalHeight);
    let svg = this.appendChild(new SVG());
    this.internalViewBox = this.root.viewBox;

    // Store a reference to fix firefox viewbox issue
		if( navigator.userAgent.indexOf("Firefox") > -1 ) {
			this.internalSVG = svg.appendChild(new SVG());
		} else {
			this.internalSVG = svg as SVG;
    }

		this.classList.add('outline');		

		this.gridGroup = this.group();
		this.axisGroup = this.group();
    this.foreground = this.group();
    
    // TODO: draw axis

  }

  getInternalSVG() : SVG {
    return this.internalSVG;
  }

	/**
	 * Converts a point in the SVG's coordinate system to the screen's coordinate system.
	 */
	screenToSVG(screenX:number, screenY:number) {

    let svg = this.internalSVG.root;
		let p = svg.createSVGPoint()
		p.x = screenX
		p.y = screenY
		return p.matrixTransform(svg.getScreenCTM().inverse());
	}
	
	/**
	 * Converts a point in the screen's coordinate system to the SVG's coordinate system.
	 */
	SVGToScreen(svgX:number, svgY:number) {
		
    let svg = this.internalSVG.root;
		let p = svg.createSVGPoint()
		p.x = svgX
		p.y = svgY
		return p.matrixTransform(svg.getScreenCTM());
  }
  
	/**
	 * Converts a point in the screen's coordinate system to the SVG's coordinate system.
	 */
	SVGToRelative(svgX:number, svgY:number) {
    
    let bbox = this.root.getBoundingClientRect();
    let svg = this.internalSVG.root;
		let p = svg.createSVGPoint()
		p.x = svgX
		p.y = svgY
    let point = p.matrixTransform(svg.getScreenCTM())
    point.x -= bbox.left
    point.y -= bbox.top
    return point
	}

	/**
	 * Draws a border around the plot SVG that does not change the dimensions of the plot object.
	 */
	drawBorder() {

		// Or use clipping path
    let spacing = 0;
    let viewBox = this.internalViewBox.baseVal;
    let x1 = viewBox.x;
    let y1 = viewBox.y;

    let x2 = viewBox.x + viewBox.width;
    let y2 = viewBox.y + viewBox.height;

    this.border = this.rect(x1, y1, x2 - x1, y2 - y1);
    this.border.root.setAttribute('vector-effect', 'non-scaling-stroke');
		this.border.style.strokeWidth = '2';
  }
  
  drawGridLines() {

    let viewBox = this.internalViewBox.baseVal;
    
		let group3 = this.gridGroup.group();
		group3.style.stroke = '#f8f8f8'
		
		let group2 = this.gridGroup.group();
		group2.style.stroke = '#f0f0f0'

		let group1 = this.gridGroup.group();
		group1.style.stroke = '#dddddd'

    let x1 = Math.floor(viewBox.x);
    let y1 = Math.floor(viewBox.y);

    let x2 = Math.ceil(viewBox.x + viewBox.width);
    let y2 = Math.ceil(viewBox.y + viewBox.height);

		for( let x = x1; x <= x2; x++ ) {
			if( x % 10 === 0) {
				group1.line(x, y1, x, y2);
			} else if( x % 5 === 0 ) {
				group2.line(x, y1, x, y2);
			} else {
				group3.line(x, y1, x, y2);
			}
    }

		for( let y = y1; y <= y2; y ++ ) {
      
			if( y % 10 === 0) {
				group1.line(x1, y, x2, y);
			} else if( y % 5 === 0 ) {
				group2.line(x1, y, x2, y);
			} else {
				group3.line(x1, y, x2, y);
			}
		}

		// let startY = Math.ceil(p1.y*10);
		// let endY = Math.ceil(p2.y*10);
		// for( let i = startY; i < endY; i+= 10) {
		// 	let y = i/10;
		// 	if( i % 10 === 0 ) {
		// 		group1.line(p1.x, y, p2.x, y);
		// 	} else if( i % 5 === 0) {
		// 		group2.line(p1.x, y, p2.x, y);
		// 	} else {
		// 		group3.line(p1.x, y, p2.x, y);
		// 	}
		// }
  }
  
  drawGridLinesTest( step1, step2, step3) {

    let viewBox = this.internalViewBox.baseVal;
    
		let group3 = this.gridGroup.group();
		group3.style.stroke = '#f8f8f8'
		
		let group2 = this.gridGroup.group();
		group2.style.stroke = '#f0f0f0'

		let group1 = this.gridGroup.group();
		group1.style.stroke = '#dddddd'

    let x1 = Math.floor(viewBox.x);
    let y1 = Math.floor(viewBox.y);

    let x2 = Math.floor(viewBox.x + viewBox.width);
    let y2 = Math.floor(viewBox.y + viewBox.height);

    // let step1 = 100; // full magnitude step up
    // let step2 = 50;  // half magnitude
    // let step3 = 10;  // full magnitude step down

    // Make sure to start on the smallest step down
    x1 = x1 - (x1 % step3) - step3;
    y1 = y1 - (y1 % step3) - step3;

		for( let x = x1; x <= x2; x += step3 ) {
			if( x % step1 === 0) {
				group1.line(x, y1, x, y2);
			} else if( x % step2 === 0 ) {
				group2.line(x, y1, x, y2);
			} else {
				group3.line(x, y1, x, y2);
			}
    }

		for( let y = y1; y <= y2; y += step3 ) {
      
			if( y % step1 === 0) {
				group1.line(x1, y, x2, y);
			} else if( y % step2 === 0 ) {
				group2.line(x1, y, x2, y);
			} else {
				group3.line(x1, y, x2, y);
			}
		}

		// let startY = Math.ceil(p1.y*10);
		// let endY = Math.ceil(p2.y*10);
		// for( let i = startY; i < endY; i+= 10) {
		// 	let y = i/10;
		// 	if( i % 10 === 0 ) {
		// 		group1.line(p1.x, y, p2.x, y);
		// 	} else if( i % 5 === 0) {
		// 		group2.line(p1.x, y, p2.x, y);
		// 	} else {
		// 		group3.line(p1.x, y, p2.x, y);
		// 	}
		// }
  }
}
