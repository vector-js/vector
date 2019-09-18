/**
* @title Unit Circle Angle
* @description An interactive to demonstrate how the radius of a circle can be used to measure the angle between two rays.
* @tags [math]
* @date June 9, 2019
* @author Kurt Bruns
*/
import Interactive from '../../interactive.js';
// Initialize the interactive
let id = 'unit-circle-angle';
let interactive = new Interactive(id);
interactive.window = false;
interactive.width = 320;
interactive.height = 340;
interactive.originX = interactive.width / 2;
interactive.originY = 125;
// Create a circle
let circle = interactive.circle(0, 0, 100);
// Create a control
let control = interactive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
control.constrainToCircle(circle.cx, circle.cy, circle.r);
// Create a path
let path = interactive.path('');
path.root.style.fill = 'rgb(236,236,236)';
path.update = function () {
    let flag = (control.y > 0) ? 1 : 0;
    path.d = `M 0 0
            L ${circle.r} 0
            L ${circle.r / 3} 0
            A ${circle.r / 3} ${circle.r / 3} 0 ${flag} 0 ${control.x / 3} ${control.y / 3}
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);
// Create a point at the origin
let point = interactive.circle(0, 0, 3);
point.fill = 'black';
// Create a checkbox to toggle between displaying radians and degrees
let degrees = interactive.checkBox(-80, 180, "degrees", false);
// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
    let angle;
    if (control.y <= 0) {
        angle = Math.abs(Math.atan2(control.y, control.x));
    }
    else {
        angle = Math.PI * 2 - Math.atan2(control.y, control.x);
    }
    if (degrees.value) {
        return (angle * 180 / Math.PI).toFixed(1) + '°';
    }
    else {
        return angle.toFixed(3) + ' rad';
    }
}
// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let text = interactive.text(0, 150, "test");
text.addDependency(control);
text.update = function () {
    text.contents = `angle = ${getAngle()}`;
};
text.addDependency(degrees);
text.update();
text.x = -text.root.textLength.baseVal.value / 2;
export { interactive, control };
//# sourceMappingURL=unit-circle-angle.js.map