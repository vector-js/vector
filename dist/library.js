/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/Library.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/Controller.ts":
/*!******************************!*\
  !*** ./source/Controller.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controller; });
/* harmony import */ var _model_DependencyGraph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/DependencyGraph */ "./source/model/DependencyGraph.ts");

/**
* Controls the interactions between user input and visual changes to the
* interactive
*/
class Controller {
    /**
    * Constructs a new Controller
    */
    constructor() {
        this.dependencyGraph = new _model_DependencyGraph__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    /**
    * Adds an element to this controller.
    */
    add(element) {
        this.dependencyGraph.add(element);
    }
    /**
    * Returns the element corresponding to the unique string identifier
    */
    get(id) {
        return this.elements.get(id);
    }
    /**
    * Updates this element and all of its dependents
    */
    update(element) {
        let deps = this.dependencyGraph.getDependents(element);
        for (let d of deps) {
            d.update();
        }
    }
}


/***/ }),

/***/ "./source/Library.ts":
/*!***************************!*\
  !*** ./source/Library.ts ***!
  \***************************/
/*! exports provided: Control, Element, Ellipse, Line, Path, Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/Control */ "./source/elements/Control.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Control", function() { return _elements_Control__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _elements_Ellipse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/Ellipse */ "./source/elements/Ellipse.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ellipse", function() { return _elements_Ellipse__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _elements_Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/Element */ "./source/elements/Element.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return _elements_Element__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _elements_Line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/Line */ "./source/elements/Line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _elements_Line__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _elements_Path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements/Path */ "./source/elements/Path.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return _elements_Path__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _elements_Rectangle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements/Rectangle */ "./source/elements/Rectangle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _elements_Rectangle__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _elements_SVG__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./elements/SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _elements_Text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elements/Text */ "./source/elements/Text.ts");








// Add to the global (window) namespace
window.Control = _elements_Control__WEBPACK_IMPORTED_MODULE_0__["default"];
window.Element = _elements_Element__WEBPACK_IMPORTED_MODULE_2__["default"];
window.Ellipse = _elements_Ellipse__WEBPACK_IMPORTED_MODULE_1__["default"];
window.Line = _elements_Line__WEBPACK_IMPORTED_MODULE_3__["default"];
window.Path = _elements_Path__WEBPACK_IMPORTED_MODULE_4__["default"];
window.Rectangle = _elements_Rectangle__WEBPACK_IMPORTED_MODULE_5__["default"];
window.SVG = _elements_SVG__WEBPACK_IMPORTED_MODULE_6__["default"];
window.Text = _elements_Text__WEBPACK_IMPORTED_MODULE_7__["default"];



/***/ }),

/***/ "./source/elements/Control.ts":
/*!************************************!*\
  !*** ./source/elements/Control.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Control; });
/* harmony import */ var _SVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./source/elements/Element.ts");


