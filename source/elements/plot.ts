import Element from '../elements/element.js';
import SVG from '../svg.js';
import Rectangle from '../elements/rectangle.js';
import Text from '../elements/text.js';
import Path from './path.js';
import Group from './group.js';
import Circle from './circle.js';
import Line from './line.js';

/**
*
*/
export default class Plot extends Element {

  root : SVGGElement;

  /**
  * Invisisble element for registering events
  */
  rect : Rectangle;

  /**
  * This group holds the drawn path & axis
  */
  viewPort : SVG;
  viewPortGroup : Group;

  /**
  * Represents the path taken by the function.
  */
  path : Path;

  /**
  * A display circle to display input and output
  */
  circle: Circle;

  /**
  * A line to represent the x-axis of this graph
  */
  xAxis : Line;

  /**
  * A line to represent the y-axis of this graph
  */
  yAxis : Line;

  // TODO: change all member variables to either SVGElements or our libraries
  // elements
  xRect : Rectangle;
  yRect : Rectangle;
  x : Text;
  y : Text;

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
  private _prevX : number;
  private _prevY : number;
  private _visibleWidth : number;
  private _visibleHeight : number;
  private _totalScale : number;

  /**
  * Constructs a new graph capable of displaying a function in the form of
  * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
  * explore the shape and form of the function.
  */
  constructor( userEvents = true ) {
    super(SVG.Group());

    // default values
    this._width = 600;
    this._height = 300;
    this._originX = 0;
    this._originY = 0;
    this._prevX = 0;
    this._prevY = 0;
    this._visibleWidth = this.width;
    this._visibleHeight = this.height;
    this._totalScale = 1;
    this._scaleX = 1;
    this._scaleY = 1;
    this.active = false;

    // creates a transparent rectangle to capture all user events
    this.rect = new Rectangle(0, 0, this.width, this.height);
    this.rect.style.fill = 'transparent';
    this.rect.style.stroke = 'none';

    // TODO: change to axis with tick marks and number labels
    // draw two lines to represent the x-axis and y-axis
    this.xAxis = new Line( -10000, 0, 10000, 0);
    this.yAxis = new Line( 0, -10000, 0, 10000 );

    // create a path to draw the internal function
    this.path = new Path('');

    // a group to hold the path and axis, allows easy transforming of the origin
    this.viewPort = new SVG();
    this.viewPortGroup = new Group();
    this.viewPort.appendChild(this.viewPortGroup);
    this.viewPort.appendChild(this.path);
    this.viewPortGroup.appendChild(this.xAxis);
    this.viewPortGroup.appendChild(this.yAxis);

    // this.viewPortGroup.setAttribute('transform', 'scale(1,-1)');

    // create a root element to hold everything
    this.appendChild(this.rect);
    this.appendChild(this.viewPort);

    // translate the origin to its initial position
    // this.translate( this.originX, this.originY);

    // Registers event listeners
    if( userEvents ) {

      // create a display circle for showing input and output
      this.circle = new Circle(0,0,4);
      this.circle.style.fill = 'cornflowerblue';
      this.viewPort.appendChild(this.circle);

      this.xRect = new Rectangle(0, 0, 125, 40);
      this.yRect = new Rectangle(120, 0, 125, 40);
      this.xRect.root.style.fill = 'white';
      this.yRect.root.style.fill = 'white';
      this.appendChild(this.xRect);
      this.appendChild(this.yRect);

      this.x = new Text( 15, 20, 'x:0');
      this.x.root.style.dominantBaseline = 'middle';
      this.x.root.style.whiteSpace = 'pre';
      this.appendChild(this.x);

      this.y = new Text( 125 + 15, 20, 'y:0');
      this.y.root.style.dominantBaseline = 'middle';
      this.y.root.style.whiteSpace = 'pre';
      this.appendChild(this.y);

      // draw a grid of rectangles
      // draw rectangles for debugging
      let w = 25;
      let h = 25;
      for( let i = 0; i < 10; i++) {
        for( let j = 0; j < 10; j ++) {
          let x = i*w;
          let y = j*h;
          let rectangle = new Rectangle(x, y, w, h);
          this.viewPortGroup.appendChild(rectangle);
          // rectangle.root.setAttribute('vector-effect','non-scaling-stroke');
        }
      }

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
      }, {passive:false});
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
  * Returns the internal function
  */
  get function() : (x:number) => number {
    return this._function;
  }

