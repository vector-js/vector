var Library = (function (exports) {
    'use strict';

    /**
    * This wrapper class provides static methods for creating SVG Elements. As it is
    * elements are creating and appending into the current SVG document.
    */
    class SVG {
        /**
        * Constructs a
        */
        static SVG(id, width = 600, height = 300) {
            // create the svg element
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', width.toString());
            svg.setAttribute('height', height.toString());
            return svg;
        }
        /**
        * Constructs a text element at the position (x,y) with the provided string.
        */
        static Text(x, y, str) {
            // create the text element
            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x.toString());
            text.setAttribute('y', y.toString());
            text.innerHTML = str;
            return text;
        }
        /**
        * Constructs a rectangle with the provided attributes.
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
        * Constructs an ellipse with the provided attributes.
        */
        static Ellipse(cx, cy, rx, ry) {
            // constructs and initializes the ellipse
            let ell = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            ell.setAttribute('cx', cx.toString());
            ell.setAttribute('cy', cy.toString());
            ell.setAttribute('rx', rx.toString());
            ell.setAttribute('ry', ry.toString());
            ell.classList.add('default');
            return ell;
        }
        /**
        * Constructs a line element with the provided attributes.
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
        * Constructs a circle element with the provided attributes.
        */
        static Circle(cx, cy, radius, classes = ['default']) {
            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.cx.baseVal.value = cx;
            circle.cy.baseVal.value = cy;
            circle.r.baseVal.value = radius;
            circle.classList.add(...classes);
            return circle;
        }
        /**
        * Constructs a group element with the provided attributes.
        */
        static Group(classes = []) {
            // create element and assign unique id
            let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add(...classes);
            return group;
        }
        /**
        * Constructs a path element with the provided attributes.
        */
        static Path(d, classes = ['default']) {
            // create element and assign unique id
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            path.classList.add(...classes);
            return path;
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
    * Controls the interactions between user input and visual changes to the
    * interactive
    */
    class Controller {
        /**
        * Constructs a interactive.controller
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
    * Represents an element that lives within the ecosystem of our interactives.
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
        * Adds a dependency on the other element.
        */
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
    Element.controller = new Controller();
    /**
    * This number uniquely identifes elements
    */
    Element.count = 0;

    /**
    * A control is a draggable two dimensional point.
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
            this.constrain = function (oldPosition, newPosition) {
                return newPosition;
            };
            // create the svg components
            this.root = SVG.Group(['control']);
            this.point = SVG.Circle(0, 0, Control.pointRadius, ['control-point']);
            this.handle = SVG.Circle(0, 0, Control.handleRadius, ['control-handle']);
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
            // translate the control to its initial position
            this.translate(x, y);
            // register event handlers
            let control = this;
            this.root.onmousedown = function (event) {
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
                // fire a mouseover event to highlight either: a interactive.control, the recently
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
            if (Control.active == null && !Element.disable) {
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
            this.root.setAttribute('transform', 'translate( ' + this.x + ', ' + this.y + ')');
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
        constrainToBox(x1, y1, x2, y2) {
            this.constrain = function (oldPosition, newPosition) {
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

    class Ellipse extends Element {
        /**
        * Constructs a rectangle element at the position (x,y)
        */
        constructor(cx, cy, rx, ry) {
            super();
            this.root = SVG.Ellipse(cx, cy, rx, ry);
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

    class Line extends Element {
        constructor(x1, y1, x2, y2) {
            super();
            this.root = SVG.Line(x1, y1, x2, y2);
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

    /**
    *
    */
    class Path extends Element {
        /**
        *
        */
        constructor(d) {
            super();
            this.root = SVG.Path(d);
            this.root.id = this.id;
        }
        extend(command) {
        }
        getPath(d) {
            return null;
        }
        set d(d) {
            this.root.setAttribute('d', d);
        }
        get d() {
            return this.root.getAttribute('d');
        }
    }

    class Rectangle extends Element {
        /**
        * Constructs a rectangle element at the position (x,y)
        */
        constructor(x, y, width, height) {
            super();
            this.root = SVG.Rectangle(x, y, width, height);
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

    /**
    *
    */
    class Text extends Element {
        /**
        *
        */
        constructor(x, y, text) {
            super();
            this.root = SVG.Text(x, y, text);
            this.root.id = this.id;
        }
        set contents(str) {
            this.root.innerHTML = str;
        }
        set x(value) {
            this.root.setAttribute('x', value.toString());
        }
        set y(value) {
            this.root.setAttribute('y', value.toString());
        }
    }

    class Circle extends Element {
        /**
        * Constructs a rectangle element at the position (x,y)
        */
        constructor(cx, cy, r) {
            super();
            this.root = SVG.Circle(cx, cy, r);
            this.root.id = this.id;
        }
        /**
        * Sets the value of the radius of this circle.
        */
        set r(value) {
            this.root.r.baseVal.value = value;
        }
        /**
        * Returns the radius of this circle.
        */
        get r() {
            return this.root.r.baseVal.value;
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
        translate(x, y) {
            this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
            this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
        }
    }

    class Slider extends Element {
        /**
        * Constructs a control at the position (x,y)
        */
        constructor(x, y, width = 100, value = 0) {
            super();
            this.root = SVG.Group();
            this.line = new Line(x, y, x + width, y);
            this.control = new Control(x + value, y);
            this.control.constrainToBox(x, y, x + width, y);
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
        set width(value) {
            this.line.x2 = this.line.x1 + value;
        }
        get width() {
            return this.line.x2 - this.line.x1;
        }
        set value(n) {
            this.control.x = this.line.x1 + n / this.range * (this.width);
        }
        get value() {
            return (this.control.x - this.line.x1) / this.width * (this.range);
        }
        set min(value) {
            this._min = value;
        }
        get min() {
            return this._min;
        }
        set max(value) {
            this._max = value;
        }
        get max() {
            return this._max;
        }
        get range() {
            return this.max - this.min;
        }
    }

    class CheckBox extends Element {
        /**
        * Constructs a control at the position (x,y)
        */
        constructor(x, y, label, value) {
            super();
            this.value = false;
            this.root = SVG.Group();
            this.root.setAttribute('transform', `translate(${x},${y})`);
            this.box = new Rectangle(-5, -5, 10, 10);
            this.label = new Text(18, 1, label);
            this.label.root.setAttribute('alignment-baseline', 'middle');
            this.root.appendChild(this.box.root);
            this.root.appendChild(this.label.root);
            this.root.id = this.id;
            this.onchange = function () {
                this.updateDependents();
            };
            let temp = this;
            if (value) {
                this.box.root.style.fill = '#0366EE';
            }
            else {
                this.box.root.style.fill = 'white';
            }
            this.box.root.onmousedown = function () {
                temp.toggle();
            };
            this.addDependency(this.box);
        }
        onchange() {
            this.updateDependents();
        }
        /**
        * Converts the current true/false state of the checkbox to a zero or one.
        */
        number() {
            return this.value ? 1 : 0;
        }
        toggle() {
            if (this.value) {
                this.box.root.style.fill = 'white';
                this.value = false;
            }
            else {
                this.box.root.style.fill = '#0366EE';
                this.value = true;
            }
            this.onchange();
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

    /**
    * This file exposes the objects and functionality of our library in one place
    * allowing for backward (non-module) compatability using a tool such as rollup
    * or webpack.
    */
    // Add interactive object to global variables
    window.Interactive = Interactive;

    exports.Control = Control;
    exports.Element = Element;
    exports.Ellipse = Ellipse;
    exports.Interactive = Interactive;
    exports.Line = Line;
    exports.Path = Path;
    exports.Rectangle = Rectangle;
    exports.SVG = SVG;
    exports.Text = Text;

    return exports;

}({}));