/**
* A control is a draggable two dimensional point.
*/
class Control extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs a control at the position (x,y)
    */
    constructor(x, y) {
        super();
        /**
        * Modifying the transform function allows for the control to be constrained
        * to a path or constrained to the region enclosed in a path.
        */
        this.constrain = function (oldPosition, newPosition) {
            return newPosition;
        };
        // create the svg components
        this.group = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Group(['control']);
        this.point = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Circle(0, 0, Control.pointRadius, ['control-point']);
        this.handle = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Circle(0, 0, Control.handleRadius, ['control-handle']);
        this.group.appendChild(this.point);
        this.group.appendChild(this.handle);
        this.group.id = this.id;
        // initialize instance variables
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 0;
        // the default behavior of a control is to update its dependents on change
        this.onchange = function () {
            this.updateDependents();
        };
        // translate the control to its initial position
        this.translate(x, y);
        // register event handlers
        let control = this;
        this.group.onmousedown = function (event) {
            control.handleMouseDown(event);
        };
        this.handle.onmouseout = function (event) {
            control.handleMouseOut(event);
        };
        this.handle.onmouseover = function (event) {
            Control.handleMouseOver(event);
        };
        window.onmousemove = function (event) {
            Control.handleMouseMove(event);
        };
        window.onmouseup = function (event) {
            Control.handleInputEnd(event);
        };
        // add mobile and tablet event listeners, set passive to false so chrome doesn't complain
        this.handle.addEventListener('touchstart', control.handleTouchStart.bind(this), { passive: false });
        window.addEventListener('touchend', Control.handleInputEnd, { passive: false });
        window.addEventListener('touchmove', Control.handleTouchMove, { passive: false });
    }
    /**
    * Handles when the user moves their mouse over the window. If there is an
    * active control, the control's position is updated.
    */
    static handleMouseMove(event) {
        if (Control.active != null) {
            let x;
            let y;
            if (event.type === "touchmove") {
                x = event.touches[0].clientX + Control.slopX;
                y = event.touches[0].clientY + Control.slopY;
                event.preventDefault();
            }
            else {
                x = event.clientX + Control.slopX;
                y = event.clientY + Control.slopY;
            }
            Control.active.translate(x, y);
        }
    }
    static handleTouchMove(event) {
        if (Control.active != null) {
            let x = event.touches[0].clientX + Control.slopX;
            let y = event.touches[0].clientY + Control.slopY;
            Control.active.translate(x, y);
            event.preventDefault();
        }
    }
    /**
    * Handles when a use mouses up over the window.
    */
    static handleInputEnd(event) {
        if (Control.active != null) {
            // remove highlighting from the active control and set to null
            Control.active.handle.classList.remove('highlight');
            Control.active = null;
            // fire a mouseover event to highlight either: a new control, the recently
            // active control, or a different element entirely. Currently, whichever
            // element is highest in the DOM order will be the target. In the future
            // the most recently active Control could be "promoted" for consistency.
            if (event.type != "touchend") {
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
    static handleMouseOver(event) {
        if (Control.active == null && !_Element__WEBPACK_IMPORTED_MODULE_1__["default"].disable) {
            event.target.classList.add('highlight');
        }
    }
    /**
    * When a user mouses out of a control handle and when there is no active
    * control, remove the "highlight" class from the event target.
    */
    handleMouseOut(event) {
        if (Control.active == null) {
            event.target.classList.remove('highlight');
        }
    }
    /**
    * Handle when a user mouses down over a Control's handle. Stores the error in
    * the user's click as well as stores which Control the user is clicking.
    */
    handleMouseDown(event) {
        if (!_Element__WEBPACK_IMPORTED_MODULE_1__["default"].disable) {
            Control.active = this;
            Control.slopX = Control.active.x - event.clientX;
            Control.slopY = Control.active.y - event.clientY;
        }
    }
    /**
    * Handle when a user touches over a Control's handle. Stores the error in
    * the user's input as well as stores which Control the user is clicking.
    */
    handleTouchStart(event) {
        if (!_Element__WEBPACK_IMPORTED_MODULE_1__["default"].disable) {
            Control.active = this;
            Control.slopX = Control.active.x - event.touches[0].clientX;
            Control.slopY = Control.active.y - event.touches[0].clientY;
            event.preventDefault();
        }
    }
    /**
    * Moves the control to a new location
    */
    translate(x, y) {
        // call the internal transform function
        let point = this.constrain({ x: this.x, y: this.y }, { x: x, y: y });
        // update the instance data
        this._dx = point.x - this._x;
        this._dy = point.y - this._y;
        this._x = point.x;
        this._y = point.y;
        // transform the position of the contorl
        this.group.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
        // call the onchange function
        this._onchange();
    }
    /**
    * Updates the x position of the control.
    */
    set x(x) {
        this._dx = x - this.x;
        this._x = x;
        this.group.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
    }
    /**
    * Updates the y position of the control.
    */
    set y(y) {
        this._dy = y - this.y;
        this._y = y;
        this.group.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
    }
    /**
    * Gets the x position of the control.
    */
    get x() {
        return this._x;
    }
    /**
    * Gets the y position of the control.
    */
    get y() {
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
    * Whenever the position of this control is changed this function is called.
    */
    set onchange(func) {
        this._onchange = func;
    }
    /**
    * Constrains the control to follow the path of the circle specified by the
    * arguments. TODO: change to constrain to path.
    */
    constrainToCircle(cx, cy, r) {
        this.constrain = function (oldPosition, newPosition) {
            // Calculate the angle between the current coordinate and the origin
            let angle = Math.atan2(newPosition.y - cy, newPosition.x - cx);
            // Set the controls position to the vector in the direction of the angle
            // above and with the magnitude of the radius of the circle.
            let x = r * Math.cos(angle) + cx;
            let y = r * Math.sin(angle) + cy;
            // Return the new position
            return { x: x, y: y };
        };
    }
    constrainToX() {
        this.constrain = function (oldPosition, newPosition) {
            return { x: newPosition.x, y: oldPosition.y };
        };
    }
    constrainToY() {
        this.constrain = function (oldPosition, newPosition) {
            return { x: oldPosition.x, y: newPosition.y };
        };
    }
}
// Describes the size of the control handle and point
Control.pointRadius = 4;
Control.handleRadius = 13;
// Keeps track of the active control and the error in the user's click
Control.active = null;
Control.slopX = 0;
Control.slopY = 0;


/***/ }),

/***/ "./source/elements/Element.ts":
/*!************************************!*\
  !*** ./source/elements/Element.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controller */ "./source/Controller.ts");

