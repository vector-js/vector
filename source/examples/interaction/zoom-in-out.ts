import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

let interactive = new Interactive(getScriptName());
interactive.border = true;

let width = 768;
let height = 300;
interactive.width = 768;
interactive.height = 300;

let zoomIntensity = .02;
let scale = 1;
let originx = 0;
let originy = 0;
let visibleWidth = interactive.width;
let visibleHeight = interactive.height;

interactive.setViewBox( originx, originy, visibleWidth, visibleHeight);

let margin = 50;
let w = 20;
let h = 20;
for( let i = 0; i < 10; i++) {
  for( let j = 0; j < 10; j ++) {
    interactive.rectangle(i*w + width/2 - 5*w, j*h + margin, w, h);
  }
}

interactive.root.addEventListener('wheel', function( event:WheelEvent) {
  event.preventDefault();

  // calculate the position of the mouse over the interactive
  let br = interactive.root.getBoundingClientRect();
  let x = event.clientX - br.left;
  let y = event.clientY - br.top;

  // calculate the zoom direction
  let wheel = event.deltaY < 0 ? 1 : -1;
  let zoom = Math.exp(wheel*zoomIntensity);
  // let zoom = Math.log10(Math.abs(event.deltaY));

  originx -= x/(scale*zoom) - x/scale;
  originy -= y/(scale*zoom) - y/scale;

  scale *= zoom;
  visibleWidth = width / scale;
  visibleHeight = height / scale;

  interactive.setViewBox( originx, originy, visibleWidth, visibleHeight);

});

let active = false;
let prevX = 0;
let prevY = 0;

interactive.root.addEventListener('mousedown', function( event:MouseEvent) {
  active = true;
  prevX = event.clientX;
  prevY = event.clientY;
});

interactive.root.addEventListener('mouseup', function( event:MouseEvent) {
  active = false;
});

interactive.root.addEventListener('mousemove', function( event:MouseEvent) {
  if( active ) {
    let deltaX = event.clientX - prevX;
    let deltaY = event.clientY - prevY;
    originx -= deltaX/scale;
    originy -= deltaY/scale;
    prevX = event.clientX;
    prevY = event.clientY;
    interactive.setViewBox( originx, originy, visibleWidth, visibleHeight);
  }
});

// xAxis.addStartArrow();
// xAxis.addEndArrow();
// interactive.root.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#333333;"></path></marker>`;
