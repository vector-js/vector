/**
* This interactive demonstrates the SVG rectangle element and its attributes.
*
* @title SVG Rectangle Element
* @date May 3, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
let id = 'svg-rectangle';
let interactive = new Interactive(id);
interactive.window = true;
let rect = interactive.rectangle(0, 0, 0, 0);
let c1 = interactive.control(150, 100);
let c2 = interactive.control(450, 200);
let text = interactive.text(90, 280, "");
c2.update = function () {
    this.x += c1.dx;
    this.y += c1.dy;
};
c2.addDependency(c1);
rect.update = function () {
    this.x = Math.min(c1.x, c2.x);
    this.y = Math.min(c1.y, c2.y);
    this.width = Math.max(c1.x, c2.x) - rect.x;
    this.height = Math.max(c1.y, c2.y) - rect.y;
};
rect.update();
rect.addDependency(c1);
rect.addDependency(c2);
// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">rect</tspan>`;
    let x = `<tspan style="fill:#ab6f00">x</tspan>`;
    let y = `<tspan style="fill:#ab6f00">y</tspan>`;
    let width = `<tspan style="fill:#ab6f00">width</tspan>`;
    let height = `<tspan style="fill:#ab6f00">height</tspan>`;
    this.contents = `&lt;${tag} ${x}="${rect.x.toFixed(0)}
                              ${y}="${rect.y.toFixed(0)}
                              ${width}="${rect.width.toFixed(0)}
                              ${height}="${rect.height.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(rect);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJlY3RhbmdsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbImV4YW1wbGVzL3N2Zy1yZWN0YW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztFQU1FO0FBRUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDO0FBQ3pCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBRTFCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEMsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTFDLEVBQUUsQ0FBQyxNQUFNLEdBQUc7SUFDVixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDaEIsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQTtBQUNELEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRztJQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXZCLDZFQUE2RTtBQUM3RSwwQ0FBMEM7QUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRztJQUNaLElBQUksR0FBRyxHQUFHLHlDQUF5QyxDQUFDO0lBQ3BELElBQUksQ0FBQyxHQUFHLHVDQUF1QyxDQUFDO0lBQ2hELElBQUksQ0FBQyxHQUFHLHVDQUF1QyxDQUFDO0lBQ2hELElBQUksS0FBSyxHQUFHLDJDQUEyQyxDQUFDO0lBQ3hELElBQUksTUFBTSxHQUFHLDRDQUE0QyxDQUFDO0lBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FDdkIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FDdkIsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQ0FDL0IsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDeEUsQ0FBQyxDQUFBO0FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9