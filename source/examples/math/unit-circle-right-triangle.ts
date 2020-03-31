/**
* @title Unit Circle Right Triangle
* @description This interactive demonstrates how a point along the circumference of the unit circle forms a right triangle with the adjacent side corresponding to the x-position of the point and the opposite side corresonding to the y-position of the point.
* @tags [math]
* @date June 9, 2019
* @author Kurt Bruns
*/

import {Interactive} from '../../index.js';
import katex from '/katex/katex.module.js';

export default function main(id) {

  let margin = 25;
  let radius = 100;

  // Initialize the interactive
  let interactive = new Interactive(id);
  interactive.window = false;
  interactive.width = radius*2 + 4*margin;
  interactive.height = radius*2 + 3*margin;
  interactive.originX = interactive.width/2;
  interactive.originY = interactive.height/2 + margin/2;
  interactive.root.style.overflow = 'visible';
  interactive.classList.add('center');

  // Create a circle
  let circle = interactive.circle( 0, 0, radius);
  circle.classList.add('default');

  let xAxis = interactive.line( -(radius + margin), 0, radius + margin, 0);
  let yAxis = interactive.line( 0, -(radius + margin), 0, radius + margin);
  let marker = interactive.marker(10, 5, 10, 10);
  marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
  marker.setAttribute('orient', 'auto-start-reverse');
  xAxis.setAttribute('marker-end', `url(#${marker.id})`);
  xAxis.setAttribute('marker-start', `url(#${marker.id})`);
  yAxis.setAttribute('marker-end', `url(#${marker.id})`);
  yAxis.setAttribute('marker-start', `url(#${marker.id})`);

  let xAxisLabel = interactive.text( xAxis.x2 + margin/3, xAxis.y2, 'x');
  xAxisLabel.setAttribute('alignment-baseline','middle');
  xAxisLabel.style.fontFamily = 'KaTeX_Math';
  xAxisLabel.style.fontSize = '22px';
  let yAxisLabel = interactive.text( yAxis.x1, yAxis.y1 - margin/2, 'y');
  yAxisLabel.setAttribute('text-anchor','middle');
  yAxisLabel.style.fontFamily = 'KaTeX_Math';
  yAxisLabel.style.fontSize = '22px';

  // Create a control
  let control = interactive.control( circle.r*Math.cos(-1), circle.r*Math.sin(-1));
  control.constrainToCircle( circle.cx, circle.cy, circle.r);

  let xComponent = document.createElement('div');
  document.getElementById(id).appendChild(xComponent);

  let yComponent = document.createElement('div');
  document.getElementById(id).appendChild(yComponent);

  // Create a path
  let path = interactive.path('');
  path.classList.add('default');
  path.root.style.fill = 'rgb(236,236,236)';
  path.update = function() {
    path.d = `M 0 0
              L ${control.x} 0
              L ${control.x} ${control.y}
              z`;

    katex.render(`x = ${(control.x/circle.r).toFixed(2)}`, xComponent, {
      displayMode: true,
    });

    katex.render(`y = ${(-control.y/circle.r).toFixed(2)}`, yComponent, {
      displayMode: true,
    });
  };
  path.update();
  path.addDependency(control);

  // Create a point at the origin
  let point = interactive.circle( 0, 0, 3);
  point.fill = 'black';
}
