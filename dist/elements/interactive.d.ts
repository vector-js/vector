import Element from '../elements/element.js';
import SVG from '../elements/svg/svg.js';
import Group from '../elements/svg/group.js';
import Icon from '../elements/visual/icon.js';
import Button from '../elements/input/button.js';
import CheckBox from '../elements/input/check-box.js';
import Control from '../elements/input/control.js';
import RadioControl from '../elements/input/radio-control.js';
import Scrubber from '../elements/input/scrubber.js';
import Slider from '../elements/input/slider.js';
import Node from '../elements/graph/node.js';
import Edge from '../elements/graph/edge.js';
import Graph from '../elements/graph/graph.js';
import DirectedGraph from '../elements/graph/directed-graph.js';
import Map from '../elements/maps/map.js';
import Plot from '../elements/math/plot.js';
import { GeoJSON } from './maps/geo-json.js';
/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
export default class Interactive extends SVG {
    /**
    * The container element for this interactive.
    */
    container: HTMLElement;
    /**
    * The SVG document root.
    */
    document: SVG;
    /**
    * The input groups sits on top of the background group and ensures that
    * input elements will always visually appear above background elements.
    */
    input: Group;
    /**
    * The background is where everything that is not a primary control is drawn.
    */
    background: Group;
    private _width;
    private _height;
    private _originX;
    private _originY;
    /**
    * Constructs a new interactive object and appends it into the DOM. If the
    * provided argument is an HTMLElement appends the interactive within that
    * element. If the provided a value is a string, appends the interactive within
    * the HTML element with the corresponding ID. If no element is found throws an
    * error.
    */
    constructor(value: string | HTMLElement);
    /**
    * Sets the width of this interactive area.
    */
    /**
    * Returns the width of this interactive area.
    */
    width: number;
    /**
    * Sets the height of this interactive area.
    */
    /**
    * Returns the height of this interactive area.
    */
    height: number;
    /**
    * Sets the x coordinate of the origin.
    */
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    originX: number;
    /**
    * Sets the y coordinate of the origin.
    */
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    originY: number;
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    window: boolean;
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    border: boolean;
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    readonly minX: number;
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    readonly minY: number;
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    readonly maxX: number;
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    readonly maxY: number;
    /**
    * Appends the element within the interactive. If the element is an "input"
    * element, places the element in the input group so that visually the element
    * is always placed above other graphical elements.
    */
    appendChild<T extends Element>(child: T): T;
    /**
    * Creates a nested interactive within this interactive
    */
    interactive(x: number, y: number): Interactive;
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x: number, y: number, label: string): Button;
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x: number, y: number, label: string, value: boolean): CheckBox;
    icon(x: number, y: number, str: string): Icon;
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(x: number, y: number, labels: string[], index?: number): RadioControl;
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x: number, y: number): Control;
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x: number, y: number): Control;
    /**
    * Creates a plot within this interactive at the position (x,y).
    */
    plot(userEvents?: boolean, width?: number, height?: number, scaleX?: number, scaleY?: number): Plot;
    /**
    * Creates a graph element within this interactive
    */
    graph(): Graph;
    /**
    * Creates a graph element within this interactive
    */
    map(externalData: GeoJSON, width: number, height: number, featureName?: string): Map;
    directedGraph(): DirectedGraph;
    /**
    * Creates a slider input within this interactive
    */
    slider(x: number, y: number, width?: number, value?: number): Slider;
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x: number, y: number, width: number): Scrubber;
    /**
    * Creates a node within this interactive.
    */
    node(x: number, y: number, rx: number, ry: number, contents: string): Node;
    /**
    * Creates an edge connecting two nodes within this interactive.
    */
    edge(nodeFrom: Node, nodeTo: Node, directed: boolean): Edge;
    /**
    *
    */
    loadSVG(url: string): Promise<Group>;
}
