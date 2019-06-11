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
    * The container element for this interactive.
    */
    root: HTMLElement;
    /**
    * The main svg that elements are created within
    */
    svg: SVGElement;
    /**
    * The controls groups sits on top of the background group and ensures that
    * control elements will always visually appear above background elements.
    */
    private controls;
    /**
    * The background is where everything that is not a primary control is drawn.
    */
    private background;
    private _width;
    private _height;
    private _originX;
    private _originY;
    /**
    * Constructs a new interactive object within the HTML element corresponding
    * to the id. If no element is found throws an error.
    */
    constructor(id: string);
    /**
    * Sets the width of this interactive area.
    */
    /**
    * Returns the width of this interactive area.
    */
    width: number;
    /**
    * Sets the height of this interactive area.
    */
    /**
    * Returns the height of this interactive area.
    */
    height: number;
    /**
    * Sets the x coordinate of the origin.
    */
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    originX: number;
    /**
    * Sets the y coordinate of the origin.
    */
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    originY: number;
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    window: boolean;
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    readonly minX: number;
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    readonly minY: number;
    setViewBox(minX: number, minY: number, width: number, height: number): void;
    /**
    * Creates a control within this interactive.
    */
    checkBox(x: number, y: number, label: string, value: boolean): CheckBox;
    /**
    * Creates a circle within this interactive.
    */
    circle(cx: number, cy: number, r: number): Circle;
    /**
    * Creates a control within this interactive.
    */
    control(x: number, y: number): Control;
    /**
    * Creates an ellipse within this interactive.
    */
    ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse;
    /**
    * Creates a line within this interactive.
    */
    line(x1: number, y1: number, x2: number, y2: number): Line;
    /**
    * Creates a path within this interactive.
    */
    path(d: string): Path;
    /**
    * Creates a rectangle object within this interactive.
    */
    rectangle(x: number, y: number, width: number, height: number): Rectangle;
    /**
    * Places a slider at the provided location
    */
    slider(x: number, y: number, width?: number, value?: number): Slider;
    /**
    * Creates a text within this interactive.
    */
    text(x: number, y: number, contents: string): Text;
}
