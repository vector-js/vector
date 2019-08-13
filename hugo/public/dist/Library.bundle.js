var Library = (function (exports) {
    'use strict';

    /**
    * This wrapper class provides static methods for creating SVG Elements.
    */
    class SVG {
        /**
        * Constructs and returns a SVG element. The default dimensions is 600 by 300
        * units.
        */
        static SVG(width = 600, height = 300) {
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', width.toString());
            svg.setAttribute('height', height.toString());
            return svg;
        }
        /**
        * Returns a SVGTextElement element with the provided attributes.
        */
        static Text(x, y, str) {
            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x.toString());
            text.setAttribute('y', y.toString());
            text.innerHTML = str;
            return text;
        }
        /**
        * Returns a SVGRectElement with the provided attributes.
        */
        static Rectangle(x, y, width, height) {
            // constructs and initializes the rectangle
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x.toString());
            rect.setAttribute('y', y.toString());
            rect.setAttribute('width', width.toString());
            rect.setAttribute('height', height.toString());
            rect.classList.add('default');
            return rect;
        }
        /**
        * Returns a SVGEllipseElement with the provided attributes.
        */
        static Ellipse(cx, cy, rx, ry) {
            let ell = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            ell.setAttribute('cx', cx.toString());
            ell.setAttribute('cy', cy.toString());
            ell.setAttribute('rx', rx.toString());
            ell.setAttribute('ry', ry.toString());
            ell.classList.add('default');
            return ell;
        }
        /**
        * Returns a SVGLineElement element with the provided attributes.
        */
        static Line(x1, y1, x2, y2) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1.toString());
            line.setAttribute('y1', y1.toString());
            line.setAttribute('x2', x2.toString());
            line.setAttribute('y2', y2.toString());
            line.classList.add('default');
            return line;
        }
        /**
        * Returns a SVGCircleElement element with the provided attributes.
        */
        static Circle(cx, cy, radius) {
            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.cx.baseVal.value = cx;
            circle.cy.baseVal.value = cy;
            circle.r.baseVal.value = radius;
            return circle;
        }
        /**
        * Constructs a group element with the provided attributes.
        */
        static Group() {
            let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            return group;
        }
        /**
        * Constructs a path element with the provided attributes.
        */
        static Path(d) {
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            return path;
        }
        /**
        * Constructs and returns a clip path element
        */
        static ClipPath() {
            let clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
            return clipPath;
        }
    }

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
        getTopologicalDependents(node, visited = new Set(), list = new LinkedList()) {
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

    /**
    * This controller manages the dependencies between elements.
    */
    class Controller {
        /**
        * Constructs a controller
        */
        constructor() {
            this.dependencyGraph = new DependencyGraph();
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

    /**
    * A basic element of the interactive ecosystem. Each element has an unique
    * identifier, an update function to be defined by the user, and the ability to
    * add dependencies on other elements.
    */
    class Element {
        /**
        * Constructs the elements and adds it into the current controller
        */
        constructor() {
            // give this element an unique id
            this._id = `${this.constructor.name}-${Element.count++}`;
            // add this element to the controller
            Element.controller.add(this);
        }
        /**
        * Returns the unique generated identifier associated with this element.
        */
        get id() {
            return this._id;
        }
        /**
        * Declares this element dependent on the provided element.
        */
        addDependency(...elements) {
            for (let element of elements) {
                Element.controller.dependencyGraph.addDependency(element, this);
            }
        }
        /**
        * Updates all of the elements that depend on this element.
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
    * The controller manages the dependencies between elements. Every element
    * is added to this controller upon creation.
    */
    Element.controller = new Controller();
    /**
    * This number uniquely identifes elements
    */
    Element.count = 0;

    /**
    * A path element allows for the creation of complicated shapes and curves.
    */
    class Path extends Element {
        /**
        * Construct a new path element with a string of commands.
        */
        constructor(d) {
            super();
            this.root = SVG.Path(d);
            this.root.classList.add('default');
            this.root.id = this.id;
        }
        /**
        * Returns the d attribute
        */
        get d() {
            return this.root.getAttribute('d');
        }
        /**
        * Sets the d attribute
        */
        set d(d) {
            this.root.setAttribute('d', d);
        }
    }

    /**
    * A circle is a basic element with a position and radius.
    */
    class Circle extends Element {
        /**
        * Constructs a rectangle element at the position (x,y)
        */
        constructor(cx, cy, r) {
            super();
            this.root = SVG.Circle(cx, cy, r);
            this.root.classList.add('default');
            this.root.id = this.id;
        }
        /**
        * Returns the radius of this circle.
        */
        get r() {
            return this.root.r.baseVal.value;
        }
        /**
        * Sets the value of the radius of this circle.
        */
        set r(value) {
            this.root.r.baseVal.value = value;
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
        * Translates the circle to a new position by changing the x and y attributes.
        */
        translate(x, y) {
            this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
            this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
        }
        /**
        * Returns the fill style of this circle
        */
        get fill() {
            return this.root.style.fill;
        }
        /**
        * Sets the fill style of this circle
        */
        set fill(s) {
            this.root.style.fill = s;
        }
        /**
        * Returns the stroke style of this circle
        */
        get stroke() {
            return this.root.style.stroke;
        }
        /**
        * Sets the stroke style of this circle
        */
        set stroke(s) {
            this.root.style.stroke = s;
        }
    }

    /**
    * A rectangle is a basic element with a position, width, and height. The
    * position refers to the top left corner of the rectangle
    */
    class Rectangle extends Element {
        /**
        * Constructs a rectangle element at the position (x,y)
        */
        constructor(x, y, width, height) {
            super();
            this.root = SVG.Rectangle(x, y, width, height);
            this.root.id = this.id;
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
        /*
        * Translates the position of the rectangle to a new position from its current
        * position. TODO: this is inconsistent with other translate methods within
        * the elements. Probably best to conform to how SVG implements translate with
        * the transform attribute, and then implement a move method or something.
        */
        translate(x, y) {
            this.root.x.baseVal.value = this.root.x.baseVal.value + x;
            this.root.y.baseVal.value = this.root.y.baseVal.value + y;
        }
        /**
        * Returns the fill style of this rectangle
        */
        get fill() {
            return this.root.style.fill;
        }
        /**
        * Sets the fill style of this rectangle
        */
        set fill(s) {
            this.root.style.fill = s;
        }
        /**
        * Returns the stroke style of this rectangle
        */
        get stroke() {
            return this.root.style.stroke;
        }
        /**
        * Sets the stroke style of this rectangle
        */
        set stroke(s) {
            this.root.style.stroke = s;
        }
    }

    /**
    * A control point is a draggable two dimensional point.
    */
    class Control extends Element {
        /**
        * Constructs a control at the position (x,y)
        */
        constructor(x, y) {
            super();
            /**
            * Modifying the transform function allows for the control to be constrained
            * to a path or constrained to the region enclosed in a path.
            */
            this.constrain = function (_oldPosition, newPosition) {
                return newPosition;
            };
            // create the svg components
            this.root = SVG.Group();
            this.point = SVG.Circle(0, 0, Control.pointRadius);
            this.handle = SVG.Circle(0, 0, Control.handleRadius);
            this.root.classList.add('control');
            this.point.classList.add('control-point');
            this.handle.classList.add('control-handle');
            this.root.appendChild(this.point);
            this.root.appendChild(this.handle);
            this.root.id = this.id;
            // initialize instance variables
            this._x = x;
            this._y = y;
            this._dx = 0;
            this._dy = 0;
            // the default behavior of a control is to update its dependents on change
            this.onchange = function () {
                this.updateDependents();
            };
            this.update = () => { };
            // translate the control to its initial position
            this.translate(x, y);
            // register event handlers
            let control = this;
            this.root.onmousedown = function (event) {
                control.handleMouseDown(event);
            };
            this.root.ondblclick = function (event) {
                // do nothing on double click
                event.preventDefault();
            };
            this.handle.onmouseout = function (event) {
                control.handleMouseOut(event);
            };
            // set passive to false so chrome doesn't complain
            this.handle.addEventListener('touchstart', control.handleTouchStart.bind(this), { passive: false });
            // initialize window event listeners only once
            if (!Control.initalized) {
                window.onmouseover = Control.handleMouseOver;
                window.onmousemove = Control.handleMouseMove;
                window.onmouseup = Control.handleInputEnd;
                window.addEventListener('touchend', Control.handleInputEnd, { passive: false });
                window.addEventListener('touchmove', Control.handleTouchMove, { passive: false });
                Control.initalized = true;
            }
        }
        /**
        * Handles when the user moves their mouse over the window. If there is an
        * active control, the control's position is updated.
        */
        static handleMouseMove(event) {
            if (Control.active != null) {
                let x = event.clientX + Control.slopX;
                let y = event.clientY + Control.slopY;
                Control.active.translate(x, y);
            }
        }
        /**
        * Handles a touch move event. If there is an active control, the control's
        * position is updated.
        */
        static handleTouchMove(event) {
            if (Control.active != null) {
                let x = event.touches[0].clientX + Control.slopX;
                let y = event.touches[0].clientY + Control.slopY;
                Control.active.translate(x, y);
                event.preventDefault();
            }
        }
        /**
        * Handles when a use mouses up over the window or ends their touch event.
        */
        static handleInputEnd(event) {
            if (Control.active != null) {
                // remove highlighting from the active control and set to null
                Control.active.handle.classList.remove('highlight');
                Control.active = null;
                // fire a mouseover event to highlight either: an interactive control,
                // the recently active control, or a different element entirely.
                // Currently, whichever element is highest in the DOM order will be the
                // target. In the future the most recently active Control could be
                // prioritized for user experience.
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
            if (Control.active == null && !Element.disable && event.target.tagName == 'circle') {
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
            if (!Element.disable) {
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
            if (!Element.disable) {
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
            this.root.setAttribute('transform', `translate( ${this.x}, ${this.y})`);
            // call the onchange function
            this._onchange();
        }
        /**
        * Updates the x position of the control.
        */
        set x(x) {
            this._dx = x - this.x;
            this._x = x;
            this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
        }
        /**
        * Updates the y position of the control.
        */
        set y(y) {
            this._dy = y - this.y;
            this._y = y;
            this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
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
        constrainTo(element) {
            this.addDependency(element);
            if (element instanceof Path) {
                throw Error('not implemented');
            }
            else if (element instanceof Circle) {
                this.constrain = function (_oldPosition, newPosition) {
                    // Calculate the angle between the current coordinate and the origin
                    let angle = Math.atan2(newPosition.y - element.cy, newPosition.x - element.cx);
                    // Set the controls position to the vector in the direction of the angle
                    // above and with the magnitude of the radius of the circle.
                    let x = element.r * Math.cos(angle) + element.cx;
                    let y = element.r * Math.sin(angle) + element.cy;
                    // Return the new position
                    return { x: x, y: y };
                };
            }
        }
        /**
        * Constrains the control to follow the path of the circle specified by the
        * arguments. TODO: add a method to constrain the control to a path
        */
        constrainToCircle(cx, cy, r) {
            // set the constrain function
            this.constrain = function (_oldPosition, newPosition) {
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
        /**
        * Constrains the control to the box defined by the points (x1, y1) and
        * (x2, y2). The first point defines the top-left corner of the box, the
        * second the bottom-right corner of the box.
        */
        constrainWithinBox(x1, y1, x2, y2) {
            this.constrain = function (_oldPosition, newPosition) {
                let x = newPosition.x;
                let y = newPosition.y;
                if (x < x1) {
                    x = x1;
                }
                if (y < y1) {
                    y = y1;
                }
                if (x > x2) {
                    x = x2;
                }
                if (y > y2) {
                    y = y2;
                }
                return { x: x, y: y };
            };
        }
        /**
        * Constrain this control to only move left and right along its current x
        * position.
        */
        constrainToX() {
            this.constrain = function (oldPosition, newPosition) {
                return { x: newPosition.x, y: oldPosition.y };
            };
        }
        /**
        * Constrain this control to only move up and down along its current y
        * position.
        */
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
    // Keep track of whether global event listeners have been initialized
    Control.initalized = false;

    /**
    * Text is a basic element containing string contents
    */
    class Text extends Element {
        /**
        * Constructs text at the position (x,y) with the provided string
        */
        constructor(x, y, text) {
            super();
            this.root = SVG.Text(x, y, text);
            this.root.id = this.id;
        }
        /**
        * Sets the contents of this element
        */
        set contents(str) {
            this.root.innerHTML = str;
        }
        /**
        * Sets the x position of this element
        */
        set x(value) {
            this.root.setAttribute('x', value.toString());
        }
        /**
        * Sets the y position of this element
        */
        set y(value) {
            this.root.setAttribute('y', value.toString());
        }
    }

    /**
    * A checkbox with an label. The can be checked, unchecked, and related to other
    * elements.
    */
    class CheckBox extends Element {
        /**
        * Constructs a control at the position (x,y)
        */
        constructor(x, y, text, value) {
            super();
            /**
            * The state of the checkbox
            */
            this._value = false;
            this.root = SVG.Group();
            this.root.setAttribute('transform', `translate(${x},${y})`);
            this.root.id = this.id;
            this.box = new Rectangle(-5, -5, 10, 10);
            this.box.root.setAttribute('rx', '2px');
            this.text = new Text(18, 1, text);
            this.text.root.setAttribute('alignment-baseline', 'middle');
            this.root.appendChild(this.box.root);
            this.root.appendChild(this.text.root);
            let temp = this;
            this.value = value;
            this.box.root.onmousedown = function () {
                temp.toggle();
            };
            this.addDependency(this.box);
        }
        /**
        * Sets the value to true and visually checks the box.
        */
        set value(value) {
            if (this._value = value) {
                this.box.root.style.fill = '#0366EE';
            }
            else {
                this.box.root.style.fill = '#f2f2f2';
            }
            this.onchange();
        }
        /**
        * Returns true if the box is checked, false if it is not.
        */
        get value() {
            return this._value;
        }
        /**
        * The default behavior is to update its dependents on change.
        */
        onchange() {
            this.updateDependents();
        }
        /**
        * Converts the current true/false state of the checkbox to a zero or one.
        */
        number() {
            return this.value ? 1 : 0;
        }
        /**
        * Toggles the state of this check box.
        */
        toggle() {
            this.value = !this.value;
        }
    }

    /**
    * A circle is a basic element with a start and end position
    */
    class Line extends Element {
        /**
        * Constructs a line between the points (x1, y1) and (x2, y2)
        */
        constructor(x1, y1, x2, y2) {
            super();
            this.root = SVG.Line(x1, y1, x2, y2);
            this.root.id = this.id;
        }
        /**
        * Returns the x position of the start position
        */
        get x1() {
            return this.root.x1.baseVal.value;
        }
        /**
        * Sets the x position of the start position
        */
        set x1(x1) {
            this.root.x1.baseVal.value = x1;
        }
        /**
        * Returns the y position of the start position
        */
        get y1() {
            return this.root.y1.baseVal.value;
        }
        /**
        * Sets the y position of the start position
        */
        set y1(y1) {
            this.root.y1.baseVal.value = y1;
        }
        /**
        * Returns the x position of the end position
        */
        get x2() {
            return this.root.x2.baseVal.value;
        }
        /**
        * Sets the x position of the end position
        */
        set x2(x2) {
            this.root.x2.baseVal.value = x2;
        }
        /**
        * Returns the y position of the end position
        */
        get y2() {
            return this.root.y2.baseVal.value;
        }
        /**
        * Sets the y position of the end position
        */
        set y2(y2) {
            this.root.y2.baseVal.value = y2;
        }
        /*
        * Translates the position of the line to a new position from its current
        * position. TODO: this is inconsistent with other translate methods within
        * the elements. Probably best to conform to how SVG implements translate with
        * the transform attribute, and then implement a move method or something.
        */
        translate(x, y) {
            this.root.x1.baseVal.value += x;
            this.root.y1.baseVal.value += y;
            this.root.x2.baseVal.value += x;
            this.root.y2.baseVal.value += y;
        }
        /**
        * Returns the fill style of this line
        */
        get fill() {
            return this.root.style.fill;
        }
        /**
        * Sets the fill style of this line
        */
        set fill(s) {
            this.root.style.fill = s;
        }
        /**
        * Returns the stroke style of this line
        */
        get stroke() {
            return this.root.style.stroke;
        }
        /**
        * Sets the stroke style of this line
        */
        set stroke(s) {
            this.root.style.stroke = s;
        }
    }

    /**
    * A horizontal slider is an object that allows for a control to be moved along
    * a user- defined range. The slider has a minimum value and a maximum value
    * which default to the range [0, 100].
    */
    class Slider extends Element {
        /**
        * Constructs the slider at the position (x,y). The leftmost edge of the line
        * is placed at this location.
        */
        constructor(x, y, width = 100, value = 0) {
            super();
            this.root = SVG.Group();
            this.line = new Line(x, y, x + width, y);
            this.control = new Control(x + value, y);
            this.control.constrainWithinBox(x, y, x + width, y);
            this.root.appendChild(this.line.root);
            this.root.appendChild(this.control.root);
            this.root.id = this.id;
            this.update = () => { };
            this.addDependency(this.control);
            this.width = width;
            this.min = 0;
            this.max = 100;
            this.value = value;
        }
        /**
        * Returns the width of the display line
        */
        get width() {
            return this.line.x2 - this.line.x1;
        }
        /**
        * Sets the width of the display line
        */
        set width(value) {
            this.line.x2 = this.line.x1 + value;
        }
        /**
        * Returns the value currently represented by this slider.
        */
        get value() {
            return (this.control.x - this.line.x1) / this.width * (this.range);
        }
        /**
        * Sets the value currently represented by this slider.
        */
        set value(n) {
            this.control.x = this.line.x1 + n / this.range * (this.width);
        }
        /**
        * Returns the minimum possible value of the range.
        */
        get min() {
            return this._min;
        }
        /**
        * Sets the minimum possible value of the range.
        */
        set min(value) {
            this._min = value;
        }
        /**
        * Returns the maximum possible value of the range.
        */
        get max() {
            return this._max;
        }
        /**
        * Returns the maximum possible value of the range.
        */
        set max(value) {
            this._max = value;
        }
        /**
        * Returns the length of the range represented by this slider.
        */
        get range() {
            return this.max - this.min;
        }
    }

    /**
    * An ellipse is a basic element with a position, x-radius, and y-radius
    */
    class Ellipse extends Element {
        /**
        * Constructs a ellipse element at the position (x,y)
        */
        constructor(cx, cy, rx, ry) {
            super();
            this.root = SVG.Ellipse(cx, cy, rx, ry);
            this.root.classList.add('default');
            this.root.id = this.id;
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
        /**
        * Translates the ellipse to a new position by changing the x and y attributes.
        */
        translate(x, y) {
            this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
            this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
        }
        /**
        * Returns the fill style of this ellipse
        */
        get fill() {
            return this.root.style.fill;
        }
        /**
        * Sets the fill style of this ellipse
        */
        set fill(s) {
            this.root.style.fill = s;
        }
        /**
        * Returns the stroke style of this ellipse
        */
        get stroke() {
            return this.root.style.stroke;
        }
        /**
        * Sets the stroke style of this ellipse
        */
        set stroke(s) {
            this.root.style.stroke = s;
        }
    }

    // A first pass implementation of a control circle. In the future, it seems to
    // make sense for basic elements to be draggable. I think this would mean
    // making a draggable interface or class that contains window event handlers.
    // Another alternative would be moving some of that logic into the controller or
    // interactive wrapper class.
    class ControlCircle extends Control {
        /**
        * Constructs a control at the position (x,y)
        */
        constructor(x, y) {
            super(x, y);
            this.point.r.baseVal.value = ControlCircle.circleRadius;
            this.handle.r.baseVal.value = ControlCircle.circleRadius + .8;
            // this.point.style.fill = 'lightblue';
            this.point.style.fill = this.handle.style.stroke;
        }
    }
    // Describes the size of the control handle and point
    ControlCircle.circleRadius = 10;

    /**
    *
    */
    class Graph extends Element {
        /**
        * Constructs a new graph capable of displaying a function in the form of
        * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
        * explore the shape and form of the function.
        */
        constructor(userEvents = true) {
            super();
            // default values
            this._width = 600;
            this._height = 300;
            this._originX = this.width / 2;
            this._originY = this.height / 2;
            this._scaleX = 1;
            this._scaleY = 1;
            this.active = false;
            // creates a transparent rectangle to capture all user events
            this.rect = SVG.Rectangle(0, 0, this.width, this.height);
            this.rect.style.fill = 'transparent';
            this.rect.style.stroke = 'none';
            // TODO: change to axis with tick marks and number labels
            // draw two lines to represent the x-axis and y-axis
            this.xAxis = SVG.Line(-10000, 0, 10000, 0);
            this.yAxis = SVG.Line(0, -10000, 0, 10000);
            // create a path to draw the internal function
            this.path = SVG.Path('');
            this.path.classList.add('default');
            // a group to hold the path and axis, allows easy transforming of the origin
            this.group = SVG.Group();
            this.group.appendChild(this.path);
            this.group.appendChild(this.xAxis);
            this.group.appendChild(this.yAxis);
            // create a root element to hold everything
            this.root = SVG.Group();
            this.root.appendChild(this.rect);
            this.root.appendChild(this.group);
            this.root.id = this.id;
            // translate the origin to its initial position
            this.translate(this.originX, this.originY);
            // Registers event listeners
            if (userEvents) {
                // create a display circle for showing input and output
                this.circle = SVG.Circle(0, 0, 4);
                this.circle.style.fill = 'cornflowerblue';
                this.group.appendChild(this.circle);
                this.xRect = new Rectangle(0, 0, 125, 40);
                this.yRect = new Rectangle(120, 0, 125, 40);
                this.xRect.root.style.fill = 'white';
                this.yRect.root.style.fill = 'white';
                this.root.appendChild(this.xRect.root);
                this.root.appendChild(this.yRect.root);
                this.x = new Text(15, 20, 'x:0');
                this.x.root.style.dominantBaseline = 'middle';
                this.x.root.style.whiteSpace = 'pre';
                this.root.appendChild(this.x.root);
                this.y = new Text(125 + 15, 20, 'y:0');
                this.y.root.style.dominantBaseline = 'middle';
                this.y.root.style.whiteSpace = 'pre';
                this.root.appendChild(this.y.root);
                let graph = this;
                this.root.addEventListener('mousemove', function (event) {
                    graph.handleMouseMove(event);
                });
                this.root.addEventListener('mousedown', function (event) {
                    graph.handleMouseDown(event);
                });
                this.root.addEventListener('mouseup', function (event) {
                    graph.handleMouseUp(event);
                });
                this.root.addEventListener('mouseleave', function (event) {
                    graph.handleMouseLeave(event);
                });
                this.root.addEventListener('mousewheel', function (event) {
                    graph.handleMouseWheelEvent(event);
                }, { passive: false });
            }
        }
        /**
        * Returns the width of this graph
        */
        get width() {
            return this._width;
        }
        /**
        * Returns the height of this graph
        */
        get height() {
            return this._height;
        }
        /**
        * Returns the minimum x value of the view box of this graph relative to the
        * origin.
        */
        get minX() {
            return -this._originX;
        }
        /**
        * Returns the minimum y value of the view box of this graph relative to the
        * origin.
        */
        get minY() {
            return -this._originY;
        }
        /**
        * Returns the x coordinate of the origin of this graph.
        */
        get originX() {
            return this._originX;
        }
        /**
        * Sets the x coordinate of the origin of this graph.
        */
        set originX(x) {
            this.translate(x, this._originY);
        }
        /**
        * Returns the y coordinate of the origin of this graph.
        */
        get originY() {
            return this._originY;
        }
        /**
        * Sets the y coordinate of the origin of this graph.
        */
        set originY(y) {
            this.translate(this._originX, y);
        }
        /**
        * Sets the internal function to the provided function
        */
        set function(f) {
            this._function = f;
        }
        /**
        * Returns the result of calling the internal function with the provided
        * function scaling both the input and the output.
        */
        call(input, scaleY = true) {
            let x = this._scaleX * (input);
            let y = (scaleY ? -this._scaleY : 1) * (this._function(x));
            return y;
        }
        /**
        * Draws the internal function over the interval [startX, endX]. The default
        * interval is [ minX - width, maxX + width ] so that when a user drags the
        * graph there is enough drawn so that a translate may be applied instead of
        * having to call draw again.
        */
        draw(startX = this.minX - this.width, endX = this.minX + 2 * this.width) {
            // Draw the function
            let x = startX;
            let y = this.call(x);
            if (y > 2 * this.height) {
                y = 2 * this.height;
            }
            if (y < -2 * this.height) {
                y = -2 * this.height;
            }
            let d = `M ${x} ${y} `;
            // TODO: remove vertical asymptote's by starting jumping to a new spot...
            // L ... L ... M ... L ... L ...
            for (x++; x < endX; x++) {
                y = this.call(x);
                if (y > 2 * this.height) {
                    y = 2 * this.height;
                }
                if (y < -2 * this.height) {
                    y = -2 * this.height;
                }
                d += `L ${x} ${y.toFixed(1)} `;
            }
            this.path.setAttribute('d', d);
        }
        /**
        * Formats the input number to be displayed within the graph.
        */
        format(n) {
            if (n > 10000 || n < -10000 || (n < .01 && n > -.01)) {
                return n.toExponential(2);
            }
            else {
                return n.toPrecision(4);
            }
        }
        /**
        * Handle when a mouse moves over this graph. If a drag event is active then
        * translates the position of the graph to the new location.
        */
        handleMouseMove(event) {
            let x = event.clientX - this.rect.getBoundingClientRect().left - this.originX;
            if (this.active) {
                this._originX += event.movementX;
                this._originY += event.movementY;
                this.translate(this._originX, this._originY);
            }
            else {
                this.circle.cx.baseVal.value = x;
                this.circle.cy.baseVal.value = this.call(x);
            }
            let i = this._scaleX * (x);
            let o = this.call(x, false);
            this.x.contents = `x:${i < 0 ? '' : ' '}${this.format(i)}`;
            this.y.contents = `y:${o < 0 ? '' : ' '}${this.format(o)}`;
        }
        /**
        * When a user mouses down over this graph a drag is active.
        */
        handleMouseDown(_event) {
            this.active = true;
        }
        /**
        * Deactivates the current drag event.
        */
        handleMouseUp(_event) {
            this.active = false;
            this.draw();
        }
        /**
        * When the user's mouse leaves the graph deactivates any concurrent drag.
        */
        handleMouseLeave(event) {
            this.handleMouseUp(event);
        }
        /**
        * Zooms in and out on this graph. TODO: There is some jarring wheel action
        * where an active wheel event on the page will stop dead when the mouse
        * goes over the graph. Also it seems as if the scroll has pre-existing
        * "momentum" that it can also affect the graph.
        */
        handleMouseWheelEvent(event) {
            let ratio = .95;
            if (event.deltaY > 0) {
                this.scale(ratio, 1 / ratio);
            }
            else {
                this.scale(1 / ratio, ratio);
            }
            this.draw();
            this.circle.cy.baseVal.value = this.call(this.circle.cx.baseVal.value);
            event.preventDefault();
        }
        /**
        * Scales the x and y axis of this graph.
        */
        scale(x, y) {
            this._scaleX *= x;
            this._scaleY *= y;
            this.draw();
        }
        /**
        * Scales the x axis of this graph.
        */
        set scaleX(x) {
            this._scaleX *= x;
            this.draw();
        }
        /**
        * Scales the y axis of this graph.
        */
        set scaleY(y) {
            this._scaleY *= y;
            this.draw();
        }
        /**
        * Translates the origin of this graph to the location (x,y).
        */
        translate(x, y) {
            this._originX = x;
            this._originY = y;
            this.group.setAttribute('transform', `translate(${x}, ${y})`);
        }
    }

    /**
    * This class exposes the high level functionality of our library. Elements can
    * created and related together.
    */
    class Interactive {
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
            // create and append the root svg element and group elements
            this.svg = this.root.appendChild(SVG.SVG());
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
            return this.minX + this._width;
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

    /**
    * This file exposes the functionality of this library in one place. It exports
    * modules and defines a global variable for non-module use (This maybe should
    * get moved to another file).
    */
    // add interactive object to global variables
    window.Interactive = Interactive;

    exports.CheckBox = CheckBox;
    exports.Control = Control;
    exports.Element = Element;
    exports.Ellipse = Ellipse;
    exports.Interactive = Interactive;
    exports.Line = Line;
    exports.Path = Path;
    exports.Rectangle = Rectangle;
    exports.SVG = SVG;
    exports.Slider = Slider;
    exports.Text = Text;

    return exports;

}({}));
