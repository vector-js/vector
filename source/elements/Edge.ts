import Node from './Node.js';
import Element from './Element.js';
import SVG from '../SVG.js';

//Make the function static and extend from Line

/**
* Creates a line connecting two edges, with an arrow if directed.
*/
export default class Edge extends Element {

  directed:boolean;
  nodeFrom : Node;
  nodeTo : Node;
  root: SVGLineElement;

  /**
  * Constructs a line frmo the edge of the two circle elements.
  */
  constructor(nodeFrom: Node, nodeTo: Node, directed: boolean) {
    super();

    let arr = this.calculateLinePosition(nodeFrom, nodeTo);
    this.directed = directed;

    this.root = SVG.Line(nodeFrom.cx, nodeFrom.cy, nodeTo.cx, nodeTo.cy);
    this.root.id = this.id;
    this.style = this.root.style;
  }

  /**
  * Function to find where the line connecting two circles should go. return an Array
  * containing [x1, y1, x2, y2] of the line.
  */
  //Keeping this code here, could be useful in the future. But for now lines are just being placed underneath nodes.

  // calculateLinePosition(nodeFrom: Node, nodeTo:Node)
  // {
  //   let y1 = nodeFrom.nodeEllipse.cy;
  //   let y2 = nodeTo.nodeEllipse.cy;
  //
  //   let x1 = nodeFrom.nodeEllipse.cx;
  //   let x2 = nodeTo.nodeEllipse.cx;
  //
  //   let deltaY = y2 - y1;
  //   let deltaX = x2 - x1;
  //
  //   let L = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
  //
  //   let r1Lx = nodeFrom.nodeEllipse.rx / L * deltaX;
  //   let r1Ly = nodeFrom.nodeEllipse.rx / L * deltaY;
  //
  //   let r2Lx = nodeTo.nodeEllipse.rx / L * deltaX;
  //   let r2Ly = nodeTo.nodeEllipse.rx / L * deltaY;
  //
  //
  //   let y1Prime = y1 + r1Ly;
  //   let y2Prime = y2 - r2Ly;
  //
  //   let x1Prime = x1 + r1Lx;
  //   let x2Prime = x2 - r2Lx;
  //
  //   return new Array(x1Prime, y1Prime, x2Prime, y2Prime);
  // }
}
