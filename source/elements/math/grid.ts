import Point from "./point.js";
import SVG from "../svg/svg.js";
import Group from "../svg/group.js";
import Circle from "../svg/circle.js";
import Line from "../svg/line.js";

/**
* These options control the configuration of a plot object when it is created.
*/
export interface Configuration {

  /**
  * The left-most x-position of the plot area
  */
  x?:number;

  /**
  * The top-most y-position of the plot area
  */
  y?:number;

  /**
  * The width of the chart
  */
  width?:number;

  /**
  * The height of the chart.
  */
  height?:number;

  /**
  * Margin
  */
  margin?:number;

  /**
  * Set the plot title.
  */
  title?: string | Text;

  /**
  * When set to true displays a grid representing the current scale of the plot
  */
  grid?:boolean;

  /**
  * If true displays axis labels.
  */
  labels?:boolean;

  /**
  * Controls how much the plot is scaled in the x direction.
  */
  scaleX?:number;

  /**
  * Controls how much the plot is scaled in the y direction.
  */
  scaleY?:number;

  /**
  * Sets the x origin of the internal coordinate system relative to the top left
  * corner of the plot.
  */
  originX?:number;

  /**
  * Sets the y origin of the internal coordinate system relative to the top left
  * corner of the plot.
  */
  originY?:number;


  border?:boolean;

  precision?:number;

}

/**
* Returns the closest power of ten. TODO: replace this with an optimized
* function that remembers the last closest power of ten and first checks the
* adjacent powers of ten and then continues.
*/
function expTrunc(x:number) {

  // constants so don't have to count zeros
  const N06 =  1000000;
  const N05 =   100000;
  const N04 =    10000;
  const N03 =     1000;
  const N02 =      100;
  const N01 =       10;
  const N00 =        1;
  const N_1 =      0.1;
  const N_2 =     0.01;
  const N_3 =    0.001;
  const N_4 =   0.0001;
  const N_5 =  0.00001;
  const N_6 = 0.000001;

  if( x >= N06 ) {
    return N06;
  } else if ( x >= N05) {
    return N05;
  } else if ( x >= N04) {
    return N04;
  } else if ( x >= N03) {
    return N03;
  } else if ( x >= N02) {
    return N02;
  } else if ( x >= N01) {
    return N01;
  } else if ( x >= N00) {
    return N00;
  } else if ( x >= N_1) {
    return N_1;
  } else if ( x >= N_2) {
    return N_2;
  } else if ( x >= N_3) {
    return N_3;
  } else if ( x >= N_4) {
    return N_4;
  } else if ( x >= N_5) {
    return N_5;
  } else if ( x >= N_6) {
    return N_6;
  }
}

/**
* A plot of the graph of a function.
*/
export default class Grid extends SVG {

  /**
  * This clip group is to prevent funny business.
  */
  clipGroup : Group;

  /**
  * This view port is a coordinate system where things are scaled using svg's
  * internal representatino of scaling.
  */
  viewPort : SVG;

  /**
  * This static group gets translated along witht he viewPort, but elements
  * retain their original sizing.
  */
  staticGroup : Group;

  /**
  * A display circle to display input and output
  */
  displayCircle: Circle;

  /**
  * A line to represent the x-axis of this graph
  */
  xAxis : Line;

  /**
  * A line to represent the y-axis of this graph
  */
  yAxis : Line;

  /**
  * A group containing the grid lines
  */
  grid: Group;

  precision: number

  // actual height and width of plot element
  private _x : number;
  private _y : number;
  private _width : number;
  private _height : number;

  // represents the transformation from svg coordinate system to internal
  private scaleX : number;
  private scaleY : number;

  // these variables represent the internal coordinate system of the plot
  private internalX : number;
  private internalY : number;
  private visibleWidth : number;
  private visibleHeight : number;

  static default:Configuration = {
    x:0,
    y:0,
    width:700,
    height:400,
    margin:50,
    scaleX:50,
    scaleY:50,
    precision:0,
    grid:true,
    labels:true,
    border: true
  }

