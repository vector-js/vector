import SVG from '../SVG.js';
import Element from './Element.js';
import Rectangle from './Rectangle.js';
import Text from './Text.js';
export default class CheckBox extends Element {
    /**
    * Constructs a control at the position (x,y)
    *
    * @param {number} x
    * @param {number} y
    * @param {string} label
    * @param {booelan} value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tCb3guanMiLCJzb3VyY2VSb290IjoiLi9zb3VyY2UvIiwic291cmNlcyI6WyJlbGVtZW50cy9DaGVja0JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUM7QUFDNUIsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBQ25DLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUU3QixNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxPQUFPO0lBTTNDOzs7Ozs7O01BT0U7SUFDRixZQUFhLENBQVEsRUFBRSxDQUFRLEVBQUUsS0FBWSxFQUFFLEtBQWE7UUFDMUQsS0FBSyxFQUFFLENBQUM7UUFiVixVQUFLLEdBQWEsS0FBSyxDQUFDO1FBY3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQztRQUVGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLEtBQUssRUFBRztZQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRztZQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBRUYifQ==