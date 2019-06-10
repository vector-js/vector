/**
* This interactive demonstrates the line command for the SVG path element.
* There are two controls that allow the user to control the start and end
* points of the line. There is also a checkbox that allows the user to toggle
* between relative and absolute commands
*
* @title SVG Path Line
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
let id = 'svg-path-line';
let interactive = new Interactive(id);
interactive.window = true;
let path = interactive.path('');
let start = interactive.control(150, 150);
let end = interactive.control(450, 50);
let text = interactive.text(160, 280, "");
let toggle = interactive.checkBox(160, 240, "absolute / relative", false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtbGluZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbImV4YW1wbGVzL3N2Zy1wYXRoLWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztFQVNFO0FBRUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDO0FBQ3pCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBRTFCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0MsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUUzRSxJQUFJLENBQUMsTUFBTSxHQUFHO0lBQ1osSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFHO1FBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztrQkFDUCxLQUFLLENBQUMsQ0FBQztrQkFDUCxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2tCQUNmLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ2pDO1NBQU07UUFDTCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7a0JBQ1AsS0FBSyxDQUFDLENBQUM7a0JBQ1AsR0FBRyxDQUFDLENBQUM7a0JBQ0wsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3ZCO0FBRUgsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0IsNkVBQTZFO0FBQzdFLDBDQUEwQztBQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHO0lBQ1osSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7SUFDcEQsSUFBSSxDQUFDLEdBQUcsdUNBQXVDLENBQUM7SUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMifQ==