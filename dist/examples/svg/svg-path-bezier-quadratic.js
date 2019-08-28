/**
* This interactive demonstrates the quadratic bezier command for a SVG path
* element. There are three control points that allow the user to control the
* shape of the bezier curve that is drawn.
*
* @title SVG Path Quadratic Bezier Curve
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../../Interactive.js';
let id = 'svg-path-bezier-quadratic';
let interactive = new Interactive(id);
interactive.border = true;
let l1 = interactive.line(0, 0, 0, 0);
let l2 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
let path = interactive.path('');
let c1 = interactive.control(150, 100);
let c2 = interactive.control(300, 200);
let c3 = interactive.control(450, 100);
let text = interactive.text(25, 275, "");
path.update = function () {
    path.d = `M ${c1.x} ${c1.y} Q ${c2.x} ${c2.y} ${c3.x} ${c3.y}`;
};
path.update();
path.addDependency(c1);
path.addDependency(c2);
path.addDependency(c3);
l1.update = function () {
    this.x1 = c1.x;
    this.y1 = c1.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
l1.update();
l1.addDependency(c1);
l1.addDependency(c2);
l2.update = function () {
    this.x1 = c2.x;
    this.y1 = c2.y;
    this.x2 = c3.x;
    this.y2 = c3.y;
};
l2.update();
l2.addDependency(c2);
l2.addDependency(c3);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">path</tspan>`;
    let d = `<tspan style="fill:#ab6f00">d</tspan>`;
    this.contents = `&lt;${tag} ${d}="M ${c1.x.toFixed(0)}
                                      ${c1.y.toFixed(0)}
                                    Q ${c2.x.toFixed(0)}
                                      ${c2.y.toFixed(0)}
                                      ${c3.x.toFixed(0)}
                                      ${c3.y.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(path);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXBhdGgtYmV6aWVyLXF1YWRyYXRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9leGFtcGxlcy9zdmcvc3ZnLXBhdGgtYmV6aWVyLXF1YWRyYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7RUFRRTtBQUVGLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBRS9DLElBQUksRUFBRSxHQUFHLDJCQUEyQixDQUFDO0FBQ3JDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBRTFCLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkMsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxFQUFFLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO0FBQzdCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7QUFDN0IsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxD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