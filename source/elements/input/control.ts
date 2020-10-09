import {BaseElement} from '../base-element'
import Input from './input'

import Path from '../svg/path'
import Circle from '../svg/circle'
import Rectangle from '../svg/rectangle'
import { TAU } from '../../util/constants'
import Point from '../math/point'
import SVG from '../svg/svg'

/**
* A control point is a draggable two dimensional point.
*/
export default class Control extends Input {

  // Describes the size of the control handle and point
  private static pointRadius : number = 3.5;
  private static handleRadius : number = 13;

  // Keeps track of the active control and the error in the user's click
  private static active : Control = null;
  private static slopX : number = 0;
  private static slopY : number = 0;
  private static prevX : number = 0;
  private static prevY : number = 0;
  private static closestSVG : SVGSVGElement;
  private static ctm : DOMMatrix;

  // Private instance variables
  private _x: number;
  private _y: number;
  private _dx: number;
  private _dy: number;

  // Keep track of whether global event listeners have been initialized
  private static initalized = false;

  // Svg elements that make up the control
  point: Circle;
  handle: Circle;

  /**
  * Modifying the transform function allows for the control to be constrained
  * to a path or constrained to the region enclosed in a path.
  */
  constrain = function ( _oldPosition:Point, newPosition:Point) : Point {
      return newPosition;
  };

  /**
  * Constructs a control at the position (x,y)
  */
  constructor( x:number, y:number) {
    super();

    // create the svg components
    this.point = this.circle(0,0, Control.pointRadius);
    this.handle = this.circle(0,0, Control.handleRadius);
    this.point.classList.add('point');
    this.handle.classList.add('handle');
    this.root.classList.add('control');

    // initialize instance variables
    this._x = x;
    this._y = y;
    this._dx = 0;
    this._dy = 0;

    this.update = () => {};

    // translate the control to its initial position
    this.translate(x,y);

    // register event handlers
    this.root.onmousedown = this.handleMouseDown.bind(this);
    this.handle.root.onmouseout = this.handleMouseOut.bind(this);
    this.handle.root.addEventListener('touchstart', this.handleTouchStart.bind(this), {passive:false});

    // initialize window event listeners only once
    if( !Control.initalized ) {
      window.onmouseover = Control.handleMouseOver;
      window.onmousemove = Control.handleMouseMove;
      window.onmouseup = Control.handleInputEnd;
      window.addEventListener('touchend', Control.handleInputEnd, {passive:false});
      window.addEventListener('touchmove', Control.handleTouchMove, {passive:false});
      Control.initalized = true;
    }
  }

  /**
  * Handles when the user moves their mouse over the window. If there is an
  * active control, the control's position is updated.
  */
  static handleMouseMove( event:MouseEvent ) {
    if( Control.active != null ) {
      Control.handleMoveTo(event.clientX,event.clientY);
      event.preventDefault();
    }
  }

