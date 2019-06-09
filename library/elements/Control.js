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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL0NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDO0FBQzVCLE9BQU8sT0FBTyxNQUFNLGNBQWMsQ0FBQztBQUduQzs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLE9BQU87SUE4QjFDOztNQUVFO0lBQ0YsWUFBYSxDQUFRLEVBQUUsQ0FBUTtRQUM3QixLQUFLLEVBQUUsQ0FBQztRQVpWOzs7VUFHRTtRQUNGLGNBQVMsR0FBRyxVQUFXLFdBQWlCLEVBQUUsV0FBaUI7WUFDdkQsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBUUEsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFdkIsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FB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Q0FBQztZQUUvQiwwQkFBMEI7WUFDMUIsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO1FBRXBCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFXLFdBQWlCLEVBQUUsV0FBaUI7WUFDOUQsT0FBTyxFQUFDLENBQUMsRUFBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFFNUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVcsV0FBaUIsRUFBRSxXQUFpQjtZQUM5RCxPQUFPLEVBQUMsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUU1QyxDQUFDLENBQUM7SUFDSixDQUFDOztBQXRTRCxxREFBcUQ7QUFDdEMsbUJBQVcsR0FBWSxDQUFDLENBQUM7QUFDekIsb0JBQVksR0FBWSxFQUFFLENBQUM7QUFFMUMsc0VBQXNFO0FBQ3ZELGNBQU0sR0FBYSxJQUFJLENBQUM7QUFDeEIsYUFBSyxHQUFZLENBQUMsQ0FBQztBQUNuQixhQUFLLEdBQVksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNWRyBmcm9tICcuLi9TVkcuanMnO1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJztcbmltcG9ydCBQb2ludCBmcm9tICcuL1BvaW50LmpzJztcblxuLyoqXG4qIEEgY29udHJvbCBpcyBhIGRyYWdnYWJsZSB0d28gZGltZW5zaW9uYWwgcG9pbnQuXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbCBleHRlbmRzIEVsZW1lbnR7XG5cbiAgLy8gRGVzY3JpYmVzIHRoZSBzaXplIG9mIHRoZSBjb250cm9sIGhhbmRsZSBhbmQgcG9pbnRcbiAgcHJpdmF0ZSBzdGF0aWMgcG9pbnRSYWRpdXMgOiBudW1iZXIgPSA0O1xuICBwcml2YXRlIHN0YXRpYyBoYW5kbGVSYWRpdXMgOiBudW1iZXIgPSAxMztcblxuICAvLyBLZWVwcyB0cmFjayBvZiB0aGUgYWN0aXZlIGNvbnRyb2wgYW5kIHRoZSBlcnJvciBpbiB0aGUgdXNlcidzIGNsaWNrXG4gIHByaXZhdGUgc3RhdGljIGFjdGl2ZSA6IENvbnRyb2wgPSBudWxsO1xuICBwcml2YXRlIHN0YXRpYyBzbG9wWCA6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RhdGljIHNsb3BZIDogbnVtYmVyID0gMDtcblxuICAvLyBQcml2YXRlIGluc3RhbmNlIHZhcmlhYmxlc1xuICBwcml2YXRlIF94OiBudW1iZXI7XG4gIHByaXZhdGUgX3k6IG51bWJlcjtcbiAgcHJpdmF0ZSBfZHg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfZHk6IG51bWJlcjtcbiAgcHJpdmF0ZSBfb25jaGFuZ2UgOiAoKSA9PiB2b2lkO1xuXG4gIC8vIFN2ZyBlbGVtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGNvbnRyb2xcbiAgcG9pbnQ6IFNWR0NpcmNsZUVsZW1lbnQ7XG4gIGhhbmRsZTogU1ZHQ2lyY2xlRWxlbWVudDtcblxuICAvKipcbiAgKiBNb2RpZnlpbmcgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiBhbGxvd3MgZm9yIHRoZSBjb250cm9sIHRvIGJlIGNvbnN0cmFpbmVkXG4gICogdG8gYSBwYXRoIG9yIGNvbnN0cmFpbmVkIHRvIHRoZSByZWdpb24gZW5jbG9zZWQgaW4gYSBwYXRoLlxuICAqL1xuICBjb25zdHJhaW4gPSBmdW5jdGlvbiAoIG9sZFBvc2l0aW9uOlBvaW50LCBuZXdQb3NpdGlvbjpQb2ludCkgOiBQb2ludCB7XG4gICAgICByZXR1cm4gbmV3UG9zaXRpb247XG4gIH07XG5cbiAgLyoqXG4gICogQ29uc3RydWN0cyBhIGNvbnRyb2wgYXQgdGhlIHBvc2l0aW9uICh4LHkpXG4gICovXG4gIGNvbnN0cnVjdG9yKCB4Om51bWJlciwgeTpudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBzdmcgY29tcG9uZW50c1xuICAgIHRoaXMucm9vdCA9IFNWRy5Hcm91cChbJ2NvbnRyb2wnXSk7XG4gICAgdGhpcy5wb2ludCA9IFNWRy5DaXJjbGUoMCwwLCBDb250cm9sLnBvaW50UmFkaXVzLCBbJ2NvbnRyb2wtcG9pbnQnXSk7XG4gICAgdGhpcy5oYW5kbGUgPSBTVkcuQ2lyY2xlKDAsMCwgQ29udHJvbC5oYW5kbGVSYWRpdXMsIFsnY29udHJvbC1oYW5kbGUnXSk7XG4gICAgdGhpcy5yb290LmFwcGVuZENoaWxkKHRoaXMucG9pbnQpO1xuICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZCh0aGlzLmhhbmRsZSk7XG4gICAgdGhpcy5yb290LmlkID0gdGhpcy5pZDtcblxuICAgIC8vIGluaXRpYWxpemUgaW5zdGFuY2UgdmFyaWFibGVzXG4gICAgdGhpcy5feCA9IHg7XG4gICAgdGhpcy5feSA9IHk7XG4gICAgdGhpcy5fZHggPSAwO1xuICAgIHRoaXMuX2R5ID0gMDtcblxuICAgIC8vIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIGEgY29udHJvbCBpcyB0byB1cGRhdGUgaXRzIGRlcGVuZGVudHMgb24gY2hhbmdlXG4gICAgdGhpcy5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy51cGRhdGVEZXBlbmRlbnRzKCk7XG4gICAgfTtcblxuICAgIC8vIHRyYW5zbGF0ZSB0aGUgY29udHJvbCB0byBpdHMgaW5pdGlhbCBwb3NpdGlvblxuICAgIHRoaXMudHJhbnNsYXRlKHgseSk7XG5cbiAgICAvLyByZWdpc3RlciBldmVudCBoYW5kbGVyc1xuICAgIGxldCBjb250cm9sID0gdGhpcztcblxuICAgIHRoaXMucm9vdC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKCBldmVudDpNb3VzZUV2ZW50KSB7XG4gICAgICBjb250cm9sLmhhbmRsZU1vdXNlRG93biggZXZlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLmhhbmRsZS5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oIGV2ZW50Ok1vdXNlRXZlbnQgKSB7XG4gICAgICBjb250cm9sLmhhbmRsZU1vdXNlT3V0KCBldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGUub25tb3VzZW92ZXIgPSBmdW5jdGlvbiggZXZlbnQ6TW91c2VFdmVudCApIHtcbiAgICAgIENvbnRyb2wuaGFuZGxlTW91c2VPdmVyKCBldmVudCk7XG4gICAgfVxuXG4gICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oIGV2ZW50Ok1vdXNlRXZlbnQgKSB7XG4gICAgICBDb250cm9sLmhhbmRsZU1vdXNlTW92ZSggZXZlbnQpO1xuICAgIH1cblxuICAgIHdpbmRvdy5vbm1vdXNldXAgPSBmdW5jdGlvbiggZXZlbnQ6TW91c2VFdmVudCApIHtcbiAgICAgIENvbnRyb2wuaGFuZGxlSW5wdXRFbmQoIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgbW9iaWxlIGFuZCB0YWJsZXQgZXZlbnQgbGlzdGVuZXJzLCBzZXQgcGFzc2l2ZSB0byBmYWxzZSBzbyBjaHJvbWUgZG9lc24ndCBjb21wbGFpblxuICAgIHRoaXMuaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjb250cm9sLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKSwge3Bhc3NpdmU6ZmFsc2V9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBDb250cm9sLmhhbmRsZUlucHV0RW5kLCB7cGFzc2l2ZTpmYWxzZX0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBDb250cm9sLmhhbmRsZVRvdWNoTW92ZSwge3Bhc3NpdmU6ZmFsc2V9KTtcblxuICB9XG5cbiAgLyoqXG4gICogSGFuZGxlcyB3aGVuIHRoZSB1c2VyIG1vdmVzIHRoZWlyIG1vdXNlIG92ZXIgdGhlIHdpbmRvdy4gSWYgdGhlcmUgaXMgYW5cbiAgKiBhY3RpdmUgY29udHJvbCwgdGhlIGNvbnRyb2wncyBwb3NpdGlvbiBpcyB1cGRhdGVkLlxuICAqL1xuICBzdGF0aWMgaGFuZGxlTW91c2VNb3ZlKCBldmVudDpNb3VzZUV2ZW50fFRvdWNoRXZlbnR8YW55KSB7XG4gICAgaWYoIENvbnRyb2wuYWN0aXZlICE9IG51bGwgKSB7XG4gICAgICBsZXQgeDtcbiAgICAgIGxldCB5O1xuICAgICAgaWYoIGV2ZW50LnR5cGUgPT09IFwidG91Y2htb3ZlXCIpIHtcbiAgICAgICAgICB4ID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYICsgQ29udHJvbC5zbG9wWDtcbiAgICAgICAgICB5ID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZICsgQ29udHJvbC5zbG9wWTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICAgeCA9IGV2ZW50LmNsaWVudFggKyBDb250cm9sLnNsb3BYO1xuICAgICAgICAgIHkgPSBldmVudC5jbGllbnRZICsgQ29udHJvbC5zbG9wWTtcbiAgICAgIH1cbiAgICAgIENvbnRyb2wuYWN0aXZlLnRyYW5zbGF0ZSggeCwgeSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGhhbmRsZVRvdWNoTW92ZSggZXZlbnQ6VG91Y2hFdmVudCkge1xuICAgIGlmKCBDb250cm9sLmFjdGl2ZSAhPSBudWxsICkge1xuICAgICAgbGV0IHggPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFggKyBDb250cm9sLnNsb3BYO1xuICAgICAgbGV0IHkgPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgKyBDb250cm9sLnNsb3BZO1xuICAgICAgQ29udHJvbC5hY3RpdmUudHJhbnNsYXRlKCB4LCB5KTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogSGFuZGxlcyB3aGVuIGEgdXNlIG1vdXNlcyB1cCBvdmVyIHRoZSB3aW5kb3cuXG4gICovXG4gIHN0YXRpYyBoYW5kbGVJbnB1dEVuZCggZXZlbnQ6VG91Y2hFdmVudHxNb3VzZUV2ZW50KSB7XG4gICAgaWYoIENvbnRyb2wuYWN0aXZlICE9IG51bGwgKSB7XG5cbiAgICAgIC8vIHJlbW92ZSBoaWdobGlnaHRpbmcgZnJvbSB0aGUgYWN0aXZlIGNvbnRyb2wgYW5kIHNldCB0byBudWxsXG4gICAgICBDb250cm9sLmFjdGl2ZS5oYW5kbGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0Jyk7XG4gICAgICBDb250cm9sLmFjdGl2ZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpcmUgYSBtb3VzZW92ZXIgZXZlbnQgdG8gaGlnaGxpZ2h0IGVpdGhlcjogYSBuZXcgY29udHJvbCwgdGhlIHJlY2VudGx5XG4gICAgICAvLyBhY3RpdmUgY29udHJvbCwgb3IgYSBkaWZmZXJlbnQgZWxlbWVudCBlbnRpcmVseS4gQ3VycmVudGx5LCB3aGljaGV2ZXJcbiAgICAgIC8vIGVsZW1lbnQgaXMgaGlnaGVzdCBpbiB0aGUgRE9NIG9yZGVyIHdpbGwgYmUgdGhlIHRhcmdldC4gSW4gdGhlIGZ1dHVyZVxuICAgICAgLy8gdGhlIG1vc3QgcmVjZW50bHkgYWN0aXZlIENvbnRyb2wgY291bGQgYmUgXCJwcm9tb3RlZFwiIGZvciBjb25zaXN0ZW5jeS5cbiAgICAgIGlmKCBldmVudC50eXBlICE9IFwidG91Y2hlbmRcIiApIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ21vdXNlb3ZlcicsIHtcbiAgICAgICAgICB2aWV3OiB3aW5kb3csXG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAqIFdoZW4gYSB1c2VyIG1vdXNlcyBvdmVyIGEgY29udHJvbCwgYWRkIHRoZSBjbGFzcyBcImhpZ2hsaWdodFwiIHRvIHRoZSBjb250cm9sXG4gICogaGFuZGxlLlxuICAqL1xuICBzdGF0aWMgaGFuZGxlTW91c2VPdmVyKCBldmVudDpNb3VzZUV2ZW50ICkge1xuICAgIGlmKCBDb250cm9sLmFjdGl2ZSA9PSBudWxsICYmICFFbGVtZW50LmRpc2FibGUgKXtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFdoZW4gYSB1c2VyIG1vdXNlcyBvdXQgb2YgYSBjb250cm9sIGhhbmRsZSBhbmQgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmVcbiAgKiBjb250cm9sLCByZW1vdmUgdGhlIFwiaGlnaGxpZ2h0XCIgY2xhc3MgZnJvbSB0aGUgZXZlbnQgdGFyZ2V0LlxuICAqL1xuICBoYW5kbGVNb3VzZU91dCggZXZlbnQ6TW91c2VFdmVudCApIHtcbiAgICBpZiggQ29udHJvbC5hY3RpdmUgPT0gbnVsbCApe1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogSGFuZGxlIHdoZW4gYSB1c2VyIG1vdXNlcyBkb3duIG92ZXIgYSBDb250cm9sJ3MgaGFuZGxlLiBTdG9yZXMgdGhlIGVycm9yIGluXG4gICogdGhlIHVzZXIncyBjbGljayBhcyB3ZWxsIGFzIHN0b3JlcyB3aGljaCBDb250cm9sIHRoZSB1c2VyIGlzIGNsaWNraW5nLlxuICAqL1xuICBoYW5kbGVNb3VzZURvd24oIGV2ZW50Ok1vdXNlRXZlbnQgKSB7XG4gICAgaWYoICFFbGVtZW50LmRpc2FibGUgKSB7XG4gICAgICBDb250cm9sLmFjdGl2ZSA9IHRoaXM7XG4gICAgICBDb250cm9sLnNsb3BYID0gQ29udHJvbC5hY3RpdmUueCAtIGV2ZW50LmNsaWVudFg7XG4gICAgICBDb250cm9sLnNsb3BZID0gQ29udHJvbC5hY3RpdmUueSAtIGV2ZW50LmNsaWVudFk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogSGFuZGxlIHdoZW4gYSB1c2VyIHRvdWNoZXMgb3ZlciBhIENvbnRyb2wncyBoYW5kbGUuIFN0b3JlcyB0aGUgZXJyb3IgaW5cbiAgKiB0aGUgdXNlcidzIGlucHV0IGFzIHdlbGwgYXMgc3RvcmVzIHdoaWNoIENvbnRyb2wgdGhlIHVzZXIgaXMgY2xpY2tpbmcuXG4gICovXG4gIGhhbmRsZVRvdWNoU3RhcnQoIGV2ZW50OlRvdWNoRXZlbnQgKSB7XG4gICAgaWYoICFFbGVtZW50LmRpc2FibGUgKSB7XG4gICAgICBDb250cm9sLmFjdGl2ZSA9IHRoaXM7XG4gICAgICBDb250cm9sLnNsb3BYID0gQ29udHJvbC5hY3RpdmUueCAtIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgIENvbnRyb2wuc2xvcFkgPSBDb250cm9sLmFjdGl2ZS55IC0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBNb3ZlcyB0aGUgY29udHJvbCB0byBhIG5ldyBsb2NhdGlvblxuICAqL1xuICB0cmFuc2xhdGUoeDpudW1iZXIsIHk6bnVtYmVyKXtcblxuICAgIC8vIGNhbGwgdGhlIGludGVybmFsIHRyYW5zZm9ybSBmdW5jdGlvblxuICAgIGxldCBwb2ludCA9IHRoaXMuY29uc3RyYWluKHt4OnRoaXMueCwgeTp0aGlzLnl9LCB7eDp4LCB5Onl9KTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgaW5zdGFuY2UgZGF0YVxuICAgIHRoaXMuX2R4ID0gcG9pbnQueCAtIHRoaXMuX3g7XG4gICAgdGhpcy5fZHkgPSBwb2ludC55IC0gdGhpcy5feTtcbiAgICB0aGlzLl94ID0gcG9pbnQueDtcbiAgICB0aGlzLl95ID0gcG9pbnQueTtcblxuICAgIC8vIHRyYW5zZm9ybSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRvcmxcbiAgICB0aGlzLnJvb3Quc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCAnICsgdGhpcy54ICsgJywgJyArIHRoaXMueSArICcpJyk7XG5cbiAgICAvLyBjYWxsIHRoZSBvbmNoYW5nZSBmdW5jdGlvblxuICAgIHRoaXMuX29uY2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgKiBVcGRhdGVzIHRoZSB4IHBvc2l0aW9uIG9mIHRoZSBjb250cm9sLlxuICAqL1xuICBzZXQgeCggeCA6IG51bWJlciApIHtcbiAgICB0aGlzLl9keCA9IHggLSB0aGlzLng7XG4gICAgdGhpcy5feCA9IHg7XG4gICAgdGhpcy5yb290LnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSggJyArIHRoaXMueCArICcsICcgKyB0aGlzLnkgKyAnKScpO1xuICB9XG5cbiAgLyoqXG4gICogVXBkYXRlcyB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgY29udHJvbC5cbiAgKi9cbiAgc2V0IHkoIHkgOiBudW1iZXIgKSB7XG4gICAgdGhpcy5fZHkgPSB5IC0gdGhpcy55O1xuICAgIHRoaXMuX3kgPSB5O1xuICAgIHRoaXMucm9vdC5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoICcgKyB0aGlzLnggKyAnLCAnICsgdGhpcy55ICsgJyknKTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldHMgdGhlIHggcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wuXG4gICovXG4gIGdldCB4KCApIHtcbiAgICByZXR1cm4gdGhpcy5feDtcbiAgfVxuXG4gIC8qKlxuICAqIEdldHMgdGhlIHkgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wuXG4gICovXG4gIGdldCB5KCApIHtcbiAgICByZXR1cm4gdGhpcy5feTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldHMgdGhlIGNoYW5nZSBpbiB4IHBvc2l0aW9uIG9mIHRoaXMgY29udHJvbC5cbiAgKi9cbiAgZ2V0IGR4KCkge1xuICAgIHJldHVybiB0aGlzLl9keDtcbiAgfVxuXG4gIC8qKlxuICAqIEdldHMgdGhlIGNoYW5nZSBpbiB5IHBvc2l0aW9uIG9mIHRoaXMgY29udHJvbC5cbiAgKi9cbiAgZ2V0IGR5KCkge1xuICAgIHJldHVybiB0aGlzLl9keTtcbiAgfVxuXG4gIC8qKlxuICAqIFdoZW5ldmVyIHRoZSBwb3NpdGlvbiBvZiB0aGlzIGNvbnRyb2wgaXMgY2hhbmdlZCB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZC5cbiAgKi9cbiAgc2V0IG9uY2hhbmdlKCBmdW5jOiAoKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX29uY2hhbmdlID0gZnVuYztcbiAgfVxuXG4gIC8qKlxuICAqIENvbnN0cmFpbnMgdGhlIGNvbnRyb2wgdG8gZm9sbG93IHRoZSBwYXRoIG9mIHRoZSBjaXJjbGUgc3BlY2lmaWVkIGJ5IHRoZVxuICAqIGFyZ3VtZW50cy4gVE9ETzogY2hhbmdlIHRvIGNvbnN0cmFpbiB0byBwYXRoLlxuICAqL1xuICBjb25zdHJhaW5Ub0NpcmNsZSggY3g6bnVtYmVyLCBjeTpudW1iZXIsIHI6bnVtYmVyKSB7XG5cbiAgICB0aGlzLmNvbnN0cmFpbiA9IGZ1bmN0aW9uICggb2xkUG9zaXRpb246UG9pbnQsIG5ld1Bvc2l0aW9uOlBvaW50KSA6IFBvaW50IHtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBhbmdsZSBiZXR3ZWVuIHRoZSBjdXJyZW50IGNvb3JkaW5hdGUgYW5kIHRoZSBvcmlnaW5cbiAgICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIoIG5ld1Bvc2l0aW9uLnkgLSBjeSwgbmV3UG9zaXRpb24ueCAtIGN4ICk7XG5cbiAgICAgIC8vIFNldCB0aGUgY29udHJvbHMgcG9zaXRpb24gdG8gdGhlIHZlY3RvciBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBhbmdsZVxuICAgICAgLy8gYWJvdmUgYW5kIHdpdGggdGhlIG1hZ25pdHVkZSBvZiB0aGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUuXG4gICAgICBsZXQgeCA9IHIqTWF0aC5jb3MoYW5nbGUpICsgY3g7XG4gICAgICBsZXQgeSA9IHIqTWF0aC5zaW4oYW5nbGUpICsgY3k7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgbmV3IHBvc2l0aW9uXG4gICAgICByZXR1cm4ge3g6eCwgeTp5fTtcblxuICAgIH07XG4gIH1cblxuICBjb25zdHJhaW5Ub1goKSB7XG4gICAgdGhpcy5jb25zdHJhaW4gPSBmdW5jdGlvbiAoIG9sZFBvc2l0aW9uOlBvaW50LCBuZXdQb3NpdGlvbjpQb2ludCkgOiBQb2ludCB7XG4gICAgICByZXR1cm4ge3g6bmV3UG9zaXRpb24ueCwgeTpvbGRQb3NpdGlvbi55fTtcblxuICAgIH07XG4gIH1cblxuICBjb25zdHJhaW5Ub1koKSB7XG4gICAgdGhpcy5jb25zdHJhaW4gPSBmdW5jdGlvbiAoIG9sZFBvc2l0aW9uOlBvaW50LCBuZXdQb3NpdGlvbjpQb2ludCkgOiBQb2ludCB7XG4gICAgICByZXR1cm4ge3g6b2xkUG9zaXRpb24ueCwgeTpuZXdQb3NpdGlvbi55fTtcblxuICAgIH07XG4gIH1cblxuXG59XG4iXX0=