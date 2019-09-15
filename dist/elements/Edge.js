import Element from './Element.js';
import SVG from '../SVG.js';
//Make the function static and extend from Line
/**
* Creates a line connecting two edges, with an arrow if directed.
*/
export default class Edge extends Element {
    /**
    * Constructs a line frmo the edge of the two circle elements.
    */
    constructor(nodeFrom, nodeTo, directed) {
        super();
        let arr = this.calculateLinePosition(nodeFrom, nodeTo);
        this.directed = directed;
        this.root = SVG.Line(nodeFrom.cx, nodeFrom.cy, nodeTo.cx, nodeTo.cy);
        this.root.id = this.id;
        this.style = this.root.style;
    }
}
//# sourceMappingURL=Edge.js.map