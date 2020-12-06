import '../styles/sandbox.css';
import { AnimationPlayer, Interactive, TAU, Path, Point, Text, File, Group } from './index';
import { Template } from './templates/template';

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
class Plot extends Interactive {


	fn:(x:number) => number;
	fnPath:Path;
	fnGroup:Group;

	axisGroup:Group;

	constructor(e: string | HTMLElement, fn:(x:number) => number, config : PlotConfiguration ) {

		let defaultConfig : PlotConfiguration = {

			x:0,
			y:0,
			width:600,
			height:300,

			internalX:-300,
			internalY:-150,
			internalWidth:600,
			internalHeight:300
			
		}

		config = { ...defaultConfig, ...config};

		super(e, {
			x:config.x,
			y:config.y,
			width:config.width,
			height:config.height,
			origin:'center',
			responsive: config.responsive
		});

		this.fn = fn;
		this.classList.add('non-scaling-stroke', 'outline');		

		this.setViewBox(config.internalX, config.internalY, config.internalWidth, config.internalHeight);

		this.fnGroup = new Group();
		this.root.appendChild(this.fnGroup.root);
		this.fnPath = this.fnGroup.path('');


		this.axisGroup = new Group();
		this.root.appendChild(this.axisGroup.root);
		let line2 = this.axisGroup.line(0,0,TAU, 0);

		// line2.root.setAttribute('vector-effect', 'non-scaling-stroke');

		// this.fnPath.root.setAttribute('vector-effect', 'non-scaling-stroke');
	}

	draw() {
		let d : string = 'M 0 0';

		let rect = this.root.getBoundingClientRect();
		let ctm = this.root.getScreenCTM();
		let point = this.root.createSVGPoint();
		let inverse = ctm.inverse();

		for( let x = rect.x; x < rect.x + rect.width; x++) {

			point.x = x;
			point.y = 150;
			let p = point.matrixTransform(inverse);

			if( x === rect.x) {
				d += `M ${p.x} ${-this.fn(p.x)} `;
			} else {
				d += `L ${p.x} ${-this.fn(p.x)} `;
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

let group1 = plot.group();
group1.style.stroke = '#f0f0f0'

let group2 = plot.group();
group2.style.stroke = '#dddddd'

let n = 100;
for( let i = 0; i <= n; i ++ ) {
	let x = (i/n)*TAU;
	if( i % 10 ) {
		group1.line(x, -2, x, 2);
	} else {
		group2.line(x, -2, x, 2);
	}
}
plot.draw();

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