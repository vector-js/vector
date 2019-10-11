import Interactive from "../../interactive.js";
import Line from "../../elements/svg/line.js";
import Circle from "../../elements/svg/circle.js";
import { SVG, getScriptName } from "../../index.js";

class Tree extends SVG {

  // Branching factor
  private _factor:number;

  // Number of levels in the tree
  private _levels:number;

  // Number of leaves in the tree
  private _leaves:number;

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
  constructor( rootX:number, rootY:number, levels:number, factor:number) {
    super(0, 5, 740, 300);
    this.rootX = rootX;
    this.rootY = rootY;
    this._factor = factor;
    this._levels = levels;
    this._leaves =  Math.pow(this.factor, this.levels);
    // this.setViewBox(-rootX, -rootY, 600, 300);
    this.lines = [];
    this.nodes = [];
    this.currentLine = 0;
    this.currentNode = 0;
    this.draw();
  }

  set factor( n:number ) {
    this._factor = n;
    this._leaves =  Math.pow(this.factor, this.levels);
  }

  get factor() : number {
    return this._factor;
  }

  set levels( n:number ) {
    this._levels = n;
    this._leaves = Math.pow(this.factor, this.levels);
  }

  get levels() : number {
    return this._levels;
  }

  get leaves() : number {
    return this._leaves;
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

  /**
  Draws itself in the view
  */
  draw() {
    // let circle = interactive.circle(this.x, this.y, 10);
    // circle.style.fill = '#404040';
    // this.x = canvas.width/2;
    // this.y = canvas.height - 50*(canvas.width/720);
    //
    // let radius = 10*canvas.width/720;
    this.helper( 0, 0, 10);
  }

  helper( x:number, y:number, initial_radius:number) {
    let prev = [{x:x, y:y}];
    this.currentLine = 0;
    this.currentNode = 0;

    for (let i = 0; i <= this.levels; i++)  {
        let distance = i*600/(.75*Tree.maxLevels + 1);
        // let distance = 200;
        let nodes = Math.pow(this.factor, i);
        let change = -Math.PI/(nodes+1);
        let angle = change;
        // let radius = 10/(this.factor*Math.log(i+1));
        // if( this.interactive.width < 720 ) { radius *= 720/this.interactive.width}
        let next = [];

        for( let j = 0; j < nodes; j ++)
        {
            let nx = x + distance*Math.cos(angle);
            let ny = y + distance*Math.sin(angle);

            let index = Math.floor( j / this.factor);
            let ox = prev[ index ].x;
            let oy = prev[ index ].y;

            let line = this.getNextLine( ox, oy, nx, ny);
            let circle = this.getNextNode(nx, ny, 4);
            // let circle = this.interactive.circle(nx, ny, radius);
            if( i == this.levels ) {
              circle.style.fill = 'cornflowerblue';
            } else {
              // circle.style.fill = '#f8f8f8';
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
    if( this.levels > 1) {
      this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
  }
}

let interactive = new Interactive(getScriptName());
interactive.height = 500;
interactive.width = 740;

let margin = 40;
let levels = interactive.slider( interactive.width/2 - 125, 300 + 2*margin, {
  width:250,
  min:0,
  max:10,
  value:2
});
let branching = interactive.slider( interactive.width/2 - 125, 300 + 3*margin, {
  width:250,
  min:1,
  max:10,
  value:3
});


let levelsText = interactive.text( 550 + 20, 300 + 1*margin + 4, 'levels');
let branchingText = interactive.text( 550 + 20, 300 + 2*margin + 4, 'factor');
let leavesText = interactive.text( 550 + 20, 300 + 3*margin + 4, 'leaves');

let tree = interactive.appendChild(new Tree(300, 300, levels.value, branching.value));
tree.style.overflow = 'visible';
tree.addDependency(levels, branching);
tree.update = function() {
  let levelsValue = Math.floor(levels.value);
  let branchingValue = Math.floor(branching.value);
  if( tree.levels !== levelsValue || tree.factor !== branchingValue ) {
    tree.levels = levelsValue;
    tree.factor = branchingValue;
    if( tree.leaves <= 1024 ) {
      tree.draw();
    }
  }
};
tree.draw();

levelsText.addDependency(tree);
levelsText.update = function() {
  levelsText.contents = `levels: ${tree.levels.toString()}`;
};
levelsText.update();

leavesText.addDependency(tree);
leavesText.update = function() {
  leavesText.contents = `leaves: ${tree.leaves.toFixed()}`;
};
leavesText.update();

branchingText.addDependency(tree);
branchingText.update = function() {
  branchingText.contents = `base: ${tree.factor.toFixed()}`;
};
branchingText.update();


//
// function main()
// {
//     let id = 'interactive-exponent';
//     let counter = 0;
//     let max = 1024;
//
//     let root = document.getElementById(id);
//     let div = document.createElement('div');
//     let canvas = document.createElement('canvas');
//     canvas.id = 'interactive-exponent-canvas';
//     canvas.width = 720;
//     canvas.height = 400;
//
//     function number( container: HTMLElement, value:number, min:number, max:number, step:number, name:string) : HTMLInputElement
//     {
//         let n_id = id + counter++;
//
//         let label = document.createElement('label');
//         label.classList.add('grid-item');
//         label.setAttribute('for', n_id);
//         label.innerText = name;
//         container.appendChild(label);
//
//         let input = document.createElement('input');
//         input.classList.add('grid-item');
//         input.type = 'number';
//         input.id = n_id;
//         input.value = value.toString();
//         input.min = min.toString();
//         input.max = max.toString();
//         input.step = step.toString();
//         container.appendChild(input);
//
//         return input;
//     }
//
//     let levels = number(div, 4, 0, 6, 1, 'levels (y)');
//     let factor = number(div, 2, 1, 10, 1, 'branching factor (b)');
//     let leaves = number(div, 16, 1, 20, 1, 'leaves (x)');
//     leaves.readOnly = true;
//     div.classList.add('grid2');
//     root.appendChild(canvas);
//     root.appendChild(div);
//     if( screen.width < 720 )
//     {
//         canvas.width = screen.width - 20;
//         canvas.height = canvas.height*(canvas.width/720);
//         levels.max = '4';
//         levels.value = '3';
//     }
//
//
//
//
//     let tree = new Tree( parseInt(factor.value), parseInt(levels.value));
//     leaves.value = tree.leaves.toString();
//     tree.draw();
//
//     levels.onchange = function(){
//
//         let value = parseInt(levels.value);
//         if( isNaN(value) ) { value = parseInt(levels.min) }
//         if( value > parseInt(levels.max) ) { value = parseInt(levels.max) }
//         if( value < parseInt(levels.min) ) { value = parseInt(levels.min) }
//         tree.levels = value;
//
//         // console.log( tree.leaves);
//         // console.log( Math.pow(tree.factor, tree.levels));
//
//         // Should be changed to binary search
//         while(  tree.leaves  > max )
//         {
//             tree.levels--;
//         }
//         levels.value = tree.levels.toString();
//         let context = canvas.getContext('2d') as CanvasRenderingContext2D;
//         context.clearRect(0, 0, canvas.width, canvas.height);
//
//         tree.draw();
//         leaves.value = tree.leaves .toString();
//
//     };
//
//     factor.onchange = function(){
//
//         let value = parseInt(factor.value);
//         if( isNaN(value) ) { value = parseInt(factor.min) }
//         if( value > parseInt(factor.max) ) { value = parseInt(factor.max) }
//         if( value < parseInt(factor.min) ) { value = parseInt(factor.min) }
//         tree.factor = value ;
//
//         // Should be changed to binary search
//         while( tree.leaves > max )
//         {
//             tree.factor--;
//         }
//         factor.value = tree.factor.toString();
//
//         let context = canvas.getContext('2d') as CanvasRenderingContext2D;
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         tree.draw();
//         leaves.value = tree.leaves.toString();
//
//     };
// }
// main();
