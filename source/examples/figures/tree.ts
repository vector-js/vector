/**
* @ignore true
*/

// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, Point, Control, Path, Circle, AnimationPlayer, Line, Group} from '../../index.js';
import { TAU } from '../../util/constants.js';
import { InteractiveOptions } from '../../elements/interactive.js';

export interface Configuration extends InteractiveOptions {
	y:number;
	b:number;
}

/**
* A treefigure demonstrates a visual representation of a tree structure that
* follows relatively strict rules. For example, the branching factor and levels
* of the tree are explicit.
*/
export class TreeFigure extends Interactive {

	/**
	* The number of levels to the tree.
	*/
	_y:number;

	/**
	* The branching factor of the tree.
	*/
	_b:number;

	/**
	* Max levels for the tree
	*/
	static maxLevels:number = 5;

	private lineGroup:Group;
	private circleGroup:Group;
	private lines:Line[];
	private nodes:Circle[];
	private currentLine:number;
	private currentNode:number;

	/**
	* Default configuration of the tree figure.
	*/
	static default : Configuration = {
		y: 3,
		b: 2
	}

	/**
	* Construct a new figure within the provided identitify and configuration.
	*/
	constructor( id :string, options = TreeFigure.default) {

		// Prioritize user options over user options
		let config = { ...TreeFigure.default, ...options };

		super(id, options);

		let bbox = this.container.getBoundingClientRect();
		console.log(bbox);
		if( bbox.width < this.width ) {
			this.width = bbox.width;
		}

		this.originX = this.width/2;
		this.originY = this.height;

		this._y = config.y;
		this._b = config.b;

		this.lines = [];
		this.nodes = [];

		this.lineGroup = this.group();
		this.circleGroup = this.group();

		this.lineGroup.style.stroke = '#404040';
		this.lineGroup.style.strokeWidth = '1px';
		this.circleGroup.style.fill = '#404040';
		this.circleGroup.style.stroke = '#404040';
		this.circleGroup.style.strokeWidth = '1px';

		this.root.style.overflow = 'visible';

		this.draw();

		console.log(this);
	}

	/**
	* Sets the branching factor of the tree.
	*/
	setBranchingFactor(x:number, draw:boolean = true) {
		let temp = Math.floor(x);
		if( temp !== this._b ) {
			this._b = temp;
			if( draw ) {
				this.draw();
			}
		}
	}

	/**
	* Sets the levels of the tree.
	*/
	setLevels(x:number, draw:boolean = true) {
		let temp = Math.floor(x);
		if( temp !== this._y ) {
			this._y = temp;
			if( draw ) {
				this.draw();
			}
		}
	}

	/**
	* Returns the current number of leaves the tree has.
	*/
	get leaves() : number {
		return Math.pow(this._b, this._y);
	}

	draw( x:number = 0, y:number = 0, ) {

		let prev = [{x:x, y:y}];
		this.currentLine = 0;
		this.currentNode = 0;

		for (let i = 0; i <= this._y; i++)  {

			// let temp = i > this._y ? this._y : i;
			// let distance = temp*600/(.75*TreeFigure.maxLevels + 1);

			let distance = i*600/(.75*TreeFigure.maxLevels + 1);
			let nodes = Math.pow(this._b, i);
			let change = -Math.PI/(nodes+1);
			let angle = change;
			let next = [];

			for( let j = 0; j < nodes; j ++) {
					let nx = x + distance*Math.cos(angle);
					let ny = y + distance*Math.sin(angle);

					let index = Math.floor( j / this._b);
					let ox = prev[ index ].x;
					let oy = prev[ index ].y;

					let line = this.getNextLine( ox, oy, nx, ny);
					let circle = this.getNextNode(nx, ny, 4);
					if( i == this._y ) {
						circle.style.fill = 'cornflowerblue';
					} else {
						circle.style.fill = '';
					}
					next.push({x:nx, y:ny});
					angle += change;
			}
			prev = next;
		}

    for( let i = this.currentLine; i < this.lines.length; i++) {
      this.lines[i].root.style.display = 'none';
    }
    for( let i = this.currentNode; i < this.nodes.length; i++) {
      this.nodes[i].root.style.display = 'none';
    }
    let bbox = this.root.getBBox();

    if( this._y > 1) {
      this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
  }

	getNextLine( x1:number, y1:number, x2:number, y2:number) : Line {
		let line : Line;
		if( this.currentLine === this.lines.length ) {
			line = this.lineGroup.line(x1,y1,x2,y2)
			this.lines.push(line);
		} else {
			line = this.lines[this.currentLine];
			line.x1 = x1;
			line.y1 = y1;
			line.x2 = x2;
			line.y2 = y2;
		}
		this.currentLine++;
		line.root.style.display = '';
		return line;
	}

	getNextNode( cx:number, cy:number, r:number) : Circle {
		let node : Circle;
		if( this.currentNode === this.nodes.length ) {
			node = this.circleGroup.circle(cx,cy,r)
			this.nodes.push(node);
		} else {
			node = this.nodes[this.currentNode];
			node.cx = cx;
			node.cy = cy;
			node.r = r;
		}
		this.currentNode++;
		node.root.style.display = '';
		return node;
	}
}