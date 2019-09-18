/**
* @title Angle Between Two Vectors
* @description This interactive demonstrates the angle formed between two vectors.
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
;
// Create a circle
let circle = interactive.circle(0, 0, 100);
circle.root.style.stroke = 'none';
// Create a control
let c0 = interactive.control(0, 0);
let c1 = interactive.control(circle.r * Math.cos(0), circle.r * Math.sin(0));
let c2 = interactive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
// c1.constrainTo( circle);
// c2.constrainTo( circle);
// Create a path
let path = interactive.path('');
path.root.style.fill = 'rgb(236,236,236)';
path.update = function () {
    let a1 = Math.atan2(c1.y - c0.y, c1.x - c0.x);
    let a2 = Math.atan2(c2.y - c0.y, c2.x - c0.x);
    let angle = normalize(a2 - a1);
    let largeArcFlag = (angle > Math.PI) ? false : true;
    let r = circle.r / 3;
    let x1 = r * Math.cos(a1) + c0.x;
    let y1 = r * Math.sin(a1) + c0.y;
    let x2 = r * Math.cos(a2) + c0.x;
    let y2 = r * Math.sin(a2) + c0.y;
    path.d = `M ${c0.x} ${c0.y}
            L ${c1.x} ${c1.y}
            L ${x1} ${y1}
            A ${r} ${r} 0 ${+largeArcFlag} 0 ${x2} ${y2}
            L ${c2.x} ${c2.y}
            z`;
};
path.update();
path.addDependency(c0);
path.addDependency(c1);
path.addDependency(c2);
let arrow1 = interactive.path('');
arrow1.addDependency(c0);
arrow1.addDependency(c1);
arrow1.update = function () {
    let r = 8;
    let angle = Math.atan2(c1.y - c0.y, c1.x - c0.x);
    this.d = `M ${c1.x + r * Math.cos(angle)} ${c1.y + r * Math.sin(angle)}
  L ${c1.x + r * Math.cos(angle - 2 * Math.PI / 3)} ${c1.y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${c1.x + r * Math.cos(angle + 2 * Math.PI / 3)} ${c1.y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow1.root.style.fill = '#0366EE';
arrow1.root.style.stroke = 'none';
arrow1.update();
let arrow2 = interactive.path('');
arrow2.addDependency(c0);
arrow2.addDependency(c2);
arrow2.update = function () {
    let r = 8;
    let angle = Math.atan2(c2.y - c0.y, c2.x - c0.x);
    this.d = `M ${c2.x + r * Math.cos(angle)} ${c2.y + r * Math.sin(angle)}
  L ${c2.x + r * Math.cos(angle - 2 * Math.PI / 3)} ${c2.y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${c2.x + r * Math.cos(angle + 2 * Math.PI / 3)} ${c2.y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow2.root.style.fill = '#0366EE';
arrow2.root.style.stroke = 'none';
arrow2.update();
c1.addDependency(c0);
c1.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c2.addDependency(c0);
c2.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
circle.addDependency(c0);
circle.update = function () {
    this.cx += c0.dx;
    this.cy += c0.dy;
};
// Create a checkbox to toggle between displaying radians and degrees
let degrees = interactive.checkBox(interactive.width / 6, 125, "degrees", false);
/**
* Normalizes the angle to be within the range [0, 2 PI].
*/
function normalize(angle) {
    if (angle > 0) {
        return angle;
    }
    else {
        return 2 * Math.PI + angle;
    }
}
// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
    let angle;
    let a1 = Math.atan2(c1.y - circle.cy, c1.x - circle.cx);
    let a2 = Math.atan2(c2.y - circle.cy, c2.x - circle.cx);
    angle = 2 * Math.PI - normalize(a2 - a1);
    if (degrees.value) {
        return (angle * 180 / Math.PI).toFixed(1) + '°';
    }
    else {
        return angle.toFixed(3) + ' rad';
    }
}
// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let text = interactive.text(-interactive.width / 3, 125, "test");
text.update = function () {
    text.contents = `angle = ${getAngle()}`;
};
text.addDependency(degrees);
text.addDependency(c1);
text.addDependency(c2);
text.update();
text.root.style.dominantBaseline = 'middle';
export { interactive, c1 };
//# sourceMappingURL=angle-between-two-vectors.js.map