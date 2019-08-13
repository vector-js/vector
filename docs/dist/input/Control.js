import SVG from '../SVG.js';
import Element from '../elements/Element.js';
import Path from '../elements/Path.js';
import Circle from '../elements/Circle.js';
import Rectangle from '../elements/Rectangle.js';
/**
* A control point is a draggable two dimensional point.
*/
export default class Control extends Element {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y) {
        super();
        /**
        * Modifying the transform function allows for the control to be constrained
        * to a path or constrained to the region enclosed in a path.
        */
        this.constrain = function (_oldPosition, newPosition) {
            return newPosition;
        };
        // create the svg components
        this.root = SVG.Group();
        this.point = SVG.Circle(0, 0, Control.pointRadius);
        this.handle = SVG.Circle(0, 0, Control.handleRadius);
        this.root.classList.add('control');
        this.point.classList.add('control-point');
        this.handle.classList.add('control-handle');
        this.root.appendChild(this.point);
        this.root.appendChild(this.handle);
        this.root.id = this.id;
        // initialize instance variables
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 0;
        // the default behavior of a control is to update its dependents on change
        this.onchange = function () {
            this.updateDependents();
        };
        this.update = () => { };
        // translate the control to its initial position
        this.translate(x, y);
        // register event handlers
        let control = this;
        this.root.onmousedown = function (event) {
            control.handleMouseDown(event);
        };
        this.root.ondblclick = function (event) {
            // do nothing on double click
            event.preventDefault();
        };
        this.handle.onmouseout = function (event) {
            control.handleMouseOut(event);
        };
        // set passive to false so chrome doesn't complain
        this.handle.addEventListener('touchstart', control.handleTouchStart.bind(this), { passive: false });
        // initialize window event listeners only once
        if (!Control.initalized) {
            window.onmouseover = Control.handleMouseOver;
            window.onmousemove = Control.handleMouseMove;
            window.onmouseup = Control.handleInputEnd;
            window.addEventListener('touchend', Control.handleInputEnd, { passive: false });
            window.addEventListener('touchmove', Control.handleTouchMove, { passive: false });
            Control.initalized = true;
        }
    }
    /**
    * Handles when the user moves their mouse over the window. If there is an
    * active control, the control's position is updated.
    */
    static handleMouseMove(event) {
        if (Control.active != null) {
            let x = event.clientX + Control.slopX;
            let y = event.clientY + Control.slopY;
            Control.active.translate(x, y);
        }
    }
    /**
    * Handles a touch move event. If there is an active control, the control's
    * position is updated.
    */
    static handleTouchMove(event) {
        if (Control.active != null) {
            let x = event.touches[0].clientX + Control.slopX;
            let y = event.touches[0].clientY + Control.slopY;
            Control.active.translate(x, y);
            event.preventDefault();
        }
    }
    /**
    * Handles when a use mouses up over the window or ends their touch event.
    */
    static handleInputEnd(event) {
        if (Control.active != null) {
            // remove highlighting from the active control and set to null
            Control.active.handle.classList.remove('highlight');
            Control.active = null;
            // fire a mouseover event to highlight either: an interactive control,
            // the recently active control, or a different element entirely.
            // Currently, whichever element is highest in the DOM order will be the
            // target. In the future the most recently active Control could be
            // prioritized for user experience.
            if (event.type != "touchend") {
                event.target.dispatchEvent(new MouseEvent('mouseover', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));
            }
        }
    }
    /**
    * When a user mouses over a control, add the class "highlight" to the control
    * handle.
    */
    static handleMouseOver(event) {
        if (Control.active == null && !Element.disable && event.target.tagName == 'circle') {
            event.target.classList.add('highlight');
        }
    }
    /**
    * When a user mouses out of a control handle and when there is no active
    * control, remove the "highlight" class from the event target.
    */
    handleMouseOut(event) {
        if (Control.active == null) {
            event.target.classList.remove('highlight');
        }
    }
    /**
    * Handle when a user mouses down over a Control's handle. Stores the error in
    * the user's click as well as stores which Control the user is clicking.
    */
    handleMouseDown(event) {
        if (!Element.disable) {
            Control.active = this;
            Control.slopX = Control.active.x - event.clientX;
            Control.slopY = Control.active.y - event.clientY;
        }
    }
    /**
    * Handle when a user touches over a Control's handle. Stores the error in
    * the user's input as well as stores which Control the user is clicking.
    */
    handleTouchStart(event) {
        if (!Element.disable) {
            Control.active = this;
            Control.slopX = Control.active.x - event.touches[0].clientX;
            Control.slopY = Control.active.y - event.touches[0].clientY;
            event.preventDefault();
        }
    }
    /**
    * Moves the control to a new location
    */
    translate(x, y) {
        // call the internal transform function
        let point = this.constrain({ x: this.x, y: this.y }, { x: x, y: y });
        // update the instance data
        this._dx = point.x - this._x;
        this._dy = point.y - this._y;
        this._x = point.x;
        this._y = point.y;
        // transform the position of the contorl
        this.root.setAttribute('transform', `translate( ${this.x}, ${this.y})`);
        // call the onchange function
        this._onchange();
    }
    /**
    * Updates the x position of the control.
    */
    set x(x) {
        this._dx = x - this.x;
        this._x = x;
        this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
    }
    /**
    * Updates the y position of the control.
    */
    set y(y) {
        this._dy = y - this.y;
        this._y = y;
        this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
    }
    /**
    * Gets the x position of the control.
    */
    get x() {
        return this._x;
    }
    /**
    * Gets the y position of the control.
    */
    get y() {
        return this._y;
    }
    /**
    * Gets the change in x position of this control.
    */
    get dx() {
        return this._dx;
    }
    /**
    * Gets the change in y position of this control.
    */
    get dy() {
        return this._dy;
    }
    /**
    * Whenever the position of this control is changed this function is called.
    */
    set onchange(func) {
        this._onchange = func;
    }
    constrainTo(element) {
        this.addDependency(element);
        if (element instanceof Path) {
            throw Error('not implemented');
        }
        else if (element instanceof Circle) {
            this.constrain = function (_oldPosition, newPosition) {
                // Calculate the angle between the current coordinate and the origin
                let angle = Math.atan2(newPosition.y - element.cy, newPosition.x - element.cx);
                // Set the controls position to the vector in the direction of the angle
                // above and with the magnitude of the radius of the circle.
                let x = element.r * Math.cos(angle) + element.cx;
                let y = element.r * Math.sin(angle) + element.cy;
                // Return the new position
                return { x: x, y: y };
            };
        }
        else if (element instanceof Rectangle) {
        }
    }
    /**
    * Constrains the control to follow the path of the circle specified by the
    * arguments. TODO: add a method to constrain the control to a path
    */
    constrainToCircle(cx, cy, r) {
        // set the constrain function
        this.constrain = function (_oldPosition, newPosition) {
            // Calculate the angle between the current coordinate and the origin
            let angle = Math.atan2(newPosition.y - cy, newPosition.x - cx);
            // Set the controls position to the vector in the direction of the angle
            // above and with the magnitude of the radius of the circle.
            let x = r * Math.cos(angle) + cx;
            let y = r * Math.sin(angle) + cy;
            // Return the new position
            return { x: x, y: y };
        };
    }
    /**
    * Constrains the control to the box defined by the points (x1, y1) and
    * (x2, y2). The first point defines the top-left corner of the box, the
    * second the bottom-right corner of the box.
    */
    constrainWithinBox(x1, y1, x2, y2) {
        this.constrain = function (_oldPosition, newPosition) {
            let x = newPosition.x;
            let y = newPosition.y;
            if (x < x1) {
                x = x1;
            }
            if (y < y1) {
                y = y1;
            }
            if (x > x2) {
                x = x2;
            }
            if (y > y2) {
                y = y2;
            }
            return { x: x, y: y };
        };
    }
    /**
    * Constrain this control to only move left and right along its current x
    * position.
    */
    constrainToX() {
        this.constrain = function (oldPosition, newPosition) {
            return { x: newPosition.x, y: oldPosition.y };
        };
    }
    /**
    * Constrain this control to only move up and down along its current y
    * position.
    */
    constrainToY() {
        this.constrain = function (oldPosition, newPosition) {
            return { x: oldPosition.x, y: newPosition.y };
        };
    }
}
// Describes the size of the control handle and point
Control.pointRadius = 4;
Control.handleRadius = 13;
// Keeps track of the active control and the error in the user's click
Control.active = null;
Control.slopX = 0;
Control.slopY = 0;
// Keep track of whether global event listeners have been initialized
Control.initalized = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9pbnB1dC9Db250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUM1QixPQUFPLE9BQU8sTUFBTSx3QkFBd0IsQ0FBQztBQUU3QyxPQUFPLElBQUksTUFBTSxxQkFBcUIsQ0FBQztBQUN2QyxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUMzQyxPQUFPLFNBQVMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRDs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLE9BQU87SUFpQzFDOztNQUVFO0lBQ0YsWUFBYSxDQUFRLEVBQUUsQ0FBUTtRQUM3QixLQUFLLEVBQUUsQ0FBQztRQVpWOzs7VUFHRTtRQUNGLGNBQVMsR0FBRyxVQUFXLFlBQWtCLEVBQUUsV0FBaUI7WUFDeEQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBUUEsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMs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