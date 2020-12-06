import './assets/styles/normalize.css';
import './assets/styles/reset.css';
import './assets/styles/sandbox.css';
import { TrigPlot } from './elements/math/plot';
import { Grid } from './elements/math/grid';
import { AnimationPlayer, Interactive, TAU, Path, Point, Text, File, Group, SVG, SVGResponsiveTemplate } from './index';
import { Template } from './templates/template';

(window as any).download = File.download;

let root = document.getElementById('root');
// root.style.maxWidth = `${720}px`;
root.style.maxWidth = `${928 + 48}px`;

let count = 0;
function createContainer() {
  let container = document.createElement('div');
  container.id = `container-${count++}`;
  container.style.marginBottom = '1.5rem';
  // container.style.padding = '48px';
  // container.style.border = '1px solid #aaaaaa';
  // let heading = container.appendChild(document.createElement('div'))
  // heading.textContent = 'heading'
  // heading.style.height = '48px'
  // heading.style.display = 'grid';
  // heading.style.placeItems = 'center';
  
  root.appendChild(container);
  return container;
}

// let w = 5;
// let h = 4;
// let width = w*48*2;
// let height = h*48*2;

let w = 6;
let h = 6;
let width = w*96;
let height = h*96; 
let container = createContainer();
let grid = new Grid(container, {
  width:width,
  height:height,
  internalX:0,
  internalY:0,
  internalWidth: w*10,
  internalHeight: h*10
});
grid.drawGridLines();
grid.drawBorder();
grid.border.style.stroke = '#cccccc';

grid.circle(20, 20, 5);