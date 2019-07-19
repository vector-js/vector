import SVG from './SVG.js';

// basic elements
import Circle from './elements/Circle.js';
import Ellipse from './elements/Ellipse.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Text from './elements/Text.js';
import Rectangle from './elements/Rectangle.js';

// input elements
import Control from './input/Control.js';
import ControlCircle from './input/ControlCircle.js';
import Slider from './input/Slider.js';
import CheckBox from './input/CheckBox.js';

// complex elements
import Graph from './charts/Graph.js';

/**
* This class exposes the high level functionality of our library. Elements can
* created and related together.
*/
export default class Interactive  {

  /**
  * The container element for this interactive.
  */
  root:HTMLElement;

  /**
  * The main svg that elements are created within
  */
  svg:SVGElement;

  /**
  * The controls groups sits on top of the background group and ensures that
  * control elements will always visually appear above background elements.
  */
  private controls:SVGGElement;

  /**
  * The background is where everything that is not a primary control is drawn.
  */
  private background:SVGGElement;

  // internal variables
  private _width:number = 0;
  private _height:number = 0;
  private _originX:number = 0;
  private _originY:number = 0;

  /**
  * Constructs a new interactive object within the HTML element corresponding
  * to the id. If no element is found throws an error.
  */
  constructor( id:string ) {

    // store a reference to the container element
    this.root = document.getElementById(id);

    // create and append the root svg element and group elements
    this.svg = this.root.appendChild(SVG.SVG());
    this.svg.classList.add('interactive');
    this.background = this.svg.appendChild(SVG.Group());
    this.controls = this.svg.appendChild(SVG.Group());

    // default configuration
    this.width = 600;
    this.height = 300;
    this.window = false;

    // prevent the default behavior of selecting text
    this.root.addEventListener('mousedown', function( event:MouseEvent ) {
      event.preventDefault();
    });
  }

  /**
  * Sets the width of this interactive area.
  */
  set width( value:number ){
    this._width = value;
    this.svg.setAttribute('width', value.toString());
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
    this.svg.setAttribute('height', value.toString());
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
    this.setViewBox( this.minX, this.minY, this.width, this.height);
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
    this.setViewBox( this.minX, this.minY, this.width, this.height);
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
      this.svg.classList.add('window');
    } else {
      this.svg.classList.remove('window');
    }
  }

  /**
  * If set to true, draws a minimal border around the interactive.
  */
  set border( value:boolean ) {
    if( value ){
      this.svg.classList.add('border');
    } else {
      this.svg.classList.remove('border');
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
    return this.minX + this._width;
  }

  /**
  * A user provided description of this interactive.
  */
  set description( description:string ) {
    this.svg.setAttribute('data-description', description);
  }

  /**
  * Sets the viewbox of the root svg element to the provided values.
  * TODO: look into css transform-origin
  */
  setViewBox( minX:number, minY:number, width:number, height:number ) {
    this.svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
  }

  /**
  * Creates a checkbox input at the position (x,y) within this interactive.
  */
  checkBox( x:number, y:number, label:string, value:boolean, ) : CheckBox {
    let checkBox = new CheckBox(x, y, label, value);
    this.controls.appendChild(checkBox.root);
    return checkBox;
  }

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  control( x:number, y:number ) : Control {
    let control = new Control( x, y);
    this.controls.appendChild(control.root);
    return control;
  }

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  controlCircle( x:number, y:number ) : Control {
    let control = new ControlCircle( x, y);
    this.controls.appendChild(control.root);
    return control;
  }

  /**
  * Creates a control point within this interactive at the position (x,y).
  */
  graph( userEvents = true ) : Graph {
    let graph = new Graph(userEvents);
    this.background.appendChild(graph.root);
    return graph;
  }

  /**
  * Creates a slider input within this interactive
  */
  slider(x: number, y: number, width?: number, value?:number) : Slider {
    let slider = new Slider(x, y, width, value);
    this.controls.appendChild(slider.root);
    return slider;
  }

  /**
  * Creates a circle within this interactive.
  */
  circle( cx:number, cy:number, r:number) : Circle {
    let circle = new Circle( cx, cy, r);
    this.background.appendChild(circle.root);
    return circle;
  }

  /**
  * Creates an ellipse within this interactive.
  */
  ellipse( cx:number, cy:number, rx:number, ry:number) : Ellipse {
    let ellipse = new Ellipse( cx, cy, rx, ry);
    this.background.appendChild(ellipse.root);
    return ellipse;
  }

  /**
  * Creates a line within this interactive.
  */
  line( x1:number, y1:number, x2:number, y2:number ) : Line {
    let line = new Line( x1, y1, x2, y2);
    this.background.appendChild(line.root);
    return line;
  }

  /**
  * Creates a path within this interactive.
  */
  path( d: string ): Path {
    let path = new Path(d);
    this.background.appendChild(path.root);
    return path;
  }

  /**
  * Creates a rectangle within this interactive.
  */
  rectangle( x:number, y:number, width:number, height:number) : Rectangle {
    let rectangle = new Rectangle( x, y, width, height);
    this.background.appendChild(rectangle.root);
    return rectangle;
  }

  /**
  * Creates text within this interactive.
  */
  text( x:number, y:number, contents:string ) : Text {
    let text = new Text( x, y, contents);
    this.background.appendChild(text.root);
    return text;
  }
}
