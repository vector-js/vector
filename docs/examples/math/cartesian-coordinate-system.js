/**
* @title Cartesian Coordinate System
* @description This interactive demonstrates the cartesian coordinate system.
* @tags [math]
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.window = true;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.height / 2;
// Create three control points
let point = interactive.control(0, 0);
let xAxis = interactive.line(-interactive.width / 2, 0, interactive.width / 2, 0);
let yAxis = interactive.line(0, -interactive.height / 2, 0, interactive.height / 2);
let xPosition = interactive.line(0, 0, 0, 0);
xPosition.style.stroke = 'cornflowerblue';
xPosition.addDependency(point);
xPosition.update = function () {
    this.x1 = point.x;
    this.x2 = point.x;
    this.y2 = point.y;
};
let yPosition = interactive.line(0, 0, 0, 0);
yPosition.style.stroke = 'cornflowerblue';
yPosition.addDependency(point);
yPosition.update = function () {
    this.y1 = point.y;
    this.x2 = point.x;
    this.y2 = point.y;
};
//# sourceMappingURL=cartesian-coordinate-system.js.map