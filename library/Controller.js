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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbIkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxlQUFlLE1BQU0sNEJBQTRCLENBQUM7QUFHekQ7OztFQUdFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVO0lBWTdCOztNQUVFO0lBQ0Y7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFXLENBQUM7SUFDeEQsQ0FBQztJQUVEOztNQUVFO0lBQ0YsR0FBRyxDQUFFLE9BQWdCO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7TUFFRTtJQUNGLEdBQUcsQ0FBRSxFQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNLENBQUUsT0FBZ0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEQsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDbEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ1o7SUFDSCxDQUFDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVwZW5kZW5jeUdyYXBoIGZyb20gJy4vbW9kZWwvRGVwZW5kZW5jeUdyYXBoLmpzJztcbmltcG9ydCBFbGVtZW50IGZyb20gJy4vZWxlbWVudHMvRWxlbWVudC5qcyc7XG5cbi8qKlxuKiBDb250cm9scyB0aGUgaW50ZXJhY3Rpb25zIGJldHdlZW4gdXNlciBpbnB1dCBhbmQgdmlzdWFsIGNoYW5nZXMgdG8gdGhlXG4qIGludGVyYWN0aXZlXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG5cbiAgLyoqXG4gICogQ29udGFpbnMgYSBtYXAgb2YgdW5pcXVlIGlkZW50aWZpZXJzIHRvIGVsZW1lbnRzXG4gICovXG4gIGVsZW1lbnRzIDogTWFwPHN0cmluZywgRWxlbWVudD47XG5cbiAgLyoqXG4gICogQ29udGFpbnMgdGhlIGRlcGVuZGVjaWVzIGJldHdlZW4gZWxlbWVudHNcbiAgKi9cbiAgZGVwZW5kZW5jeUdyYXBoIDogRGVwZW5kZW5jeUdyYXBoPEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAqIENvbnN0cnVjdHMgYSBuZXcgQ29udHJvbGxlclxuICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRlcGVuZGVuY3lHcmFwaCA9IG5ldyBEZXBlbmRlbmN5R3JhcGg8RWxlbWVudD4oKTtcbiAgfVxuXG4gIC8qKlxuICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGNvbnRyb2xsZXIuXG4gICovXG4gIGFkZCggZWxlbWVudDogRWxlbWVudCApIHtcbiAgICB0aGlzLmRlcGVuZGVuY3lHcmFwaC5hZGQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHVuaXF1ZSBzdHJpbmcgaWRlbnRpZmllclxuICAqL1xuICBnZXQoIGlkOnN0cmluZyApIDogRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuZ2V0KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAqIFVwZGF0ZXMgdGhpcyBlbGVtZW50IGFuZCBhbGwgb2YgaXRzIGRlcGVuZGVudHNcbiAgKi9cbiAgdXBkYXRlKCBlbGVtZW50OiBFbGVtZW50ICkge1xuICAgIGxldCBkZXBzID0gdGhpcy5kZXBlbmRlbmN5R3JhcGguZ2V0RGVwZW5kZW50cyggZWxlbWVudCk7XG4gICAgZm9yKCBsZXQgZCBvZiBkZXBzKSB7XG4gICAgICBkLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=