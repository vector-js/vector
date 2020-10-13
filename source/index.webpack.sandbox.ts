import { Interactive } from "./index";
import { SVGResponsiveTemplate } from "./templates/svg-responsive";
import { Math2 } from "./util/math";
import '../style/vector.css';

let body = document.getElementsByTagName("body")[0];

function createContainer() {
    let container = document.createElement('div');
    container.style.marginBottom = '1.5rem';
    return container;
}

let container = body.appendChild(createContainer());
let interactive = new Interactive(container, {
    width:400,
    height:400,
    maxWidth: 500
});
interactive.drawGrid(false);

let circle = interactive.circle(0,0,150);
let control = interactive.control(100,100);
control.constrainTo(circle);
circle.style.fill = 'none';
circle.style.stroke = '#404040';
circle.style.strokeWidth = '1';


// Angle Interactive Example

// let width = 4*144;
// let height = width;
// let svg = new SVGResponsiveTemplate(width, height, {maxWidth:width, origin:'center'});
// body.appendChild(createContainer()).appendChild(svg.root);
// svg.drawGrid();

// let radius = 225;
// let circle = svg.circle(0,0,radius);
// circle.style.fill = 'none';
// circle.style.stroke = '#404040';
// circle.style.strokeWidth = '1';

// let group = svg.group();
// group.style.stroke = '#404040';
// group.style.strokeWidth = '1';

// let points = svg.group();
// points.style.fill = '#404040';

// let n = 12;
// for( let a = 0; a < n; a ++) {
//     let angle = (a/n)*Math2.TAU;
//     let x = radius*Math.cos(angle);
//     let y = radius*Math.sin(angle);
//     let line = group.line(0,0,x,y);
//     let point = points.circle(x,y,3);
// }