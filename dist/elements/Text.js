import SVG from '../SVG.js';
import Element from './Element.js';
/**
* Text is a basic element containing string contents
*/
export default class Text extends Element {
    /**
    * Constructs text at the position (x,y) with the provided string
    */
    constructor(xNum, yNum, text) {
        super();
        this.root = SVG.Text(xNum, yNum, text);
        this.root.id = this.id;
        this.style = this.root.style;
        // this.x = xNum;
        // this.y = yNum;
        // this.contents = text;
    }
    /**
    * Sets the contents of this element
    */
    set contents(str) {
        this.root.innerHTML = str;
    }
    /**
    * Gets the x position of this element
    */
    get x() {
        return Number(this.root.getAttribute('x'));
    }
    /**
    * Gets the y position of this element
    */
    get y() {
        return Number(this.root.getAttribute('y'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbGVtZW50cy9UZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUM1QixPQUFPLE9BQU8sTUFBTSxjQUFjLENBQUM7QUFFbkM7O0VBRUU7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLElBQUssU0FBUSxPQUFPO0lBS3ZDOztNQUVFO0lBQ0YsWUFBYSxJQUFXLEVBQUUsSUFBVyxFQUFFLElBQVc7UUFDaEQsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0IsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQix3QkFBd0I7SUFDMUIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxRQUFRLENBQUUsR0FBVTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O01BRUU7SUFDRixJQUFJLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksQ0FBQyxDQUFFLEtBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksQ0FBQyxDQUFFLEtBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FFRiJ9