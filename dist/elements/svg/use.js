import Element from './element.js';
export default class Use extends Element {
    constructor(x, y, width, height) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        element.setAttributeNS(null, 'x', x.toString());
        element.setAttributeNS(null, 'y', y.toString());
        element.setAttributeNS(null, 'width', width.toString());
        element.setAttributeNS(null, 'height', height.toString());
        super(element);
    }
    get href() {
        return this.root.href.baseVal;
    }
    set href(value) {
        this.root.href.baseVal = value;
    }
    /**
  * Returns the x position of the rectangle
  */
    get x() {
        return this.root.x.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set x(n) {
        this.root.x.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get y() {
        return this.root.y.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set y(n) {
        this.root.y.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get width() {
        return this.root.width.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set width(n) {
        this.root.width.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get height() {
        return this.root.height.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set height(n) {
        this.root.height.baseVal.value = n;
    }
}
//# sourceMappingURL=use.js.map