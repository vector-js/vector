import SVG from './SVG.js';
// basic elements
import Circle from './elements/Circle.js';
import Ellipse from './elements/Ellipse.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Text from './elements/Text.js';
import Rectangle from './elements/Rectangle.js';
// input elements
import Button from './elements/Button.js';
import CheckBox from './elements/CheckBox.js';
import Control from './elements/Control.js';
import ControlCircle from './elements/ControlCircle.js';
import Scrubber from './elements/Scrubber.js';
import Slider from './elements/Slider.js';
// complex elements
import Graph from './charts/Graph.js';
/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
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
        // create and append the root svg element and group elements
        this.svg = this.root.appendChild(SVG.SVG());
        this.svg.classList.add('interactive');
        this.background = this.svg.appendChild(SVG.Group());
        this.controls = this.svg.appendChild(SVG.Group());
        // default configuration
        this.width = 600;
        this.height = 300;
        this.window = false;
        // prevent the default behavior of selecting text
        this.root.addEventListener('mousedown', function (event) {
            event.preventDefault();
        });
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
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    set border(value) {
        if (value) {
            this.svg.classList.add('border');
        }
        else {
            this.svg.classList.remove('border');
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
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    get maxX() {
        return this.minX + this._width;
    }
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    get maxY() {
        return this.minY + this._height;
    }
    /**
    * A user provided description of this interactive.
    */
    set description(description) {
        this.svg.setAttribute('data-description', description);
    }
    /**
    * Sets the viewbox of the root svg element to the provided values.
    * TODO: look into css transform-origin
    */
    setViewBox(minX, minY, width, height) {
        this.svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x, y, label) {
        let button = new Button(x, y, label);
        this.controls.appendChild(button.root);
        return button;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x, y, label, value) {
        let checkBox = new CheckBox(x, y, label, value);
        this.controls.appendChild(checkBox.root);
        return checkBox;
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x, y) {
        let control = new Control(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x, y) {
        let control = new ControlCircle(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    graph(userEvents = true) {
        let graph = new Graph(userEvents);
        this.background.appendChild(graph.root);
        return graph;
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, width, value) {
        let slider = new Slider(x, y, width, value);
        this.controls.appendChild(slider.root);
        return slider;
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, width) {
        let scrubber = new Scrubber(x, y, width);
        this.controls.appendChild(scrubber.root);
        return scrubber;
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
    * Creates a rectangle within this interactive.
    */
    rectangle(x, y, width, height) {
        let rectangle = new Rectangle(x, y, width, height);
        this.background.appendChild(rectangle.root);
        return rectangle;
    }
    /**
    * Creates text within this interactive.
    */
    text(x, y, contents) {
        let text = new Text(x, y, contents);
        this.background.appendChild(text.root);
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zb3VyY2UvSW50ZXJhY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sVUFBVSxDQUFDO0FBRTNCLGlCQUFpQjtBQUNqQixPQUFPLE1BQU0sTUFBTSxzQkFBc0IsQ0FBQztBQUMxQyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztBQUN0QyxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztBQUN0QyxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUVoRCxpQkFBaUI7QUFDakIsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUM7QUFDMUMsT0FBTyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUM7QUFDNUMsT0FBTyxhQUFhLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUM7QUFFMUMsbUJBQW1CO0FBQ25CLE9BQU8sS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBRXRDOzs7Ozs7O0VBT0U7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVc7SUFrQzlCOzs7TUFHRTtJQUNGLFlBQWEsRUFBUztRQVZ0QixxQkFBcUI7UUFDYixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBVSxDQUFDLENBQUM7UUFDbkIsYUFBUSxHQUFVLENBQUMsQ0FBQztRQUNwQixhQUFRLEdBQVUsQ0FBQyxDQUFDO1FBUTFCLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEMsNERBQTREO1FBQzVELElB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