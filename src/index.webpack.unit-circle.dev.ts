// import '../styles/normalize.css';
// import '../styles/reset.css';
// import '../styles/sandbox.css';
// import { TrigPlot } from './modules/plot/plot';
// import { PlayerLayout, Artboard, TAU, Path, Point, Text, File, Group, SVG, ResponsiveArtboard, GridArtboard } from './index';
// import { Layout } from './layouts/layout';

// (window as any).download = File.download;

// let root = document.getElementById('root');
// // root.style.maxWidth = `${720}px`;
// root.style.maxWidth = `${928 + 48}px`;

// let count = 0;
// function createContainer() {
//   let container = document.createElement('div');
//   container.id = `container-${count++}`;
//   container.style.marginBottom = '1.5rem';
//   // container.style.padding = '48px';
//   // container.style.border = '1px solid #aaaaaa';
//   // let heading = container.appendChild(document.createElement('div'))
//   // heading.textContent = 'heading'
//   // heading.style.height = '48px'
//   // heading.style.display = 'grid';
//   // heading.style.placeItems = 'center';
  
//   root.appendChild(container);
//   return container;
// }

// let width = 288;
// let height = 288;
// let container = createContainer();
// let player = new PlayerLayout(container, {
//   width:width,
//   value: TAU/8,
//   min: 0,
//   max: TAU,
//   loop: true
// });


// // let radians = player.addCheckbox(player.root, false, 'radians');
// // let tau = player.addCheckbox(player.root, false, 'radians τ (tau)');
// // let pi = player.addCheckbox(player.root, false, 'radians π (pi)');
// // let degrees = player.addCheckbox(player.root, false, 'degrees');

// let grid = new GridArtboard(player.canvas, {
//   width:width,
//   height:height,
//   internalX:-width/2,
//   internalY:-height/2,
//   internalWidth: width,
//   internalHeight: height
// });
// // grid.drawBorder();
// // grid.drawGridLinesTest();

// let r = 100;
// grid.circle(0,0,r);



// let hline = grid.line(0,0,0,0)
// let vline = grid.line(0,0,0,0)
// let rline = grid.line(0,0,0,0)


// let path = grid.path('');
// path.classList.add('default');
// path.addDependency(player);
// // path.root.style.fill = `rgb(0, 0, 255)`;
// // path.attatchArrow( this.defs(), false);

// // path.root.style.stroke = 'none';
// path.update = () => {
// 	let angle = player.scrubber.value;
// 	let flag = (angle > TAU/2) ? 1 : 0;
// 	let x = r*Math.cos(angle);
// 	let y = -r*Math.sin(angle);
// 	path.d = `M ${r} 0
// 						A ${r} ${r} 0 ${flag} 0 ${x} ${y}`;
// };
// path.update();
// path.style.stroke = '#c74440';
// path.style.strokeWidth = '2';

// let d = 'M 0 0 l 10 5 l -10 5 z';
// let defs = grid.defs();
// let marker = defs.marker(9, 5, 10, 10);
// let markerPath =  marker.path(d)
// markerPath.style.fill = '#c74440';
// markerPath.style.stroke = 'none';
// // markerPath.style.fillOpacity = '.5';
// marker.setAttribute('orient', 'auto');
// marker.setAttribute('markerUnits', 'userSpaceOnUse' );
// path.setAttribute('marker-end', `url(#${marker.id})`);



// let a = TAU/8;
// let p = new Point(0, 0);

// p.addDependency(player)
// p.update = () => {
//   let a = player.scrubber.value;
//   p.x =  r*Math.cos(a);
//   p.y = -r*Math.sin(a);
// }
// p.update()

// hline.addDependency(p)
// hline.update = () => {
//   hline.y1 = p.y;
//   hline.y2 = p.y;
//   hline.x2 = p.x;
// }
// hline.update();

// vline.addDependency(p)
// vline.update = () => {
//   vline.x1 = p.x;
//   vline.x2 = p.x;
//   vline.y2 = p.y;
// }
// vline.update();

// rline.addDependency(p)
// rline.update = () => {
//   rline.x2 = p.x;
//   rline.y2 = p.y;
// }
// rline.update();

// vline.style.stroke = 'rgb(72, 91, 252)';



// let displayPoint = grid.circle(0,0,3);
// displayPoint.style.fill = '#404040';
// displayPoint.addDependency(p);
// displayPoint.update = () => {
//   displayPoint.cx = p.x
//   displayPoint.cy = p.y
// }
// displayPoint.update()

// grid.circle(0,0,3).style.fill = '#404040';
// grid.circle(r,0,3).style.fill = '#404040';

// let plotContainer = document.createElement('div')
// container.appendChild(plotContainer)
// // plotContainer.style.margin = '0 1rem';

// let sine = new TrigPlot( plotContainer, Math.sin, {x:48, y:48});
// // let cosine = new TrigPlot( plotContainer, Math.cos, {x:48, y:48});
// // let tangent = new TrigPlot( plotContainer, Math.tan, {x:48, y:48});
// sine.border.stroke = '#cccccc';

// // sine.root.style.marginBottom = '1rem';
// // cosine.root.style.marginBottom = '1rem';

// container.style.display = 'grid';
// container.style.gridTemplateColumns = 'auto auto';

// player.root.style.margin = '0';

// player.addCustomVariableDisplay(player.root, 'θ', () => {
//   return (player.scrubber.value/TAU).toFixed(2) + ' τ';
// });
// player.addCustomVariableDisplay(player.root, 'x', () => {
//   return (p.x/r).toFixed(3);
// });
// player.addCustomVariableDisplay(player.root, 'y', () => {
//   return (-p.y/r).toFixed(3);
// });