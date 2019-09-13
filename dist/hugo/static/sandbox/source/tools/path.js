import Line from "../shapes/line";
import * as AColorPicker from '../../node_modules/a-color-picker/dist/acolorpicker';
import SVG from "../shapes/svg";
/**
* Test function.
*/
export default class PathController {
    constructor(controller) {
        this.masterController = controller;
        this.svg = document.getElementById('svg');
        this.count = 0;
        this.activeLine = null;
        this.boundingRect = this.svg.getBoundingClientRect();
        this.mouseDown = false;
        this.shiftDown = false;
    }
    handleMouseDown(event) {
        this.mouseDown = true;
        this.active_x1 = event.clientX - this.boundingRect.left;
        this.active_y1 = event.clientY - this.boundingRect.top;
        this.active_x2 = this.active_x1;
        this.active_y2 = this.active_y1;
        this.activeLine = new Line(this.active_x1, this.active_y1, this.active_x2, this.active_y2);
        this.svg.appendChild(this.activeLine.root);
        this.count++;
    }
    handleMouseUp(event) {
        if (this.mouseDown) {
            this.masterController.editor.editor.session.insert({ row: 0, column: 0 }, this.stringify());
            this.masterController.loadListOfVars();
            this.mouseDown = false;
        }
    }
    handleMouseMove(event) {
        if (this.mouseDown) {
            this.active_x2 = event.clientX - this.boundingRect.left;
            this.active_y2 = event.clientY - this.boundingRect.top;
            this.activeLine.root.setAttribute('x2', this.active_x2.toString());
            this.activeLine.root.setAttribute('y2', this.active_y2.toString());
        }
    }
    stringify() {
        return 'let line' + SVG.count + ' = new Line(' + this.activeLine.x1 + ','
            + this.activeLine.y1 + ','
            + this.activeLine.x2 + ','
            + this.activeLine.y2 + ');\n'
            + 'line' + SVG.count + '.fill = \'' + AColorPicker.parseColor(this.activeLine.fill, "hexcss4") + '\';\n'
            + 'line' + SVG.count + '.stroke = \'' + AColorPicker.parseColor(this.activeLine.stroke, "hexcss4") + '\';\n';
    }
    handleMouseClick(event) {
        // TODO: Method not implemented
    }
}
//# sourceMappingURL=path.js.map