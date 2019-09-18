import SVG from '../svg.js';
import Element from '../elements/element.js';
import Path from '../elements/path.js';
import Circle from '../elements/circle.js';
import Rectangle from '../elements/rectangle.js';
/**
* A control point is a draggable two dimensional point.
*/
export default class Control extends Element {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y) {
        super(SVG.Group());
        /**
        * Modifying the transform function allows for the control to be constrained
        * to a path or constrained to the region enclosed in a path.
        */
        this.constrain = function (_oldPosition, newPosition) {
            return newPosition;
        };
        // create the svg components
        this.point = SVG.Circle(0, 0, Control.pointRadius);
        this.handle = SVG.Circle(0, 0, Control.handleRadius);
        this.root.classList.add('control');
        this.point.classList.add('control-point');
        this.handle.classList.add('control-handle');
        this.root.appendChild(this.point);
        this.root.appendChild(this.handle);
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
    get onchange() {
        return this._onchange;
    }
    /**
    * Constrains the movement of this control point to the path of the provided
    * element.
    */
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
//# sourceMappingURL=control.js.map