/**
* Represents an element that lives within the ecosystem of our interactives.
*/
class Element {
    /**
    * Constructs the elements and adds it into the current controller
    */
    constructor() {
        // give this element an unique id
        this._id = this.constructor.name + '-' + Element.count++;
        // add this element to the controller
        Element.controller.add(this);
    }
    get id() {
        return this._id;
    }
    addDependency(element) {
        Element.controller.dependencyGraph.addDependency(element, this);
    }
    /**
    * Updates the elements that depend on this element.
    */
    updateDependents() {
        Element.controller.update(this);
    }
}
/**
* Allows for the events attatched to elements to be disabled.
*/
Element.disable = false;
/**
* This controller handles the relationships between different visual elements.
*/
Element.controller = new _Controller__WEBPACK_IMPORTED_MODULE_0__["default"]();
/**
* This number uniquely identifes elements
*/
Element.count = 0;


/***/ }),

/***/ "./source/elements/Ellipse.ts":
/*!************************************!*\
  !*** ./source/elements/Ellipse.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ellipse; });
/* harmony import */ var _SVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./source/elements/Element.ts");


class Ellipse extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, rx, ry) {
        super();
        this.creationNum = 0;
        this.root = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Ellipse(cx, cy, rx, ry);
        this.root.id = this.id;
    }
    get fill() {
        return this.root.style.fill;
    }
    set fill(s) {
        this.root.style.fill = s;
    }
    get stroke() {
        return this.root.style.stroke;
    }
    set stroke(s) {
        this.root.style.stroke = s;
    }
    /**
    * Returns the x position of the rectangle
    */
    get cx() {
        return this.root.cx.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set cx(n) {
        this.root.cx.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get cy() {
        return this.root.cy.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set cy(n) {
        this.root.cy.baseVal.value = n;
    }
    /**
    * Returns the width of the rectangle
    */
    get rx() {
        return this.root.rx.baseVal.value;
    }
    /**
    * Sets the width of the rectangle
    */
    set rx(n) {
        this.root.rx.baseVal.value = n;
    }
    /**
    * Returns the height of the rectangle
    */
    get ry() {
        return this.root.ry.baseVal.value;
    }
    /**
    * Sets the height of the rectangle
    */
    set ry(n) {
        this.root.ry.baseVal.value = n;
    }
    translate(x, y) {
        this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
        this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
    }
}


/***/ }),

