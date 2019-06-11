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
let start = interactive.control(100, 120);
let control = interactive.control(200, 120);
let rx = interactive.slider(400, 40, 150, 75);
let ry = interactive.slider(400, 70, 150, 75);
let text = interactive.text(25, 275, "");
// TODO: possibly remove the x-axis-rotation because why would you ever use it?
let xAxisRotation = interactive.slider(400, 100, 150, 0);
xAxisRotation.min = 0;
xAxisRotation.max = 180;
let largeArcFlag = interactive.checkBox(400, 130, "large-arc-flag", false);
let sweepFlag = interactive.checkBox(400, 160, "sweep-flag", false);
let showEllipsis = interactive.checkBox(400, 190, "show ellipsis", false);
path.update = function () {
    this.d = `M ${start.x}
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
// Code under this point is additional paths showsing all the different options
// for the flags. TODO: move the paths into a group and change the opacity of
// the group instead of for each individual path
let path1 = interactive.path('');
path1.addDependency(start);
path1.addDependency(control);
path1.addDependency(rx);
path1.addDependency(ry);
path1.addDependency(xAxisRotation);
path1.update = function () {
    this.d = `M ${start.x}
              ${start.y}
            A ${rx.value}
              ${ry.value}
              ${xAxisRotation.value}
              0
              0
              ${control.x}
              ${control.y}`;
};
path1.update();
let path2 = interactive.path('');
path2.addDependency(start);
path2.addDependency(control);
path2.addDependency(rx);
path2.addDependency(ry);
path2.addDependency(xAxisRotation);
path2.update = function () {
    this.d = `M ${start.x}
              ${start.y}
            A ${rx.value}
              ${ry.value}
              ${xAxisRotation.value}
              0
              1
              ${control.x}
              ${control.y}`;
};
path2.update();
let path3 = interactive.path('');
path3.addDependency(start);
path3.addDependency(control);
path3.addDependency(rx);
path3.addDependency(ry);
path3.addDependency(xAxisRotation);
path3.update = function () {
    this.d = `M ${start.x}
              ${start.y}
            A ${rx.value}
              ${ry.value}
              ${xAxisRotation.value}
              1
              0
              ${control.x}
              ${control.y}`;
};
path3.update();
let path4 = interactive.path('');
path4.addDependency(start);
path4.addDependency(control);
path4.addDependency(rx);
path4.addDependency(ry);
path4.addDependency(xAxisRotation);
path4.update = function () {
    this.d = `M ${start.x}
              ${start.y}
            A ${rx.value}
              ${ry.value}
              ${xAxisRotation.value}
              1
              1
              ${control.x}
              ${control.y}`;
};
path4.update();
showEllipsis.onchange = function () {
    if (showEllipsis.value) {
        path1.root.style.strokeOpacity = '0.3';
        path2.root.style.strokeOpacity = '0.3';
        path3.root.style.strokeOpacity = '0.3';
        path4.root.style.strokeOpacity = '0.3';
    }
    else {
        path1.root.style.strokeOpacity = '0';
        path2.root.style.strokeOpacity = '0';
        path3.root.style.strokeOpacity = '0';
        path4.root.style.strokeOpacity = '0';
    }
};
showEllipsis.onchange();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtYXJjLmpzIiwic291cmNlUm9vdCI6Ii4vc291cmNlLyIsInNvdXJjZXMiOlsiZXhhbXBsZXMvc3ZnLXBhdGgtYXJjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsSUFBSSxFQUFFLEdBQUcsY0FBYyxDQUFDO0FBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBRTFCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0MsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0MsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUUxQywrRUFBK0U7QUFDL0UsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUN0QixhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztB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O1FBQ3ZCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7S0FDeEM7U0FBTTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7S0FDdEM7QUFDSCxDQUFDLENBQUM7QUFDRixZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMifQ==