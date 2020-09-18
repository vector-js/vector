// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, Point, Control, Path, Text, AnimationPlayer, Circle, Group} from '../../index.js';
import { TAU } from '../../util/constants.js';

export interface Configuration {

	radius?:number;
	width?:number;
	margin?:number;
	radians?:boolean;
	smallRadius?:number;

	pointRadius?:number;
	pointAngle?:number;

	tics?: number;
	ticStepBig?: number;
	labelStep?: number;
	fixedAngle?: boolean;
}

export class PolarCoordinatesFigure extends Interactive {

	_radians:boolean;
	_angle:number;
	_radius:number;

	point:Control;
	radius:number;
	margin:number;
	tics:number;
	ticStepBig:number;
	labelStep:number
	smallRadius: number;
	fixedAngle: boolean;

	labelGroup:Group;

	static default : Configuration  = {
		radians:true,
		radius:150,
		margin:60,
		tics: 20,
		ticStepBig: 2,
		labelStep: 2,
		pointRadius:2,
		pointAngle: 0.3*TAU,
		smallRadius: 50,
		fixedAngle: true
	}

	static degrees : Configuration = {
		radians:false,
		tics: 36,
		ticStepBig: 9,
		labelStep: 3,
		pointAngle: 0.3*TAU,
		smallRadius: 50,
	}

	constructor(idOrHTMlElement:string|HTMLElement, options?:Configuration  ) {

		// combine the default configuration with the user's configuration
		let config = { ...PolarCoordinatesFigure.default, ...options };

		// check the available size
		let width = 2*config.radius + 2*config.margin;
		super(idOrHTMlElement, {
			width: width,
			height: width,
			originX: width/2,
			originY: width/2,
			border: false
		});

		// Constrain to available size
		width = this.container.getBoundingClientRect().width;
		if( this.width > width ) {
			this.width = width;
			this.originX = width/2;
			this.originY = width/2;
			this.height = width;
			this.radius = width/2 - config.margin;
		} else {
			this.radius = config.radius;
		}

		this._angle = config.pointAngle;
		this._radius = config.pointRadius;
		this._radians = config.radians;
		this.smallRadius = config.smallRadius;
		this.fixedAngle = config.fixedAngle;
		this.margin = config.margin;
		this.tics = config.tics;
		this.ticStepBig = config.ticStepBig;
		this.labelStep = config.labelStep;

		this.style.overflow = 'visible';

		// Draw the circle with the provided number of steps
		this.initializeTemplate();

		let group = this.group();
		group.style.strokeOpacity = '.2';
		group.root.setAttribute('vector-effect','non-scaling-stroke');

		this.point = this.addPoint(config.pointRadius, config.pointAngle);

		let center = this.circle(0,0,3);
		center.style.fill = `#404040`;
		center.style.stroke = `none`;

	}

	setAngle( value:number ) {
		this.point.x = this.radius*Math.cos(value);
		this.point.y = -this.radius*Math.sin(value);
		this.point.updateDependents();
		// this.point.translate( this.radius*Math.cos(value), -this.radius*Math.sin(value));
	}

	get radians():boolean{
		return this._radians;
	}

  addPoint( radius, angle, color?) : Control {

		// Create the controls & define dependency functions
		let point = this.control(radius*this.smallRadius*Math.cos(angle),-radius*this.smallRadius*Math.sin(angle));
		point.constrainWithin(new Circle(0,0,this.radius));
		point.point.style.fill = color;
		point.handle.style.stroke = color;

		let radiusLine = this.line(0,0,point.x, point.y);
		radiusLine.addDependency(point);
		radiusLine.update = () => {
			radiusLine.x2 = point.x;
			radiusLine.y2 = point.y;
		}
		radiusLine.classList.add('default');

		// Create path to display the angle
		let path = this.path('');
		path.classList.add('default');
		path.addDependency(point);
		// path.root.style.fill = `rgb(0, 0, 255)`;
		path.root.style.fill = `#000000`;
		path.root.style.fillOpacity = '0.10';
		// path.attatchArrow( this.defs(), false);

		// path.root.style.stroke = 'none';
		path.update = () => {
			let angle = point.displayAngle;
			let flag = (angle > TAU/2 || angle < 0) ? 1 : 0;

			let r: number, x: number, y: number;
			if( this.fixedAngle ) {
				r = this.smallRadius;
				x = r*Math.cos(angle);
				y = -r*Math.sin(angle);
			} else {
				x = point.x;
				y = point.y;
				r = Math.hypot(x,y);
			}

			path.d = `M ${x} ${y}
								L 0 0
								L ${r} 0
								A ${r} ${r} 0 ${flag} 0 ${x} ${y}`;
		};
		path.update();

		let arrow = this.path(`M -12 -6 L 0 0 L -12 6 L -10 0z`);
		arrow.style.fill = `#404040`;
		arrow.style.stroke = 'none';
		arrow.addDependency(point);
		arrow.update = () => {

			let a = point.displayAngle;

			let x, y;
			if ( this.fixedAngle) {
				x = this.smallRadius*Math.cos(a);
				y = -this.smallRadius*Math.sin(a);
			} else {
				x = point.x;
				y = point.y;
			}

			arrow.setAttribute(`transform`, `translate(${x}, ${y}) rotate(${ - a * 360 / TAU - 90})`);
		}
		arrow.update();

		let labelGroup = this.group();
		let labelRect = labelGroup.rectangle(0,0,0,0);
		labelRect.style.fill = 'white';
		let label = labelGroup.text(15,-15, `(`);
		label.classList.add('katex-main');
		let radiusLabel = label.tspan(`${Math.hypot(point.x, point.y)}`);
		label.tspan(', ');
		let angleLabel = label.tspan(`${point.displayAngle/TAU}`);
		if( this.radians ) {
			label.tspan('τ').classList.add('katex-variable');
		} else {
			label.tspan('°');
		}
		label.tspan(')');

		labelGroup.addDependency(point);
		labelGroup.update = () => {
			let a = point.displayAngle;
			labelGroup.setAttribute('transform', `translate(${point.x}, ${point.y})`);
			radiusLabel.text = `${(Math.hypot(point.x, point.y)/this.smallRadius).toFixed(2)}`;
			angleLabel.text = this.radians ? `${(a/TAU).toFixed(2)}` : `${(a*360/TAU).toFixed(0)}`;
		};
		labelGroup.update();

		let bbox = labelGroup.root.getBBox();
		labelRect.x = bbox.x - 4;
		labelRect.y = bbox.y - 4;
		labelRect.width = bbox.width + 8;
		labelRect.height = bbox.height + 8;

		return point;
  }

