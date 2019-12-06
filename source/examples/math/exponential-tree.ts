/**
* @title Exponents and Trees
* @description This interactive demonstrates how the exponent operator can be visualized with a tree. The base of the expression is represented by the branching factor of the tree, and the exponent is represented by the levels in the tree.
* @tags [math]
* @date October 15, 2019
* @author Kurt Bruns
* @weight 1
*/
import Interactive from "../../interactive.js";
import Line from "../../elements/svg/line.js";
import Circle from "../../elements/svg/circle.js";
import { SVG } from "../../index.js";

class Tree extends SVG {

  // Branching factor
	base:number;

  // Number of levels in the tree
	exponent:number;

  private static maxLevels:number = 7;

  private lines:Line[];
  private nodes:Circle[];
  private currentLine:number;
  private currentNode:number;

  // position of the root of this tree
  rootX:number;
  rootY:number;

  /**
  *
  */
  constructor( rootX:number, rootY:number, base:number, exponent:number) {
    super(0, 5, 740, 300);
    this.rootX = rootX;
    this.rootY = rootY;
    this.base = base;
    this.exponent = exponent;
    this.lines = [];
    this.nodes = [];
    this.currentLine = 0;
    this.currentNode = 0;
    this.draw();
  }

  get leaves() : number {
    return Math.pow(this.base, this.exponent);
  }

  clear() {
    let small = Math.min(this.lines.length, this.nodes.length);
    let big = Math.max(this.lines.length, this.nodes.length);
    for( let i = 0; i < small; i++) {
      this.lines[i].root.remove();
      this.nodes[i].root.remove();
    }
    if ( big === this.lines.length ) {
      for( let i = small; i < big; i++) {
        this.lines[i].root.remove();
      }
    } else {
      for( let i = small; i < big; i++) {
        this.nodes[i].root.remove();
      }
    }
  }

  getNextLine( x1:number, y1:number, x2:number, y2:number) : Line {
    let line : Line;
    if( this.currentLine === this.lines.length ) {
      line = this.line(x1,y1,x2,y2)
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
      node = this.circle(cx,cy,r)
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

  draw( x:number = 0, y:number = 0, ) {
    let prev = [{x:x, y:y}];
    this.currentLine = 0;
    this.currentNode = 0;
    for (let i = 0; i <= this.exponent; i++)  {
        let distance = i*600/(.75*Tree.maxLevels + 1);
        let nodes = Math.pow(this.base, i);
        let change = -Math.PI/(nodes+1);
        let angle = change;
        let next = [];

        for( let j = 0; j < nodes; j ++) {
            let nx = x + distance*Math.cos(angle);
            let ny = y + distance*Math.sin(angle);

            let index = Math.floor( j / this.base);
            let ox = prev[ index ].x;
            let oy = prev[ index ].y;

            let line = this.getNextLine( ox, oy, nx, ny);
            let circle = this.getNextNode(nx, ny, 4);
            if( i == this.exponent ) {
              circle.style.fill = 'cornflowerblue';
							circle.style.stroke = '#404040';
            } else {
              circle.style.fill = '#404040';
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
    if( this.exponent > 1) {
      this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
  }
}

export default function main( id:string ) {

	let interactive = new Interactive(id, {
		width:740,
		height:500,
	});
	interactive.border = true;

	let margin = 40;
	let levels = interactive.slider( interactive.width/2 - 125, 300 + 2*margin, {
	  width:250,
	  min:0,
	  max:4,
	  value:3
	});
	let branching = interactive.slider( interactive.width/2 - 125, 300 + 3*margin, {
	  width:250,
	  min:1,
	  max:4,
	  value:2
	});

	let tree = interactive.appendChild(new Tree(300, 300, branching.value, levels.value ));
	tree.y = 16;
	tree.style.overflow = 'visible';
	tree.addDependency(levels, branching);
	tree.update = function() {
	  let levelsValue = Math.round(levels.value);
	  let branchingValue = Math.round(branching.value);
	  if( tree.exponent !== levelsValue || tree.base !== branchingValue ) {
	    tree.exponent = levelsValue;
	    tree.base = branchingValue;
	    if( tree.leaves <= 1024 ) {
	      tree.draw();
	    }
	  }
	};
	tree.update();
	tree.draw();

	let levelsText = interactive.text( levels.x + levels.width + margin, levels.y, 'exponent');
	let branchingText = interactive.text( branching.x + branching.width + margin, branching.y, 'factor');
	let mathText = interactive.text( interactive.width/2, branching.y + 3*margin/2, '');
	mathText.setAttribute('text-anchor', 'middle');
	let base = mathText.tspan(tree.base.toString());
	let exponent = mathText.tspan(tree.exponent.toString());
	mathText.tspan('= ');
	let leaves = mathText.tspan(tree.leaves.toString());
	exponent.setAttribute('baseline-shift','super');

	levelsText.addDependency(tree);
	levelsText.update = function() {
	  levelsText.contents = `exponent: ${tree.exponent.toString()}`;
	};
	levelsText.update();

	branchingText.addDependency(tree);
	branchingText.update = function() {
	  branchingText.contents = `base: ${tree.base.toFixed()}`;
	};
	branchingText.update();


	base.addDependency(tree);
	base.update = () => {
		base.text = tree.base.toString();
	};
	exponent.addDependency(tree);
	exponent.update = () => {
		exponent.text = tree.exponent.toString();
	}
	leaves.addDependency(tree);
	leaves.update = () => {
		leaves.text = tree.leaves.toString();
	}

}
