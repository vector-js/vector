import Element from './element.js';
import SVG from '../svg.js';
//Make the function static and extend from Line
/**
* Creates a line connecting two edges, with an arrow if directed.
*/
export default class Edge extends Element {
    /**
    * Constructs a line frmo the edge of the two circle elements.
    */
    constructor(nodeFrom, nodeTo, directed) {
        let arr = Edge.calculateLinePosition(nodeFrom, nodeTo);
        if (directed) {
            super(SVG.Line(arr[0], arr[1], arr[2], arr[3]));
        }
        else {
            super(SVG.Line(nodeFrom.cx, nodeFrom.cy, nodeTo.cx, nodeTo.cy));
        }
        this.directed = directed;
    }
    /**
    * Function to find where the line connecting two circles should go. return an Array
    * containing [x1, y1, x2, y2] of the line.
    */
    static calculateLinePosition(nodeFrom, nodeTo) {
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
}
//# sourceMappingURL=edge.js.map