/**
* This interactive demonstrates the quadratic bezier command for a SVG path
* element. There are three control points that allow the user to control the
* shape of the bezier curve that is drawn.
*
* @title SVG Path Arc
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 380;
interactive.root.style.margin = '8px';
let path = interactive.path('');
let start = interactive.control(100, 120);
let control = interactive.control(200, 120);
let text = interactive.text(25, 275, "");
let controls = new Interactive(getScriptName());
controls.width = 220;
controls.border = true;
controls.root.style.margin = '8px';
let margin = 32;
let rx = controls.slider(margin, 40, controls.width - 2 * margin, 75);
let ry = controls.slider(margin, 75, controls.width - 2 * margin, 75);
let xAxisRotation = controls.slider(margin, 110, controls.width - 2 * margin, 0);
xAxisRotation.min = 0;
xAxisRotation.max = 180;
let largeArcFlag = controls.checkBox(margin, 160, "large-arc-flag", false);
let sweepFlag = controls.checkBox(margin, 195, "sweep-flag", false);
let showEllipsis = controls.checkBox(margin, 230, "show ellipsis", false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtYXJjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2V4YW1wbGVzL3N2Zy9zdmctcGF0aC1hcmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0VBUUU7QUFFRixPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7QUFDbkQsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDMUIsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUN0QyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLElBQUks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