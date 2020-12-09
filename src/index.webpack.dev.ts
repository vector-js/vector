import './assets/styles/normalize.css';
import './assets/styles/reset.css';
import './assets/styles/sandbox.css';

import { File } from './util/file';
import { Plot } from './modules/plots/plot-grid-based';
import { PlayerLayout } from './index';

(window as any).download = File.download;

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

let layout = new PlayerLayout(createContainer(), {
  width:400
});



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