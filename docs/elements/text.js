import SVG from '../svg.js';
import Element from './element.js';
import TSpan from './t-span.js';
/**
* Text is a basic element containing string contents
*/
export default class Text extends Element {
    /**
    * Constructs text at the position (x,y) with the provided string
    */
    constructor(x, y, text = '') {
        super(SVG.Text(x, y, text));
    }
    /**
    * Sets the contents of this element
    */
    set contents(str) {
        this.root.innerHTML = str;
    }
    /**
    * Sets the contents of this element
    */
    get contents() {
        return this.root.innerHTML;
    }
    /**
    * Gets the x position of this element
    */
    get x() {
        return Number(this.root.getAttribute('x'));
    }
    /**
    * Gets the y position of this element
    */
    get y() {
        return Number(this.root.getAttribute('y'));
    }
    /**
    * Sets the x position of this element
    */
    set x(value) {
        this.root.setAttribute('x', value.toString());
    }
    /**
    * Sets the y position of this element
    */
    set y(value) {
        this.root.setAttribute('y', value.toString());
    }
    /**
    * Returns the length of the text
    */
    get length() {
        const context = document.createElement("canvas").getContext("2d");
        return context.measureText(this.root.innerHTML).width;
    }
    tspan(text) {
        let tspan = new TSpan(text);
        this.root.appendChild(tspan.root);
        return tspan;
    }
}
//# sourceMappingURL=text.js.map