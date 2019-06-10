import SVG from './SVG.js';
import Circle from './elements/Circle.js';
import Control from './elements/Control.js';
import Ellipse from './elements/Ellipse.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Text from './elements/Text.js';
import Rectangle from './elements/Rectangle.js';
import Slider from './elements/Slider.js';
import CheckBox from './elements/CheckBox.js';
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
        return -this.originX;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return -this.originY;
    }
    // TODO: look into css transform-origin
    setViewBox(minX, minY, width, height) {
        this.svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    }
    /**
    * Creates a control within this interactive.
    */
    checkBox(x, y, label, value) {
        let checkBox = new CheckBox(x, y, label, value);
        this.controls.appendChild(checkBox.root);
        return checkBox;
    }
    /**
    * Creates a circle within this interactive.
    */
    circle(cx, cy, r) {
        let circle = new Circle(cx, cy, r);
        this.background.appendChild(circle.root);
        return circle;
    }
    /**
    * Creates a control within this interactive.
    */
    control(x, y) {
        let control = new Control(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    /**
    * Creates an ellipse within this interactive.
    */
    ellipse(cx, cy, rx, ry) {
        let ellipse = new Ellipse(cx, cy, rx, ry);
        this.background.appendChild(ellipse.root);
        return ellipse;
    }
    /**
    * Creates a line within this interactive.
    */
    line(x1, y1, x2, y2) {
        let line = new Line(x1, y1, x2, y2);
        this.background.appendChild(line.root);
        return line;
    }
    /**
    * Creates a path within this interactive.
    */
    path(d) {
        let path = new Path(d);
        this.background.appendChild(path.root);
        return path;
    }
    /**
    * Creates a rectangle object within this interactive.
    */
    rectangle(x, y, width, height) {
        let rectangle = new Rectangle(x, y, width, height);
        this.background.appendChild(rectangle.root);
        return rectangle;
    }
    /**
    * Places a slider at the provided location
    */
    slider(x, y, width, value) {
        let slider = new Slider(x, y, width, value);
        this.controls.appendChild(slider.root);
        return slider;
    }
    /**
    * Creates a text within this interactive.
    */
    text(x, y, contents) {
        let text = new Text(x, y, contents);
        this.background.appendChild(text.root);
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi9zb3VyY2UvIiwic291cmNlcyI6WyJJbnRlcmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUM7QUFDM0IsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUM7QUFDMUMsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUM7QUFDNUMsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUM7QUFDNUMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFDdEMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFDdEMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUM7QUFDMUMsT0FBTyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFFOUM7OztFQUdFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFXO0lBOEI5Qjs7O01BR0U7SUFDRixZQUFhLEVBQVM7UUFWdEIscUJBQXFCO1FBQ2IsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQVUsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBVSxDQUFDLENBQUM7UUFDcEIsYUFBUSxHQUFVLENBQUMsQ0FBQztRQVExQiw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2QyxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJ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