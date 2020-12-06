import '../styles/normalize.css';
import '../styles/reset.css';
import '../styles/sandbox.css';
import { TrigPlot } from './elements/math/plot';
import { Grid } from './elements/math/grid';
import { AnimationPlayer, Interactive, TAU, Path, Point, Text, File, Group, SVG, SVGResponsiveTemplate } from './index';
import { Template } from './templates/template';

(window as any).download = File.download;

let root = document.getElementById('root');
root.style.maxWidth = `${720}px`;
// root.style.maxWidth = `${3*144 + 2*48 + 2*16}px`;

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

let grid = new Grid(createContainer(), {
  width:3*144,
  height:3*144,
  // width:400,
  // height:400,
  internalX:-10,
  internalY:-10,
  internalWidth: 20,
  internalHeight: 20
});
grid.drawGridLines();

grid.circle(5,5,3);

let svgContainer = new Interactive(createContainer(), {
  width: 432 + 2*48,
  height: 216 + 2*48,
  responsive: false
});

svgContainer.root.style.border = '1px solid #aaaaaa';

let sinPlot = new TrigPlot( svgContainer.root, Math.sin, {x:48, y:48});

let text = svgContainer.text(svgContainer.width/2, 24, 'Cosine');
text.style.textAnchor = 'middle';
text.style.dominantBaseline = 'middle';

let labels = svgContainer.group();
labels.classList.add('katex');

let bbox = svgContainer.root.getBoundingClientRect();
let n = 10;
for( let i = 0; i <= n; i += 2.5) {

  let x = (i/n)*TAU;
  let y = 0;
  let p = sinPlot.SVGToScreen(x, y);
  let label = labels.text(p.x - bbox.left, svgContainer.height - 24, `${(i/n).toString()}τ`);
  label.style.textAnchor = 'middle';
  label.style.dominantBaseline = 'middle';
}

for( let y = -1; y <= 1; y++) {
  let x = 0
  let p = sinPlot.SVGToScreen(x, y);
  let label = labels.text(24, p.y - bbox.top, y.toString());
  label.style.textAnchor = 'middle';
  label.style.dominantBaseline = 'middle';
  label.classList.add('katex-main');
}

let sinPlot2 = new TrigPlot( createContainer(), Math.sin, {x:48, y:48});
let cosPlot2 = new TrigPlot( createContainer(), Math.cos, {x:48, y:48});
let tanPlot2 = new TrigPlot( createContainer(), Math.tan, {x:48, y:48, height:10*48});
let cscPlot2 = new TrigPlot( createContainer(), (x) => {return 1/Math.sin(x)}, {height:480});
let secPlot2 = new TrigPlot( createContainer(), (x) => {return 1/Math.cos(x)}, {height:480});
let cotPlot2 = new TrigPlot( createContainer(), (x) => {return 1/Math.tan(x)}, {height:480});
let asinPlot = new TrigPlot( createContainer(), Math.asin, {
  internalX: -2,
  internalY: -TAU/4,
  internalWidth: 4,
  internalHeight: TAU/2,
  width: 288*2,
  height: 576
});
