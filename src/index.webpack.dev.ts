import './assets/styles/normalize.css';
import './assets/styles/reset.css';

import { Plot } from './modules/plot/plot-grid-based';
import { TrigPlot } from './modules/plot/plot';
import { PlayerLayout, TAU, Path, Point, Text, File, Group, SVG, Artboard, ResponsiveArtboard, GridArtboard, Math2 } from './index';
import { Layout } from './layouts/layout';
import { Grid } from './artboards/grid.alt';

let root = document.getElementById('root');
root.style.maxWidth = `${720}px`;
// root.style.maxWidth = `${3*144 + 2*48 + 2*16}px`;

let count = 0;
function createContainer() {
  let container = document.createElement('div');
  container.id = `container-${count++}`;
  container.style.marginBottom = '1.5rem';
  root.appendChild(container);
  return container;
}

(window as any).download = (id) => {
  File.download(id, `${id}.svg`, 'assets/main.css');
}

let plot = new Plot(createContainer(), {
  x:0,
  y:0,
  width: 600,
  height: 300,
  internalX: -10,
  internalY: -5,
  internalWidth: 20,
  internalHeight: 10,
  f: Math.sin,
  grid: false,
  border: true
});

function sine( n:number ) {
  return (x:number) => {
    let sum = x
    let a = 1
    let sign = -1
    for( let i = 1; i < n; i++) {
      a += 2
      sum += (sign)*(x ** a)/Math2.factorial(a)
      sign *= -1
    }
    return sum
  }
}

let path = plot.addFunction(sine(2))


// let n = 20;
// for( let i = 1; i < n; i++) {
//   let path =plot.addFunction(sine(i))
//   // let value = 200 - (i/n)*127;
//   // path.style.stroke = `rgb(${value},${value},${value})`
// }


// plot.addFunction( (x:number) => { return x })
// plot.addFunction( (x:number) => { return x - (x ** 3)/Math2.factorial(3) })
// plot.addFunction( (x:number) => { return x - (x ** 3)/Math2.factorial(3) + (x ** 5)/Math2.factorial(5) })
// plot.addFunction( (x:number) => { return x - (x ** 3)/Math2.factorial(3) + (x ** 5)/Math2.factorial(5) - (x ** 7)/Math2.factorial(7) })
// plot.addFunction( (x:number) => { return x - (x ** 3)/Math2.factorial(3) + (x ** 5)/Math2.factorial(5) - (x ** 7)/Math2.factorial(7) + (x ** 9)/Math2.factorial(9) })
// plot.addFunction( (x:number) => { return x - (x ** 3)/Math2.factorial(3) + (x ** 5)/Math2.factorial(5) - (x ** 7)/Math2.factorial(7) + (x ** 9)/Math2.factorial(9) - (x ** 11)/Math2.factorial(11) })
plot.draw()