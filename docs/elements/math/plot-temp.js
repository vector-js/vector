import Group from '../svg/group.js';
import Rectangle from '../svg/rectangle.js';
import Text from '../svg/text.js';
/**
* A plot of the graph of a function.
*/
export default class Plot extends Group {
    /**
    * Constructs a new graph capable of displaying a function in the form of
    * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
    * explore the shape and form of the function.
    */
    constructor(userEvents = true, width = 600, height = 300) {
        super();
        // default values
        this.width = width;
        this.height = height;
        this.zoomIntensity = .02;
        this.scale = 1;
        this.originx = 0;
        this.originy = 150;
        this.visibleWidth = 2 * Math.PI;
        this.visibleHeight = 2;
        this.active = false;
        this.prevX = 0;
        this.prevY = 0;
        // creates a transparent rectangle to capture all user events
        this.rect = this.rectangle(0, 0, this.width, this.height);
        this.rect.style.fill = 'transparent';
        this.rect.style.stroke = 'none';
        // a group to hold the path and axis, allows easy transforming of the origin
        this.viewPort = this.svg();
        this.viewPort.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);
        this.fPath = this.path('');
        // create a group to hold the axis
        this.viewPortGroup = this.viewPort.group();
        this.xAxis = this.viewPortGroup.line(-10000, 0, 10000, 0);
        this.yAxis = this.viewPortGroup.line(0, -10000, 0, 10000);
        // Registers event listeners
        if (userEvents) {
            // create a display circle for showing input and output
            this.displayCircle = this.viewPort.circle(0, 0, 4);
            this.displayCircle.style.fill = 'cornflowerblue';
            this.xRect = this.rectangle(0, 0, 125, 40);
            this.yRect = this.rectangle(120, 0, 125, 40);
            this.xRect.root.style.fill = 'white';
            this.yRect.root.style.fill = 'white';
            this.appendChild(this.xRect);
            this.appendChild(this.yRect);
            this.x = new Text(15, 20, 'x:0');
            this.x.root.style.dominantBaseline = 'middle';
            this.x.root.style.whiteSpace = 'pre';
            this.appendChild(this.x);
            this.y = new Text(125 + 15, 20, 'y:0');
            this.y.root.style.dominantBaseline = 'middle';
            this.y.root.style.whiteSpace = 'pre';
            this.appendChild(this.y);
            // draw rectangles for debugging
            let w = 1;
            let h = 1;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    let x = i * w;
                    let y = j * h;
                    this.viewPortGroup.appendChild(new Rectangle(x, y, w, h));
                    // rectangle.root.setAttribute('vector-effect','non-scaling-stroke');
                }
            }
            let temp = this;
            this.rect.root.addEventListener('mousedown', (event) => { temp.handleMouseDown(event); });
            this.rect.root.addEventListener('mouseup', (event) => { temp.handleMouseUp(event); });
            this.rect.root.addEventListener('mousemove', (event) => { temp.handleMouseMove(event); });
            this.rect.root.addEventListener('wheel', (event) => { temp.handleWheel(event); }, { passive: false });
        }
    }
    /**
    * Sets the internal function to the provided function
    */
    set function(f) {
        this._function = f;
        this.draw();
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
        let x = this.scale * (input);
        let y = (scaleY ? -this.scale : 1) * (this._function(x));
        return y;
    }
    /**
    * Draws the internal function over the interval [startX, endX]. The default
    * interval is [ minX - width, maxX + width ] so that when a user drags the
    * graph there is enough drawn so that a translate may be applied instead of
    * having to call draw again.
    */
    draw(startX = -this.originx - this.width, endX = -this.originx + 2 * this.width) {
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
        this.fPath.d = d;
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
        if (this.active) {
            let deltaX = event.clientX - this.prevX;
            let deltaY = event.clientY - this.prevY;
            this.originx -= deltaX / this.scale;
            this.originy -= deltaY / this.scale;
            this.prevX = event.clientX;
            this.prevY = event.clientY;
            this.viewPort.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);
        }
    }
    /**
    * When a user mouses down over this graph a drag is active.
    */
    handleMouseDown(event) {
        this.active = true;
        this.prevX = event.clientX;
        this.prevY = event.clientY;
    }
    /**
    * Deactivates the current drag event.
    */
    handleMouseUp(_event) {
        this.active = false;
        // this.draw();
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
    handleWheel(event) {
        event.preventDefault();
        // calculate the position of the mouse over the interactive
        let br = this.rect.root.getBoundingClientRect();
        let x = event.clientX - br.left;
        let y = event.clientY - br.top;
        // calculate the zoom direction
        let wheel = event.deltaY < 0 ? 1 : -1;
        let zoom = Math.exp(wheel * this.zoomIntensity);
        this.originx -= x / (this.scale * zoom) - x / this.scale;
        this.originy -= y / (this.scale * zoom) - y / this.scale;
        this.scale *= zoom;
        this.visibleWidth = this.width / this.scale;
        this.visibleHeight = this.height / this.scale;
        this.viewPort.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);
        this.draw();
    }
}
//# sourceMappingURL=plot-temp.js.map