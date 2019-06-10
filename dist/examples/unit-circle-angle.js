/**
* An interactive to demonstrate how the radius of a circle can be used to
* measure the angle between two rays.
*
* @title Unit Circle Angle
* @date June 9, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
// Initialize the interactive
let id = 'unit-circle-angle';
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 320;
interactive.height = 320;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.height / 2;
// Create a circle
let circle = interactive.circle(0, 0, 100);
// Create a control
let control = interactive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
control.constrainToCircle(circle.cx, circle.cy, circle.r);
// Create a path
let path = interactive.path('');
path.root.style.fill = 'gray';
path.root.style.fillOpacity = '.3';
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
// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
    if (control.y <= 0) {
        return Math.abs(Math.atan2(control.y, control.x));
    }
    else {
        return Math.PI * 2 - Math.atan2(control.y, control.x);
    }
}
// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let text = interactive.text(0, 130, "test");
text.addDependency(control);
text.update = function () {
    text.contents = `angle = ${getAngle().toFixed(3)}`;
};
text.update();
text.x = -text.root.textLength.baseVal.value / 2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaXJjbGUtYW5nbGUuanMiLCJzb3VyY2VSb290IjoiLi9zb3VyY2UvIiwic291cmNlcyI6WyJleGFtcGxlcy91bml0LWNpcmNsZS1hbmdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztFQU9FO0FBRUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsNkJBQTZCO0FBQzdCLElBQUksRUFBRSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7QUFDMUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztBQUUzQyxrQkFBa0I7QUFDbEIsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRTVDLG1CQUFtQjtBQUNuQixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsT0FBTyxDQUFDLGlCQUFpQixDQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFM0QsZ0JBQWdCO0FBQ2hCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUc7SUFDWixJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUc7Z0JBQ0ssTUFBTSxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLENBQUMsR0FBQyxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxPQUFPLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFDLENBQUM7Z0JBQ2xFLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUM7Y0FDeEIsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFNUIsK0JBQStCO0FBQy9CLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUVyQiw0RUFBNEU7QUFDNUUsNEVBQTRFO0FBQzVFLCtFQUErRTtBQUMvRSx5RUFBeUU7QUFDekUsa0JBQWtCO0FBQ2xCLFNBQVMsUUFBUTtJQUNmLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUc7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3REO0FBQ0gsQ0FBQztBQUVELDRFQUE0RTtBQUM1RSw4QkFBOEI7QUFDOUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRztJQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNyRCxDQUFDLENBQUM7QUFDRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDZCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMifQ==