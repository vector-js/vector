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
let id = 'svg-path-arc';
let interactive = new Interactive(id);
interactive.border = true;
let path = interactive.path('');
let start = interactive.control(100, 120);
let control = interactive.control(200, 120);
let rx = interactive.slider(400, 40, 150, 75);
let ry = interactive.slider(400, 70, 150, 75);
let text = interactive.text(25, 275, "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtYXJjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2V4YW1wbGVzL3N2Zy9zdmctcGF0aC1hcmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0VBUUU7QUFFRixPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUUvQyxJQUFJLEVBQUUsR0FBRyxjQUFjLENBQUM7QUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFMUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMzQyxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0MsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTFDLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDdEIsYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFD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