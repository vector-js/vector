import SVG from '../svg.js';
import Element from './element.js';
/**
* A tspan element is a text element that allows the user to change the style
* or position of the rendered text inside the tspan.
*/
export default class TSpan extends Element {
    /**
    * Constructs a tspan element
    */
    constructor(str) {
        super(SVG.TSpan(str));
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
    /**
    * Creates a child tspan element.
    */
    tspan(str) {
        let tspan = new TSpan(str);
        this.root.appendChild(tspan.root);
        return tspan;
    }
}
//# sourceMappingURL=t-span.js.map