/***/ "./source/elements/Line.ts":
/*!*********************************!*\
  !*** ./source/elements/Line.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _SVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./source/elements/Element.ts");


class Line extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(x1, y1, x2, y2) {
        super();
        this.root = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Line(x1, y1, x2, y2);
        this.root.id = this.id;
    }
    get fill() {
        return this.root.style.fill;
    }
    set fill(fill) {
        this.root.style.fill = fill;
    }
    get stroke() {
        return this.root.style.stroke;
    }
    set stroke(stroke) {
        this.root.style.stroke = stroke;
    }
    get x1() {
        return this.root.x1.baseVal.value;
    }
    set x1(x1) {
        this.root.x1.baseVal.value = x1;
    }
    get y1() {
        return this.root.y1.baseVal.value;
    }
    set y1(y1) {
        this.root.y1.baseVal.value = y1;
    }
    get x2() {
        return this.root.x2.baseVal.value;
    }
    set x2(x2) {
        this.root.x2.baseVal.value = x2;
    }
    get y2() {
        return this.root.y2.baseVal.value;
    }
    set y2(y2) {
        this.root.y2.baseVal.value = y2;
    }
    translate(x, y) {
        this.root.x1.baseVal.value += x;
        this.root.y1.baseVal.value += y;
        this.root.x2.baseVal.value += x;
        this.root.y2.baseVal.value += y;
    }
}


/***/ }),

/***/ "./source/elements/Path.ts":
/*!*********************************!*\
  !*** ./source/elements/Path.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
/* harmony import */ var _SVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./source/elements/Element.ts");


class Segment extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(command) {
        super();
    }
}
/**
*
*/
class Path extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    *
    */
    constructor(d) {
        super();
        this.path = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Path(d);
        this.path.id = this.id;
    }
    extend(command) {
    }
    getPath(d) {
        return null;
    }
    set d(d) {
        this.path.setAttribute('d', d);
    }
    get d() {
        return this.path.getAttribute('d');
    }
}


/***/ }),

/***/ "./source/elements/Rectangle.ts":
/*!**************************************!*\
  !*** ./source/elements/Rectangle.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rectangle; });
/* harmony import */ var _SVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./source/elements/Element.ts");


class Rectangle extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(x, y, width, height) {
        super();
        this.creationNum = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].count;
        this.root = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Rectangle(x, y, width, height);
        this.root.id = this.id;
    }
    get fill() {
        return this.root.style.fill;
    }
    set fill(s) {
        this.root.style.fill = s;
    }
    get stroke() {
        return this.root.style.stroke;
    }
    set stroke(s) {
        this.root.style.stroke = s;
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
    translate(x, y) {
        this.root.x.baseVal.value = this.root.x.baseVal.value + x;
        this.root.y.baseVal.value = this.root.y.baseVal.value + y;
    }
}


/***/ }),

