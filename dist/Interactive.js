import SVG from './SVG.js';
// basic elements
import Circle from './elements/Circle.js';
import Element from './elements/Element.js';
import Ellipse from './elements/Ellipse.js';
import Group from './elements/Group.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Text from './elements/Text.js';
import Rectangle from './elements/Rectangle.js';
import Node from './elements/Node.js';
import Edge from './elements/Edge.js';
// input elements
import Button from './elements/Button.js';
import CheckBox from './elements/CheckBox.js';
import Control from './elements/Control.js';
import ControlCircle from './elements/ControlCircle.js';
import Scrubber from './elements/Scrubber.js';
import Slider from './elements/Slider.js';
import RadioControl from './elements/RadioControl.js';
// complex elements
import Plot from './elements/Plot.js';
import Graph from './elements/Graph.js';
import Map from './elements/GeoMap.js';
/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
export default class Interactive extends Element {
    /**
    * Constructs a new interactive object within the HTML element corresponding
    * to the id. If no element is found throws an error.
    */
    constructor(id) {
        super();
        // internal variables
        this._width = 0;
        this._height = 0;
        this._originX = 0;
        this._originY = 0;
        // store a reference to the container element
        this.container = document.getElementById(id);
        this.container.classList.add('interactive-container');
        // create and append the root svg element and group elements
        this.root = this.container.appendChild(SVG.SVG());
        this.root.classList.add('interactive');
        this.root.id = this.id;
        this.style = this.root.style;
        this.background = this.root.appendChild(SVG.Group());
        this.controls = this.root.appendChild(SVG.Group());
        // default configuration
        this.width = 600;
        this.height = 300;
        this.window = false;
        // prevent the default behavior of selecting text
        this.container.addEventListener('mousedown', function (event) {
            event.preventDefault();
        });
    }
    /**
    * Sets the width of this interactive area.
    */
    set width(value) {
        this._width = value;
        this.root.setAttribute('width', value.toString());
    }
    /**
    * Returns the width of this interactive area.
    */
    get width() {
        return this._width;
    }
    /**
    * Sets the height of this interactive area.
    */
    set height(value) {
        this._height = value;
        this.root.setAttribute('height', value.toString());
    }
    /**
    * Returns the height of this interactive area.
    */
    get height() {
        return this._height;
    }
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value) {
        this._originX = value;
        this.setViewBox(this.minX, this.minY, this.width, this.height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        this._originY = value;
        this.setViewBox(this.minX, this.minY, this.width, this.height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        return this._originY;
    }
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value) {
        if (value) {
            this.root.classList.add('window');
        }
        else {
            this.root.classList.remove('window');
        }
    }
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    set border(value) {
        if (value) {
            this.root.classList.add('border');
        }
        else {
            this.root.classList.remove('border');
        }
    }
    // TODO: yikes that didn't work as expected
    // set flipCoordinateSystem( value:boolean ) {
    //   if( value ) {
    //     this.svg.style.transform = 'scale(1,-1)';
    //   } else {
    //     this.svg.style.transform = '';
    //   }
    // }
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX() {
        return -this.originX;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return -this.originY;
    }
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    get maxX() {
        return this.minX + this._width;
    }
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    get maxY() {
        return this.minY + this._height;
    }
    /**
    * A user provided description of this interactive.
    */
    set description(description) {
        this.root.setAttribute('data-description', description);
    }
    /**
    * Sets the viewbox of the root svg element to the provided values.
    * TODO: look into css transform-origin
    */
    setViewBox(minX, minY, width, height) {
        this.root.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x, y, label) {
        let button = new Button(x, y, label);
        this.controls.appendChild(button.root);
        return button;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x, y, label, value) {
        let checkBox = new CheckBox(x, y, label, value);
        this.controls.appendChild(checkBox.root);
        return checkBox;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(labels, x, y, index = 0) {
        let radioControl = new RadioControl(labels, x, y, index);
        this.controls.appendChild(radioControl.root);
        return radioControl;
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x, y) {
        let control = new Control(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x, y) {
        let control = new ControlCircle(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    /**
    * Creates a plot within this interactive at the position (x,y).
    */
    plot(userEvents = true) {
        let plot = new Plot(userEvents);
        this.background.appendChild(plot.root);
        return plot;
    }
    /**
    * Creates a graph element within this interactive
    */
    graph() {
        let graph = new Graph();
        this.background.appendChild(graph.root);
        return graph;
    }
    /**
    * Creates a graph element within this interactive
    */
    map(mapName, width, height) {
        let map = new Map(this, mapName, width, height);
        this.background.appendChild(map.interactive.root);
        return map;
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, width, value) {
        let slider = new Slider(x, y, width, value);
        this.controls.appendChild(slider.root);
        return slider;
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, width) {
        let scrubber = new Scrubber(x, y, width);
        this.controls.appendChild(scrubber.root);
        return scrubber;
    }
    /**
    * Creates a circle within this interactive.
    */
    circle(cx, cy, r) {
        let circle = new Circle(cx, cy, r);
        this.background.appendChild(circle.root);
        return circle;
    }
    /**
    * Creates an ellipse within this interactive.
    */
    ellipse(cx, cy, rx, ry) {
        let ellipse = new Ellipse(cx, cy, rx, ry);
        this.background.appendChild(ellipse.root);
        return ellipse;
    }
    /**
    * Creates a line within this interactive.
    */
    line(x1, y1, x2, y2) {
        let line = new Line(x1, y1, x2, y2);
        this.background.appendChild(line.root);
        return line;
    }
    /**
    * Creates a path within this interactive.
    */
    path(d) {
        let path = new Path(d);
        this.background.appendChild(path.root);
        return path;
    }
    /**
    * Creates a rectangle within this interactive.
    */
    rectangle(x, y, width, height) {
        let rectangle = new Rectangle(x, y, width, height);
        this.background.appendChild(rectangle.root);
        return rectangle;
    }
    /**
    * Creates text within this interactive.
    */
    text(x, y, contents = '') {
        let text = new Text(x, y, contents);
        this.background.appendChild(text.root);
        return text;
    }
    /**
    * Creates a node within this interactive.
    */
    node(x, y, r, contents) {
        let node = new Node(x, y, r, contents);
        this.background.appendChild(node.root);
        return node;
    }
    /**
    * Creates an edge connecting two nodes within this interactive.
    */
    edge(nodeFrom, nodeTo, directed) {
        let edge = new Edge(nodeFrom, nodeTo, directed);
        this.background.appendChild(edge.root);
        return edge;
    }
    group() {
        let group = new Group();
        this.background.appendChild(group.root);
        return group;
    }
    /**
    *
    */
    async loadSVG(url) {
        let svg = await SVG.getSVG(url);
        let group = new Group();
        group.root.appendChild(svg);
        this.background.appendChild(group.root);
        return group;
    }
}
//# sourceMappingURL=Interactive.js.map