/**
* An interactive that demonstrates how an angle is defined as the amount of
* rotation between two rays in two-dimensional space.
*
* @title Angle Interactive
* @date June 26, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
// Initialize the interactive
let id = 'angle';
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 600;
interactive.height = 300;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5nbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvZXhhbXBsZXMvYW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7RUFPRTtBQUVGLE9BQU8sV0FBVyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLDZCQUE2QjtBQUM3QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7QUFDakIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDMUIsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDeEIsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDekIsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztBQUMxQyxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO0FBQUEsQ0FBQztBQUU1QyxrQkFBa0I7QUFDbEIsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFbEMsbUJBQW1CO0FBQ25CLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVFLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxP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YSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztNQUM5RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7TUFDaEYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO2NBQ3hFLENBQUM7QUFDZixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1B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