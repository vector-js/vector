/**
* @ignore true
*/

// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, Point, Control} from '../../index.js';
import { TAU } from '../../util/constants.js';

interface Options {
	angle?: number;
	divide?: number;
	label?: boolean;
	margin?: number;
	step?: number;
	stepRadius?: number;
}

export class RadiansFigure {

	private point:Control;
	radius:number;
	margin:number;
	width:number;

	constructor(id:string, options?:Options  ) {

		let defaultOptions : Options = {
			angle: 1,
			divide: TAU,
			label: true,
			margin: 50,
			step: 3,
			stepRadius: 50,
		}

		// combine the default configuration with the user's configuration
		let config = { ...defaultOptions, ...options };

		this.radius = config.step*config.stepRadius;
		this.margin = config.margin;
		this.width = 2*this.radius + 2*this.margin;
		let interactive = new Interactive(id, {
			width: this.width,
			height: this.width
		});

		interactive.border = false;
		interactive.originX = interactive.width/2;
		interactive.originY = interactive.width/2;
		interactive.style.overflow = 'visible';
		interactive.classList.add('default');

		// Draw the circle with the provided number of steps

		let group = interactive.group();
		group.style.strokeOpacity = '.2';
		group.root.setAttribute('vector-effect','non-scaling-stroke');
		let r = config.stepRadius;
		for( let i = 0; i <= config.step; i++) {
			group.circle(0,0, i*r);
		}

		// Create the controls & define dependency functions
		this.point = interactive.control(0,0);
		// this.point.converToDisplay();
		let border = interactive.circle(0,0, this.radius);

		// Create path to display the angle
		let path = interactive.path('');
		path.addDependency(this.point);
		path.root.style.fill = 'rgb(236,236,236)';
		path.update = () => {
			let flag = (this.point.y > 0) ? 1 : 0;
			let angle = this.getAngle();
			let r = config.stepRadius;
			path.d = `M 0 0
								L ${r} 0
								A ${r} ${r} 0 ${flag} 0 ${r*Math.cos(angle)} ${-r*Math.sin(angle)}
								z`;
		};
		path.update();
		this.point.constrainTo( border);

		let label = group.text( this.radius + this.margin/2, 0, '0,');
		label.classList.add('katex-main', 'text-middle');
		let span = label.tspan('τ');
		span.classList.add('katex-variable');

		let box = label.getBoundingBox();
		label.remove();

		let rect = group.rectangle(box.x - 3, box.y - 3, box.width + 6, box.height + 6);
		rect.style.fill= '#ffffff';
		rect.style.stroke= 'none';
		group.appendChild(label);

		for( let i = 0; i <= config.divide; i ++ ) {
			let a = i*TAU/config.divide;
			let x = border.r*Math.cos(a);
			let y = border.r*Math.sin(a);
			group.line(0, 0, x, -y);

			if( a != 0 ) {
				let label = group.text( x + (this.margin/2)*Math.cos(a), -y - (this.margin/2)*Math.sin(a), `${i}/${config.divide} `);
				label.tspan('τ').classList.add('katex-variable');
				label.classList.add('katex-main', 'text-middle');

				let box = label.getBoundingBox();
				label.remove();

				let rect = group.rectangle(box.x - 3, box.y - 3, box.width + 6, box.height + 6);
				rect.style.fill= '#ffffff';
				rect.style.stroke= 'none';
				group.appendChild(label);
			}
		}

		this.setAngle(config.angle);

		interactive.line(0, 0, this.radius, 0);
		let temp = interactive.circle(this.radius, 0, 3.5);
		temp.fill = '#404040';
		temp.stroke = 'none';

		let radiusLabel = interactive.text((this.radius)/2, 0, "r");
		// radiusLabel.style.alignmentBaseline = 'middle';
		// radiusLabel.style.textAnchor = 'middle';
		radiusLabel.classList.add('katex-variable', 'text-middle');

		let radiusbox = radiusLabel.getBoundingBox();
		radiusLabel.remove();

		let radiusRect = interactive.rectangle(radiusbox.x - 3, radiusbox.y - 3, radiusbox.width + 6, radiusbox.height + 6);
		radiusRect.style.fill= '#ffffff';
		radiusRect.style.stroke= 'none';
		interactive.appendChild(radiusLabel);


		let radiusLine =  interactive.line(0, 0, 0, 0);
		// radiusLine.style.stroke = 'cornflowerblue';
		radiusLine.addDependency( this.point );
		radiusLine.update = () => {
			radiusLine.x2 = this.point.x;
			radiusLine.y2 = this.point.y;
		};
		radiusLine.update();

		interactive.circle(0,0,3).style.fill = '#404040';

		if( config.label ) {
			let textGroup = interactive.text(150, 150,'');
			let text = textGroup.tspan('');
			text.classList.add('katex-main');

			textGroup.addDependency(this.point);
			textGroup.update = () => {
				textGroup.x = this.point.x + 15;
				textGroup.y = this.point.y - 15;
				text.text = `${this.getAngle().toFixed(2)}`;
			};
			textGroup.update();
			let rSpan = textGroup.tspan(' rad');
			rSpan.classList.add('katex-main');
		}

		interactive.root.querySelectorAll("text").forEach( (text) => {

			let bbox = text.getBBox();
			// text.setAttribute('x',`${bbox.x}`);
			text.setAttribute('y',`${parseInt(text.getAttribute('y')) + 5}`);
			text.style.textAnchor = 'middle';
			text.classList.remove('text-middle');
		});

		// interactive.circle(0,0,this.radius + this.MARGIN/2);
	}

	/**
	* Returns the current angle displayed by the interactive
	*/
	getAngle() : number {
		if( this.point.y <= 0 ) {
			return Math.abs(Math.atan2( this.point.y, this.point.x));
		} else {
			return Math.PI*2 - Math.atan2( this.point.y, this.point.x);
		}
	}

	setAngle( value:number ) {
		this.point.translate( this.radius*Math.cos(value), -this.radius*Math.sin(value));
	}
}
