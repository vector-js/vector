import SVG from '../SVG.js';
import Rectangle from '../elements/Rectangle.js';
import Text from '../elements/Text.js';
import Element from '../elements/Element.js';
/**
* A button that when pressed fires an onclick event.
*/
export default class Button extends Element {
    /**
    * Constructs a button at the position (x,y)
    */
    constructor(x, y, text) {
        super();
        /**
        * The state of the checkbox
        */
        this._count = 0;
        this.root = SVG.Group();
        this.root.setAttribute('transform', `translate(${x},${y})`);
        this.root.classList.add('button');
        this.root.id = this.id;
        // Create a text element
        this.text = new Text(18, 1, text);
        this.text.root.setAttribute('alignment-baseline', 'middle');
        // TODO: why is this.text.root.textLength returning zero?
        this.box = new Rectangle(0, -16, text.length * 12, 32);
        this.box.root.setAttribute('rx', '2px');
        this.root.appendChild(this.box.root);
        this.root.appendChild(this.text.root);
    }
    /**
    * Fires when the user clicks the left button on the button.
    */
    set onlick(handler) {
        this.root.onclick = handler;
    }
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange() {
        this.updateDependents();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2VsZW1lbnRzL0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUM7QUFDNUIsT0FBTyxTQUFTLE1BQU0sMEJBQTBCLENBQUM7QUFDakQsT0FBTyxJQUFJLE1BQU0scUJBQXFCLENBQUM7QUFDdkMsT0FBTyxPQUFPLE1BQU0sd0JBQXdCLENBQUM7QUFFN0M7O0VBRUU7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxPQUFPO0lBaUJ6Qzs7TUFFRTtJQUNGLFlBQWEsQ0FBUSxFQUFFLENBQVEsRUFBRSxJQUFXO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBbkJWOztVQUVFO1FBQ0YsV0FBTSxHQUFZLENBQUMsQ0FBQztRQWtCbEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFdkIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0QseURBQXlEO1FBQ3pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksTUFBTSxDQUFFLE9BQU87UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7TUFFRTtJQUNGLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0YifQ==