
import {Interactive, getScriptName} from '../../index.js';
import Group from '../../elements/svg/group.js';
import Point from '../../elements/math/point.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.height = 1200;
interactive.width = 1000;
let fns = [Math.cos, Math.sin, Math.tan];

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

let y = 0;
let margin = 32;
for(let f of fns) {
  let scale = 300/Math.PI;
  let circleInteractive = interactive.interactive(-150, y); // TODO: check this logic
  circleInteractive.originX = circleInteractive.width/2;
  circleInteractive.originY = circleInteractive.height/2;
  let circle = circleInteractive.circle(0,0,100);
  circleInteractive.circle(0,0,3).style.fill = '#404040';
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
  let line = circleInteractive.line(0,0, control.x, control.y);
  line.addDependency(control);
  line.update = function() {
    line.x2 = control.x;
    line.y2 = control.y;
  };

  let triangle = circleInteractive.path('');
  triangle.addDependency(control);
  triangle.update = function() {
    triangle.d = `M 0 0
                  L ${control.x} 0
                  L ${control.x} ${control.y}
                  Z`;
  };
  triangle.update();


  let plotInteractive = interactive.interactive(300 + margin, y);
  let plot = plotInteractive.plot(600, 300, f, {
    scaleX: scale,
    scaleY: scale,
    originX: 0,
    originY: 150,
    zoomable: false,
    displayPoint: false,
    border: true
  });

  let chartControl = interactive.control(0,0);
  plot.staticGroup.appendChild(chartControl);
  chartControl.addDependency(angle, plot);
  chartControl.update = function() {
    chartControl.x = circle.r*angle.value;
    chartControl.y = -plot.call(chartControl.x);
  };
  chartControl.update();
  chartControl.constrain = (oldPos, newPos) : Point => {
    let x = (plotInteractive.width + newPos.x) % plotInteractive.width;
    let y = -plot.call(x);
    return {x:x, y:y};
  };
  chartControl.onchange = function() {
    angle.value = chartControl.x/circle.r;
  };


  // draw gridlines
  for( let i = -10; i <= 10; i++) {
    for( let j = -10; j <= 10; j++) {
      let rect = plot.viewPort.rectangle(i,j,1,1);
      rect.root.setAttribute('vector-effect','non-scaling-stroke');
      rect.style.stroke = '#aaaaaa';
    }
  }
  y += 300 + margin;
}
