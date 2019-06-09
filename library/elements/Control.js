import SVG from '../SVG.js';
import Element from './Element.js';
/**
* A control is a draggable two dimensional point.
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
        this.constrain = function (oldPosition, newPosition) {
            return newPosition;
        };
        // create the svg components
        this.root = SVG.Group(['control']);
        this.point = SVG.Circle(0, 0, Control.pointRadius, ['control-point']);
        this.handle = SVG.Circle(0, 0, Control.handleRadius, ['control-handle']);
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
        // translate the control to its initial position
        this.translate(x, y);
        // register event handlers
        let control = this;
        this.root.onmousedown = function (event) {
            control.handleMouseDown(event);
        };
        this.handle.onmouseout = function (event) {
            control.handleMouseOut(event);
        };
        this.handle.onmouseover = function (event) {
            Control.handleMouseOver(event);
        };
        window.onmousemove = function (event) {
            Control.handleMouseMove(event);
        };
        window.onmouseup = function (event) {
            Control.handleInputEnd(event);
        };
        // add mobile and tablet event listeners, set passive to false so chrome doesn't complain
        this.handle.addEventListener('touchstart', control.handleTouchStart.bind(this), { passive: false });
        window.addEventListener('touchend', Control.handleInputEnd, { passive: false });
        window.addEventListener('touchmove', Control.handleTouchMove, { passive: false });
    }
    /**
    * Handles when the user moves their mouse over the window. If there is an
    * active control, the control's position is updated.
    */
    static handleMouseMove(event) {
        if (Control.active != null) {
            let x;
            let y;
            if (event.type === "touchmove") {
                x = event.touches[0].clientX + Control.slopX;
                y = event.touches[0].clientY + Control.slopY;
                event.preventDefault();
            }
            else {
                x = event.clientX + Control.slopX;
                y = event.clientY + Control.slopY;
            }
            Control.active.translate(x, y);
        }
    }
    static handleTouchMove(event) {
        if (Control.active != null) {
            let x = event.touches[0].clientX + Control.slopX;
            let y = event.touches[0].clientY + Control.slopY;
            Control.active.translate(x, y);
            event.preventDefault();
        }
    }
    /**
    * Handles when a use mouses up over the window.
    */
    static handleInputEnd(event) {
        if (Control.active != null) {
            // remove highlighting from the active control and set to null
            Control.active.handle.classList.remove('highlight');
            Control.active = null;
            // fire a mouseover event to highlight either: a new control, the recently
            // active control, or a different element entirely. Currently, whichever
            // element is highest in the DOM order will be the target. In the future
            // the most recently active Control could be "promoted" for consistency.
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
        if (Control.active == null && !Element.disable) {
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
        this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
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
    /**
    * Constrains the control to follow the path of the circle specified by the
    * arguments. TODO: change to constrain to path.
    */
    constrainToCircle(cx, cy, r) {
        this.constrain = function (oldPosition, newPosition) {
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
    constrainToX() {
        this.constrain = function (oldPosition, newPosition) {
            return { x: newPosition.x, y: oldPosition.y };
        };
    }
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
