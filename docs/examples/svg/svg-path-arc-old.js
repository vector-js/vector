/**
* @title SVG Path Arc
* @date May 3, 2019
* @author Kurt Bruns
* @draft true
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
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
//# sourceMappingURL=svg-path-arc-old.js.map