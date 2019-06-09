import SVG from './SVG.js';
import Control from './elements/Control.js';
import Ellipse from './elements/Ellipse.js';
import Path from './elements/Path.js';
import Circle from './elements/Circle.js';
import Text from './elements/Text.js';
/**
* This class exposes the high level functionality of our library. Elements can
* created and related together.
*/
export default class Interactive {
    /**
    * Constructs a new interactive object within the HTML element corresponding
    * to the id. If no element is found throws an error.
    */
    constructor(id) {
        // internal variables
        this._width = 0;
        this._height = 0;
        this._originX = 0;
        this._originY = 0;
        // store a reference to the container element
        this.root = document.getElementById(id);
        this.root.classList.add('interactive');
        // create and append the svg elements
        this.svg = this.root.appendChild(SVG.SVG(id));
        this.background = this.svg.appendChild(SVG.Group());
        this.controls = this.svg.appendChild(SVG.Group());
        // default configuration
        this.width = 600;
        this.height = 300;
        this.window = true;
    }
    /**
    * Sets the width of this interactive area.
    */
    set width(value) {
        this._width = value;
        this.svg.setAttribute('width', value.toString());
    }
    /**
    * Returns the width of this interactive area.
    */
    get width() {
        return this._width;
    }
    /**
    * Sets the height of this interactive area.
    */
    set height(value) {
        this._height = value;
        this.svg.setAttribute('height', value.toString());
    }
    /**
    * Returns the height of this interactive area.
    */
    get height() {
        return this._height;
    }
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value) {
        this._originX = value;
        this.setViewBox(this.minX, this.minY, this.width, this.height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        this._originY = value;
        this.setViewBox(this.minX, this.minY, this.width, this.height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        return this._originY;
    }
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value) {
        if (value) {
            this.svg.classList.add('window');
        }
        else {
            this.svg.classList.remove('window');
        }
    }
    // TODO: yikes that didn't work as expected
    // set flipCoordinateSystem( value:boolean ) {
    //   if( value ) {
    //     this.svg.style.transform = 'scale(1,-1)';
    //   } else {
    //     this.svg.style.transform = '';
    //   }
    // }
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX() {
        return this.originX - this.width;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return this.originY - this.height;
    }
    // TODO: look into css transform-origin
    setViewBox(minX, minY, width, height) {
        this.svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    }
    path(d) {
        let path = new Path(d);
        this.background.appendChild(path.root);
        return path;
    }
    ellipse(cx, cy, rx, ry) {
        let ellipse = new Ellipse(cx, cy, rx, ry);
        this.background.appendChild(ellipse.root);
        return ellipse;
    }
    circle(cx, cy, r) {
        let circle = new Circle(cx, cy, r);
        this.background.appendChild(circle.root);
        return circle;
    }
    control(x, y) {
        let control = new Control(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    text(x, y, contents) {
        let text = new Text(x, y, contents);
        this.background.appendChild(text.root);
        return text;
    }
}
