import Element from './Element.js';
import Circle from './Circle.js';
import Text from './Text.js';
import SVG from '../SVG.js';
//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A Node is a basic element with a position, radius, and text held within it.
*/
export default class Node extends Element {
    /**
    * Constructs a Node element at the position (x,y) with radius r containing the string text
    */
    constructor(cx, cy, r, text) {
        super();
        this.root = SVG.Group();
        this.nodeName = new Text(cx, cy, text);
        this.nodeCircle = new Circle(cx, cy, r);
        this.root.appendChild(this.nodeCircle.root);
        this.root.appendChild(this.nodeName.root);
        this.root.classList.add('default');
        this.root.id = this.id;
    }
    /**
    * Moves the text into the center of the node. unsure about that /4, needs to be changed to fit the text.
    */
    adjustText() {
        let textWidth = this.nodeName.root.getBBox().width;
        let textHeight = this.nodeName.root.getBBox().height;
        this.nodeName.x = this.nodeName.x - textWidth / 2;
        this.nodeName.y = this.nodeName.y + textHeight / 4;
        console.log(textHeight);
    }
}
//# sourceMappingURL=Node.js.map