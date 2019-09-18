import Control from './control.js';
// A first pass implementation of a control circle. In the future, it seems to
// make sense for basic elements to be draggable. I think this would mean
// making a draggable interface or class that contains window event handlers.
// Another alternative would be moving some of that logic into the controller or
// interactive wrapper class.
export default class ControlCircle extends Control {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y) {
        super(x, y);
        this.point.r.baseVal.value = ControlCircle.circleRadius;
        this.handle.r.baseVal.value = ControlCircle.circleRadius + .8;
        this.handle.style.strokeWidth = '2';
        // this.point.style.fill = 'lightblue';
        this.point.style.fill = this.handle.style.stroke;
    }
}
// Describes the size of the control handle and point
ControlCircle.circleRadius = 10;
//# sourceMappingURL=control-circle.js.map