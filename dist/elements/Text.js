import SVG from '../SVG.js';
import Element from './Element.js';
/**
* Text is a basic element containing string contents
*/
export default class Text extends Element {
    /**
    * Constructs text at the position (x,y) with the provided string
    */
    constructor(x, y, text) {
        super();
        this.root = SVG.Text(x, y, text);
        this.root.id = this.id;
        this.style = this.root.style;
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
}
//# sourceMappingURL=Text.js.map