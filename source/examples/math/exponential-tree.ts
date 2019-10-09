import Interactive from "../../interactive.js";
import { getScriptName } from "../../index.js";


class Tree {

  // Branching factor
  private _factor:number;

  // Number of levels in the tree
  private _levels:number;

  // Number of leaves in the tree
  private _leaves:number;

  private static maxLevels:number = 7;

  // position of the root of this tree
  x:number;
  y:number;

  interactive:Interactive;

  /**
  *
  */
  constructor( interactive:Interactive, x:number, y:number) {
    this.interactive = interactive;
    this.x = x;
    this.y = y;
    this._factor = 3;
    this._levels = 3;
    this._leaves =  Math.pow(this.factor, this.levels);
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
    this.helper( this.x, this.y, 10);
  }

  helper( x:number, y:number, initial_radius:number) {
    let prev = [{x:x, y:y}];

    for (let i = 0; i <= this.levels; i++)  {
        let distance = i*this.interactive.width/(2*Tree.maxLevels + 1);
        let nodes = Math.pow(this.factor, i);
        let change = -Math.PI/(nodes+1);
        let angle = change;
        // let radius = 10/(this.factor*Math.log(i+1));
        let radius = initial_radius/Math.log(3*i + nodes);
        if( this.interactive.width < 720 ) { radius *= 720/this.interactive.width}
        if (radius > 7) {radius = 7;}
        let next = [];

        for( let j = 0; j < nodes; j ++)
        {
            let nx = x + distance*Math.cos(angle);
            let ny = y + distance*Math.sin(angle);

            let index = Math.floor( j / this.factor);
            let ox = prev[ index ].x;
            let oy = prev[ index ].y;

            let line = this.interactive.line( ox, oy, nx, ny);
            let circle = this.interactive.circle(nx, ny, 4);
            // let circle = this.interactive.circle(nx, ny, radius);
            if( i == this.levels ) {
              circle.style.fill = 'cornflowerblue';
            } else {
              circle.style.fill = '#404040';
            }


            next.push({x:nx, y:ny});

            angle += change;
        }
        prev = next;
    }
  }
}

let interactive = new Interactive(getScriptName());
interactive.height = 400;
interactive.width = 740;

let margin = 30;
let levels = interactive.slider( 150, 300 + margin, 400, 0);
let branching = interactive.slider( 150, 300 + 2*margin, 400, 0);
let leaves = interactive.slider(150, 300 + 3*margin, 400, 0);

let tree = new Tree(interactive, interactive.width/2, 300);

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
