/**
* @ignore true
* @title Zoom and Pan Interactive
* @description This interactive demonstrates how to zoom in and out on a specific point.
* @input The input to this interactive is the scroll wheel of the mouse, the mouse click, and the mouse position.
* @tags []
*/

import {Interactive, getScriptName} from '../../index.js';
import Text from '../../elements/svg/text.js';
import Group from '../../elements/svg/group.js';

class Zoomable extends Interactive {

  zoomIntensity : number;
  scale : number;
  originx : number;
  originy : number;
  visibleWidth : number;
  visibleHeight : number

  active : boolean;
  prevX : number;
  prevY : number;

  _mathMode : boolean;

  /**
  * Constructs a new interactive with zooming capabilities
  */
  constructor(id:string, width:number, height:number ){
    super(id);

    let bbox = this.root.getBoundingClientRect();
    this.width = width > bbox.width ? bbox.width : width;
    this.height = height > bbox.height ? bbox.height : height;

    // initialize variables
    this.zoomIntensity = .02;
    this.scale = 1;
    this.originx = 0;
    this.originy = 0;
    this.visibleWidth = this.width;
    this.visibleHeight = this.height;

    this.mathMode = false;
    this.active = false;
    this.prevX = 0;
    this.prevY = 0;

    this.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);

    let interactive = this;
    interactive.root.addEventListener('mousedown', (event) => { interactive.handleMouseDown(event) });
    interactive.root.addEventListener('mouseup', (event) => { interactive.handleMouseUp(event) });
    interactive.root.addEventListener('mousemove', (event) => { interactive.handleMouseMove(event) });
    interactive.root.addEventListener('wheel', (event) => { interactive.handleWheel(event) });

    // draw rectangles for debugging
    let w = 25;
    let h = 25;
    for( let i = 0; i < 10; i++) {
      for( let j = 0; j < 10; j ++) {
        let x = i*w;
        let y = j*h;
        let rectangle = interactive.rectangle(x, y, w, h);
        // rectangle.root.setAttribute('vector-effect','non-scaling-stroke');
      }
    }
  }

  set mathMode( value:boolean ) {
    this._mathMode = value;
    if( value ) {
      this.root.classList.add('cartesian');
      this.root.setAttribute('transform','scale(1,-1)');
    } else {
      this.root.classList.remove('cartesian');
      this.root.setAttribute('transform','scale(1,1)');
    }
  }

  get mathMode() : boolean {
    return this._mathMode;
  }

  handleMouseDown( event:MouseEvent ) {
    this.active = true;
    this.prevX = event.clientX;
    this.prevY = event.clientY;
  }

  handleMouseUp( event:MouseEvent ) {
    this.active = false;
  }

  handleMouseMove( event:MouseEvent ) {
    if( this.active ) {
      let deltaX = event.clientX - this.prevX;
      let deltaY = event.clientY - this.prevY;
      interactive.originx -= deltaX/interactive.scale;
      interactive.originy -= deltaY/interactive.scale*(this.mathMode ? -1 : 1) ;
      this.prevX = event.clientX;
      this.prevY = event.clientY;
      interactive.setViewBox( interactive.originx, interactive.originy, interactive.visibleWidth, interactive.visibleHeight);
    }
  }

  handleWheel( event:WheelEvent ) {
    event.preventDefault();

    // calculate the position of the mouse over the interactive
    let br = this.root.getBoundingClientRect();
    let x = event.clientX - br.left;
    let y = event.clientY - br.top;

    if( this.mathMode ) {
      y = this.height - y;
    }

    // calculate the zoom direction
    let wheel = event.deltaY < 0 ? 1 : -1;
    let zoom = Math.exp(wheel*this.zoomIntensity);
    // let zoom = Math.log10(Math.abs(event.deltaY));

    this.originx -= x/(this.scale*zoom) - x/this.scale;
    this.originy -= y/(this.scale*zoom) - y/this.scale;

    this.scale *= zoom;
    this.visibleWidth = this.width / this.scale;
    this.visibleHeight = this.height / this.scale;

    this.setViewBox( this.originx, this.originy, this.visibleWidth, this.visibleHeight);
  }

  mathModeText( x, y, contents) {

    let group = new Group();
    group.root.setAttribute('transform', `translate(${x},${y})`);

    let internal = new Text(0,0,contents);
    group.root.appendChild(internal.root);

    this.appendChild(group);
    return group;
  }
}

let interactive = new Zoomable(getScriptName(), 500, 500);
interactive.border = true;
interactive.mathMode = false;
interactive.circle(0, 0, 5).style.fill = '#333333';
let control = interactive.control(-15,-15);
let text = interactive.mathModeText( -15, -15, "(0,0)");
// let text = interactive.text( -15, -15, "(0,0)");
// console.log(control);

text.addDependency(control);
text.update = function() {
  text.root.setAttribute('transform', `translate(${control.x + 15}, ${control.y + 15})`);
  (text.root.firstChild as HTMLElement).innerHTML = `(${control.x.toFixed(2)}, ${control.y.toFixed(2)})`;
}
