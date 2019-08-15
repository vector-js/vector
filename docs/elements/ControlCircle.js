import Control from './Control.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbENpcmNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbGVtZW50cy9Db250cm9sQ2lyY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLGNBQWMsQ0FBQztBQUVuQyw4RUFBOEU7QUFDOUUseUVBQXlFO0FBQ3pFLDZFQUE2RTtBQUM3RSxnRkFBZ0Y7QUFDaEYsNkJBQTZCO0FBRTdCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLE9BQU87SUFLaEQ7O01BRUU7SUFDRixZQUFhLENBQVEsRUFBRSxDQUFRO1FBQzdCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3BDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ25ELENBQUM7O0FBYkQscURBQXFEO0FBQ3RDLDBCQUFZLEdBQVksRUFBRSxDQUFDIn0=