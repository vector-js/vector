import Element from '../elements/Element.js';
import SVG from '../SVG.js';

/**
*
*/
export default class Graph extends Element {

  /**
  * Invisisble element for registering events
  */
  rect : SVGRectElement;

  /**
  * This group holds the drawn path & axis
  */
  group : SVGGElement;

  /**
  * Represents the path taken by the function.
  */
  path : SVGPathElement;

  /**
  * A line to represent the x-axis of this graph
  */
  xAxis : SVGLineElement;

  /**
  * A line to represent the y-axis of this graph
  */
  yAxis : SVGLineElement;

  /**
  * Keeps track of whether a translate is active or not.
  */
  private active : boolean;

  /**
  * The function that is currently being displayed for this graph.
  */
  private _function : (x:number) => number;

  // private member variables
  private _originX : number;
  private _originY : number;
  private _scaleX : number;
  private _scaleY : number;
  private _width : number;
  private _height : number;

  /**
  * Constructs a new graph capable of displaying a function in the form of
  * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
  * explore the shape and form of the function.
  */
  constructor( userEvents = true ) {
    super();

    // default values
    this._width = 600;
    this._height = 300;
    this._originX = this.width/2;
    this._originY = this.height/2;
    this._scaleX = 1;
    this._scaleY = 1;
    this.active = false;

    // creates a transparent rectangle to capture all user events
    this.rect = SVG.Rectangle(0, 0, this.width, this.height);
    this.rect.style.fill = 'transparent';
    this.rect.style.stroke = 'none';

    // TODO: change to axis with tick marks and number labels
    // draw two lines to represent the x-axis and y-axis
    this.xAxis = SVG.Line( -10000, 0, 10000, 0);
    this.yAxis = SVG.Line( 0, -10000, 0, 10000 );

    // create a path to draw the internal function
    this.path = SVG.Path('');
    this.path.classList.add('default');

    // a group to hold the path and axis, allows easy transforming of the origin
    this.group = SVG.Group();
    this.group.appendChild(this.path);
    this.group.appendChild(this.xAxis);
    this.group.appendChild(this.yAxis);

    // create a root element to hold everything
    this.root = SVG.Group();
    this.root.appendChild(this.rect);
    this.root.appendChild(this.group);
    this.root.id = this.id;

    // translate the origin to its initial position
    this.translate( this.originX, this.originY);

    // Registers event listeners
    if( userEvents ) {
      let graph = this;
      this.root.addEventListener('mousemove', function( event:MouseEvent) {
        graph.handleMouseMove(event);
      });
      this.root.addEventListener('mousedown', function( event:MouseEvent) {
        graph.handleMouseDown(event);
      });
      this.root.addEventListener('mouseup', function( event:MouseEvent) {
        graph.handleMouseUp(event);
      });
      this.root.addEventListener('mouseleave', function( event:MouseEvent) {
        graph.handleMouseLeave(event);
      });
      this.root.addEventListener('mousewheel', function( event:WheelEvent) {
        graph.handleMouseWheelEvent(event);
      });  
    }
  }

  /**
  * Returns the width of this graph
  */
  get width() : number {
    return this._width;
  }

  /**
  * Returns the height of this graph
  */
  get height() : number {
    return this._height;
  }

  /**
  * Returns the minimum x value of the view box of this graph relative to the
  * origin.
  */
  get minX() : number {
    return -this._originX;
  }

  /**
  * Returns the minimum y value of the view box of this graph relative to the
  * origin.
  */
  get minY() : number {
    return -this._originY;
  }

  /**
  * Returns the x coordinate of the origin of this graph.
  */
  get originX() : number {
    return this._originX;
  }

  /**
  * Sets the x coordinate of the origin of this graph.
  */
  set originX( x:number ) {
    this.translate( x, this._originY);
  }

  /**
  * Returns the y coordinate of the origin of this graph.
  */
  get originY() : number {
    return this._originY;
  }

  /**
  * Sets the y coordinate of the origin of this graph.
  */
  set originY( y:number ) {
    this.translate( this._originX, y);
  }

  /**
  * Sets the internal function to the provided function
  */
  set function( f:(x:number) => number ) {
    this._function = f;
  }

  /**
  * Returns the result of calling the internal function with the provided
  * function scaling both the input and the output.
  */
  call( input:number ) : number {
    let x =  this._scaleX*(input);
    let y = -this._scaleY*(this._function(x));
    return y;
  }

  /**
  * Draws the internal function over the interval [startX, endX]. The default
  * interval is [ minX - width, maxX + width ] so that when a user drags the
  * graph there is enough drawn so that a translate may be applied instead of
  * having to call draw again.
  */
  draw( startX = this.minX - this.width, endX = this.minX + 2*this.width) {

    // Draw the function
    let d = `M ${startX} ${this.call(startX)} `;
    for( let i = startX + 1; i < endX; i++ ){
      d += `L ${i} ${this.call(i)} `;
    }
    this.path.setAttribute('d', d);
  }

  /**
  * Handle when a mouse moves over this graph. If a drag event is active then
  * translates the position of the graph to the new location.
  */
  handleMouseMove( event:MouseEvent ) {
    if( this.active ) {
      this._originX += event.movementX;
      this._originY += event.movementY;
      this.translate( this._originX, this._originY);
    }
  }

  /**
  * When a user mouses down over this graph a drag is active.
  */
  handleMouseDown( _event:MouseEvent ) {
    this.active = true;
  }

  /**
  * Deactivates the current drag event.
  */
  handleMouseUp( _event:MouseEvent ) {
    this.active = false;
    this.draw();
  }

  /**
  * When the user's mouse leaves the graph deactivates any concurrent drag.
  */
  handleMouseLeave( event:MouseEvent ) {
    this.handleMouseUp(event);
  }

  /**
  * Zooms in and out on this graph.
  */
  handleMouseWheelEvent( event:WheelEvent ) {
    let ratio = .95;
    if( event.deltaY > 0 ) {
      this.scale(ratio, 1/ratio);
    } else {
      this.scale(1/ratio, ratio);
    }
    this.draw();
    event.preventDefault();
  }

  /**
  * Scales the x and y axis of this graph.
  */
  scale( x:number, y:number) {
    this._scaleX *= x;
    this._scaleY *= y;
    this.draw();
  }

  /**
  * Translates the origin of this graph to the location (x,y).
  */
  translate( x:number, y:number ) {
    this._originX = x;
    this._originY = y;
    this.group.setAttribute('transform', `translate(${x}, ${y})`);
  }
}
