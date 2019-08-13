import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
import Element from '../elements/Element.js';
/**
* A checkbox with an label. The can be checked, unchecked, and related to other
* elements.
*/
export default class CheckBox extends Element {
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
        this.box = new Rectangle(-6.5, -6.5, 13, 13);
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
            this.box.root.style.fill = '#404040';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tCb3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvaW5wdXQvQ2hlY2tCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDO0FBQzVCLE9BQU8sU0FBUyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZDLE9BQU8sT0FBTyxNQUFNLHdCQUF3QixDQUFDO0FBRTdDOzs7RUFHRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLE9BQU87SUFpQjNDOztNQUVFO0lBQ0YsWUFBYSxDQUFRLEVBQUUsQ0FBUSxFQUFFLElBQVcsRUFBRSxLQUFhO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBbkJWOztVQUVFO1FBQ0YsV0FBTSxHQUFhLEtBQUssQ0FBQztRQWtCdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksS0FBSyxDQUFFLEtBQWE7UUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7TUFFRTtJQUNGLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztDQUNGIn0=