  /**
  * Constructs a new graph capable of displaying a function in the form of
  * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
  * explore the shape and form of the function.
  */
  constructor( options:Configuration = {} ) {

    // default configuration options

    // combine the default configuration with the user's configuration
    let config = { ...Grid.default, ...options};

    super( config.x, config.y, config.width, config.height);

    // calculate the visible dimensions and top-left position of internal plot area coordinates
    this._width = config.width - 2*config.margin;
    this._height = config.height - 2*config.margin;
    this._x = -this._width/2;
    this._y = -this._height/2;
    this.precision = config.precision;

    // create a clipping path rectangle to trim overflowing visual elements
    let clipPath = this.clipPath();
    clipPath.rectangle(-1,-1,this._width+2, this._height+2);

    this.clipGroup = this.group();
    this.clipGroup.setAttribute('clip-path', `url(#${clipPath.id})`);
    this.clipGroup.setAttribute('transform', `translate(${config.margin}, ${config.margin})`);

    // default values
    this.viewPort = this.clipGroup.svg(0, 0, this._width, this._height);
    this.viewPort.setAttribute('preserveAspectRatio','none');
    this.viewPort.style.border = '1px solid #404040';
    this.clipGroup.rectangle(0, 0, this._width, this._height).classList.add('default');

    // create a static group for non-size-scaling objects
    this.staticGroup = this.clipGroup.group();
    this.xAxis = this.staticGroup.line(-10000, 0, 10000, 0);
    this.yAxis = this.staticGroup.line( 0, -10000, 0, 10000);
    this.staticGroup.circle(0, 0, 3).fill = '#404040';

    // initialize the scaling
    this.scaleX = config.scaleX;
    this.scaleY = config.scaleY;

    // calculate the visible dimensions and top-left position of internal coordinates
    this.visibleWidth = this._width/this.scaleX;
    this.visibleHeight = this._height/this.scaleY;
    this.internalX = -this.visibleWidth/2;
    this.internalY = -this.visibleHeight/2;
    this.updateViewBox();

    if( config.originX != undefined && config.originY != undefined){
      this.setOrigin(config.originX, config.originY);
    }

    // draw a grid of rectangles
    if( config.grid ) {
      this.grid = this.viewPort.group();
      this.grid.classList.add('grid');
      this.grid.style.stroke = '#808080';
      this.drawGrid();
    }

    if( config.labels ) {
      // draw the labels
      let group = this.group();
      group.classList.add('katex-main', 'text-middle');
      group.style.fontSize = '20px';

      let xPoints = this.getXLabelPoints();
      let yPoints = this.getYLabelPoints();
      for( let p of xPoints) {
        let point = this.internalToAbsolute(p);
        group.text( point.x + config.margin, config.margin + this._height + config.margin/2, `${p.x.toFixed(this.precision)}`);
      }
      for( let p of yPoints) {
        let point = this.internalToAbsolute(p);
        group.text( point.x + config.margin/2, point.y + config.margin, `${p.y.toFixed(this.precision)}`);
      }
    }
  }

  /*
  * Returns the x position of the origin
  */
  get originX():number {
    return - this._x;
  }

  /*
  * Returns the y position of the origin
  */
  get originY():number {
    return - this._y;
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
  *
  */
  drawGrid() {

    // clear all the children
    this.grid.clear();

    // TODO: use a combination of these metrics below to calculate the spacing
    // between two grid lines. I am guessing the goal is to space grid lines
    // somewhere between 10 - 50 pixels in the actual coordinate system
    let pixelsX = 100*this.visibleWidth/this._width;
    let pixelsY = 100*this.visibleHeight/this._height;
    let spacingX = expTrunc(pixelsX);
    let spacingY = expTrunc(pixelsY);

    // TODO: use the static group for this?
    // let minX = this.internalX - this.visibleWidth;
    // let maxX = this.internalX + 2*this.visibleWidth;
    // let minY = this.internalY - this.visibleHeight;
    // let maxY = this.internalY + 2*this.visibleHeight;

    let minX = this.internalX;
    let maxX = this.internalX + this.visibleWidth;
    let minY = this.internalY;
    let maxY = this.internalY + this.visibleHeight;

    let x = spacingX*Math.floor(minX/spacingX);
    while( x < maxX ) {
      this.grid.line(x, minY, x, maxY);
      x += spacingX;
    }

    let y = spacingY*Math.floor(maxY/spacingY);
    while( y > minY ) {
      this.grid.line(minX, y, maxX, y);
      y -= spacingY;
    }
  }

  /**
  * Converts a point from internal scaling to absolute scaling.
  */
  internalToAbsolute( point:Point ) : Point {
    let x = point.x*this.scaleX + this.originX;
    let y = point.y*this.scaleY - this.originY;
    return new Point(x, -y);
  }

  /**
  * Calculates and returns an array of x label points
  */
  getXLabelPoints() : Point[]{

    let labels = [];

    let pixelsX = 250*this.visibleWidth/this._width;
    let spacingX = expTrunc(pixelsX);

    // TODO: use the static group for this?
    let minX = this.internalX;
    let maxX = this.internalX + this.visibleWidth;
    let minY = this.internalY;

    let x = spacingX*Math.ceil(minX/spacingX);
    while( x <= maxX ) {
      labels.push({x:x , y:minY});
      x += spacingX;
    }
    return labels;
  }

  /**
  * Calculates and returns an array of x label points
  */
  getYLabelPoints() : Point[]{

    let labels = [];

    let pixelsY = 250*this.visibleHeight/this._height;
    let spacingY = expTrunc(pixelsY);

    // TODO: use the static group for this?
    let minX = this.internalX;
    let minY = this.internalY;
    let maxY = this.internalY + this.visibleHeight;

    let y = spacingY*Math.floor(maxY/spacingY);
    while( y >= minY ) {
      labels.push({x:minX , y:-y});
      y -= spacingY;
    }

    return labels;
  }

  /**
  * Updates the position of the static group and sets the viewbox on the
  * viewPort element.
  */
  updateViewBox() {
    this.staticGroup.setAttribute('transform',`translate(${-this._x}, ${-this._y})`);
    this.viewPort.setAttribute('viewBox', `${this.internalX} ${this.internalY} ${this.visibleWidth} ${this.visibleHeight}`);
  }

  /**
  * This moves the origin of the plot to the location (x,y) relative to the size
  * of the plot. For example, if the plot is 600 wide and 300 tall, placing the
  * origin at (100,100) move the origin to the point 100 units in the x
  * direction and 100 units in the y direction from the top left corner of the
  * plot.
  */
  setOrigin( x:number, y:number ) {
    this._x = -x;
    this._y = -y;
    this.internalX = this._x/this.scaleX;
    this.internalY = this._y/this.scaleY;
    this.updateViewBox();
  }
}
