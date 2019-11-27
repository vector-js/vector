import Element from './element.js';
/**
* A symbol is a reusable graphic.
*/
export default class Symbol extends Element {
    constructor() {
        let symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
        super(symbol);
    }
    // geometric properties
    get x() {
        throw new Error('Not Implemented');
    }
    set x(value) {
        throw new Error('Not Implemented');
    }
    get y() {
        throw new Error('Not Implemented');
    }
    set y(value) {
        throw new Error('Not Implemented');
    }
    get width() {
        throw new Error('Not Implemented');
    }
    set width(value) {
        throw new Error('Not Implemented');
    }
    get height() {
        throw new Error('Not Implemented');
    }
    set height(value) {
        throw new Error('Not Implemented');
    }
    // attributes
    get preserveAspectRatio() {
        throw new Error('Not Implemented');
    }
    set preserveAspectRatio(value) {
        throw new Error('Not Implemented');
    }
    get viewBox() {
        return this.root.getAttribute('viewBox');
    }
    set viewBox(value) {
        this.root.setAttributeNS(null, 'viewBox', value);
    }
    get refX() {
        throw new Error('Not Implemented');
    }
    set refX(value) {
        throw new Error('Not Implemented');
    }
    get refY() {
        throw new Error('Not Implemented');
    }
    set refY(value) {
        throw new Error('Not Implemented');
    }
}
//# sourceMappingURL=symbol.js.map