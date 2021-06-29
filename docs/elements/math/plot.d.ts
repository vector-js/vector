import Circle from '../svg/circle.js';
import Group from '../svg/group.js';
import Line from '../svg/line.js';
import Path from '../svg/path.js';
import Rectangle from '../svg/rectangle.js';
import SVG from '../svg/svg.js';
import Text from '../svg/text.js';
import Point from '../math/point.js';
/**
* These options control the configuration of a plot object when it is created.
*/
export interface PlotOptions {
    /**
    * The left-most x-position of the plot area
    */
    x?: number;
    /**
    * The top-most y-position of the plot area
    */
    y?: number;
    /**
    * The width of the chart
    */
    width?: number;
    /**
    * The height of the chart.
    */
    height?: number;
    /**
    * Margin
    */
    margin?: number;
    /**
    * Set the plot title.
    */
    title?: string | Text;
    /**
    * When set to true displays a grid representing the current scale of the plot
    */
    grid?: boolean;
    /**
    * If true displays axis labels.
    */
    labels?: boolean;
    /**
    * Controls how much the plot is scaled in the x direction.
    */
    scaleX?: number;
    /**
    * Controls how much the plot is scaled in the y direction.
    */
    scaleY?: number;
    /**
    * Sets the x origin of the internal coordinate system relative to the top left
    * corner of the plot.
    */
    originX?: number;
    /**
    * Sets the y origin of the internal coordinate system relative to the top left
    * corner of the plot.
    */
    originY?: number;
    border?: boolean;
    /**
    * Toggle whether the plot has controls. Full screen, zoom in, zoom out buttons.
    */
    controls?: boolean;
    /**
    * When set to true allows the user to zoom in/out and pan using the mouse
    * scroll event and clicking and dragging. Default value is false.
    */
    zoomable?: boolean;
    /**
    * When set to true displays a point representing the output of the function
    * for the current x-location of the user's mouse.
    */
    displayPoint?: boolean;
}
/**
* A plot of the graph of a function.
*/
export default class Plot extends SVG {
    /**
    * Invisible element for registering events
    */
    rect: Rectangle;
    /**
    *
    */
    clipGroup: Group;
    /**
    * This view port is a coordinate system where things are scaled using svg's
    * internal representatino of scaling.
    */
    viewPort: SVG;
    /**
    * This static group gets translated along witht he viewPort, but elements
    * retain their original sizing.
    */
    staticGroup: Group;
    /**
    * Represents the path taken by the function.
    */
    fPath: Path;
    /**
    * A display circle to display input and output
    */
    displayCircle: Circle;
    /**
    * A line to represent the x-axis of this graph
    */
    xAxis: Line;
    /**
    * A line to represent the y-axis of this graph
    */
    yAxis: Line;
    /**
    * A group containing the grid lines
    */
    grid: Group;
    xRect: Rectangle;
    yRect: Rectangle;
    xText: Text;
    yText: Text;
    /**
    * Keeps track of whether a translate is active or not.
    */
    private active;
    /**
    * The function that is currently being displayed for this graph.
    */
    private _function;
    private _x;
    private _y;
    private _width;
    private _height;
    private scaleX;
    private scaleY;
    private internalX;
    private internalY;
    private visibleWidth;
    private visibleHeight;
    private prevX;
    private prevY;
    /**
    * Constructs a new graph capable of displaying a function in the form of
    * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
    * explore the shape and form of the function.
    */
    constructor(fn: (x: number) => number, options: PlotOptions);
    /**
    * Sets the internal function to the provided function
    */
    set function(f: (x: number) => number);
    /**
    * Returns the internal function
    */
    get function(): (x: number) => number;
    get originX(): number;
    get originY(): number;
    /**
    * Updates the display circle based on its current cx position, also updates
    * the display text elements to represent the position of the display circle.
    */
    updateDisplayCircle(): void;
    /**
    * Returns the result of calling the internal function with the provided
    * function scaling both the input and the output.
    */
    call(x: number, trim?: boolean): number;
    /**
    * Formats the input number to be displayed within the graph.
    */
    format(n: number): string;
    /**
    * Draws the internal function over the interval [startX, endX]. The default
    * interval is [ minX - width, maxX + width ] so that when a user drags the
    * graph there is enough drawn so that a translate may be applied instead of
    * having to call draw again.
    */
    draw(startX?: number, endX?: number, trim?: boolean): void;
    /**
    *
    */
    drawGrid(): void;
    internalToAbsolute(point: Point): Point;
    /**
    *
    */
    getXLabelPoints(): Point[];
    /**
    *
    */
    getYLabelPoints(): Point[];
    /**
    * When a user mouses down over this graph a drag is active.
    */
    handleMouseDown(event: MouseEvent): void;
    /**
    * Deactivates the current drag event.
    */
    handleMouseUp(_event: MouseEvent): void;
    /**
    * When the user's mouse leaves the graph deactivates any concurrent drag.
    */
    handleMouseLeave(event: MouseEvent): void;
    /**
    * Updates the position of the static group and sets the viewbox on the
    * viewPort element.
    */
    setViewBox(): void;
    /**
    * This moves the origin of the plot to the location (x,y) relative to the size
    * of the plot. For example, if the plot is 600 wide and 300 tall, placing the
    * origin at (100,100) move the origin to the point 100 units in the x
    * direction and 100 units in the y direction from the top left corner of the
    * plot.
    */
    setOrigin(x: number, y: number): void;
    /**
    * Handle when a mouse moves over this graph. If a drag event is active then
    * translates the position of the graph to the new location.
    */
    handleMouseMove(event: MouseEvent): void;
    /**
    * Zooms in and out on this graph. TODO: There is some jarring wheel action
    * where an active wheel event on the page will stop dead when the mouse
    * goes over the graph. Also it seems as if the scroll has pre-existing
    * "momentum" that it can also affect the graph.
    */
    handleMouseWheelEvent(event: WheelEvent): void;
    /**
    *
    */
    export(): SVG;
}
