import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.style.border = "1px solid grey";
let question = interactive.text(50, 55, "Would you like more coffee?");
let response = interactive.text(50, 105, `Coffee, you think I want more coffee? <tspan style="font-weight:600">Boy</tspan> do I need more coffee.`);
// let response = interactive.text( 50, 105, `Coffee, you think I want more coffee?`);
//
// let emphasis = interactive.tspan(`Boy`);
// // emphasis.root.style
// response.root.appendChild(interactive.tspan(`Boy`).attr())
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNwYW4tZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9leGFtcGxlcy9lbGVtZW50cy90c3Bhbi1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUNuRCxXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN4QixXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUN6QixXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztBQUU1QyxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztBQUN4RSxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUseUdBQXlHLENBQUMsQ0FBQztBQUNySixzRkFBc0Y7QUFDdEYsRUFBRTtBQUNGLDJDQUEyQztBQUMzQyx5QkFBeUI7QUFDekIsNkRBQTZEIn0=