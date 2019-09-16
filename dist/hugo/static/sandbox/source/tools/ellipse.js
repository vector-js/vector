import Ellipse from "../shapes/ellipse";
import * as AColorPicker from '../../node_modules/a-color-picker/dist/acolorpicker';
import SVG from "../shapes/svg";
/**
* Controlls the creation of a svg ellipse element.
*/
export default class EllipseController {
    /**
    * Construct an ellipse controller.
    */
    constructor(controller) {
        this.svg = document.getElementById('svg');
        this.boundingRect = this.svg.getBoundingClientRect();
        this.controller = controller;
        this.active = false;
        this.ellipse = null;
        this.shiftDown = false;
        this.count = 0;
    }
    stringify(ell) {
        let s = 'let ell' + (SVG.count) + ' = new Ellipse(' + ell.cx + ','
            + ell.cy + ','
            + ell.rx + ','
            + ell.ry + ');\n'
            + 'ell' + SVG.count + '.fill = ' + '\'' + AColorPicker.parseColor(ell.fill, "hexcss4") + '\';\n'
            + 'ell' + SVG.count + '.stroke = ' + '\'' + AColorPicker.parseColor(ell.stroke, "hexcss4") + '\';\n';
        //this.count++;
        return s;
    }
    /**
    * Upon a mouse down event, create a new ellipse element.
    */
    handleMouseDown(event) {
        this.sx = event.clientX;
        this.sy = event.clientY;
        this.cx = event.clientX;
        this.cy = event.clientY;
        this.ellipse = new Ellipse((this.cx - this.boundingRect.left), (this.cy - this.boundingRect.top), 0, 0);
        this.ellipse.creationNum = SVG.count;
        this.svg.appendChild(this.ellipse.root);
        this.active = true;
    }
    /**
    * Places the ellipse at the last position.
    */
    handleMouseUp(event) {
        if (this.active) {
            console.log('writing at ' + ((SVG.count * 3) - 1));
            this.controller.editor.editor.session.insert({ row: (SVG.count - 1) * 3, column: 0 }, this.stringify(this.ellipse));
            this.controller.loadListOfVars();
            this.active = false;
        }
    }
    /**
    * When the user is actively creating a ellipse, update the ellipse when the
    * mouse moves.
    */
    handleMouseMove(event) {
        if (this.active && !this.shiftDown) //draw ellipse
         {
            let x1 = Math.min(this.cx, event.clientX);
            let y1 = Math.min(this.cy, event.clientY);
            let x2 = Math.max(this.cx, event.clientX);
            let y2 = Math.max(this.cy, event.clientY);
            let rx = (x2 - x1) / 2;
            let ry = (y2 - y1) / 2;
            let cx = x1 - this.boundingRect.left + rx;
            let cy = y1 - this.boundingRect.top + ry;
            this.ellipse.root.setAttribute('cx', cx.toString());
            this.ellipse.root.setAttribute('cy', cy.toString());
            this.ellipse.root.setAttribute('rx', rx.toString());
            this.ellipse.root.setAttribute('ry', ry.toString());
        }
        else if (this.active && this.shiftDown) { //draw a circle
            let x1 = Math.min(this.cx, event.clientX);
            let y1 = Math.min(this.cy, event.clientY);
            let x2 = Math.max(this.cx, event.clientX);
            let y2 = Math.max(this.cy, event.clientY);
            let rx = (x2 - x1) / 2;
            let ry = (y2 - y1) / 2;
            let cx = x1 - this.boundingRect.left + rx;
            let cy = y1 - this.boundingRect.top + ry;
            this.ellipse.root.setAttribute('cx', cx.toString());
            this.ellipse.root.setAttribute('cy', cy.toString());
            if (rx > ry) {
                this.ellipse.root.setAttribute('rx', rx.toString());
                this.ellipse.root.setAttribute('ry', rx.toString());
            }
            else {
                this.ellipse.root.setAttribute('rx', ry.toString());
                this.ellipse.root.setAttribute('ry', ry.toString());
            }
        }
    }
    handleMouseClick(event) {
        // TODO: Method not implemented
    }
}
//# sourceMappingURL=ellipse.js.map