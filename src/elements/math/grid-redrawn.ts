import { SVGResponsiveTemplate } from "../../templates/svg-responsive";
import { TAU } from "../../util/constants";
import {Group} from "../svg/group";
import {SVG} from "../svg/svg";

/**
 * Configuration passed the the plot constructor
 */
export interface GridConfiguration {

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
 * A grid object allows a user to specify an internal coordinate system used for drawing. 
 */
export class Grid extends SVGResponsiveTemplate {

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
	 * Nested SVG to fix firefox bug with viewbox
	 */
	private internalSVG:SVG;
  private internalViewBox: SVGAnimatedRect;

	/**
	 * Contructs a SVG plot within the corresponding HTML Element and draws a plot of the function.
	 */
	constructor(element:string|HTMLElement, config : GridConfiguration ) {

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
			internalHeight:300
		}

		// choose users config over default
		config = { ...defaultConfig, ...config};
		super(config.width, config.height, {
			origin:'default',
			responsive: config.responsive
		});
		this.x = config.x;
		this.y = config.y;
    this.appendSelfWithin(element);

    // Create an internal SVG to do the heavy lifting
    let svg = this.appendChild(new SVG());
    svg.setViewBox(config.internalX, config.internalY, config.internalWidth, config.internalHeight);

    this.internalViewBox = svg.root.viewBox;

    // Store a reference to fix firefox viewbox issue
		if( navigator.userAgent.indexOf("Firefox") > -1 ) {
			this.internalSVG = svg.appendChild(new SVG());
		} else {
			this.internalSVG = svg;
    }

		this.classList.add('outline');		

		this.gridGroup = this.group();
		this.axisGroup = this.group();
    this.foreground = this.group();
    
    // TODO: draw axis

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
		let bbox = this.root.getBoundingClientRect();
		let p1 = this.SVGToRelative(bbox.x + spacing, bbox.y + spacing);
		let p2 = this.SVGToRelative(bbox.width + bbox.x - spacing, bbox.height + bbox.y - spacing);

		let rect = this.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
		rect.style.strokeWidth = '2';
  }
  
  drawGridLines() {

    let bbox = this.root.getBoundingClientRect();
    let viewBox = this.internalViewBox.baseVal;
		let p1 = this.SVGToRelative( viewBox.x, viewBox.y);
		let p2 = this.SVGToRelative( viewBox.x + viewBox.width, viewBox.y + viewBox.height);
    console.log(p1, p2)
    
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

		for( let i = x1; i <= x2; i++ ) {
      
      let x = this.SVGToRelative(i, 0).x;
			if( i % 10 === 0) {
				group1.line(x, p1.y, x, p2.y);
			} else if( i % 5 === 0 ) {
				group2.line(x, p1.y, x, p2.y);
			} else {
				group3.line(x, p1.y, x, p2.y);
			}
    }
    

		for( let i = y1; i <= y2; i ++ ) {
      
      let y = this.SVGToRelative(0, i).y;
			if( i % 10 === 0) {
				group1.line(p1.x, y, p2.x, y);
			} else if( i % 5 === 0 ) {
				group2.line(p1.x, y, p2.x, y);
			} else {
				group3.line(p1.x, y, p2.x, y);
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