  /**
  * Handles a touch move event. If there is an active control, the control's
  * position is updated.
  */
  static handleTouchMove( event:TouchEvent) {
    if( Control.active != null ) {
      Control.handleMoveTo(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
    }
  }

  /**
  * Moves the active control to the new (x,y) position.
  */
  static handleMoveTo( clientX: number, clientY: number) {

    // Calculate the position of (clientX, clientY) in the SVG coordinate system
    let point = Control.closestSVG.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    let p = point.matrixTransform(Control.ctm.inverse());

    // Update the current position of the control point
    let x = p.x + Control.slopX;
    let y = p.y + Control.slopY;
    Control.active.translate( x, y);
  }

  /**
   * Converts this control point to a black/white point for display / printing.
   */
  converToDisplay() {
    this.point.fill = '#404040';
    this.point.r = 3.5;
  }

  /**
  * Handles when a use mouses up over the window or ends their touch event.
  */
  static handleInputEnd( event:TouchEvent|MouseEvent)  {
    if( Control.active != null ) {

      // remove highlighting from the active control and set to null
      Control.active.handle.root.classList.remove('highlight');
      Control.active = null;

      // fire a mouseover event to highlight either: an interactive control,
      // the recently active control, or a different element entirely.
      // Currently, whichever element is highest in the DOM order will be the
      // target. In the future the most recently active Control could be
      // prioritized for user experience.
      if( event.type != "touchend" ) {
        event.target.dispatchEvent(new MouseEvent('mouseover', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      }
    }
  }

  /**
  * When a user mouses over a control, add the class "highlight" to the control
  * handle.
  */
  static handleMouseOver( event:MouseEvent ) {
    if( Control.active == null && !BaseElement.disable && (event.target as HTMLElement).tagName == 'circle' ){
      (event.target as HTMLElement).classList.add('highlight');
    }
  }

  /**
  * When a user mouses out of a control handle and when there is no active
  * control, remove the "highlight" class from the event target.
  */
  handleMouseOut( event:MouseEvent ) {
    if( Control.active == null ){
      (event.target as HTMLElement).classList.remove('highlight');
    }
  }

  /**
  * Handle when a user mouses down over a Control's handle. Stores the error in
  * the user's click as well as stores which Control the user is clicking.
  */
  handleMouseDown( event:MouseEvent ) {
    if( !BaseElement.disable ) {
      event.preventDefault();
      event.stopPropagation();
      Control.active = this;
      
      // Store the parent SVG coordinate system
      Control.closestSVG = Control.active.root.closest('svg');
      Control.ctm = Control.closestSVG.getScreenCTM();

      // Calculate the (x,y) position of (clientX, clientY)
      let point = Control.closestSVG.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      let p = point.matrixTransform(Control.ctm.inverse());

      // Store the difference between the mouse position and the control position
      Control.slopX = Control.active.x - p.x;
      Control.slopY = Control.active.y - p.y;
    }
  }

  /**
  * Handle when a user touches over a Control's handle. Stores the error in
  * the user's input as well as stores which Control the user is clicking.
  */
  handleTouchStart( event:TouchEvent ) {
    if( !BaseElement.disable ) {
      Control.active = this;
      // Store the parent SVG coordinate system
      Control.closestSVG = Control.active.root.closest('svg');
      Control.ctm = Control.closestSVG.getScreenCTM();

      // Calculate the (x,y) position of (clientX, clientY)
      let point = Control.closestSVG.createSVGPoint();
      point.x = event.touches[0].clientX;
      point.y = event.touches[0].clientY;
      let p = point.matrixTransform(Control.ctm.inverse());

      // Store the difference between the mouse position and the control position
      Control.slopX = Control.active.x - p.x;
      Control.slopY = Control.active.y - p.y;
      event.preventDefault();
    }
  }

  /**
  * Moves the control to a new location
  */
  translate(x:number, y:number){

    // call the internal transform function
    let point = this.constrain(this, new Point(x,y));

    // update the instance data
    this._dx = point.x - this._x;
    this._dy = point.y - this._y;
    this._x = point.x;
    this._y = point.y;

    // transform the position of the contorl
    this.root.setAttribute('transform', `translate( ${this.x}, ${this.y})`);

    // call the onchange function
    this.onchange();
  }

  /**
  * Updates the x position of the control.
  */
  set x( x : number ) {
    this._dx = x - this.x;
    this._x = x;
    this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
  }

  /**
  * Updates the y position of the control.
  */
  set y( y : number ) {
    this._dy = y - this.y;
    this._y = y;
    this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
  }

  /**
  * Gets the x position of the control.
  */
  get x( ) {
    return this._x;
  }

  /**
  * Gets the y position of the control.
  */
  get y( ) {
    return this._y;
  }

  /**
  * Gets the change in x position of this control.
  */
  get dx() {
    return this._dx;
  }

  /**
  * Gets the change in y position of this control.
  */
  get dy() {
    return this._dy;
  }

  /**
  * Returns the angle in radians relative to the origin that the point forms.
  * TODO: the y-axis is flipped on this because it would be a pain to always
  * negate the angle. In the future probably implement a custom language and
  * then choose an output and do the inversion there.
  */
  get displayAngle() {
    if( this.y <= 0 ) {
      return  Math.abs(Math.atan2( this.y, this.x));
    } else {
      return TAU - Math.atan2( this.y, this.x);
    }
  }

  /**
  * Returns the angle in radians relative to the origin that the point forms.
  */
  get angle() {

    return (Math.atan2( this.y, this.x) + TAU) % TAU;

  }



  /**
  * Constrains the movement of this control point to the path of the provided
  * element.
  */
  constrainTo( element:Path|Circle|Rectangle) {

    this.addDependency(element);
    if( element instanceof Path ) {
      throw Error('not implemented');
    } else if( element instanceof Circle ) {

      this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {

        // Calculate the angle between the current coordinate and the origin
        let angle = Math.atan2( newPosition.y - element.cy, newPosition.x - element.cx );

        // Set the controls position to the vector in the direction of the angle
        // above and with the magnitude of the radius of the circle.
        let x = element.r*Math.cos(angle) + element.cx;
        let y = element.r*Math.sin(angle) + element.cy;

        // Return the new position
        return new Point(x, y);

      };
    } else if( element instanceof Rectangle) {
      this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {

        let x  = newPosition.x;
        let y = newPosition.y;

        // min and max points
        let minX = element.x;
        let minY = element.y;
        let maxX = element.x + element.width;
        let maxY = element.y + element.height;
        let cx = element.x + element.width/2;
        let cy = element.y + element.height/2;

        if( y >= maxY && x >= maxX ) {
          y = maxY;
          x = maxX;
        } else if ( y <= minY && x <= minX ) {
          y = minY;
          x = minY;
        } else if ( y <= minY && x >= maxX ) {
          y = minY;
          x = maxX;
        } else if ( y >= maxY && x <= minX ) {
          y = maxY;
          x = minX;
        } else if( x > minX && x < maxX ){
          if( y > cy ) {
            y = maxY;
          } else {
            y = minY;
          }
        } else {
          if( x > cx ) {
            x = maxX;
          } else {
            x = minX;
          }
        }


        //  else if ( y - cy < x - cx ) {
        //   y = minY;
        // } else if ( x - cx < y - cy ) {
        //   x = minX;
        // }



        //

        // if( x - cx >= y - cy) {
        //   x = maxX;
        // }
        // if( y - cy < x - cx) {
        //   y = minY;
        // }

        // if( x - cx < y - cy) {
        //   x = minX;
        // }

        // constrain
        // if( x < minX || (x > minX && x <= cx)) {x = minX;}
        // if( y < minY || (y > minY && y <= cy)) {y = minY;}
        // if( x > maxX || (x < maxX && x > cx)) {x = maxX;}
        // if( y > maxY || (y < maxY && y > cy)) {y = maxY;}

        return new Point(x,y);
      };
    }
  }

  /**
  * Constrains the movement of this control point to the path of the provided
  * element.
  */
  constrainWithin( element:Path|Circle|Rectangle) {
    this.addDependency(element);
    if( element instanceof Path ) {
      throw Error('not implemented');
    } else if( element instanceof Circle ) {
      this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {

        // Contain the position within the circle
        if( Math.hypot(newPosition.y - element.cy, newPosition.x - element.cx) > element.r) {
          // Calculate the angle between the current coordinate and the origin
          let angle = Math.atan2( newPosition.y - element.cy, newPosition.x - element.cx );
          let x = element.r*Math.cos(angle) + element.cx;
          let y = element.r*Math.sin(angle) + element.cy;
          return new Point(x,y);
        } else {
          return newPosition;
        }
      };
    } else if( element instanceof Rectangle) {
      this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {

        let x  = newPosition.x;
        let y = newPosition.y;

        // min and max points
        let x1 = element.x;
        let y1 = element.y;
        let x2 = element.x + element.width;
        let y2 = element.y + element.height;

        // constrain
        if( x < x1) {x = x1;}
        if( y < y1) {y = y1;}
        if( x > x2) {x = x2;}
        if( y > y2) {y = y2;}

        return new Point(x,y);
      };
    }
  }

  /**
  * Constrains the control to follow the path of the circle specified by the
  * arguments. TODO: add a method to constrain the control to a path
  */
  constrainToCircle( cx:number, cy:number, r:number) {

    // set the constrain function
    this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {

      // Calculate the angle between the current coordinate and the origin
      let angle = Math.atan2( newPosition.y - cy, newPosition.x - cx );

      // Set the controls position to the vector in the direction of the angle
      // above and with the magnitude of the radius of the circle.
      let x = r*Math.cos(angle) + cx;
      let y = r*Math.sin(angle) + cy;

      // Return the new position
      return new Point(x,y);
    };
  }

  /**
  * Constrains the control to the box defined by the points (x1, y1) and
  * (x2, y2). The first point defines the top-left corner of the box, the
  * second the bottom-right corner of the box.
  */
  constrainWithinBox( x1:number, y1:number, x2:number, y2:number) {
    this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {

      let x  = newPosition.x;
      let y = newPosition.y;

      if( x < x1) {x = x1;}
      if( y < y1) {y = y1;}
      if( x > x2) {x = x2;}
      if( y > y2) {y = y2;}

      return new Point(x,y);
    };
  }


  constrainWithinRange( minX:number, maxX:number ) {
    this.constrain = function ( _oldPosition:Point, newPosition:Point) : Point {
      let x  = newPosition.x;
      let y = newPosition.y;
      if( x < minX) {x = minX;}
      if( x > maxX) {x = maxX;}
      return new Point(x,y);
    };
  }

  /**
  * Constrain this control to only move left and right along its current x
  * position.
  */
  constrainToX( minX:number = -Infinity, maxX:number = Infinity) {
    this.constrain = function ( oldPosition:Point, newPosition:Point) : Point {
      return new Point(newPosition.x, oldPosition.y);
    };
  }

  /**
  * Constrain this control to only move up and down along its current y
  * position.
  */
  constrainToY() {
    this.constrain = function ( oldPosition:Point, newPosition:Point) : Point {
      return new Point(oldPosition.x, newPosition.y);
    };
  }
}
