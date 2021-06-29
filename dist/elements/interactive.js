// util
import { getURL } from '../util/file.js';
import { parseSVG } from '../util/svg.js';
// basic elements
import Input from './input/input.js';
import SVG from './svg/svg.js';
import Group from './svg/group.js';
// visual elements
import Icon from './visual/icon.js';
// input elements
import Button from './input/button.js';
import CheckBox from './input/check-box.js';
import Control from './input/control.js';
import ControlCircle from './input/control-circle.js';
import RadioControl from './input/radio-control.js';
import DropdownControl from './input/dropdown-control.js';
import Scrubber from './input/scrubber.js';
import Slider from './input/slider.js';
import HoverBox from './input/hover-box.js';
// graph elements
import Node from '../elements/graph/node.js';
import Edge from '../elements/graph/edge.js';
import Graph from '../elements/graph/graph.js';
// map elements
import Map from '../elements/maps/map.js';
// math elements
import Plot from '../elements/math/plot.js';
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
    container;
    /**
    * The input groups sits on top of the background group and ensures that
    * input elements will always visually appear above background elements.
    */
    input;
    /**
    * The background is where everything that is not a primary control is drawn.
    */
    background;
    /**
    * This group contains symbols that can be reused within this interactive.
    */
    symbols;
    /**
    * Maps icon names to ids.
    */
    icons;
    // internal variables
    _width;
    _height;
    _originX;
    _originY;
    /**
    * Constructs a new interactive object and appends it into the DOM. If the
    * provided argument is an HTMLElement appends the interactive within that
    * element. If the provided a value is a string, appends the interactive within
    * the HTML element with the corresponding ID. If no element is found throws an
    * error.
    */
    constructor(value, options = {}) {
        super();
        // If the user passes in a string identifier check to see if such an
        // element exists in the current document.
        if (typeof value == "string") {
            this.container = document.getElementById(value);
            if (this.container === null || this.container === undefined) {
                throw new Error(`There is no HTML element with the id: ${value}`);
            }
        }
        else {
            this.container = value;
        }
        // create and append the root svg element and group elements
        this.container.appendChild(this.root);
        this.root.classList.add('interactive');
        // Have to create and manually append because overridden append child will
        // throw an error.
        this.background = new Group();
        this.input = new Group();
        this.root.appendChild(this.background.root);
        this.root.appendChild(this.input.root);
        // default configuration options
        let defaultOptions = {
            originX: 0,
            originY: 0,
            width: 600,
            height: 300,
            border: false
        };
        // combine the default configuration with the user's configuration
        let config = { ...defaultOptions, ...options };
        this._originX = config.originX;
        this._originY = config.originY;
        this._width = config.width;
        this._height = config.height;
        this.root.setAttribute('width', this._width.toString());
        this.root.setAttribute('height', this._height.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
        this.window = false;
        this.border = config.border;
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
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
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
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
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
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
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
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
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
    * Appends the element within the interactive. If the element is an "input"
    * element, places the element in the input group so that visually the element
    * is always placed above other graphical elements.
    */
    appendChild(child) {
        if (child instanceof Input) {
            this.input.appendChild(child);
        }
        else {
            this.background.appendChild(child);
        }
        return child;
    }
    /**
    * Creates a nested interactive within this interactive
    */
    interactive(x, y, options = {}) {
        let obj = new Interactive(this.id, options);
        // TODO: standardize this
        obj.root.setAttribute('x', x.toString());
        obj.root.setAttribute('y', y.toString());
        return obj;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x, y, label) {
        return this.appendChild(new Button(x, y, label));
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x, y, label, value) {
        return this.appendChild(new CheckBox(x, y, label, value));
    }
    /**
    * Creates an icon at the position (x,y) with the provided dimensions.
    */
    icon(x, y, width, height, name, options = {}) {
        let baseURL;
        if (options.baseURL === undefined) {
            baseURL = 'resources/icons/';
        }
        else {
            baseURL = options.baseURL;
        }
        // check to see if the symbols group has been initialized
        if (this.symbols === undefined) {
            this.symbols = new Group();
            this.root.appendChild(this.symbols.root);
            this.icons = new Set();
        }
        // create a new icon element
        let icon = new Icon(x, y, width, height);
        this.appendChild(icon);
        // check to see if we have loaded this icon before
        let id = `${this.id}-${name}`;
        if (!this.icons.has(id)) {
            // TODO: maybe we should only request one SVG file with that defines many
            // icon symbols. Then add the symbols as needed from, rather than have
            // many network requests for symbols. Or maybe the user could add the
            // symbols to their web page themselves.
            let temp = this;
            getURL(`${baseURL}${name}.svg`).then(function (response) {
                let symbolSVG = parseSVG(response);
                let symbol = temp.symbols.symbol();
                symbol.root.id = id;
                symbol.viewBox = symbolSVG.getAttribute('viewBox');
                while (symbolSVG.childNodes.length > 0) {
                    symbol.root.appendChild(symbolSVG.childNodes[0]);
                }
                icon.href = `#${id}`;
            }).catch(function (error) {
                throw error;
            });
        }
        else {
            icon.href = `#${id}`;
        }
        this.icons.add(id);
        return icon;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(x, y, labels, index = 0) {
        return this.appendChild(new RadioControl(x, y, labels, index));
    }
    /**
    * Creates a dropdown input at the position (x,y) within this interactive.
    */
    dropdownControl(x, y, optionLabels, defaultIndex) {
        return this.appendChild(new DropdownControl(x, y, optionLabels, defaultIndex));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x, y) {
        return this.appendChild(new Control(x, y));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x, y) {
        return this.appendChild(new ControlCircle(x, y));
    }
    /**
    * Creates a plot within this interactive at the position (x,y).
    */
    plot(fn, options) {
        return this.appendChild(new Plot(fn, options));
    }
    /**
    * Creates a graph element within this interactive
    */
    graph(options) {
        return this.appendChild(new Graph(options));
    }
    hoverBox(str) {
        return this.appendChild(new HoverBox(str));
    }
    /**
    * Creates a graph element within this interactive
    */
    map(externalData, featureName = null, options = {}) {
        let map = new Map(featureName, externalData, options);
        let ret = this.appendChild(map);
        let bbox = map.root.getBBox();
        map.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
        return ret;
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, options) {
        return this.appendChild(new Slider(x, y, options));
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, options) {
        return this.appendChild(new Scrubber(x, y, options));
    }
    /**
    * Creates a node within this interactive.
    */
    node(x, y, rx, ry, contents) {
        return this.appendChild(new Node(x, y, rx, ry, contents));
    }
    /**
    * Creates an edge connecting two nodes within this interactive.
    */
    edge(nodeFrom, nodeTo, directed) {
        return this.appendChild(new Edge(nodeFrom, nodeTo, directed));
    }
    /**
    *
    */
    async loadSVG(url) {
        let group = new Group();
        this.appendChild(group);
        getURL(url).then(function (response) {
            group.root.appendChild(parseSVG(response));
        }).catch(function (error) {
            throw error;
        });
        return group;
    }
}
//# sourceMappingURL=interactive.js.map