import Element from './Element.js';
import Point from './Point.js';
/**
* A control is a draggable two dimensional point.
*/
export default class Control extends Element {
    private static pointRadius;
    private static handleRadius;
    private static active;
    private static slopX;
    private static slopY;
    private _x;
    private _y;
    private _dx;
    private _dy;
    private _onchange;
    point: SVGCircleElement;
    handle: SVGCircleElement;
    /**
    * Modifying the transform function allows for the control to be constrained
    * to a path or constrained to the region enclosed in a path.
    */
    constrain: (oldPosition: Point, newPosition: Point) => Point;
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x: number, y: number);
    /**
    * Handles when the user moves their mouse over the window. If there is an
    * active control, the control's position is updated.
    */
    static handleMouseMove(event: MouseEvent | TouchEvent | any): void;
    static handleTouchMove(event: TouchEvent): void;
    /**
    * Handles when a use mouses up over the window.
    */
    static handleInputEnd(event: TouchEvent | MouseEvent): void;
    /**
    * When a user mouses over a control, add the class "highlight" to the control
    * handle.
    */
    static handleMouseOver(event: MouseEvent): void;
    /**
    * When a user mouses out of a control handle and when there is no active
    * control, remove the "highlight" class from the event target.
    */
    handleMouseOut(event: MouseEvent): void;
    /**
    * Handle when a user mouses down over a Control's handle. Stores the error in
    * the user's click as well as stores which Control the user is clicking.
    */
    handleMouseDown(event: MouseEvent): void;
    /**
    * Handle when a user touches over a Control's handle. Stores the error in
    * the user's input as well as stores which Control the user is clicking.
    */
    handleTouchStart(event: TouchEvent): void;
    /**
    * Moves the control to a new location
    */
    translate(x: number, y: number): void;
    /**
    * Updates the x position of the control.
    */
    /**
    * Gets the x position of the control.
    */
    x: number;
    /**
    * Updates the y position of the control.
    */
    /**
    * Gets the y position of the control.
    */
    y: number;
    /**
    * Gets the change in x position of this control.
    */
    readonly dx: number;
    /**
    * Gets the change in y position of this control.
    */
    readonly dy: number;
    /**
    * Whenever the position of this control is changed this function is called.
    */
    onchange: () => void;
    /**
    * Constrains the control to follow the path of the circle specified by the
    * arguments. TODO: change to constrain to path.
    */
    constrainToCircle(cx: number, cy: number, r: number): void;
    constrainToX(): void;
    constrainToY(): void;
}
