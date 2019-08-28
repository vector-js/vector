import Element from './Element.js';
import Circle from './Circle.js';
import Text from './Text.js';
import SVG from '../SVG.js';
//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A circle is a basic element with a position and radius.
*/
export default class Node extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, r, text) {
        super();
        this.root = SVG.Group();
        this.nodeName = new Text(cx, cy, text);
        this.nodeCircle = new Circle(cx, cy, r);
        this.root.appendChild(this.nodeCircle.root);
        this.root.appendChild(this.nodeName.root);
        this.root.classList.add('default');
        this.root.id = this.id;
    }
    adjustText() {
        let textWidth = this.nodeName.root.getBBox().width;
        let textHeight = this.nodeName.root.getBBox().height;
        this.nodeName.x = this.nodeName.x - textWidth / 2;
        this.nodeName.y = this.nodeName.y + textHeight / 4;
        console.log(textHeight);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbGVtZW50cy9Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBQzdCLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUU1QixpSEFBaUg7QUFDakg7O0VBRUU7QUFDRixNQUFNLENBQUMsT0FBTyxPQUFPLElBQUssU0FBUSxPQUFPO0lBTXZDOztNQUVFO0lBQ0YsWUFBYSxFQUFTLEVBQUUsRUFBUyxFQUFFLENBQVEsRUFBRSxJQUFXO1FBQ3ZELEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFFbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0ErRUYifQ==