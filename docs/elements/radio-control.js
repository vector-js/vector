import SVG from '../svg.js';
import Element from '../elements/element.js';
import CheckBox from './check-box.js';
/**
*  Radio Buttons with labels. Only one of the checkboxes will be checked at any given time.
*/
export default class RadioControl extends Element {
    /*
    * labels: the labels for the radio buttons
    * x: x position of control
    * y: y position of the control
    * index: the starting button to be highlighted
    */
    constructor(labels, x, y, index = 0) {
        if (labels === undefined || labels.length == 0) {
            throw new Error('Labels must not be empty');
        }
        super(SVG.Group());
        this.root.setAttribute("transform", `translate(${x},${y})`);
        this.index = index;
        let counter = 0;
        this.list = [];
        let rc = this;
        labels.forEach((element, i) => {
            let checkbox = new CheckBox(0, counter, element, false);
            if (i == index) {
                checkbox.value = true;
            }
            checkbox.box.root.setAttribute('rx', '8px');
            checkbox.box.root.onmousedown = function () {
                rc.handleMouseDown(i);
                checkbox.value = true;
                rc.index = i;
                rc.onchange();
            };
            this.root.appendChild(checkbox.root);
            this.list.push(checkbox);
            counter += 24;
        });
    }
    /*
    * returns the text of the currently selected button
    */
    getCurrentValue() {
        return this.list[this.index].text.contents;
    }
    /*
    * when a button is selected, deselect all others
    */
    handleMouseDown(index) {
        this.list.forEach(element => {
            element.value = false;
        });
    }
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange() {
        this.updateDependents();
    }
}
//# sourceMappingURL=radio-control.js.map