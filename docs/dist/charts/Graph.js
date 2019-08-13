import Element from '../elements/Element.js';
import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
/**
*
*/
export default class Graph extends Element {
    /**
    * Constructs a new graph capable of displaying a function in the form of
    * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
    * explore the shape and form of the function.
    */
    constructor(userEvents = true) {
        super();
        // default values
        this._width = 600;
        this._height = 300;
        this._originX = this.width / 2;
        this._originY = this.height / 2;
        this._scaleX = 1;
        this._scaleY = 1;
        this.active = false;
        // creates a transparent rectangle to capture all user events
        this.rect = SVG.Rectangle(0, 0, this.width, this.height);
        this.rect.style.fill = 'transparent';
        this.rect.style.stroke = 'none';
        // TODO: change to axis with tick marks and number labels
        // draw two lines to represent the x-axis and y-axis
        this.xAxis = SVG.Line(-10000, 0, 10000, 0);
        this.yAxis = SVG.Line(0, -10000, 0, 10000);
        // create a path to draw the internal function
        this.path = SVG.Path('');
        this.path.classList.add('default');
        // a group to hold the path and axis, allows easy transforming of the origin
        this.group = SVG.Group();
        this.group.appendChild(this.path);
        this.group.appendChild(this.xAxis);
        this.group.appendChild(this.yAxis);
        // create a root element to hold everything
        this.root = SVG.Group();
        this.root.appendChild(this.rect);
        this.root.appendChild(this.group);
        this.root.id = this.id;
        // translate the origin to its initial position
        this.translate(this.originX, this.originY);
        // Registers event listeners
        if (userEvents) {
            // create a display circle for showing input and output
            this.circle = SVG.Circle(0, 0, 4);
            this.circle.style.fill = 'cornflowerblue';
            this.group.appendChild(this.circle);
            this.xRect = new Rectangle(0, 0, 125, 40);
            this.yRect = new Rectangle(120, 0, 125, 40);
            this.xRect.root.style.fill = 'white';
            this.yRect.root.style.fill = 'white';
            this.root.appendChild(this.xRect.root);
            this.root.appendChild(this.yRect.root);
            this.x = new Text(15, 20, 'x:0');
            this.x.root.style.dominantBaseline = 'middle';
            this.x.root.style.whiteSpace = 'pre';
            this.root.appendChild(this.x.root);
            this.y = new Text(125 + 15, 20, 'y:0');
            this.y.root.style.dominantBaseline = 'middle';
            this.y.root.style.whiteSpace = 'pre';
            this.root.appendChild(this.y.root);
            let graph = this;
            this.root.addEventListener('mousemove', function (event) {
                graph.handleMouseMove(event);
            });
            this.root.addEventListener('mousedown', function (event) {
                graph.handleMouseDown(event);
            });
            this.root.addEventListener('mouseup', function (event) {
                graph.handleMouseUp(event);
            });
            this.root.addEventListener('mouseleave', function (event) {
                graph.handleMouseLeave(event);
            });
            this.root.addEventListener('mousewheel', function (event) {
                graph.handleMouseWheelEvent(event);
            }, { passive: false });
        }
    }
    /**
    * Returns the width of this graph
    */
    get width() {
        return this._width;
    }
    /**
    * Returns the height of this graph
    */
    get height() {
        return this._height;
    }
    /**
    * Returns the minimum x value of the view box of this graph relative to the
    * origin.
    */
    get minX() {
        return -this._originX;
    }
    /**
    * Returns the minimum y value of the view box of this graph relative to the
    * origin.
    */
    get minY() {
        return -this._originY;
    }
    /**
    * Returns the x coordinate of the origin of this graph.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the x coordinate of the origin of this graph.
    */
    set originX(x) {
        this.translate(x, this._originY);
    }
    /**
    * Returns the y coordinate of the origin of this graph.
    */
    get originY() {
        return this._originY;
    }
    /**
    * Sets the y coordinate of the origin of this graph.
    */
    set originY(y) {
        this.translate(this._originX, y);
    }
    /**
    * Sets the internal function to the provided function
    */
    set function(f) {
        this._function = f;
    }
    /**
    * Returns the result of calling the internal function with the provided
    * function scaling both the input and the output.
    */
    call(input, scaleY = true) {
        let x = this._scaleX * (input);
        let y = (scaleY ? -this._scaleY : 1) * (this._function(x));
        return y;
    }
    /**
    * Draws the internal function over the interval [startX, endX]. The default
    * interval is [ minX - width, maxX + width ] so that when a user drags the
    * graph there is enough drawn so that a translate may be applied instead of
    * having to call draw again.
    */
    draw(startX = this.minX - this.width, endX = this.minX + 2 * this.width) {
        // Draw the function
        let x = startX;
        let y = this.call(x);
        if (y > 2 * this.height) {
            y = 2 * this.height;
        }
        if (y < -2 * this.height) {
            y = -2 * this.height;
        }
        let d = `M ${x} ${y} `;
        // TODO: remove vertical asymptote's by starting jumping to a new spot...
        // L ... L ... M ... L ... L ...
        for (x++; x < endX; x++) {
            y = this.call(x);
            if (y > 2 * this.height) {
                y = 2 * this.height;
            }
            if (y < -2 * this.height) {
                y = -2 * this.height;
            }
            d += `L ${x} ${y.toFixed(1)} `;
        }
        this.path.setAttribute('d', d);
    }
    /**
    * Formats the input number to be displayed within the graph.
    */
    format(n) {
        if (n > 10000 || n < -10000 || (n < .01 && n > -.01)) {
            return n.toExponential(2);
        }
        else {
            return n.toPrecision(4);
        }
    }
    /**
    * Handle when a mouse moves over this graph. If a drag event is active then
    * translates the position of the graph to the new location.
    */
    handleMouseMove(event) {
        let x = event.clientX - this.rect.getBoundingClientRect().left - this.originX;
        if (this.active) {
            this._originX += event.movementX;
            this._originY += event.movementY;
            this.translate(this._originX, this._originY);
        }
        else {
            this.circle.cx.baseVal.value = x;
            this.circle.cy.baseVal.value = this.call(x);
        }
        let i = this._scaleX * (x);
        let o = this.call(x, false);
        this.x.contents = `x:${i < 0 ? '' : ' '}${this.format(i)}`;
        this.y.contents = `y:${o < 0 ? '' : ' '}${this.format(o)}`;
    }
    /**
    * When a user mouses down over this graph a drag is active.
    */
    handleMouseDown(_event) {
        this.active = true;
    }
    /**
    * Deactivates the current drag event.
    */
    handleMouseUp(_event) {
        this.active = false;
        this.draw();
    }
    /**
    * When the user's mouse leaves the graph deactivates any concurrent drag.
    */
    handleMouseLeave(event) {
        this.handleMouseUp(event);
    }
    /**
    * Zooms in and out on this graph. TODO: There is some jarring wheel action
    * where an active wheel event on the page will stop dead when the mouse
    * goes over the graph. Also it seems as if the scroll has pre-existing
    * "momentum" that it can also affect the graph.
    */
    handleMouseWheelEvent(event) {
        let ratio = .95;
        if (event.deltaY > 0) {
            this.scale(ratio, 1 / ratio);
        }
        else {
            this.scale(1 / ratio, ratio);
        }
        this.draw();
        this.circle.cy.baseVal.value = this.call(this.circle.cx.baseVal.value);
        event.preventDefault();
    }
    /**
    * Scales the x and y axis of this graph.
    */
    scale(x, y) {
        this._scaleX *= x;
        this._scaleY *= y;
        this.draw();
    }
    /**
    * Scales the x axis of this graph.
    */
    set scaleX(x) {
        this._scaleX *= x;
        this.draw();
    }
    /**
    * Scales the y axis of this graph.
    */
    set scaleY(y) {
        this._scaleY *= y;
        this.draw();
    }
    /**
    * Translates the origin of this graph to the location (x,y).
    */
    translate(x, y) {
        this._originX = x;
        this._originY = y;
        this.group.setAttribute('transform', `translate(${x}, ${y})`);
    }
}
//# sourceMappingURL=Graph.js.map