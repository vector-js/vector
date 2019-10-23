import Group from '../svg/group.js';
import SVG from '../svg/svg.js';
/**
* A plot of the graph of a function.
*/
export default class Plot extends Group {
    /**
    * Constructs a new graph capable of displaying a function in the form of
    * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
    * explore the shape and form of the function.
    */
    constructor(width = 600, height = 300, fn, options) {
        super();
        // default configuration options
        let defaultOptions = {
            scaleX: 1,
            scaleY: 1,
            grid: true,
            zoomable: false,
            displayPoint: false,
            controls: false // experimental
        };
        // combine the default configuration with the user's configuration
        let config = { ...defaultOptions, ...options };
        // event variables
        this.prevX = 0;
        this.prevY = 0;
        this.active = false;
        this._function = fn;
        // calculate the visible dimensions and top-left position of svg coordinates
        this.x = -width / 2;
        this.y = -height / 2;
        this.width = width;
        this.height = height;
        // creates a transparent rectangle to capture all user events
        this.rect = this.rectangle(0, 0, this.width, this.height);
        this.rect.style.fill = 'transparent';
        if (config.border === undefined || config.border) {
            this.rect.style.border = '1px solid #404040';
        }
        else {
            this.rect.style.stroke = 'none';
        }
        // default values
        this.viewPort = this.svg(0, 0, this.width, this.height);
        this.viewPort.setAttribute('preserveAspectRatio', 'none');
        // create a static group for non-size-scaling objects
        this.staticGroup = this.group();
        this.xAxis = this.staticGroup.line(-10000, 0, 10000, 0);
        this.yAxis = this.staticGroup.line(0, -10000, 0, 10000);
        this.staticGroup.circle(0, 0, 3).fill = '#404040';
        // initialize the scaling
        this.scaleX = config.scaleX;
        this.scaleY = config.scaleY;
        // calculate the visible dimensions and top-left position of internal coordinates
        this.visibleWidth = this.width / this.scaleX;
        this.visibleHeight = this.height / this.scaleY;
        this.internalX = -this.visibleWidth / 2;
        this.internalY = -this.visibleHeight / 2;
        this.fPath = this.staticGroup.path('');
        // this.fPath.root.setAttribute('vector-effect','non-scaling-stroke');
        this.fPath.setAttribute('transform', 'scale(1, -1)');
        this.setViewBox();
        if (config.originX != undefined && config.originY != undefined) {
            this.setOrigin(config.originX, config.originY);
        }
        // draw a grid of rectangles
        if (config.grid) {
            this.grid = this.viewPort.group();
            this.grid.classList.add('grid');
            this.grid.style.opacity = '.4';
            // horizontal lines
            for (let i = Math.floor(this.internalY); i <= this.internalY + this.visibleHeight; i++) {
                this.grid.line(this.internalX, i, this.internalX + this.visibleWidth, i);
            }
            // vertical lines
            for (let i = Math.floor(this.internalX); i <= this.internalX + this.visibleWidth; i++) {
                this.grid.line(i, this.internalY, i, this.internalY + this.visibleHeight);
            }
        }
        // store a temp variable for registering events
        let graph = this;
        // Registers event listeners
        if (config.displayPoint === undefined || config.displayPoint) {
            // create a display circle for showing input and output
            this.displayCircle = this.staticGroup.circle(0, 0, 4);
            this.displayCircle.style.fill = 'cornflowerblue';
            this.displayCircle.setAttribute('transform', 'scale(1, -1)');
            this.xRect = this.rectangle(0, 0, 125, 40);
            this.yRect = this.rectangle(120, 0, 125, 40);
            this.xRect.root.style.fill = 'white';
            this.yRect.root.style.fill = 'white';
            this.xText = this.text(15, 20, 'x:0');
            this.xText.root.style.dominantBaseline = 'middle';
            this.xText.root.style.whiteSpace = 'pre';
            this.yText = this.text(125 + 15, 20, 'y:0');
            this.yText.root.style.dominantBaseline = 'middle';
            this.yText.root.style.whiteSpace = 'pre';
            this.root.addEventListener('mousemove', function (event) {
                graph.handleMouseMove(event);
            });
        }
        if (config.zoomable === undefined || config.zoomable) {
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
        if (config.controls) {
            let zoomIn = this.rectangle(this.width - 48, 16, 30, 30);
            zoomIn.setAttribute('rx', '3');
            zoomIn.style.fill = '#f8f8f8';
            let zoomOut = this.rectangle(this.width - 48, 46, 30, 30);
            zoomOut.setAttribute('rx', '3');
            zoomOut.style.fill = '#f8f8f8';
            let fullscreen = this.circle(this.width - 32, this.height - 32, 16);
            fullscreen.style.fill = '#f8f8f8';
        }
        // draw the initial state of the graph
        this.draw();
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
    get originX() {
        return -this.x;
    }
    get originY() {
        return -this.y;
    }
    /**
    * Updates the display circle based on its current cx position, also updates
    * the display text elements to represent the position of the display circle.
    */
    updateDisplayCircle() {
        // Set the initial display position
        if (this.displayCircle != undefined) {
            let cy = this.call(this.displayCircle.cx, false);
            if (isNaN(cy)) {
                this.displayCircle.cy = 0;
            }
            else if (isFinite(cy)) {
                this.displayCircle.cy = cy;
                this.xText.contents = this.format(this.displayCircle.cx / this.scaleX);
                this.yText.contents = this.format(this.displayCircle.cy / this.scaleY);
            }
            else {
                this.displayCircle.cy = this.height * 3;
                ;
                this.xText.contents = this.format(this.displayCircle.cx / this.scaleX);
                this.yText.contents = cy.toString();
            }
        }
    }
    /**
    * Returns the result of calling the internal function with the provided
    * function scaling both the input and the output.
    */
    call(x, trim = false) {
        // call and scale the function
        let y = this.scaleY * this._function(x / this.scaleX);
        // normalize big/small y values
        if (trim) {
            let margin = 8;
            let yMax = this.y + this.height + margin;
            let yMin = this.y - margin;
            if (-y > yMax) {
                y = -yMax;
            }
            if (-y < yMin) {
                y = -yMin;
            }
        }
        else {
            let yMax = this.y + 2 * this.height;
            let yMin = this.y - this.height;
            if (y > yMax) {
                y = yMax;
            }
            if (y < yMin) {
                y = yMin;
            }
        }
        return y;
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
    * Draws the internal function over the interval [startX, endX]. The default
    * interval is [ minX - width, maxX + width ] so that when a user drags the
    * graph there is enough drawn so that a translate may be applied instead of
    * having to call draw again.
    */
    draw(startX = this.x - this.width, endX = this.x + 2 * this.width, trim = false) {
        this.setViewBox();
        this.updateDisplayCircle();
        // Start drawing the function
        let start = false;
        let x = startX;
        let y = this.call(x, trim);
        let d = '';
        let prev;
        // If y is valid input start drawing
        if (!isNaN(y)) {
            d = `M ${x} ${y} `;
            prev = y;
            start = true;
        }
        // Loop through and draw coordiantes of the function path
        for (x += 1; x < endX; x += 1) {
            let y = this.call(x, trim);
            if (isNaN(y) || !isFinite(y)) {
                continue;
            }
            // check for vertical asymptotes or if we haven't started drawing
            else if (Math.abs(prev - y) >= this.height || !start) {
                d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
                start = true;
            }
            else {
                d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
            }
            prev = y;
        }
        this.fPath.d = d;
        // Update the dependents if there are any
        this.updateDependents();
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
    }
    /**
    * When the user's mouse leaves the graph deactivates any concurrent drag.
    */
    handleMouseLeave(event) {
        this.handleMouseUp(event);
    }
    /**
    * Updates the position of the static group and sets the viewbox on the
    * viewPort element.
    */
    setViewBox() {
        this.staticGroup.setAttribute('transform', `translate(${-this.x}, ${-this.y})`);
        this.viewPort.setAttribute('viewBox', `${this.internalX} ${this.internalY} ${this.visibleWidth} ${this.visibleHeight}`);
    }
    /**
    * This moves the origin of the plot to the location (x,y) relative to the size
    * of the plot. For example, if the plot is 600 wide and 300 tall, placing the
    * origin at (100,100) move the origin to the point 100 units in the x
    * direction and 100 units in the y direction from the top left corner of the
    * plot.
    */
    setOrigin(x, y) {
        this.x = -x;
        this.y = -y;
        this.internalX = this.x / this.scaleX;
        this.internalY = this.y / this.scaleY;
        this.draw();
    }
    /**
    * Handle when a mouse moves over this graph. If a drag event is active then
    * translates the position of the graph to the new location.
    */
    handleMouseMove(event) {
        if (this.active) {
            let deltaX = event.clientX - this.prevX;
            let deltaY = event.clientY - this.prevY;
            this.x -= deltaX;
            this.y -= deltaY;
            this.internalX -= deltaX / this.scaleX;
            this.internalY -= deltaY / this.scaleY;
            this.prevX = event.clientX;
            this.prevY = event.clientY;
            this.draw();
        }
        else {
            let br = this.rect.root.getBoundingClientRect();
            if (this.displayCircle != undefined) {
                this.displayCircle.cx = event.clientX - br.left + this.x;
                this.updateDisplayCircle();
            }
        }
    }
    /**
    * Zooms in and out on this graph. TODO: There is some jarring wheel action
    * where an active wheel event on the page will stop dead when the mouse
    * goes over the graph. Also it seems as if the scroll has pre-existing
    * "momentum" that it can also affect the graph.
    */
    handleMouseWheelEvent(event) {
        event.preventDefault();
        let zoomIntensity = .02;
        let br = this.rect.root.getBoundingClientRect();
        let x = event.clientX - br.left;
        let y = event.clientY - br.top;
        let wheel = event.deltaY < 0 ? 1 : -1;
        let zoom = Math.exp(wheel * zoomIntensity);
        // transform the internal coordinate system
        let deltaX = x / (this.scaleX * zoom) - x / this.scaleX;
        let deltaY = y / (this.scaleY * zoom) - y / this.scaleY;
        this.internalX -= deltaX;
        this.internalY -= deltaY;
        this.scaleX *= zoom;
        this.scaleY *= zoom;
        this.visibleWidth = this.width / this.scaleX;
        this.visibleHeight = this.height / this.scaleY;
        // update the elements in the static (svg) coordinate system
        this.x = this.internalX * this.scaleX;
        this.y = this.internalY * this.scaleY;
        // update the position of the display circle
        if (this.displayCircle != undefined) {
            this.displayCircle.cx = event.clientX - br.left + this.x;
        }
        // redraw visual elements
        this.draw();
    }
    /**
    *
    */
    export() {
        let result = new SVG(0, 0, this.width, this.height);
        let margin = 8;
        // trim axis
        this.xAxis.x1 = this.x;
        this.xAxis.x2 = this.x + this.width;
        this.yAxis.y1 = this.y;
        this.yAxis.y2 = this.y + this.height;
        // draw trimmed version
        this.draw(this.x - margin, this.x + this.width + margin, true);
        return result;
    }
}
//# sourceMappingURL=plot.js.map