/***/ "./source/elements/SVG.ts":
/*!********************************!*\
  !*** ./source/elements/SVG.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SVG; });
class SVG {
    get strokeHex() {
        return SVG.strokeHex;
    }
    set strokeHex(s) {
        SVG.strokeHex = s;
    }
    get fillHex() {
        return SVG.fillHex;
    }
    set fillHex(s) {
        SVG.fillHex = s;
    }
    static SVG(id, width = 600, height = 300) {
        let root = document.getElementById(id);
        if (root == null) {
            throw new Error(`There is no HTMLElement with the identifier ${id}`);
        }
        let svg = document.createElementNS(this.namespace, 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        root.appendChild(svg);
        SVG.svg = svg;
        return SVG.svg;
    }
    static Text(x, y, str) {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x.toString());
        text.setAttribute('y', y.toString());
        text.innerHTML = str;
        SVG.svg.appendChild(text);
        return text;
    }
    /**
    * Constructs a rectangle with the provided attributes.
    */
    static Rectangle(x, y, width, height) {
        let rect = document.createElementNS(this.namespace, 'rect');
        rect.setAttribute('customCount', this.count.toString());
        this.count++;
        rect.setAttribute('x', x.toString());
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        rect.classList.add('default');
        SVG.svg.appendChild(rect);
        return rect;
    }
    static clearCounter() {
        SVG.count = 0;
    }
    static Ellipse(cx, cy, rx, ry) {
        let ell = document.createElementNS(this.namespace, 'ellipse');
        ell.setAttribute('customCount', this.count.toString());
        this.count++;
        ell.setAttribute('cx', cx.toString());
        ell.setAttribute('cy', cy.toString());
        ell.setAttribute('rx', rx.toString());
        ell.setAttribute('ry', ry.toString());
        ell.classList.add('default');
        SVG.svg.appendChild(ell);
        return ell;
    }
    static Line(x1, y1, x2, y2) {
        let line = document.createElementNS(SVG.namespace, 'line');
        // line.style.fill = SVG.fillHex;
        // line.style.stroke = SVG.strokeHex;
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.classList.add('default');
        SVG.svg.appendChild(line);
        return line;
    }
    /**
    *
    */
    static Circle(cx, cy, radius, classes = ['default']) {
        // create element and assign unique id
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.count++;
        // initialize attribute values
        circle.cx.baseVal.value = cx;
        circle.cy.baseVal.value = cy;
        circle.r.baseVal.value = radius;
        circle.classList.add(...classes);
        // add into root svg element
        SVG.svg.appendChild(circle);
        return circle;
    }
    static Group(classes = ['default']) {
        // create element and assign unique id
        let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add(...classes);
        // add into root svg element
        SVG.svg.appendChild(group);
        return group;
    }
    static Path(d, classes = ['default']) {
        // create element and assign unique id
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.classList.add(...classes);
        // add into root svg element
        SVG.svg.appendChild(path);
        return path;
    }
}
// Store a number for generating unique ids
SVG.count = 0;
// Namespace for creating svg elements
SVG.namespace = 'http://www.w3.org/2000/svg';
SVG.strokeHex = '#000000';
SVG.fillHex = '#aeaeae';


/***/ }),

/***/ "./source/elements/Text.ts":
/*!*********************************!*\
  !*** ./source/elements/Text.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _SVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVG */ "./source/elements/SVG.ts");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element */ "./source/elements/Element.ts");


/**
*
*/
class Text extends _Element__WEBPACK_IMPORTED_MODULE_1__["default"] {
    /**
    *
    */
    constructor(x, y, text) {
        super();
        this.text = _SVG__WEBPACK_IMPORTED_MODULE_0__["default"].Text(x, y, text);
        this.text.id = this.id;
    }
    set contents(str) {
        this.text.innerHTML = str;
    }
}


/***/ }),

/***/ "./source/model/DependencyGraph.ts":
/*!*****************************************!*\
  !*** ./source/model/DependencyGraph.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DependencyGraph; });
/* harmony import */ var _LinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinkedList */ "./source/model/LinkedList.ts");

