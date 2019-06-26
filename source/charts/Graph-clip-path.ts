import Element from '../elements/Element.js';
import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';

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

  pathGroup : SVGGElement;
  xAxisGroup : SVGGElement;
  yAxisGroup : SVGGElement;

  /**
  *
  */
  clipPath : SVGClipPathElement;

  /**
  * Represents the path taken by the function.
  */
  path : SVGPathElement;

  /**
  * A display circle to display input and output
  */
  circle: SVGCircleElement;

  /**
  * A line to represent the x-axis of this graph
  */
  xAxis : SVGLineElement;

  /**
  * A line to represent the y-axis of this graph
  */
  yAxis : SVGLineElement;

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

    // create a clip path element
    this.clipPath = SVG.ClipPath();
    this.clipPath.id = this.id + '-clip-path';
    this.clipPath.appendChild(SVG.Path(`M 0 0 L ${this.width} 0 L ${this.width} ${this.height} L 0 ${this.height} Z`));

    // creates a transparent rectangle to capture all user events
    this.rect = SVG.Rectangle(0, 0, this.width, this.height);
    this.rect.style.fill = 'transparent';
    this.rect.style.stroke = 'none';

    // TODO: change to axis with tick marks and number labels
    // draw two lines to represent the x-axis and y-axis
    this.xAxis = SVG.Line( -10000, 0, 10000, 0);
    this.yAxis = SVG.Line( 0, -10000, 0, 10000 );
    this.xAxisGroup = SVG.Group();
    this.yAxisGroup = SVG.Group();
    this.xAxisGroup.appendChild(this.xAxis);
    this.yAxisGroup.appendChild(this.yAxis);

    // create a path to draw the internal function
    this.path = SVG.Path('');
    this.path.classList.add('default');

    // a group to hold the path and axis, allows easy transforming of the origin
    this.pathGroup = SVG.Group();
    this.pathGroup.appendChild(this.path);

    let container = SVG.Group();
    container.appendChild(this.pathGroup);
    container.setAttribute('clip-path', `url(#${this.clipPath.id})`);
    container.appendChild(this.xAxisGroup);
    container.appendChild(this.yAxisGroup);

    // create a root element to hold everything
    this.root = SVG.Group();
    this.root.appendChild(this.clipPath);
    this.root.appendChild(this.rect);
    this.root.appendChild(container);
    this.root.id = this.id;

    // translate the origin to its initial position
    this.translate( this.originX, this.originY);

    // Registers event listeners
    if( userEvents ) {

      // create a display circle for showing input and output
      this.circle = SVG.Circle(0,0,4);
      this.circle.style.fill = 'cornflowerblue';
      this.pathGroup.appendChild(this.circle);

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
    let d = `M ${startX} ${this.call(startX)} `;
    for( let i = startX + 1; i < endX; i++ ){
      let x = i;
      let y = this.call(i);
      if( y > 10000 ) { y = 10000; }
      if( y < -10000 ) { y = -10000; }
      d += `L ${x} ${y.toFixed(1)} `;
    }
    this.path.setAttribute('d', d);
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
    let x = event.clientX - this.rect.getBoundingClientRect().left - this.originX;
    if( this.active ) {
      this._originX += event.movementX;
      this._originY += event.movementY;
      this.translate( this._originX, this._originY);
    } else {
      this.circle.cx.baseVal.value = x;
      this.circle.cy.baseVal.value = this.call(x);
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
      this.scale(ratio, 1/ratio);
    } else {
      this.scale(1/ratio, ratio);
    }
    this.draw();
    this.circle.cy.baseVal.value = this.call(this.circle.cx.baseVal.value);

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
    this.pathGroup.setAttribute('transform', `translate(${x}, ${y})`);
    this.xAxisGroup.setAttribute('transform', `translate(${x}, ${y})`);
    this.yAxisGroup.setAttribute('transform', `translate(${x}, ${y})`);
  }
}
