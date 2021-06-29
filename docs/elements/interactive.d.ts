import Element from './svg/element.js';
import SVG from './svg/svg.js';
import Group from './svg/group.js';
import Icon from './visual/icon.js';
import Button from './input/button.js';
import CheckBox from './input/check-box.js';
import Control from './input/control.js';
import RadioControl from './input/radio-control.js';
import DropdownControl from './input/dropdown-control.js';
import Scrubber from './input/scrubber.js';
import Slider, { SliderOptions } from './input/slider.js';
import HoverBox from './input/hover-box.js';
import Node from '../elements/graph/node.js';
import Edge from '../elements/graph/edge.js';
import Graph, { GraphOptions } from '../elements/graph/graph.js';
import Map, { MapOptions } from '../elements/maps/map.js';
import { GeoJSON } from './maps/geo-json.js';
import Plot, { PlotOptions } from '../elements/math/plot.js';
interface InteractiveOptions {
    width?: number;
    height?: number;
    originX?: number;
    originY?: number;
    border?: boolean;
}
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
    * The input groups sits on top of the background group and ensures that
    * input elements will always visually appear above background elements.
    */
    input: Group;
    /**
    * The background is where everything that is not a primary control is drawn.
    */
    background: Group;
    /**
    * This group contains symbols that can be reused within this interactive.
    */
    private symbols;
    /**
    * Maps icon names to ids.
    */
    private icons;
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
    constructor(value: string | HTMLElement, options?: InteractiveOptions);
    /**
    * Sets the width of this interactive area.
    */
    set width(value: number);
    /**
    * Returns the width of this interactive area.
    */
    get width(): number;
    /**
    * Sets the height of this interactive area.
    */
    set height(value: number);
    /**
    * Returns the height of this interactive area.
    */
    get height(): number;
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value: number);
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX(): number;
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value: number);
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY(): number;
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value: boolean);
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    set border(value: boolean);
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX(): number;
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY(): number;
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    get maxX(): number;
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    get maxY(): number;
    /**
    * Appends the element within the interactive. If the element is an "input"
    * element, places the element in the input group so that visually the element
    * is always placed above other graphical elements.
    */
    appendChild<T extends Element>(child: T): T;
    /**
    * Creates a nested interactive within this interactive
    */
    interactive(x: number, y: number, options?: InteractiveOptions): Interactive;
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x: number, y: number, label: string): Button;
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x: number, y: number, label: string, value: boolean): CheckBox;
    /**
    * Creates an icon at the position (x,y) with the provided dimensions.
    */
    icon(x: number, y: number, width: number, height: number, name: string, options?: {
        baseURL?: string;
    }): Icon;
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(x: number, y: number, labels: string[], index?: number): RadioControl;
    /**
    * Creates a dropdown input at the position (x,y) within this interactive.
    */
    dropdownControl(x: number, y: number, optionLabels: string[], defaultIndex: number): DropdownControl;
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
    plot(fn: (x: number) => number, options: PlotOptions): Plot;
    /**
    * Creates a graph element within this interactive
    */
    graph(options: GraphOptions): Graph;
    hoverBox(str: string): HoverBox;
    /**
    * Creates a graph element within this interactive
    */
    map(externalData: GeoJSON, featureName?: string, options?: MapOptions): Map;
    /**
    * Creates a slider input within this interactive
    */
    slider(x: number, y: number, options: SliderOptions): Slider;
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x: number, y: number, options: SliderOptions): Scrubber;
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
export {};
