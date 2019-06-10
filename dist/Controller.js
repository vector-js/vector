import DependencyGraph from './model/DependencyGraph.js';
/**
* Controls the interactions between user input and visual changes to the
* interactive
*/
export default class Controller {
    /**
    * Constructs a new Controller
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbIkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxlQUFlLE1BQU0sNEJBQTRCLENBQUM7QUFHekQ7OztFQUdFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVO0lBWTdCOztNQUVFO0lBQ0Y7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFXLENBQUM7SUFDeEQsQ0FBQztJQUVEOztNQUVFO0lBQ0YsR0FBRyxDQUFFLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7TUFFRTtJQUNGLEdBQUcsQ0FBRSxFQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNLENBQUUsT0FBZ0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEQsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDbEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ1o7SUFDSCxDQUFDO0NBRUYifQ==