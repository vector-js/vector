/**
* @title SVG Path Element Line Command
* @description This interactive demonstrates the line command for the SVG path element. There are two controls that allow the user to control the start and end points of the line. There is also a checkbox that allows the user to toggle between relative and absolute commands
* @date May 3, 2019
* @author Kurt Bruns
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 704;
let path = interactive.path('');
let start = interactive.control(150, 150);
let end = interactive.control(450, 50);
let toggle = interactive.checkBox(360, 270, "absolute / relative", false);
let text = interactive.text(25, 275, "");
path.update = function () {
    if (toggle.value) {
        path.d = `m ${start.x}
                ${start.y}
              l ${end.x - start.x}
                ${end.y - start.y}`;
    }
    else {
        path.d = `M ${start.x}
                ${start.y}
              L ${end.x}
                ${end.y}`;
    }
};
path.update();
path.addDependency(start);
path.addDependency(end);
path.addDependency(toggle);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">path</tspan>`;
    let d = `<tspan style="fill:#ab6f00">d</tspan>`;
    this.contents = `&lt;${tag} ${d}="${path.d}"&gt`;
};
text.update();
text.addDependency(path);
//# sourceMappingURL=svg-path-line.js.map