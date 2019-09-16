import SVG from '../SVG.js';
import Element from './Element.js';
/**
* A tspan element is a text element that allows the user to change the style
* or position of the rendered text inside the tspan.
*/
export default class TSpan extends Element {
    /**
    * Constructs a tspan element
    */
    constructor(str) {
        super();
        this.root = SVG.TSpan(str);
        this.root.id = this.id;
        this.style = this.root.style;
    }
    /**
    * The text contents of this tspan element
    */
    get text() {
        return this.root.innerHTML;
    }
    /**
    * Sets the text contents of this tspan element to the provided string
    */
    set text(str) {
        this.root.innerHTML = str;
    }
}
//# sourceMappingURL=Tspan.js.map