	initializeTemplate() {

		this.labelGroup = this.group();
		this.labelGroup.classList.add('katex-main', 'text-middle');
		let group = this.group();

		let outside = this.circle(0, 0, this.radius);
		outside.style.stroke = `#404040`;
		outside.style.fill = 'none';

		let space = this.margin/2;
		let labels = [];
		let rects = [];
		let lightTics = group.group();
		lightTics.style.stroke = `#dddddd`;
		lightTics.style.fill = 'none';
		let mediumTics = group.group();
		mediumTics.style.stroke = `#dddddd`;
		let darkTics = group.group();
		darkTics.style.stroke = `#404040`;

		let polarDirection = this.line(0,0,this.radius,0);
		polarDirection.style.stroke = '#404040';

		let count = 0;
		for( let i = 0; i <= this.tics; i ++ ) {
			let fraction = i/this.tics;
			let a = fraction*TAU;
			let x = this.radius*Math.cos(a);
			let y = -this.radius*Math.sin(a);

			// Label breakdown
			if( count % this.labelStep === 0) {

				let xPos = x + space*Math.cos(a);
				let yPos = y - space*Math.sin(a);

				let label : Text;
				if( this.radians ) {
					let temp;
					if ( fraction === 0 ) {
						temp = '0';
						label = this.labelGroup.text( xPos, yPos, temp);
					} else if (fraction === 1) {
						label = this.labelGroup.text( xPos, yPos, 'τ');
						label.classList.add('katex-variable');
					} else {
						temp = `${fraction.toFixed(1)}`;
						label = this.labelGroup.text( xPos, yPos, temp);
						label.tspan('τ').classList.add('katex-variable');
					}

				} else {
					label = this.labelGroup.text( xPos, yPos, `${(a*360/TAU).toFixed(0)}°`);
				}

				let box = label.getBoundingBox();
				label.remove();

				let rect = this.labelGroup.rectangle(box.x - 3, box.y - 3, box.width + 6, box.height + 6);
				rect.style.fill= '#ffffff';
				rect.style.stroke= 'none';
				this.labelGroup.appendChild(label);
				labels.push(label);
				rects.push(rect);
			}

			lightTics.line(0, 0, x, y);

			// Color of tic marks
			if ( count % this.labelStep === 0) {
				let x1 = (this.radius-4)*Math.cos(a);
				let y1 = -(this.radius-4)*Math.sin(a);
				let x2 = (this.radius+4)*Math.cos(a);
				let y2 = -(this.radius+4)*Math.sin(a);
				darkTics.line(x1, y1, x2, y2);
			}


			count++;
		}
		labels[0].y -= 15;
		labels[labels.length - 1].y += 15;
		rects[0].y -= 15;
		rects[rects.length -1].y += 15;

		for( let r = this.smallRadius; r <= this.radius; r += this.smallRadius) {
			darkTics.line(r, 0, r, 5);
			lightTics.circle(0,0,r);
		}

		let r1 = 25;
		let r2 = 50;
		for( let a = 0; a < TAU; a += TAU/4 ) {
			this.line( r1*Math.cos(a), r1*Math.sin(a), r2*Math.cos(a), r2*Math.sin(a));
		}

		this.root.querySelectorAll("text").forEach( (text) => {

			let bbox = text.getBBox();
			// text.setAttribute('x',`${bbox.x}`);
			text.setAttribute('y',`${parseInt(text.getAttribute('y')) + 5}`);
			text.style.textAnchor = 'middle';
			text.classList.remove('text-middle');
		});
	}
}
