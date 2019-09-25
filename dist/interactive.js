// util
import { getURL } from './util.js';
// basic elements
import SVG from './elements/svg.js';
import { Input } from './elements/element.js';
import Group from './elements/group.js';
// elements
import Button from './elements/button.js';
import CheckBox from './elements/check-box.js';
import Control from './elements/control.js';
import ControlCircle from './elements/control-circle.js';
import Scrubber from './elements/scrubber.js';
import Slider from './elements/slider.js';
import RadioControl from './elements/radio-control.js';
// complex elements
import Node from './elements/node.js';
import Edge from './elements/edge.js';
import Icon from './elements/icon.js';
import Plot from './elements/plot.js';
import Graph from './elements/graph.js';
import Map from './elements/map.js';
import DirectedGraph from './elements/directed-graph.js';
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
    * Constructs a new interactive object and appends it into the DOM. If the
    * provided argument is an HTMLElement appends the interactive within that
    * element. If the provided a value is a string, appends the interactive within
    * the HTML element with the corresponding ID. If no element is found throws an
    * error.
    */
    constructor(value) {
        super();
        // internal variables
        this._width = 0;
        this._height = 0;
        this._originX = 0;
        this._originY = 0;
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
        this.container.classList.add('interactive-container');
        // create and append the root svg element and group elements
        this.container.appendChild(this.root);
        this.root.classList.add('interactive');
        this.background = new Group();
        this.input = new Group();
        this.root.appendChild(this.background.root);
        this.root.appendChild(this.input.root);
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
        throw new Error('not implemented');
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        throw new Error('not implemented');
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        throw new Error('not implemented');
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        throw new Error('not implemented');
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
    interactive(x, y) {
        let obj = new Interactive(this.id);
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
    icon(x, y, str) {
        // create a new icon element
        let icon = new Icon(x, y);
        this.appendChild(icon);
        // check to see if we have loaded the symbols svg, if not load it
        let id = 'vector-js-symbols';
        let svg = document.getElementById(id);
        if (svg === undefined || svg === null) {
            svg = SVG.SVG();
            svg.style.display = 'none';
            svg.id = id;
            document.body.appendChild(svg);
        }
        // check to see if we have loaded this icon before
        let symbol = svg.querySelector(`#${str}`);
        if (!symbol) {
            getURL(`/resources/icons/${str}.svg`).then(function (response) {
                let symbol = SVG.Symbol();
                symbol.id = str;
                let symbolSVG = SVG.parseSVG(response);
                while (symbolSVG.childNodes.length > 0) {
                    symbol.appendChild(symbolSVG.childNodes[0]);
                }
                svg.appendChild(symbol);
                let use = SVG.Use();
                use.setAttribute('href', `#${str}`);
                icon.root.appendChild(use);
            }).catch(function (error) {
                throw new error;
            });
        }
        return icon;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(labels, x, y, index = 0) {
        let radioControl = new RadioControl(labels, x, y, index);
        this.appendChild(radioControl);
        return radioControl;
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
    plot(userEvents = true) {
        return this.appendChild(new Plot(userEvents));
    }
    /**
    * Creates a graph element within this interactive
    */
    graph() {
        return this.appendChild(new Graph());
    }
    /**
    * Creates a graph element within this interactive
    */
    map(mapName, width, height, externalData = null) {
        let map = new Map(this, mapName, width, height, externalData);
        return map;
    }
    /*
    * Creates a directed graph element within this interactive
    */
    directedGraph() {
        return this.appendChild(new DirectedGraph());
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, width, value) {
        return this.appendChild(new Slider(x, y, width, value));
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, width) {
        return this.appendChild(new Scrubber(x, y, width));
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
            group.root.appendChild(SVG.parseSVG(response));
        }).catch(function (error) {
            throw error;
        });
        return group;
    }
}
//# sourceMappingURL=interactive.js.map