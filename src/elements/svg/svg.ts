import { Descriptive, Shape, Structural, Typography } from './content-model'
import { Element, CoreAttributes } from './element'

import { Circle } from './circle'
import { ClipPath } from './clip-path'
import { Definitions } from './definitions'
import { Description } from './description'
import { Ellipse } from './ellipse'
import { Group } from './group'
import { Image } from './image'
import { Line } from './line'
import { Marker } from './marker'
import { MetaData } from './meta-data'
import { Path } from './path'
import { Polygon } from './polygon'
import { Rectangle } from './rectangle'
import { Symbol} from './symbol'
import { Text } from './text'
import { Title } from './title'
import { Use } from './use'
import { A } from './a'
import { Script } from './script'

type SVGAttributes = 'viewBox' | 'preserveAspectRatio' | 'transform';

/**
* This class represents a SVG element. A "scalable vector grapic" has two important geometric 
* properties. The "viewPort" defines the width and height of the graphic. The "viewBox" defines the
* internal coordinate system used to draw elements.
*/
export class SVG extends Element implements Descriptive, Shape, Structural, Typography {

	// make the type of the root more specific
	root: SVGSVGElement;

	/**
	* Constructs a SVG element with the display dimensions specified by the width and height.For the 
	* outermost SVG element placed in the DOM, the (x,y) coordinate positions are ignored. For nested 
	* SVG element (placed within another SVG element) the (x,y) coordinate positions descript the
	* top-left position of the nested SVG.
	*/
	constructor();
	constructor( width:number, height:number);
	constructor( arg1?:number, arg2?:number ) {

		let svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		
		if ( arg1 && arg2 ) {
			svg.setAttributeNS(null, 'width', arg1.toString());
			svg.setAttributeNS(null, 'height', arg2.toString());
		}

		super(svg);

	}

	/**
	* Constructs and returns a SVG object within the DOM.  If the provided
	* argument is an HTMLElement appends the interactive within that element. If
	* the provided a value is a string, appends the interactive within the HTML
	* element with the corresponding ID. If no element is found throws an error.
	*/
	static SVG( idOrElement:string | HTMLElement, width?:number, height?:number ) : SVG {

		// get the container element
		let container : HTMLElement;
		if (typeof idOrElement == "string") {
			container = document.getElementById(idOrElement);
			if( container === null || container === undefined ) {
				throw new Error(`There is no HTML element with the id: ${idOrElement}`);
			}
		} else {
			container = idOrElement;
		}

		// construct and append the svg
		let svg = new SVG(width,height);
		container.appendChild(svg.root);
		return svg;
	}

	/**
	* Return the width of this svg element.
	*/
	get width() {
		return this.root.width.baseVal.value;
	}

	/**
	* Set the width of this svg element.
	*/
	set width( value:number ) {
		this.root.setAttribute('width', value.toString());
	}

	/**
	* Returns the height of this svg element.
	*/
	get height() {
		return this.root.height.baseVal.value;
	}

	/**
	* Sets the height of this svg element to the provided value.
	*/
	set height( value:number ) {
		this.root.setAttribute('height', value.toString());
	}

	get x() {
		return this.root.x.baseVal.value;
	}

	set x( value:number ) {
		this.root.x.baseVal.value = value;
	}

	get y() {
		return this.root.y.baseVal.value;
	}

	set y( value:number ) {
		this.root.y.baseVal.value = value;
	}

	 /**
	 * Returns the maximum x-coordinate in the internal (drawing) coordinate system
	 */
	get maxX() : number {
		return this.root.viewBox.baseVal.x + this.root.viewBox.baseVal.width;
	}

	/**
	 * Returns the maximum y-coordinate in the internal (drawing) coordinate system
	 */
	get maxY() : number {
		return this.root.viewBox.baseVal.y + this.root.viewBox.baseVal.height;
	}

	get viewBox() : string {
		return this.root.getAttribute('viewBox');
	}

	/**
	 * Sets the viewBox to the provided string in the form of "minX minY width height". This updates
	 * the internal coordinate system used for drawing.
	 */
	set viewBox( value:string ) {
		this.root.setAttribute('viewBox', value);
	}

	/**
	 * Updates the internal coordinate system (used for drawing and scaling).
	 * 
	 * @param minX The top left x-position of the internal coordinate system
	 * @param minY The top left y-position of the internal coordinate system
	 * @param width The width of the internal coordinate system
	 * @param height The height of the internal coorinate system
	 */
	setViewBox( minX:number, minY:number, width:number, height:number ) {
		this.root.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
	}

	// comment inherited from base class
	setAttribute(name: SVGAttributes | CoreAttributes, value: string): SVG {
		this.root.setAttribute(name,value);
		return this;
	}

	// comment inherited from base class
	getAttribute(name: SVGAttributes | CoreAttributes): string {
		return this.root.getAttribute(name);
	}

	// descriptive elements

	description(): Description {
		return this.appendChild(new Description());
	}
	metadata(): MetaData {
		return this.appendChild(new MetaData());
	}
	title(): Title {
		return this.appendChild(new Title());
	}

	// shape elements, comments inherited from implementing abstract class

	circle(cx:number, cy:number, r:number): Circle {
		return this.appendChild(new Circle(cx, cy, r));
	}
	ellipse(cx:number, cy:number, rx:number, ry:number): Ellipse {
		return this.appendChild(new Ellipse(cx, cy, rx, ry));
  }
  image(href:string, width:number, height:number ): Image {
		return this.appendChild(new Image(href, width, height));
	}
	line(x1:number, y1:number, x2:number, y2:number): Line {
		return this.appendChild(new Line(x1, y1, x2, y2));
	}
	path(d:string = ''): Path {
		return this.appendChild(new Path(d));
	}
	polygon(points:string): Polygon {
		return this.appendChild(new Polygon(points));
	}
	rect(x:number, y:number, width:number, height:number): Rectangle {
		return this.rectangle(x,y,width,height);
	}
	rectangle(x:number, y:number, width:number, height:number): Rectangle {
		return this.appendChild(new Rectangle(x, y, width, height));
	}

	// structural elements

	defs(): Definitions {
		return this.appendChild(new Definitions());
	}
	group(): Group {
		return this.appendChild(new Group());
	}
	svg(x:number, y:number, width:number, height:number): SVG {
		let svg = new SVG(width,height);
		svg.x = x;
		svg.y = y;
		return this.appendChild(svg);
	}
	symbol(): Symbol {
		return this.appendChild(new Symbol());
	}
	use(x:number, y:number, width:number, height:number): Use {
		return this.appendChild(new Use(x, y, width, height));
	}

	// typography elements

	text(x:number, y:number, str:string = ''): Text {
		return this.appendChild(new Text(x, y, str));
	}

	// other elements

	/**
	* Constructs and appends an 'a' (link) element within this element.
	*/
	a( href:string ) : A {
		return this.appendChild(new A(href));
	}

	/**
	* Constructs and appends a 'clipPath' element within this element.
	*/
	clipPath():ClipPath {
		return this.appendChild(new ClipPath());
	}

	/**
	* Constructs and appends a 'marker' element within this element.
	*/
	marker(refX:number, refY:number, width:number, height:number):Marker {
		return this.appendChild(new Marker(refX, refY, width, height));
	}

	/**
	* Constructs and appends a 'script' element within this element.
	*/
	script(): Script {
		return this.appendChild(new Script());
	}
}
