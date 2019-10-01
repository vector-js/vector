import Circle from '../svg/circle.js';
import Group from '../svg/group.js';
import Line from '../svg/line.js';
import Path from '../svg/path.js';
import Rectangle from '../svg/rectangle.js';
import SVG from '../svg/svg.js';
import Text from '../svg/text.js';
/**
* A plot of the graph of a function.
*/
export default class Plot extends Group {
    /**
    * Invisible element for registering events
    */
    rect: Rectangle;
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
    private x;
    private y;
    private width;
    private height;
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
    constructor(userEvents?: boolean, width?: number, height?: number, scaleX?: number, scaleY?: number);
    /**
    * Sets the internal function to the provided function
    */
    /**
    * Returns the internal function
    */
    function: (x: number) => number;
    /**
    * Returns the result of calling the internal function with the provided
    * function scaling both the input and the output.
    */
    call(x: number): number;
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
    draw(startX?: number, endX?: number): void;
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
}
