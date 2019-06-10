/**
* This interactive demonstrates the quadratic bezier command for a SVG path
* element. There are three control points that allow the user to control the
* shape of the bezier curve that is drawn.
*
* @title SVG Path Arc
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
let id = 'svg-path-arc';
let interactive = new Interactive(id);
interactive.window = true;
let path = interactive.path('');
let text = interactive.text(120, 280, "");
let start = interactive.control(100, 120);
let control = interactive.control(200, 120);
let rx = interactive.slider(400, 30, 150, 75);
let ry = interactive.slider(400, 60, 150, 75);
// TODO: possibly remove the x-axis-rotation because why would you ever use it?
let xAxisRotation = interactive.slider(400, 90, 150, 0);
xAxisRotation.min = 0;
xAxisRotation.max = 180;
let largeArcFlag = interactive.checkBox(400, 120, "large-arc-flag", false);
let sweepFlag = interactive.checkBox(400, 150, "sweep-flag", false);
path.update = function () {
    path.d = `M ${start.x}
              ${start.y}
            A ${rx.value}
              ${ry.value}
              ${xAxisRotation.value}
              ${largeArcFlag.number()}
              ${sweepFlag.number()}
              ${control.x}
              ${control.y}`;
};
path.update();
path.addDependency(start);
path.addDependency(control);
path.addDependency(rx);
path.addDependency(ry);
path.addDependency(xAxisRotation);
path.addDependency(largeArcFlag);
path.addDependency(sweepFlag);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">path</tspan>`;
    let d = `<tspan style="fill:#ab6f00">d</tspan>`;
    this.contents = `&lt;${tag} ${d}="M ${start.x}
                                      ${start.y}
                                    A ${rx.value.toFixed(0)}
                                      ${ry.value.toFixed(0)}
                                      ${xAxisRotation.value.toFixed(0)}
                                      ${largeArcFlag.number()}
                                      ${sweepFlag.number()}
                                      ${control.x.toFixed(0)}
                                      ${control.y.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(path);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtYXJjLmpzIiwic291cmNlUm9vdCI6Ii4vc291cmNlLyIsInNvdXJjZXMiOlsiZXhhbXBsZXMvc3ZnLXBhdGgtYXJjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsSUFBSSxFQUFFLEdBQUcsY0FBYyxDQUFDO0FBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBRTFCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0MsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUUvQywrRUFBK0U7QUFDL0UsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RCxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUN0QixhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUN4QixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUUsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUVyRSxJQUFJLENBQUMsTUFBTSxHQUFHO0lBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUNQLEtBQUssQ0FBQyxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxLQUFLO2dCQUNSLEVBQUUsQ0FBQyxLQUFLO2dCQUNSLGFBQWEsQ0FBQyxLQUFLO2dCQUNuQixZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUNyQixTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUNsQixPQUFPLENBQUMsQ0FBQztnQkFDVCxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUIsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU5Qiw2RUFBNkU7QUFDN0UsMENBQTBDO0FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUc7SUFDWixJQUFJLEdBQUcsR0FBRyx5Q0FBeUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsR0FBRyx1Q0FBdUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQzt3Q0FDUCxLQUFLLENBQUMsQ0FBQzt3Q0FDUCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0NBQ25CLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3Q0FDbkIsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dDQUM5QixZQUFZLENBQUMsTUFBTSxFQUFFO3dDQUNyQixTQUFTLENBQUMsTUFBTSxFQUFFO3dDQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0NBQ3BCLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbkUsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9