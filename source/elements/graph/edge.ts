import Node from './node.js';
import Line from '../svg/line.js';

//Make the function static and extend from Line

/**
* Creates a line connecting two edges, with an arrow if directed.
*/


export default class Edge extends Line {

  directed:boolean;
  nodeFrom : Node;
  nodeTo : Node;
  declare root: SVGLineElement;

  /**
  * Constructs a line frmo the edge of the two circle elements.
  */
  constructor(nodeFrom: Node, nodeTo: Node, directed: boolean) {
    let arr = Edge.calculateLinePosition(nodeFrom, nodeTo);
    let arr2 = Edge.calculateLinePositionEllipse(nodeFrom, nodeTo);
    if(directed && !Number.isNaN(arr[0])) {
      super(arr[0], arr[1], arr[2], arr[3]);
    }
    else {
      super(nodeFrom.cx,nodeFrom.cy, nodeTo.cx, nodeTo.cy);
    }
    this.directed = directed;
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
  }

  redraw(){
    this.x1 = this.nodeFrom.cx;
    this.y1 = this.nodeFrom.cy;
    this.x2 = this.nodeTo.cx;
    this.y2 = this.nodeTo.cy;
  }

  /**
  * Function to find where the line connecting two circles should go. return an Array
  * containing [x1, y1, x2, y2] of the line.
  */
  static calculateLinePosition(nodeFrom: Node, nodeTo:Node)
  {
    let y1 = nodeFrom.nodeEllipse.cy;
    let y2 = nodeTo.nodeEllipse.cy;

    let x1 = nodeFrom.nodeEllipse.cx;
    let x2 = nodeTo.nodeEllipse.cx;

    let deltaY = y2 - y1;
    let deltaX = x2 - x1;

    let L = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

    let r1Lx = nodeFrom.nodeEllipse.rx / L * deltaX;
    let r1Ly = nodeFrom.nodeEllipse.rx / L * deltaY;

    let r2Lx = nodeTo.nodeEllipse.rx / L * deltaX;
    let r2Ly = nodeTo.nodeEllipse.rx / L * deltaY;

    let y1Prime = y1 + r1Ly;
    let y2Prime = y2 - r2Ly;

    let x1Prime = x1 + r1Lx;
    let x2Prime = x2 - r2Lx;

    return new Array(x1Prime, y1Prime, x2Prime, y2Prime);
  }

  static calculateLinePositionEllipse(nodeFrom:Node, nodeTo:Node)
  {
    let newX = nodeFrom.cx - nodeTo.cx;
    let newY = nodeFrom.cy - nodeTo.cy;

    let theta = Math.atan(newY / newX);
    // console.log(theta);

    let cosx1 = Math.cos(theta);
    let siny1 = Math.sin(theta);

    let r2 = (nodeTo.cx*nodeTo.cy) / Math.sqrt(Math.pow(nodeTo.cx, 2) * Math.pow(cosx1, 2) + Math.pow(nodeTo.cy, 2) * Math.pow(siny1, 2))
    let r1 = (nodeFrom.cx*nodeFrom.cy) / Math.sqrt(nodeFrom.cx * Math.pow(cosx1, 2) + nodeFrom.cy * Math.pow(siny1, 2))

    // let lineX1 = r1 * cosx1
    // console.log(r2);

    return new Array(r2 * cosx1, r2*siny1);

  }
}
