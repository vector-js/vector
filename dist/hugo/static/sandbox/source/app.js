'use strict';
import View from './view';
import Rectangle from './shapes/rectangle';
import Ellipse from './shapes/ellipse';
import Control from './shapes/control';
import Controller from './controller';
import Line from './shapes/line';
let view = new View();
new Controller(view);
// Add to the global (window) namespace
window.Rectangle = Rectangle;
window.Control = Control;
window.Ellipse = Ellipse;
window.Line = Line;
//# sourceMappingURL=app.js.map