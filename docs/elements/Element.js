import Controller from '../Controller.js';
/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
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
    * Clears the static data structures holding elements and resets the count.
    */
    static clear(disable = false) {
        Element.count = 0;
        Element.controller.clear();
        Element.disable = disable;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbGVtZW50cy9FbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLGtCQUFrQixDQUFDO0FBRTFDOzs7O0VBSUU7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLE9BQU87SUFzQzFCOztNQUVFO0lBQ0Y7UUFFRSxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBRXpELHFDQUFxQztRQUNyQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNLENBQUMsS0FBSyxDQUFFLE9BQU8sR0FBRyxLQUFLO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxFQUFFO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7TUFFRTtJQUNGLGFBQWEsQ0FBRSxHQUFJLFFBQW1CO1FBQ3BDLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDO0lBRUQ7O01BRUU7SUFDRixnQkFBZ0I7UUFDZCxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOztBQTlFRDs7RUFFRTtBQUNLLGVBQU8sR0FBYSxLQUFLLENBQUM7QUFFakM7OztFQUdFO0FBQ0ssa0JBQVUsR0FBZ0IsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUVsRDs7RUFFRTtBQUNLLGFBQUssR0FBWSxDQUFDLENBQUMifQ==