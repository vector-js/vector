/**
* This interactive demonstrates the SVG ellipse element and its attributes.
*
* @title SVG Ellipse
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
let id = 'svg-ellipse';
let interactive = new Interactive(id);
interactive.window = true;
let ellipse = interactive.ellipse(0, 0, 0, 0);
let l1 = interactive.line(0, 0, 0, 0);
let l2 = interactive.line(0, 0, 0, 0);
l1.stroke = 'cornflowerblue';
l2.stroke = 'cornflowerblue';
let text = interactive.text(110, 280, "");
let c0 = interactive.control(300, 150);
let c1 = interactive.control(450, 150);
let c2 = interactive.control(300, 100);
ellipse.update = function () {
    this.cx = c0.x;
    this.cy = c0.y;
    this.rx = Math.abs(c1.x - c0.x);
    this.ry = Math.abs(c2.y - c0.y);
};
ellipse.update();
ellipse.addDependency(c0);
ellipse.addDependency(c1);
ellipse.addDependency(c2);
c1.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c1.addDependency(c0);
c1.constrainToX();
c2.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c2.addDependency(c0);
c2.constrainToY();
l1.update = function () {
    this.x1 = c0.x;
    this.y1 = c0.y;
    this.x2 = c1.x;
    this.y2 = c1.y;
};
l1.update();
l1.addDependency(c0);
l1.addDependency(c1);
l2.update = function () {
    this.x1 = c0.x;
    this.y1 = c0.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
l2.update();
l2.addDependency(c0);
l2.addDependency(c2);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">ellipse</tspan>`;
    let cx = `<tspan style="fill:#ab6f00">cx</tspan>`;
    let cy = `<tspan style="fill:#ab6f00">cy</tspan>`;
    let rx = `<tspan style="fill:#ab6f00">rx</tspan>`;
    let ry = `<tspan style="fill:#ab6f00">ry</tspan>`;
    this.contents = `&lt;${tag} ${cx}="${ellipse.cx.toFixed(0)}
                              ${cy}="${ellipse.cy.toFixed(0)}
                              ${rx}="${ellipse.rx.toFixed(0)}
                              ${ry}="${ellipse.ry.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(ellipse);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWVsbGlwc2UuanMiLCJzb3VyY2VSb290IjoiLi9zb3VyY2UvIiwic291cmNlcyI6WyJleGFtcGxlcy9zdmctZWxsaXBzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0VBTUU7QUFFRixPQUFPLFdBQVcsTUFBTSxtQkFBbUIsQ0FBQztBQUU1QyxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUM7QUFDdkIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFMUIsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkMsRUFBRSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztBQUM3QixFQUFFLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO0FBQzdCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMzQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUV4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