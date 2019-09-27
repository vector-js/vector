// util
import { getURL } from '../util/file.js';
import { parseSVG } from '../util/svg.js';

// basic elements
import Element from '../elements/element.js';
import Input from '../elements/input/input.js';

// svg elements
import SVG from '../elements/svg/svg.js';
import Group from '../elements/svg/group.js';

// visual elements
import Icon from '../elements/visual/icon.js';

// input elements
import Button from '../elements/input/button.js';
import CheckBox from '../elements/input/check-box.js';
import Control from '../elements/input/control.js';
import ControlCircle from '../elements/input/control-circle.js';
import RadioControl from '../elements/input/radio-control.js';
import Scrubber from '../elements/input/scrubber.js';
import Slider from '../elements/input/slider.js';

// graph elements
import Node from '../elements/graph/node.js';
import Edge from '../elements/graph/edge.js';
import Graph from '../elements/graph/graph.js';
import DirectedGraph from '../elements/graph/directed-graph.js';

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
  container:HTMLElement;

  /**
  * The SVG document root.
  */
  document:SVG;

  /**
  * The input groups sits on top of the background group and ensures that
  * input elements will always visually appear above background elements.
  */
  input:Group;

  /**
  * The background is where everything that is not a primary control is drawn.
  */
  background:Group;

  // internal variables
  private _width:number = 0;
  private _height:number = 0;
  private _originX:number = 0;
  private _originY:number = 0;

  /**
  * Constructs a new interactive object and appends it into the DOM. If the
  * provided argument is an HTMLElement appends the interactive within that
  * element. If the provided a value is a string, appends the interactive within
  * the HTML element with the corresponding ID. If no element is found throws an
  * error.
  */
  constructor( value:string | HTMLElement ) {
    super();

    // If the user passes in a string identifier check to see if such an
    // element exists in the current document.
    if (typeof value == "string") {
      this.container = document.getElementById(value);
      if( this.container === null || this.container === undefined ) {
        throw new Error(`There is no HTML element with the id: ${value}`);
      }
    } else {
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
    this._originX = 0;
    this._originY = 0;
    this._width = 600;
    this._height = 300;
    this.root.setAttribute('width', this._width.toString());
    this.root.setAttribute('height', this._height.toString());
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
    this.window = false;

    // prevent the default behavior of selecting text
    this.container.addEventListener('mousedown', function( event:MouseEvent ) {
      event.preventDefault();
    });
  }

  /**
  * Sets the width of this interactive area.
  */
  set width( value:number ){
    this._width = value;
    this.root.setAttribute('width', value.toString());
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  }

  /**
  * Returns the width of this interactive area.
  */
  get width():number {
    return this._width;
  }

  /**
  * Sets the height of this interactive area.
  */
  set height( value:number ){
    this._height = value;
    this.root.setAttribute('height', value.toString());
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  }

  /**
  * Returns the height of this interactive area.
  */
  get height():number {
    return this._height;
  }

  /**
  * Sets the x coordinate of the origin.
  */
  set originX( value:number) {
    this._originX = value;
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  }

  /**
  * Returns the value of the x-coordinate of the origin.
  */
  get originX():number {
    return this._originX;
  }

  /**
  * Sets the y coordinate of the origin.
  */
  set originY( value:number) {
    this._originY = value;
    this.setViewBox( -this._originX, -this._originY, this._width, this._height );
  }

  /**
  * Returns the value of the x-coordinate of the origin.
  */
  get originY():number {
    return this._originY;
  }

  /**
  * If set to true, styles the interactive to float on top of the background.
  * This feature is good for interactives where elements can be dragged out of
  * the bounds of the container element.
  */
  set window( value:boolean ) {
    if( value ){
      this.root.classList.add('window');
    } else {
      this.root.classList.remove('window');
    }
  }

  /**
  * If set to true, draws a minimal border around the interactive.
  */
  set border( value:boolean ) {
    if( value ){
      this.root.classList.add('border');
    } else {
      this.root.classList.remove('border');
    }
  }

  /**
  * Returns the minimum x-coordinate of this interactive.
  */
  get minX() : number {
    return -this.originX;
  }

  /**
  * Returns the minimum y-coordinate of this interactive.
  */
  get minY() : number {
    return -this.originY;
  }

  /**
  * Returns the maximum x-coordinate of this interactive.
  */
  get maxX() : number {
    return this.minX + this._width;
  }

  /**
  * Returns the maximum y-coordinate of this interactive.
  */
  get maxY() : number {
    return this.minY + this._height;
  }

  /**
  * Appends the element within the interactive. If the element is an "input"
  * element, places the element in the input group so that visually the element
  * is always placed above other graphical elements.
  */
  appendChild<T extends Element>( child:T ) : T {
    if( child instanceof Input ) {
      this.input.appendChild(child);
    } else {
      this.background.appendChild(child);
    }
    return child;
  }

  /**
  * Creates a nested interactive within this interactive
  */
  interactive( x:number, y:number ) : Interactive {
    let obj = new Interactive(this.id);
    obj.root.setAttribute('x', x.toString());
    obj.root.setAttribute('y', y.toString());
    return obj;
  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  button( x:number, y:number, label:string ) : Button {
    return this.appendChild(new Button(x, y, label));
  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  checkBox( x:number, y:number, label:string, value:boolean ) : CheckBox {
    return this.appendChild( new CheckBox(x, y, label, value));
  }

  icon( x:number, y:number, str:string ) : Icon {

    // create a new icon element
    let icon = new Icon(x,y);
    this.appendChild(icon);

    // check to see if we have loaded the symbols svg, if not load it
    let id = 'vector-js-symbols';
    let svg : SVG;
    let svgElement = document.getElementsByClassName(id)[0] as HTMLElement;
    if ( svgElement === undefined || svgElement === null ) {
      svg = new SVG();
      svg.style.display = 'none';
      svg.root.classList.add(id)
      document.body.appendChild(svg.root);
    } else {
      svg = Element.controller.get(svgElement.id) as SVG;
    }

    // check to see if we have loaded this icon before
    let symbol = svg.root.querySelector(`#${str}`);
    if( !symbol ) {
      getURL(`/resources/icons/${str}.svg`).then(function(response){

        let symbol = svg.symbol();
        symbol.root.id = str;
        let symbolSVG = parseSVG(response);
        while (symbolSVG.childNodes.length > 0) {
            symbol.root.appendChild(symbolSVG.childNodes[0]);
        }

        let use = icon.use();
        use.setAttribute('href',`#${str}`);
        icon.appendChild(use);

      }).catch(function(error){
        throw error;
      });
    }

    return icon;

  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  radioControl(x:number, y:number, labels: string[], index: number = 0) : RadioControl {
    return this.appendChild(new RadioControl(x, y, labels, index));
  }

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  control( x:number, y:number ) : Control {
    return this.appendChild(new Control( x, y));
  }

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  controlCircle( x:number, y:number ) : Control {
    return this.appendChild(new ControlCircle( x, y));
  }

  /**
  * Creates a plot within this interactive at the position (x,y).
  */
  plot( userEvents = true ) : Plot {
    return this.appendChild(new Plot(userEvents));
  }

  /**
  * Creates a graph element within this interactive
  */
  graph() : Graph {
    return this.appendChild(new Graph());
  }

  /**
  * Creates a graph element within this interactive
  */
  map(mapName:string,width:number,height:number,externalData: JSON = null) : Map {
   let map = new Map(this,mapName,width,height, externalData);
   return map;
   }

  /*
  * Creates a directed graph element within this interactive
  */
  directedGraph() : DirectedGraph {
    return this.appendChild(new DirectedGraph());
  }

  /**
  * Creates a slider input within this interactive
  */
  slider(x: number, y: number, width?: number, value?:number) : Slider {
    return this.appendChild(new Slider(x, y, width, value));
  }

  /**
  * Creates a scrubber with a play and pause button at the position (x,y).
  */
  scrubber(x:number, y:number, width:number ) : Scrubber {
    return this.appendChild(new Scrubber( x, y, width));
  }

  /**
  * Creates a node within this interactive.
  */
  node( x:number, y:number, rx: number, ry:number, contents:string ) : Node {
    return this.appendChild(new Node( x, y, rx, ry, contents));
  }

  /**
  * Creates an edge connecting two nodes within this interactive.
  */
  edge (nodeFrom: Node, nodeTo: Node, directed: boolean) : Edge{
    return this.appendChild(new Edge(nodeFrom, nodeTo, directed));
  }

  /**
  *
  */
  async loadSVG( url:string ) : Promise<Group> {
    let group = new Group();
    this.appendChild(group);
    getURL(url).then(function(response){
      group.root.appendChild(parseSVG(response));
    }).catch(function(error){
      throw error;
    });
    return group;
  }
}
