/**
* This interactive demonstrates the quadratic bezier command for a SVG path
* element. There are three control points that allow the user to control the
* shape of the bezier curve that is drawn.
*
* @title SVG Path Quadratic Bezier Curve
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
// Initialize the interactive
let id = 'graph-quadratic';
let interactive = new Interactive(id);
interactive.window = true;
// Create a new graph object
let graph = interactive.graph();
graph.function = (x) => { return x * x; };
graph.originX = interactive.width / 2;
graph.originY = 2 * interactive.height / 3;
graph.scale(1 / 60, 30);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtcXVhZHJhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2V4YW1wbGVzL2dyYXBoLXF1YWRyYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7RUFRRTtBQUVGLE9BQU8sV0FBVyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLDZCQUE2QjtBQUM3QixJQUFJLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQixJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUUxQiw0QkFBNEI7QUFDNUIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFRLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQyxLQUFLLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO0FBQ3BDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO0FBQ3ZDLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQyxHQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyJ9