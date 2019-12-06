/**
* @title Animate Along Path
* @description This interactive demonstrates how a element can be animated along a path.
* @tags [animation]
*/
import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 736;
interactive.height = 225;
interactive.border = true;
let circle = interactive.circle(interactive.width / 2, interactive.height / 3, 50);
circle.classList.add('default');
let displayCircle = interactive.circle(0, 0, 6);
displayCircle.style.fill = '#333333';
let scrubber = interactive.scrubber(100, 175, {});
let pathLength = circle.getTotalLength();
function animate() {
    let currentPosition = scrubber.value / (scrubber.max - scrubber.min);
    let point = circle.getPointAtLength(currentPosition * pathLength);
    displayCircle.cx = point.x;
    displayCircle.cy = point.y;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
//# sourceMappingURL=animate-along-path.js.map