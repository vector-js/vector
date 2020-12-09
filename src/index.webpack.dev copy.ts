import '../styles/sandbox.css';
import { PlayerLayout, Artboard, TAU, Path, Point, Text, File, Group, SVG } from './index';
import { Layout } from './layouts/layout';

(window as any).download = File.download;

let root = document.getElementById('root');

let count = 0;
function createContainer() {
	let container = document.createElement('div');
	container.id = `container-${count++}`;
	container.style.marginBottom = '1.5rem';
	root.appendChild(container);
	return container;
}

interface PlotConfiguration {

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

	responsive?:boolean

}

/**
 * A plot
 * 
 * The viewport is defined by a position (x,y) relative to its parent, which only applies to nested
 * SVGs.
 */
class Plot extends Artboard {


	fn:(x:number) => number
	fnPath:Path
	fnGroup:Group

	axisGroup:Group

	internalCoordinates:SVG

	constructor(e: string | HTMLElement, fn:(x:number) => number, config : PlotConfiguration ) {

		let defaultConfig : PlotConfiguration = {

			x:0,
			y:0,
			width:600,
			height:300,

			internalX:0,
			internalY:0,
			internalWidth:600,
			internalHeight:300

		}

		config = { ...defaultConfig, ...config};

		super(e, {
			x:config.x,
			y:config.y,
			width:config.width,
			height:config.height,
			origin:'default',
			responsive: config.responsive
		});

		let scaled = this.svg(0,0, this.width, this.height,)
		scaled.setViewBox(config.internalX, config.internalY, config.internalWidth, config.internalHeight);

		this.internalCoordinates = scaled.appendChild(new SVG());

		this.fn = fn;
		this.classList.add('outline');		

		this.fnGroup = new Group();
		this.root.appendChild(this.fnGroup.root);
		this.fnPath = this.fnGroup.path('');

		this.axisGroup = new Group();
		this.root.appendChild(this.axisGroup.root);

	}

	screenToSVG(screenX, screenY) {
		let svg = this.internalCoordinates.root;
		let p = svg.createSVGPoint()
		p.x = screenX
		p.y = screenY
		return p.matrixTransform(svg.getScreenCTM().inverse());
	}
	
	SVGToScreen(svgX, svgY) {
		let svg = this.internalCoordinates.root;
		let p = svg.createSVGPoint()
		p.x = svgX
		p.y = svgY
		return p.matrixTransform(svg.getScreenCTM());
	}

	draw() {

		let d : string = '';
		let rect = this.root.getBoundingClientRect();

		let ctm = this.internalCoordinates.root.getScreenCTM();
		let point = this.internalCoordinates.root.createSVGPoint();
		let inverse = ctm.inverse();

		for( let x = rect.x; x < rect.x + rect.width; x++) {

			point.x = x;
			point.y = 0;
			let p = point.matrixTransform(inverse);
			p.y = this.fn(p.x);

			let o = this.SVGToScreen(p.x, p.y)

			if( x === rect.x) {
				d += `M ${o.x - rect.x} ${o.y - rect.y} `;
			} else {
				d += `L ${o.x - rect.x} ${o.y - rect.y} `;
			}
		}

		this.fnPath.d = d;
	}
}

let plot = new Plot(createContainer(), Math.sin, {
	width: 576,
	height: 288,

	internalX:0,
	internalY:-1,
	internalWidth: TAU,
	internalHeight: 2,

	responsive:true
})

plot.draw();

let p1 = new Point(0, 0);
let p2 = new Point(0, TAU);

let o1 = plot.SVGToScreen(p1.x, p1.y);
let o2 = plot.SVGToScreen(p2.x, p2.y);

// let line = plot.line( o1.x, o1.y, o2.x, o2.y);

console.log(o1, o2);


let group1 = plot.group();
group1.style.stroke = '#f0f0f0'

let group2 = plot.group();
group2.style.stroke = '#dddddd'

console.log(plot.SVGToScreen(0,TAU));

// let n = 100;
// for( let i = 0; i <= n; i ++ ) {
// 	let x = (i/n)*TAU;
// 	if( i % 10 ) {
// 		group1.line(x, -2, x, 2);
// 	} else {
// 		group2.line(x, -2, x, 2);
// 	}
// }

// plot.draw();

// let radius = 50
// let test = new Interactive(createContainer(), {
// 	origin:'centerY'
// });
// test.plot(Math.cos, {
// 	x: 0,
// 	y: -radius,
// 	width: radius*TAU,
// 	height: 2*radius,
// 	originX: 0,
// 	originY: radius,
// 	scaleX: radius,
// 	scaleY: radius,
// 	margin: 0
// });