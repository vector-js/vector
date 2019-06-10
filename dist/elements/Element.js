import Controller from '../Controller.js';
/**
* Represents an element that lives within the ecosystem of our interactives.
*/
export default class Element {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL0VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFFMUM7O0VBRUU7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLE9BQU87SUFnQzFCOztNQUVFO0lBQ0Y7UUFFRSxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBRXpELHFDQUFxQztRQUNyQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUvQixDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsYUFBYSxDQUFFLE9BQWdCO1FBQzdCLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOztNQUVFO0lBQ0YsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7QUE5REQ7O0VBRUU7QUFDSyxlQUFPLEdBQWEsS0FBSyxDQUFDO0FBRWpDOztFQUVFO0FBQ0ssa0JBQVUsR0FBZ0IsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUVsRDs7RUFFRTtBQUNLLGFBQUssR0FBWSxDQUFDLENBQUMifQ==