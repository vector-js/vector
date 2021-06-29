/**
* @ignore true
*/
import { Interactive } from "../../index.js";
export default class ZoomAndPan extends Interactive {
    zoomIntensity;
    scale;
    originx;
    originy;
    visibleWidth;
    visibleHeight;
    active;
    prevX;
    prevY;
    _mathMode;
    /**
    * Constructs a new interactive with zooming capabilities
    */
    constructor(id, width, height) {
        super(id);
        let bbox = this.root.getBoundingClientRect();
        this.width = width;
        this.height = height;
        // initialize variables
        this.zoomIntensity = .02;
        this.scale = 1;
        this.originx = 0;
        this.originy = 0;
        this.visibleWidth = this.width;
        this.visibleHeight = this.height;
        this.active = false;
        this.prevX = 0;
        this.prevY = 0;
        this.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);
        let interactive = this;
        interactive.root.addEventListener('mousedown', (event) => { interactive.handleMouseDown(event); });
        interactive.root.addEventListener('mouseup', (event) => { interactive.handleMouseUp(event); });
        interactive.root.addEventListener('mousemove', (event) => { interactive.handleMouseMove(event); });
        interactive.root.addEventListener('wheel', (event) => { interactive.handleWheel(event); });
    }
    get mathMode() {
        return this._mathMode;
    }
    handleMouseDown(event) {
        this.active = true;
        this.prevX = event.clientX;
        this.prevY = event.clientY;
    }
    handleMouseUp(event) {
        this.active = false;
    }
    handleMouseMove(event) {
        if (this.active) {
            let deltaX = event.clientX - this.prevX;
            let deltaY = event.clientY - this.prevY;
            this.originx -= deltaX / this.scale;
            this.originy -= deltaY / this.scale;
            this.prevX = event.clientX;
            this.prevY = event.clientY;
            this.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);
        }
    }
    handleWheel(event) {
        event.preventDefault();
        // calculate the position of the mouse over the interactive
        let br = this.root.getBoundingClientRect();
        let x = event.clientX - br.left;
        let y = event.clientY - br.top;
        if (this.mathMode) {
            y = this.height - y;
        }
        // calculate the zoom direction
        let wheel = event.deltaY < 0 ? 1 : -1;
        let zoom = Math.exp(wheel * this.zoomIntensity);
        // let zoom = Math.log10(Math.abs(event.deltaY));
        this.originx -= x / (this.scale * zoom) - x / this.scale;
        this.originy -= y / (this.scale * zoom) - y / this.scale;
        this.scale *= zoom;
        this.visibleWidth = this.width / this.scale;
        this.visibleHeight = this.height / this.scale;
        this.setViewBox(this.originx, this.originy, this.visibleWidth, this.visibleHeight);
    }
}
//# sourceMappingURL=zoom-pan.js.map