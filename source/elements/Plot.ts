import Element from '../elements/Element.js';
import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
import Path from './Path.js';
import Group from './Group.js';
import Circle from './Circle.js';
import Line from './Line.js';

/**
*
*/
export default class Plot extends Element {

  /**
  * Invisisble element for registering events
  */
  rect : Rectangle;

  /**
  * This group holds the drawn path & axis
  */
  group : Group;

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
    this._originX = this.width/2;
    this._originY = this.height/2;
    this._scaleX = 1;
    this._scaleY = 1;
    this._totalScale = 1;
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
    this.group = new Group();
    this.group.root.appendChild(this.path.root);
    this.group.root.appendChild(this.xAxis.root);
    this.group.root.appendChild(this.yAxis.root);

    // create a root element to hold everything
    this.root.appendChild(this.rect.root);
    this.root.appendChild(this.group.root);

    // translate the origin to its initial position
    this.translate( this.originX, this.originY);

    // Registers event listeners
    if( userEvents ) {

      // create a display circle for showing input and output
      this.circle = new Circle(0,0,4);
      this.circle.style.fill = 'cornflowerblue';
      this.group.root.appendChild(this.circle.root);

      this.xRect = new Rectangle(0, 0, 125, 40);
      this.yRect = new Rectangle(120, 0, 125, 40);
      this.xRect.root.style.fill = 'white';
      this.yRect.root.style.fill = 'white';
      this.root.appendChild(this.xRect.root);
      this.root.appendChild(this.yRect.root);

      this.x = new Text( 15, 20, 'x:0');
      this.x.root.style.dominantBaseline = 'middle';
      this.x.root.style.whiteSpace = 'pre';
      this.root.appendChild(this.x.root);

      this.y = new Text( 125 + 15, 20, 'y:0');
      this.y.root.style.dominantBaseline = 'middle';
      this.y.root.style.whiteSpace = 'pre';
      this.root.appendChild(this.y.root);

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
    let x = event.clientX - this.rect.root.getBoundingClientRect().left - this.originX;
    if( this.active ) {
      this._originX += event.movementX;
      this._originY += event.movementY;
      console.log("Spacer, now showing origin position:")
      console.log(this._originX);
      console.log(this._originY);
      console.log("Spacer, now showing mouse position:");
      console.log(event.x - this.rect.root.getBoundingClientRect().left);
      console.log(event.y  - this.rect.root.getBoundingClientRect().top);
      console.log("Spacer, now showing client rect:");


      this.translate( this._originX, this._originY);
    } else {
      this.circle.cx = x;
      this.circle.cy = this.call(x);
    }

    let i = this._scaleX*(x);
    let o = this.call(x, false);

    this.x.contents = `x:${i < 0 ? '' : ' '}${this.format(i)}`;
    this.y.contents = `y:${o < 0 ? '' : ' '}${this.format(o)}`;
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
  * Zooms in and out on this graph. TODO: There is some jarring wheel action
  * where an active wheel event on the page will stop dead when the mouse
  * goes over the graph. Also it seems as if the scroll has pre-existing
  * "momentum" that it can also affect the graph.
  */
  handleMouseWheelEvent( event:WheelEvent ) {
    let ratio = .95;
    if( event.deltaY > 0 ) {
      this.scale(ratio, 1/ratio, event.x - this.rect.root.getBoundingClientRect().left, event.y - this.rect.root.getBoundingClientRect().top);
    } else {
      this.scale(1/ratio, ratio, event.x - this.rect.root.getBoundingClientRect().left, event.y - this.rect.root.getBoundingClientRect().top);
    }
    this.draw();
    this.circle.cy = this.call(this.circle.cx);

    event.preventDefault();
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

      this.draw();
    }
    else{
      this._scaleX *= x;
      this._scaleY *= y;
      this.draw();
    }

    // this._scaleX *= x;
    // this._scaleY *= y;
    // this.group.setAttribute('transform', `scale(${x}, ${y})`);
    // this.draw();





    // if(posX)
    // {
    //   this._originX += -posX;
    //   this._originY += -posY;
    //   this.translate(this._originX, this._originY);
    //   this.draw();
    // }
  }

  /**
  * Scales the x axis of this graph.
  */
  set scaleX( x:number ) {
    this._scaleX *= x;
    this.draw();
  }

  /**
  * Scales the y axis of this graph.
  */
  set scaleY( y:number ) {
    this._scaleY *= y;
    this.draw();
  }

  /**
  * Translates the origin of this graph to the location (x,y).
  */
  translate( x:number, y:number ) {
    this._originX = x;
    this._originY = y;
    this.group.root.setAttribute('transform', `translate(${x}, ${y})`);
  }

  scaleUp (x: number, y: number){

  }

  scaleDown (x: number, y: number){

  }
}
