import Input from './input.js';
import Path from '../svg/path.js';
import Circle from '../svg/circle.js';
import Rectangle from '../svg/rectangle.js';
/**
* A point has an x position and y position
*/
declare class Point {
    x: number;
    y: number;
}
/**
* A control point is a draggable two dimensional point.
*/
export default class Control extends Input {
    private static pointRadius;
    private static handleRadius;
    private static active;
    private static slopX;
    private static slopY;
    private static prevX;
    private static prevY;
    private _x;
    private _y;
    private _dx;
    private _dy;
    private static initalized;
    point: Circle;
    handle: Circle;
    /**
    * Modifying the transform function allows for the control to be constrained
    * to a path or constrained to the region enclosed in a path.
    */
    constrain: (_oldPosition: Point, newPosition: Point) => Point;
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x: number, y: number);
    /**
    * Handles when the user moves their mouse over the window. If there is an
    * active control, the control's position is updated.
    */
    static handleMouseMove(event: MouseEvent): void;
    /**
    * Handles a touch move event. If there is an active control, the control's
    * position is updated.
    */
    static handleTouchMove(event: TouchEvent): void;
    /**
    * Moves the active control to the new (x,y) position.
    */
    static handleMoveTo(clientX: number, clientY: number): void;
    /**
    * Handles when a use mouses up over the window or ends their touch event.
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
    set x(x: number);
    /**
    * Updates the y position of the control.
    */
    set y(y: number);
    /**
    * Gets the x position of the control.
    */
    get x(): number;
    /**
    * Gets the y position of the control.
    */
    get y(): number;
    /**
    * Gets the change in x position of this control.
    */
    get dx(): number;
    /**
    * Gets the change in y position of this control.
    */
    get dy(): number;
    /**
    * Constrains the movement of this control point to the path of the provided
    * element.
    */
    constrainTo(element: Path | Circle | Rectangle): void;
    /**
    * Constrains the movement of this control point to the path of the provided
    * element.
    */
    constrainWithin(element: Path | Circle | Rectangle): void;
    /**
    * Constrains the control to follow the path of the circle specified by the
    * arguments. TODO: add a method to constrain the control to a path
    */
    constrainToCircle(cx: number, cy: number, r: number): void;
    /**
    * Constrains the control to the box defined by the points (x1, y1) and
    * (x2, y2). The first point defines the top-left corner of the box, the
    * second the bottom-right corner of the box.
    */
    constrainWithinBox(x1: number, y1: number, x2: number, y2: number): void;
    constrainWithinRange(minX: number, maxX: number): void;
    /**
    * Constrain this control to only move left and right along its current x
    * position.
    */
    constrainToX(minX?: number, maxX?: number): void;
    /**
    * Constrain this control to only move up and down along its current y
    * position.
    */
    constrainToY(): void;
}
export {};
