/**
* @title Unit Circle Sine
* @description This interactive demonstrates the properties of the unit circle in relation to the trignometric function sine
* @tags [math]
* @date October 9, 2019
* @ignore true
*/

import {Interactive, Group, Point, Line } from '../../index.js';
import {TAU} from '../../util/constants.js'
import katex from '/katex/katex.module.js';

export default function main(id:string) {

  // Create Katex component
  let functionDisplay = document.createElement('div');
  document.getElementById(id).appendChild(functionDisplay);

  // Initialize the interactive
  let interactive = new Interactive(id);
  let width = 230;
  let scale = width/Math.PI;
  let radius = scale;
  let margin = 2*radius - width/2;
  interactive.height = width + margin;
  interactive.width = width + margin + 2*width + 6;
  let f = Math.cos;

  class NumberWrapper extends Group {
    private _value:number;
    constructor( value:number ) {
      super();
      this._value = value;
    }
    get value():number {
      return this._value;
    }
    set value(value:number) {
      this._value = value;
      this.updateDependents();
    }
  }

  let angle = new NumberWrapper(0);

  let circleInteractive = interactive.interactive(0, 0); // TODO: check this logic
  circleInteractive.rectangle(-width/2,-width/2, width, width).classList.add('default');
  circleInteractive.height = width;
  circleInteractive.width = width;
  circleInteractive.originX = circleInteractive.width/2;
  circleInteractive.originY = circleInteractive.height/2;
  let triangle = circleInteractive.path('');
  triangle.classList.add('default');
  let circle = circleInteractive.circle(0,0,radius);
  circle.classList.add('default');
  let control = circleInteractive.control(circle.r, 0);
  control.constrainTo(circle);
  control.addDependency(angle);
  control.update = function() {
    this.x = circle.r*Math.cos(angle.value);
    this.y = -circle.r*Math.sin(angle.value)
  }
  control.onchange = function() {
    if( control.y <= 0 ) {
      angle.value = Math.abs(Math.atan2( control.y, control.x));
    } else {
      angle.value = Math.PI*2 - Math.atan2( control.y, control.x);
    }
  }

  // triangle.addDependency(control, angle);
  // if( f === Math.tan ) {
  //   triangle.update = function() {
  //     triangle.d = `M 0 0
  //                   L ${circle.r/Math.cos(angle.value)} 0
  //                   L ${control.x} ${control.y}
  //                   Z`;
  //   };
  // } else {
  //   triangle.update = function() {
  //     triangle.d = `M 0 0
  //                   L ${control.x} 0
  //                   L ${control.x} ${control.y}
  //                   Z`;
  //   };
  // }
  // triangle.update();
  // triangle.style.stroke = 'none';
  // triangle.style.fill = '#f8f8f8';

  let xLine : Line = circleInteractive.line(0,0,0,0);
  xLine.update = function() {
    xLine.x2 = control.x;
    xLine.y1 = control.y;
    xLine.y2 = control.y;
  };
  xLine.classList.add('default');

  let yLine : Line = circleInteractive.line(0,0,0,0);
  yLine.update = function() {
    yLine.x1 = control.x;
    yLine.x2 = control.x;
    yLine.y2 = control.y;
  };
  yLine.classList.add('default');

  let rLine : Line = circleInteractive.line(0,0,0,0);
  rLine.update = function() {
    rLine.x1 = 0;
    rLine.y1 = 0;
    rLine.x2 = control.x;
    rLine.y2 = control.y;
  };
  rLine.classList.add('default');

  switch(f) {
    case Math.cos:
      xLine.style.stroke = '#0366EE';
      xLine.style.strokeWidth = '2';
      break;
    case Math.sin:
      yLine.style.stroke = '#0366EE';
      yLine.style.strokeWidth = '2';
      break;
  }

  // side.setAttribute('transform', 'scale(1,-1)');
  xLine.addDependency(angle, control);
  yLine.addDependency(angle, control);
  rLine.addDependency(angle, control);
  xLine.update();
  yLine.update();
  rLine.update();

  // Create a path
  let path = circleInteractive.path('');
  path.classList.add('default');
  path.root.style.stroke = '#e63946';
  path.root.style.strokeWidth = '2px';
  path.update = function() {
    let flag = (control.y > 0) ? 1 : 0;
    path.d = `M ${circle.cx + circle.r} ${circle.cy}
              A ${circle.r} ${circle.r} 0 ${flag} 0 ${control.x} ${control.y}`;
  };
  path.update();
  path.addDependency(control);

  circleInteractive.circle(0,0,3).style.fill = '#404040';
  circleInteractive.circle(circle.r,0,3).style.fill = '#404040';

  let plotInteractive = interactive.interactive(width + margin, 0, {
    width:2*width,
    height:width
  });
  let plot = plotInteractive.plot(f, {
    scaleX: scale,
    scaleY: scale,
    originX: 0,
    originY: width/2,
    width: 2*width,
    height: width,
    margin: 0,
    labels: false,
    zoomable: false,
    displayPoint: false,
    grid: true,
    border: true
  });

  let line2 = plot.staticGroup.line(0,0,0,0);
  line2.setAttribute('transform', 'scale(1,-1)');
  line2.style.stroke = '#e63946';
  line2.style.strokeWidth = '2';
  line2.addDependency(angle);
  line2.update = function() {
    line2.x1 = 0;
    line2.y1 = 0;
    line2.x2 = scale*angle.value;
    line2.y2 = 0;
  };

  let line = plot.staticGroup.line(0,0,0,0);
  line.setAttribute('transform', 'scale(1,-1)');
  line.style.stroke = '#0366EE';
  line.style.strokeWidth = '2';
  line.addDependency(angle);
  line.update = function() {
    line.x1 = scale*angle.value;
    line.y1 = 0;
    line.x2 = line.x1;
    line.y2 = plot.call(plot.function, line.x1);
    katex.render(`\\cos (\\textcolor{#e63946}{${(angle.value/TAU).toFixed(3)} \\tau}) = \\textcolor{#0366EE}{${f(angle.value).toFixed(3)}}`, functionDisplay, {
      displayMode: true,
    });
  };

  let chartControl = interactive.control(0,0);
  plot.staticGroup.appendChild(chartControl);
  chartControl.addDependency(angle, plot);
  chartControl.update = function() {
    chartControl.x = scale*angle.value;
    chartControl.y = -plot.call(plot.function, chartControl.x);
  };
  chartControl.update();
  chartControl.constrain = (oldPos, newPos) : Point => {
    let x = (plotInteractive.width + newPos.x) % plotInteractive.width;
    let y = -plot.call(plot.function, x);
    return {x:x, y:y};
  };
  chartControl.onchange = function() {
    angle.value = chartControl.x/scale;
  };

  // draw gridlines
  for( let i = -3; i <= 3; i++) {
    for( let j = -3; j <= 3; j++) {
      let rect2 = circleInteractive.rectangle(i*circle.r,j*circle.r,circle.r,circle.r);
      rect2.classList.add('default');
      circleInteractive.background.prependChild(rect2);
      rect2.root.setAttribute('vector-effect','non-scaling-stroke');
      rect2.style.strokeOpacity = '.25';
    }
  }

  angle.value = 1;

  // plot.staticGroup.text( 8, -8, '0');
  // plot.staticGroup.line( 1*radius*Math.PI/2, -4, 1*radius*Math.PI/2, 4);
  // plot.staticGroup.line( 2*radius*Math.PI/2, -4, 1*radius*Math.PI/1, 4);
  // plot.staticGroup.line( 3*radius*Math.PI/2, -4, 3*radius*Math.PI/2, 4);

  plot.staticGroup.circle( 0*radius*Math.PI/2, 0, 3).style.fill = '#404040';
  plot.staticGroup.circle( 2*radius*Math.PI/2, 0, 3).style.fill = '#404040';
  plot.staticGroup.circle( 4*radius*Math.PI/2, 0, 3).style.fill = '#404040';

  // plot.staticGroup.line( 4*radius*Math.PI/2, -4, 4*radius*Math.PI/2, 4).style.strokeWidth = '3';
  let label1 = plot.staticGroup.text( 1*radius*Math.PI - 6, -8, 'π');
  let label2 = plot.staticGroup.text( 2*radius*Math.PI - 14, -8, 'τ');
  label1.style.fontFamily = 'KaTeX_Math';
  label2.style.fontFamily = 'KaTeX_Math';
  label1.style.fontSize = '22px';
  label2.style.fontSize = '22px';

  // x-axis labels
  let xLabels = interactive.group();
  xLabels.text(circleInteractive.originX - radius - 4, circleInteractive.height + 20, '-1');
  xLabels.text(circleInteractive.originX -      0 - 4, circleInteractive.height + 20, '0');
  xLabels.text(circleInteractive.originX + radius - 4, circleInteractive.height + 20, '1');

  // position of plot origin
  let ox = width + margin;
  let oy = width/2;

  // y-axis labels
  let yLabels = interactive.group();
  yLabels.text(ox - 20, oy + 4, '0');
  yLabels.text(ox - 24, oy + radius + 4, '-1');
  yLabels.text(ox - 20, oy - radius + 4, '1');
  yLabels.style.fontSize = '20px';
  yLabels.style.fontFamily = 'KaTeX_Main';

  // bottom x-axis labels
  xLabels.circle(ox, oy, 3).style.fill = '#404040';
  xLabels.text(ox + 0*radius - 4, oy + plotInteractive.height/2 + 20, '0');
  xLabels.text(ox + 1*radius - 4, oy + plotInteractive.height/2 + 20, '1');
  xLabels.text(ox + 2*radius - 4, oy + plotInteractive.height/2 + 20, '2');
  xLabels.text(ox + 3*radius - 4, oy + plotInteractive.height/2 + 20, '3');
  xLabels.text(ox + 4*radius - 4, oy + plotInteractive.height/2 + 20, '4');
  xLabels.text(ox + 5*radius - 4, oy + plotInteractive.height/2 + 20, '5');
  xLabels.text(ox + 6*radius - 4, oy + plotInteractive.height/2 + 20, '6');
  xLabels.style.fontSize = '20px';
  xLabels.style.fontFamily = 'KaTeX_Main';

  interactive.circle(ox + 1*Math.PI*radius, oy, 3).style.fill = '#404040';
  interactive.circle(ox + 2*Math.PI*radius, oy, 3).style.fill = '#404040';

}
