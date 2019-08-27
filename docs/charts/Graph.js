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
    * Returns the internal function
    */
    get function() {
        return this._function;
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
        // Update the dependents if there are any
        this.updateDependents();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvY2hhcnRzL0dyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLHdCQUF3QixDQUFDO0FBQzdDLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUM1QixPQUFPLFNBQVMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLElBQUksTUFBTSxxQkFBcUIsQ0FBQztBQUV2Qzs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLE9BQU87SUF5RHhDOzs7O01BSUU7SUFDRixZQUFhLFVBQVUsR0FBRyxJQUFJO1FBQzVCLEtBQUssRUFBRSxDQUFDO1FBRVIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQiw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRWhD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