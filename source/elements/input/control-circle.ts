import Control from './control.js';

// A first pass implementation of a control circle. In the future, it seems to
// make sense for basic elements to be draggable. I think this would mean
// making a draggable interface or class that contains window event handlers.
// Another alternative would be moving some of that logic into the controller or
// interactive wrapper class.

export default class ControlCircle extends Control {

  // Describes the size of the control handle and point
  private static circleRadius : number = 10;

  /**
  * Constructs a control at the position (x,y)
  */
  constructor( x:number, y:number) {
    super(x, y);
    this.point.r = ControlCircle.circleRadius;
    this.handle.r = ControlCircle.circleRadius + .8;
    this.handle.style.strokeWidth = '2';
    // this.point.style.fill = 'lightblue';
    this.point.style.fill = this.handle.style.stroke;
  }
}
