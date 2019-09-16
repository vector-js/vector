import SVG from './svg';
import Element from './element';
export default class Control extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x, y) {
        super();
        this.root = SVG.Group();
        this.point = SVG.Circle(0, 0, Control.pointRadius, ['control-point']);
        this.handle = SVG.Circle(0, 0, Control.handleRadius, ['control-handle']);
        this.root.appendChild(this.point);
        this.root.appendChild(this.handle);
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 0;
        this.onchange = () => { };
        this.translate(x, y);
        let control = this;
        // Handles the mouse down & touch events
        this.root.onmousedown = function (event) {
            control.handleSelect(event);
        };
        window.onmousemove = function (event) {
            Control.handleDrag(event);
        };
        window.onmouseup = function (event) {
            Control.handleMouseUp(event);
        };
    }
    static handleDrag(event) {
        if (Control.active != null) {
            let x = event.clientX + Control.slopX;
            let y = event.clientY + Control.slopY;
            Control.active.translate(x, y);
        }
    }
    static handleMouseUp(event) {
        Control.active = null;
    }
    handleSelect(event) {
        if (!Element.disable) {
            Control.active = this;
            Control.slopX = Control.active.x - event.clientX;
            Control.slopY = Control.active.y - event.clientY;
        }
    }
    translate(x, y) {
        this._dx = x - this._x;
        this._dy = y - this._y;
        this._x = x;
        this._y = y;
        this.root.setAttribute('transform', 'translate( ' + x + ', ' + y + ')');
        this._onchange();
    }
    set x(x) {
        this._dx = x - this._x;
        this._x = x;
        this.translate(this._x, this._y);
    }
    set y(y) {
        this._dy = y - this._y;
        this._y = y;
        this.translate(this._x, this._y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get dx() {
        return this._dx;
    }
    get dy() {
        return this._dy;
    }
    set onchange(func) {
        this._onchange = func;
    }
}
// Describes the size of the control
Control.pointRadius = 4;
Control.handleRadius = 13;
Control.active = null;
Control.slopX = 0;
Control.slopY = 0;
//# sourceMappingURL=control.js.map