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
let id = 'graph-cosine';
let interactive = new Interactive(id);
interactive.width = 600;
interactive.height = 300;
interactive.window = true;
// Create a new graph object
let graph = interactive.graph();
graph.function = (x) => { return Math.cos(x); };
graph.originX = 0;
graph.originY = interactive.height / 2;
graph.scale(2 * Math.PI / interactive.width, 100);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgtY29zaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2V4YW1wbGVzL2dyYXBoLWNvc2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7RUFRRTtBQUVGLE9BQU8sV0FBVyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLDZCQUE2QjtBQUM3QixJQUFJLEVBQUUsR0FBRyxjQUFjLENBQUM7QUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDeEIsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDekIsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFMUIsNEJBQTRCO0FBQzVCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBUSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztBQUNyQyxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMifQ==