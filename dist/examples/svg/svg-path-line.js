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
import Interactive from '../../Interactive.js';
let id = 'svg-path-line';
let interactive = new Interactive(id);
interactive.border = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtbGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9leGFtcGxlcy9zdmcvc3ZnLXBhdGgtbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0VBU0U7QUFFRixPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUUvQyxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUM7QUFDekIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFMUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMzQyxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4QyxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0UsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTFDLElBQUksQ0FBQyxNQUFNLEdBQUc7SUFDWixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUc7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO2tCQUNQLEtBQUssQ0FBQyxDQUFDO2tCQUNQLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7a0JBQ2YsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDakM7U0FBTTtRQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztrQkFDUCxLQUFLLENBQUMsQ0FBQztrQkFDUCxHQUFHLENBQUMsQ0FBQztrQkFDTCxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDdkI7QUFFSCxDQUFDLENBQUE7QUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQiw2RUFBNkU7QUFDN0UsMENBQTBDO0FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUc7SUFDWixJQUFJLEdBQUcsR0FBRyx5Q0FBeUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsR0FBRyx1Q0FBdUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9