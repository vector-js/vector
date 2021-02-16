import './assets/styles/normalize.css';
import './assets/styles/reset.css';

import { File } from './util/file';
import { Plot } from './modules/plot/plot-grid-based';
import { Artboard, PlayerLayout, ResponsiveArtboard } from './index';

// (window as any).download = File.download;

let root = document.getElementById('root');
root.style.maxWidth = `${720}px`;

let count = 0;
function createContainer() {
  let container = document.createElement('div');
  container.id = `container-${count++}`;
  container.style.marginBottom = '1.5rem';
  
  root.appendChild(container);
  return container;
}

let size = 50;
let w = 6;
let h = 6;
let width = w*size;
let height = h*size;

export class ArtboardExample extends ResponsiveArtboard {
	
	constructor(container) {


		let padding = 16;
		super(container, {
			width:width,
			height:height,
			maxWidth: width,
			align: 'left'
    });
    
    let outline = this.rect(.5,.5,this.width - 1, this.height - 1);
    outline.style.stroke = '#dddddd';
    outline.style.strokeWidth = '1';
    outline.style.fill = 'none';
    this.root.appendChild(outline.root);

    let background = this.rect(0,0,this.width,this.height);
    background.style.fill = '#ffffff';
    this.root.prepend(background.root);

		this.container.style.overflow = 'hidden';

		this.drawGrid(false, false);
		this.style.overflow = 'visible';

		// Custom handle margin because of constraint on control point
		// this.style.padding = `${padding}px`;
		// this.style.margin = '1rem auto 1.5rem auto';
		this.container.style.margin = '0';
		// template.root.style.outline = '1px solid #cccccc';

		// template.text(template.x + template.width/2, template.y + template.height + 24, `${template.width}px`);
		// template.text(template.x + template.width/2, template.y + template.height + 24, `${template.width}px`);

		// let control = this.control(100,100);
		// control.constrainWithinBox(0,0, this.width, this.height);
		// let text = this.text(0,0,'');

		// text.addDependency(control);
		// text.update = () => {
		// 	text.x = control.x + 16;
		// 	text.y = control.y + 16;
		// 	text.contents = `(${control.x.toFixed(0)}, ${control.y.toFixed(0)})`;
		// };
    // text.update();
  }
}

let grid = new ArtboardExample(createContainer());

(window as any).download = () => {
  File.download(grid.id, `grid-size-${size}px-${w}-${h}.svg`, 'assets/main.css');
}


// let f = (x:number) => {
//   return x*x;
// }

// // NOTE: here the aspect ratios agree
// let plot = new Plot(createContainer(), {

//   // external dimensions
//   width:3*144,
//   height:3*144,

//   // internal coordinate system
//   internalWidth: 10, // 600/50
//   internalHeight: 10,

//   // this sets the location of the origin
//   internalX: -0,
//   internalY: -10,

//   // function to plot
//   f:f
// });


// // for( let i = 1; i < 5; i++) {
// //   plot.addFunction((x:number) => {
// //     return (1/Math.pow(2,i))*x*x;
// //   });
// //   plot.draw();
// // }

// plot.drawBorder();