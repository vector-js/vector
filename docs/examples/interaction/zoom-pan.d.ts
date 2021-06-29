/**
* @ignore true
*/
import { Interactive } from "../../index.js";
export default class ZoomAndPan extends Interactive {
    zoomIntensity: number;
    scale: number;
    originx: number;
    originy: number;
    visibleWidth: number;
    visibleHeight: number;
    active: boolean;
    prevX: number;
    prevY: number;
    _mathMode: boolean;
    /**
    * Constructs a new interactive with zooming capabilities
    */
    constructor(id: string, width: number, height: number);
    get mathMode(): boolean;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    handleWheel(event: WheelEvent): void;
}