  /**
  * Returns the result of calling the internal function with the provided
  * function scaling both the input and the output.
  */
  call( input:number, scaleY = true ) : number {
    let x =  this._scaleX*(input);
    let y = (scaleY ? -this._scaleY : 1)*(this._function(x));
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
    let x = startX;
    let y = this.call(x);
    if( y >  2*this.height ) { y =  2*this.height; }
    if( y < -2*this.height ) { y = -2*this.height; }
    let d = `M ${x} ${y} `;

    // TODO: remove vertical asymptote's by starting jumping to a new spot...
    // L ... L ... M ... L ... L ...
    for( x++; x < endX; x++ ){
      y = this.call(x);
      if( y >  2*this.height ) { y =  2*this.height; }
      if( y < -2*this.height ) { y = -2*this.height; }
      d += `L ${x} ${y.toFixed(1)} `;
    }
    this.path.d = d;

    // Update the dependents if there are any
    this.updateDependents();
  }

  /**
  * Formats the input number to be displayed within the graph.
  */
  format( n:number ) : string {
    if ( n > 10000 || n < -10000 || (n < .01 && n > -.01)) {
      return n.toExponential(2);
    } else {
      return n.toPrecision(4);
    }
  }

  /**
  * Handle when a mouse moves over this graph. If a drag event is active then
  * translates the position of the graph to the new location.
  */
  handleMouseMove( event:MouseEvent ) {
    if( this.active ) {
      let deltaX = event.clientX - this._prevX;
      let deltaY = event.clientY - this._prevY;
      this._originX -= deltaX/this._scaleX;
      this._originY -= deltaY/this._scaleY;
      this._prevX = event.clientX;
      this._prevY = event.clientY;
      this.viewPort.setAttribute('viewBox', `${this._originX} ${this._originY} ${this._visibleWidth} ${this._visibleHeight}`);
    } else {
      // this.circle.cx = x;
      // this.circle.cy = this.call(x);
    }

    // let i = this._scaleX*(x);
    // let o = this.call(x, false);
    //
    // this.x.contents = `x:${i < 0 ? '' : ' '}${this.format(i)}`;
    // this.y.contents = `y:${o < 0 ? '' : ' '}${this.format(o)}`;
  }

  /**
  * When a user mouses down over this graph a drag is active.
  */
  handleMouseDown( event:MouseEvent ) {
    this.active = true;
    this._prevX = event.clientX;
    this._prevY = event.clientY;
  }

  /**
  * Deactivates the current drag event.
  */
  handleMouseUp( _event:MouseEvent ) {
    this.active = false;
    // this.draw();
  }

  /**
  * When the user's mouse leaves the graph deactivates any concurrent drag.
  */
  handleMouseLeave( event:MouseEvent ) {
    this.handleMouseUp(event);
  }

  /**
  * Zooms in and out on this graph. TODO: There is some jarring wheel action
  * where an active wheel event on the page will stop dead when the mouse
  * goes over the graph. Also it seems as if the scroll has pre-existing
  * "momentum" that it can also affect the graph.
  */
  handleMouseWheelEvent( event:WheelEvent ) {
    event.preventDefault();

    let zoomIntensity = .02;
    let br = this.rect.root.getBoundingClientRect();
    let x = event.clientX - br.left;
    let y = event.clientY - br.top;

    let wheel = event.deltaZ < 0 ? 1 : -1;
    let zoom = Math.exp(wheel*zoomIntensity);

    this._originX -= x/(this._scaleX*zoom) - x/this._scaleX;
    this._originY -= y/(this._scaleY*zoom) - y/this._scaleY;
    this._scaleX *= zoom;
    this._scaleY *= zoom;
    this._visibleWidth = this.width/this._scaleX;
    this._visibleHeight = this.width/this._scaleY;

    this.viewPort.setAttribute('viewBox', `${this._originX} ${this._originY} ${this._visibleWidth} ${this._visibleHeight}`);

    // this.draw();
    // this.circle.cy = this.call(this.circle.cx);

  }

  /**
  * Scales the x and y axis of this graph.
  */
  scale( x:number, y:number, posX?:number, posY?:number) {
    if(posX)
    {
      let initialScale = this._totalScale;
      //
      this._scaleX *= x;
      this._scaleY *= y;
      this._totalScale *= x;

      let scaleChange = this._totalScale - initialScale;

      let xLength = (posX - this._originX)
      let yLength = (posY - this._originY)


      let offsetX = -(xLength / Math.hypot(xLength, yLength) * scaleChange);

      let offsetY = -(yLength / Math.hypot(xLength, yLength) * scaleChange);

      console.log(this._totalScale);
      console.log(offsetX);
      console.log(offsetY);

      this._originX += offsetX;
      this._originY += offsetY;
      this.translate(this._originX, this._originY);

      // this.draw();
    }
    else{
      this._scaleX *= x;
      this._scaleY *= y;
      // this.draw();
    }
  }

  /**
  * Translates the origin of this graph to the location (x,y).
  */
  translate( x:number, y:number ) {
    this._originX = x;
    this._originY = y;
    this.viewPort.setAttribute('viewBox', `${-x} ${-y} ${this.viewPort.width} ${this.viewPort.height}`);
  }

  scaleUp (x: number, y: number){

  }

  scaleDown (x: number, y: number){

  }
}
