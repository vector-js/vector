import DependencyGraph from './model/DependencyGraph.js';
/**
* This controller manages the dependencies between elements.
*/
export default class Controller {
    /**
    * Constructs a controller
    */
    constructor() {
        this.dependencyGraph = new DependencyGraph();
        this.elements = new Map();
    }
    /**
    * Clears all the elements from this controller.
    */
    clear() {
        this.dependencyGraph = new DependencyGraph(); // TODO: implement clear method
        this.elements.clear();
    }
    /**
    * Adds an element to this controller.
    */
    add(element) {
        this.dependencyGraph.add(element);
        this.elements.set(element.id, element);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLDRCQUE0QixDQUFDO0FBR3pEOztFQUVFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVO0lBWTdCOztNQUVFO0lBQ0Y7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFXLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBbUIsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O01BRUU7SUFDRixLQUFLO1FBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBVyxDQUFDLENBQUMsK0JBQStCO1FBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsR0FBRyxDQUFFLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztNQUVFO0lBQ0YsR0FBRyxDQUFFLEVBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU0sQ0FBRSxPQUFnQjtRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBRSxPQUFPLENBQUMsQ0FBQztRQUN4RCxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNsQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDWjtJQUNILENBQUM7Q0FDRiJ9