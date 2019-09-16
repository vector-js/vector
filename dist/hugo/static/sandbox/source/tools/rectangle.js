import Rectangle from "../shapes/rectangle";
import * as AColorPicker from '../../node_modules/a-color-picker/dist/acolorpicker';
import SVG from "../shapes/svg";
/**
* Test function.
*/
export default class RectangleController {
    constructor(controller) {
        this.count = 0;
        this.controller = controller;
        this.svg = document.getElementById('svg');
        this.boundingRect = this.svg.getBoundingClientRect();
        this.active = false;
        this.rectangle = null;
    }
    stringify(rect) {
        let s = 'let rect' + (SVG.count) + ' = new Rectangle(' + rect.x + ','
            + rect.y + ','
            + rect.width + ','
            + rect.height + ');\n'
            + 'rect' + SVG.count + '.fill = ' + '\'' + AColorPicker.parseColor(rect.fill, "hexcss4") + '\';\n'
            + 'rect' + SVG.count + '.stroke = ' + '\'' + AColorPicker.parseColor(rect.stroke, "hexcss4") + '\';\n';
        //this.count++;
        return s;
    }
    handleMouseDown(event) {
        this.sx = event.clientX;
        this.sy = event.clientY;
        this.x = event.clientX;
        this.y = event.clientY;
        this.rectangle = new Rectangle(this.x - this.boundingRect.left, this.y - this.boundingRect.top, 0, 0);
        this.svg.appendChild(this.rectangle.root);
        this.active = true;
    }
    handleMouseUp(event) {
        if (this.active) {
            this.controller.editor.editor.session.insert({ row: (SVG.count - 1) * 3, column: 0 }, this.stringify(this.rectangle));
            this.controller.loadListOfVars();
            this.active = false;
        }
    }
    handleMouseMove(event) {
        if (this.active && !this.shiftDown) {
            let x1 = Math.min(this.x, event.clientX);
            let y1 = Math.min(this.y, event.clientY);
            let x2 = Math.max(this.x, event.clientX);
            let y2 = Math.max(this.y, event.clientY);
            let x = x1 - this.boundingRect.left;
            let y = y1 - this.boundingRect.top;
            let width = x2 - x1;
            let height = y2 - y1;
            this.rectangle.root.setAttribute('x', x.toString());
            this.rectangle.root.setAttribute('y', y.toString());
            this.rectangle.root.setAttribute('width', width.toString());
            this.rectangle.root.setAttribute('height', height.toString());
        }
        else if (this.active && this.shiftDown) { //draw a square
            let x1 = Math.min(this.x, event.clientX);
            let y1 = Math.min(this.y, event.clientY);
            let x2 = Math.max(this.x, event.clientX);
            let y2 = Math.max(this.y, event.clientY);
            let width = x2 - x1;
            let height = y2 - y1;
            let x = x1 - this.boundingRect.left;
            let y = y1 - this.boundingRect.top;
            this.rectangle.root.setAttribute('x', x.toString());
            this.rectangle.root.setAttribute('y', y.toString());
            if (Math.abs(width) > Math.abs(height)) {
                this.rectangle.root.setAttribute('width', width.toString());
                this.rectangle.root.setAttribute('height', width.toString());
            }
            else {
                this.rectangle.root.setAttribute('width', height.toString());
                this.rectangle.root.setAttribute('height', height.toString());
            }
        }
    }
    handleMouseClick(event) {
        // TODO: Method not implemented
    }
}
//# sourceMappingURL=rectangle.js.map