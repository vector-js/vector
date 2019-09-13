import SVG from "../shapes/svg";
/**
* This controller handles the user input for selecting elements: shapes and points.
* Selected elements can be manipulated and moved.
* @author Kurt
* @date March 7, 2019
*/
export default class SelectController {
    constructor(controller) {
        /**
        * This rectangle is used to illustrate the current selection. By default it is hidden
        * within the drawing area, until a user clicks where it is updated.
        */
        this.rectangle = document.getElementById('selection-rectangle');
        this.selectionRect = document.getElementById('active-selection-rectangle');
        /**
        * The drawing area is the container where all drawing is done.
        */
        this.drawingArea = document.getElementById('drawing-area');
        /**
        * Keeps track of whether a selection is in progress.
        */
        this.select = false;
        /**
        * Indicates the type of selection. If true, points are selected instead of shapes.
        */
        this.point = false;
        // These points keep track of the current selection rectangle.
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        //Keeps track of where you started when you go to drag an element.
        this.currentXOnMovement = 0;
        this.currentYOnMovement = 0;
        this.originalPointX = 0;
        this.originalPointY = 0;
        this.view = controller.view;
        this.controller = controller;
        this.movingElements = false;
        this.elementsSelected = false;
    }
    /**
    * This updates the current selection rectangle.
    */
    updateRectangle() {
        // Normalize the rectangle
        let x1 = Math.min(this.x1, this.x2);
        let x2 = Math.max(this.x1, this.x2);
        let y1 = Math.min(this.y1, this.y2);
        let y2 = Math.max(this.y1, this.y2);
        // Constrain the selection to the drawing area
        let rect = this.drawingArea.getBoundingClientRect();
        if (x1 < rect.left) {
            x1 = rect.left;
        }
        if (x2 > rect.right) {
            x2 = rect.right;
        }
        if (y1 < rect.top) {
            y1 = rect.top;
        }
        if (y2 > rect.bottom) {
            y2 = rect.bottom;
        }
        // Update the selection box style
        this.rectangle.style.left = x1 + 'px';
        this.rectangle.style.top = y1 + 'px';
        this.rectangle.style.width = x2 - x1 + 'px';
        this.rectangle.style.height = y2 - y1 + 'px';
    }
    /**
    * Handles the mouse down event over the drawing area.
    */
    handleMouseDown(event) {
        let svg = document.querySelector("#svg");
        let boundingRect = svg.getBoundingClientRect();
        let children = svg.children;
        let itemFound = false;
        if (this.controller.selectedList.length < 2) {
            for (let i = children.length - 1; i >= 0; i--) {
                let element = children[i];
                // Ignore group elements for now
                if (element.tagName == 'g') {
                    continue;
                }
                let point = svg.createSVGPoint();
                point.y = event.y - boundingRect.top;
                point.x = event.x - boundingRect.left;
                if (element.isPointInFill(point)) {
                    this.deselectElements();
                    this.controller.selectedList.push(element);
                    element.classList.add('highlight');
                    itemFound = true;
                    this.movingElements = true;
                    this.currentXOnMovement = event.x;
                    this.currentYOnMovement = event.y;
                    this.originalPointX = event.x;
                    this.originalPointY = event.y;
                    this.select = true;
                    break;
                }
            }
        }
        // Show the and update the selection rectangle
        if (!itemFound && this.elementsSelected && this.rectangleContainsPoint(this.selectionRect.getBoundingClientRect(), new DOMPoint(event.x, event.y))) {
            this.movingElements = true;
            this.currentXOnMovement = event.x;
            this.currentYOnMovement = event.y;
            this.originalPointX = event.x;
            this.originalPointY = event.y;
            this.select = true;
        }
        else if (!itemFound) {
            this.rectangle.hidden = false;
            this.x1 = event.clientX;
            this.y1 = event.clientY;
            this.x2 = event.clientX;
            this.y2 = event.clientY;
            this.updateRectangle();
            this.select = true;
        }
    }
    /**
    * Handles the mouse up event over the document.
    */
    handleMouseUp(event) {
        //Cant be moving anymore, set to false
        // this.movingElements = false;
        //
        // for (let i = 0; i < this.controller.selectedList.length; i++)
        // {
        //   this.controller.selectedList[i].classList.remove('highlight');
        // }
        //Clear the list when a new selection is being made. Change this to allow for shift clicking.
        if (!this.select) {
            return;
        }
        if (!this.movingElements) {
            //ensure anything previously selected is no longer highlighted and removed from list
            this.deselectElements();
            //TODO: Use views SVG
            let svg = document.querySelector("#svg");
            let boundingRect = svg.getBoundingClientRect();
            let children = svg.children;
            // TODO: loop over the children and get the Element correspoding to this unique id?
            // So like have another list of selected. Yeah that's fine, or link them together with a unique string,
            // so you can go from one to the other... you can always get the root svg element from the "Element".
            // then you could go the other way too, through the "Controller" in the Element class
            // Loop over all svgs on screen and see if they were just selected. if they were, add em.
            // TODO: change to deep traversal of SVG tree
            for (let i = 0; i < children.length; i++) {
                let element = children[i];
                // Ignore group elements for now
                if (element.tagName == 'g') {
                    continue;
                }
                let point = svg.createSVGPoint();
                point.y = this.y1 - boundingRect.top;
                point.x = this.x1 - boundingRect.left;
                if (element.isPointInFill(point)) {
                    this.controller.selectedList.push(element);
                    element.classList.add('highlight');
                    continue;
                }
                for (let y = 0; y < element.getTotalLength(); y += 5) {
                    let point2 = element.getPointAtLength(y);
                    point2.y += boundingRect.top;
                    point2.x += boundingRect.left;
                    let outerRect = this.rectangle.getBoundingClientRect();
                    if (this.rectangleContainsPoint(outerRect, point2)) {
                        this.controller.selectedList.push(element);
                        element.classList.add('highlight');
                        break;
                    }
                }
            }
        }
        else {
            let range = 0;
            for (let i = this.controller.editor.editor.session.getLength() - 1; i >= 0; i++) {
                if (this.controller.editor.editor.session.getRowLength(i) != 0) {
                    range = i + 1;
                    break;
                }
            }
            this.updateNames();
            for (let i = 0; i < this.controller.selectedList.length; i++) {
                this.controller.editor.editor.session.insert({ row: range + i, column: 0 }, this.stringify(this.controller.selectedList[i]));
            }
        }
        this.movingElements = false;
        this.createSelectionRect();
        this.select = false;
        this.rectangle.hidden = true;
        if (this.elementsSelected) {
            this.controller.handleStylingSelectedElements();
        }
        this.controller.view.selecting = this.elementsSelected;
        if (this.controller.selectedList.length == 0) {
            this.controller.clearViewSelection();
        }
    }
    deselectElements() {
        for (let i = 0; i < this.controller.selectedList.length; i++) {
            this.controller.selectedList[i].classList.remove('highlight');
        }
        this.elementsSelected = false;
        this.view.hideSelectionRect();
        this.controller.selectedList = [];
    }
    createSelectionRect() {
        let elementListSelected = this.controller.selectedList;
        //if an element got selected
        if (elementListSelected.length > 0) {
            let currRect = elementListSelected[0].getBoundingClientRect();
            let top = currRect.top;
            let left = currRect.left;
            let right = currRect.right;
            let bottom = currRect.bottom;
            for (let i = 1; i < elementListSelected.length; i++) {
                currRect = elementListSelected[i].getBoundingClientRect();
                elementListSelected[i].classList.add('highlight');
                if (currRect.right > right) {
                    right = currRect.right;
                }
                if (currRect.left < left) {
                    left = currRect.left;
                }
                if (currRect.bottom > bottom) {
                    bottom = currRect.bottom;
                }
                if (currRect.top < top) {
                    top = currRect.top;
                }
            }
            this.selectionRect.style.left = left - 2 + 'px';
            this.selectionRect.style.top = top - 2 + 'px';
            this.selectionRect.style.width = right - left + 'px';
            this.selectionRect.style.height = bottom - top + 'px';
            this.selectionRect.hidden = false;
            this.elementsSelected = true;
        }
        //if no element got selected
        else {
            this.elementsSelected = false;
            this.selectionRect.hidden = true;
        }
    }
    /**
    * Handles the mouse move event over the document.
    */
    handleMouseMove(event) {
        if (this.movingElements) {
            let changeInX = event.x - this.currentXOnMovement;
            let changeInY = event.y - this.currentYOnMovement;
            //move all elements by how much has been moved from the event
            for (let i = 0; i < this.controller.selectedList.length; i++) {
                let element = this.controller.selectedList[i];
                if (element instanceof SVGEllipseElement) {
                    element.setAttribute('cx', (element.cx.baseVal.value + changeInX).toString());
                    element.setAttribute('cy', (element.cy.baseVal.value + changeInY).toString());
                }
                else if (element instanceof SVGRectElement) {
                    element.setAttribute('x', (element.x.baseVal.value + changeInX).toString());
                    element.setAttribute('y', (element.y.baseVal.value + changeInY).toString());
                }
                else if (element instanceof SVGLineElement) {
                    element.setAttribute('x1', (element.x1.baseVal.value + changeInX).toString());
                    element.setAttribute('y1', (element.y1.baseVal.value + changeInY).toString());
                    element.setAttribute('x2', (element.x2.baseVal.value + changeInX).toString());
                    element.setAttribute('y2', (element.y2.baseVal.value + changeInY).toString());
                }
            }
            this.currentXOnMovement = event.x;
            this.currentYOnMovement = event.y;
            this.createSelectionRect();
        }
        // If there is a current selection update the display rectangle
        else if (this.select) {
            this.x2 = event.clientX;
            this.y2 = event.clientY;
            this.updateRectangle();
        }
    }
    rectangleContainsPoint(rect, point) {
        return point.x < rect.right && point.x > rect.left && point.y < rect.bottom && point.y > rect.top;
    }
    stringify(currSelected) {
        if ((this.currentXOnMovement - this.originalPointX) != 0 || (this.currentYOnMovement - this.originalPointY) != 0) {
            return "" + currSelected.id + ".translate(" +
                (this.currentXOnMovement - this.originalPointX) + ", " +
                (this.currentYOnMovement - this.originalPointY) + ");\n";
        }
        else {
            return "";
        }
    }
    updateNames() {
        for (let i = 0; i < this.controller.selectedList.length; i++) {
            if (!(SVG.containsName(this.controller.selectedList[i].id))) {
                this.controller.selectedList[i].setAttribute('id', SVG.getNameAt(parseInt(this.controller.selectedList[i].getAttribute("customCount"))).toString());
            }
        }
    }
    updateNamesUniqueList(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (!(SVG.containsName(arr[i].id))) {
                arr[i].setAttribute('id', SVG.getNameAt(parseInt(arr[i].getAttribute("customCount"))).toString());
            }
        }
    }
    handleMouseClick(event) {
        // let svg = document.querySelector("#svg") as SVGSVGElement;
        // let boundingRect = svg.getBoundingClientRect();
        // let children = svg.children;
        //
        // for(let i = 0; i < children.length; i++)
        // {
        //   let element = children[i] as SVGGeometryElement;
        //
        //   let point = svg.createSVGPoint();
        //   point.y = event.clientY - boundingRect.top;
        //   point.x = event.clientX - boundingRect.left;
        //
        //   if(element.isPointInFill(point))
        //   {
        //     console.log(element);
        //     element.style.fill = 'purple';
        //   }
        // }
    }
}
//# sourceMappingURL=select.js.map