/**
A dependency graph models relationships between nodes. The graph is directed and asyclic, throwing a circular dependency exception if circular dependencies are added.
*/
class DependencyGraph {
    /**
    Constructs an empty dependency graph.
    */
    constructor() {
        this.relationships = new Map();
        this._size = 0;
    }
    /***
    Adds a node into the dependency graph. If the node already exists within the graph, does nothing.
    */
    add(node) {
        if (!this.contains(node)) {
            this.relationships.set(node, new Set());
            this._size++;
        }
    }
    /**
    Returns true if the node exists within the dependency graph.
    */
    contains(node) {
        return this.relationships.has(node);
    }
    /**
    Removes the node from the dependency graph. If the node does not exist does nothing.
    */
    remove(node) {
        if (this.relationships.delete(node)) {
            this._size--;
        }
    }
    /**
    Returns the number of vertices in the dependency graph.
    */
    size() {
        return this._size;
    }
    /**
    Adds a dependency between two nodes. If either of the nodes do not exist within the dependency graph, throws an exception.
    */
    addDependency(from, to) {
        // Make sure the nodes exist
        this.add(from);
        this.add(to);
        // Add the dependency
        this.relationships.get(from).add(to);
        // Check for circular dependencies
        this.traverse(from, from);
    }
    /**
    Traverses the graph structuring checking for circular dependecies. If a circular dependency is added, throws an error.
    */
    traverse(current, node, visited = new Set()) {
        // Mark this node as visited
        visited.add(current);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(current, true);
        for (let d of dependents) {
            // Check if this dependency causes a circular dependency
            if (d == node) {
                throw new Error("circular dependency");
            }
            // Continue traversing un-explored nodes
            if (!visited.has(d)) {
                this.traverse(d, node, visited);
            }
        }
    }
    /**
    Returns true if a node has dependents.
    */
    hasDependents(node) {
        return this.contains(node) && this.relationships.get(node).size != 0;
    }
    /**
    * Returns an iterator to the dependents of the node.
    */
    getDependents(node, shallow = false) {
        // If the node does not exist return an empty iterable
        if (!this.relationships.has(node)) {
            return [];
        }
        // If shallow, return adjacent dependencies.
        if (shallow) {
            return this.relationships.get(node).keys();
        }
        else {
            // Get the dependents including the original node.
            let list = this.getTopologicalDependents(node);
            // Remove the starting node and return the dependents.
            list.remove();
            return list;
        }
    }
    /**
    Returns a list of the arguent node and all of its dependents in topological order.
    */
    getTopologicalDependents(node, visited = new Set(), list = new _LinkedList__WEBPACK_IMPORTED_MODULE_0__["default"]()) {
        // Mark this node as visited
        visited.add(node);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(node, true);
        for (let d of dependents) {
            if (!visited.has(d)) {
                this.getTopologicalDependents(d, visited, list);
            }
        }
        // Insert node to the front of iterator to retain Topological ordering
        list.insert(node);
        return list;
    }
    /**
    Returns the nodes within this dependency graph.
    */
    getNodes() {
        return this.relationships.keys();
    }
    /**
    Returns a string representation of this dependency graph.
    */
    toString() {
        // Build a string of dependencies in the form of from->to
        let result = "";
        for (let from of this.getNodes()) {
            for (let to of this.getDependents(from, true)) {
                result += from.toString() + '->' + to.toString() + '\n';
            }
        }
        return result;
    }
    /**
    Generates a DependenyGraph object from a string representation.
    */
    static Generate(str) {
        let graph = new DependencyGraph();
        // Prime the loop
        let start = 0;
        let index = str.indexOf('->', start);
        while (index > 0) {
            // Get the first part of the dependency
            let from = str.substring(start, index);
            // Get the second part of the dependency
            start = index + 1;
            index = str.indexOf('\n', index);
            let to = str.substring(start + 1, index);
            // Add the dependency to the graph
            graph.addDependency(from, to);
            // Get the next string if there is one
            start = index + 1;
            index = str.indexOf('->', start);
        }
        return graph;
    }
}


/***/ }),

/***/ "./source/model/LinkedList.ts":
/*!************************************!*\
  !*** ./source/model/LinkedList.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LinkedList; });
/**
* A node class contains data and a recursive next point.
*/
class Node {
    /**
    Constructs a new node with the provided data and sets next to be null.
    */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
/**
* A dynamic, singlely linked list.
*/
class LinkedList {
    /**
    Consstructs an empty linked list.
    */
    constructor() {
        this.head = null;
    }
    /**
    Inserts a node at the beginning of the list
    */
    insert(element) {
        if (this.head == null) {
            this.head = new Node(element);
        }
        else {
            let temp = this.head;
            this.head = new Node(element);
            this.head.next = temp;
        }
    }
    /**
    Returns the first element in the list, or null if the list is empty.
    */
    first() {
        if (this.head != null) {
            return this.head.data;
        }
        else {
            return null;
        }
    }
    /**
    Removes the first element in the list. Returns true if element was successfully removed, false otherwise.
    */
    remove() {
        if (this.head != null) {
            this.head = this.head.next;
            return true;
        }
        else {
            return false;
        }
    }
    /**
    Returns an iterator over the elements in the list
    */
    [Symbol.iterator]() {
        let current = this.head;
        const iterator = {
            next() {
                if (current == null) {
                    return {
                        done: true,
                        value: undefined
                    };
                }
                else {
                    let data = current.data;
                    current = current.next;
                    return {
                        done: false,
                        value: data
                    };
                }
            }
        };
        return iterator;
    }
}


/***/ })

/******/ });
//# sourceMappingURL=library.js.map