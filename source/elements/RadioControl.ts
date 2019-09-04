import SVG from '../SVG.js';
import Element from '../elements/Element.js';
import CheckBox from './CheckBox.js';

/**
* 
*/
export default class RadioControl extends Element {

    list: CheckBox[];
    index: number;

    constructor(labels: string[], x:number, y:number, index: number = 0) {
        if(labels === undefined || labels.length == 0){
            throw new Error('Labels must not be empty');
        }
        super();
        let group = SVG.Group();
        group.id = this.id;
        group.setAttribute("transform",`translate(${x},${y})`);
        this.root = group;

        this.index = index;
        let counter = 0;
        this.list = [];
        let rc = this;
        labels.forEach((element,i) => {
            let checkbox = new CheckBox(0,counter,element,false);
            if(i == index){
                checkbox.value = true
            }
            checkbox.box.root.setAttribute('rx', '8px');
            checkbox.box.root.onmousedown = function() {
                rc.handleMouseDown(i);
                checkbox.value = true;
                rc.index = i;
                rc.onchange();
              };
            group.appendChild(checkbox.root);
            this.list.push(checkbox);
            counter += 20;
        });
    }

    getCurrentValue(){
        return this.list[this.index].text.contents;
    }

    handleMouseDown(index: number){
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
