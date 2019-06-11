/**
* An interactive to demonstrate how the radius of a circle can be used to
* measure the angle between two rays.
*
* @title Unit Circle Right Triangle
* @date June 9, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
// Initialize the interactive
let id = 'unit-circle';
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 600;
interactive.height = 600;
interactive.originX = interactive.width / 2;
interactive.originY = 200;
// Create a circle
let circle = interactive.circle(0, 0, 125);
let line = interactive.line(0, 0, circle.r, 0);
// Create a control
let control = interactive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
control.constrainToCircle(circle.cx, circle.cy, circle.r);
// Create a path
let path = interactive.path('');
path.root.style.fillOpacity = '.3';
path.update = function () {
    path.d = `M 0 0
            L ${control.x} 0
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);
// Create a point at the origin
let point = interactive.circle(0, 0, 3);
point.fill = 'black';
function getAngle() {
    let angle;
    if (control.y <= 0) {
        angle = Math.abs(Math.atan2(control.y, control.x));
    }
    else {
        angle = Math.PI * 2 - Math.atan2(control.y, control.x);
    }
    return angle.toFixed(2) + ' rad';
}
let xCoord = -180;
let yCoord = 200;
// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let angle = interactive.text(xCoord, yCoord + 0, "test");
angle.root.style.whiteSpace = 'pre';
angle.addDependency(control);
angle.update = function () {
    angle.contents = `θ =  ${getAngle()}`;
};
angle.update();
// Display the x cordinate
let x = interactive.text(xCoord, yCoord + 25, "test");
x.root.style.whiteSpace = 'pre';
x.addDependency(control);
x.update = function () {
    x.contents = `x = ${control.x > 0 ? ' ' : ''}${(control.x / circle.r).toFixed(2)}`;
};
x.update();
let y = interactive.text(xCoord, yCoord + 50, "test");
y.root.style.whiteSpace = 'pre';
y.addDependency(control);
y.update = function () {
    y.contents = `y = ${control.y <= 0 ? ' ' : ''}${(-control.y / circle.r).toFixed(2)}`;
};
y.update();
let cosine = interactive.checkBox(75, 195, 'cosine', false);
let sine = interactive.checkBox(75, 195 + 25, 'sine', false);
let tangent = interactive.checkBox(75, 195 + 50, 'tangent', false);
let secant = interactive.checkBox(75, 195 + 75, 'secant', false);
let cosecant = interactive.checkBox(75, 195 + 100, 'cosecant', false);
let cotangent = interactive.checkBox(75, 195 + 125, 'cotangent', false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaXJjbGUuanMiLCJzb3VyY2VSb290IjoiLi9zb3VyY2UvIiwic291cmNlcyI6WyJleGFtcGxlcy91bml0LWNpcmNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztFQU9FO0FBRUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsNkJBQTZCO0FBQzdCLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQztBQUN2QixJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUMxQixXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN4QixXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUN6QixXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO0FBQzFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBRTFCLGtCQUFrQjtBQUNsQixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFaEQsbUJBQW1CO0FBQ25CLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixPQUFPLENBQUMsaUJBQWlCLENBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1B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