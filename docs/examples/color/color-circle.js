/**
* @title Visible Spectrum
* @description
* @tags [elements]
* @ignore true
*/
import { Interactive, download } from '../../index.js';
let TAU = 2 * Math.PI;
let PI = Math.PI;
window.download = download;
function trapezoidalWave(t) {
    return (a) => {
        let x = (a - t) % 1;
        // let x = (a - t);
        if (x < 0) {
            return 0;
        }
        else if (x < 1 / 6) {
            return 6 * x;
        }
        else if (x <= 1 / 2) {
            return 1;
        }
        else if (x < 2 / 3) {
            return 4 - 6 * x;
        }
        else {
            return 0;
        }
    };
}
export default function main(id) {
    let interactive = new Interactive(id, {
        width: 720,
        height: 600,
        originX: 360,
        originY: 300
    });
    let radius = 250;
    let n = 32;
    let group = interactive.group();
    // group.setAttribute('transform', 'translate(250, 500)');
    let circle = group.circle(0, 0, radius);
    circle.classList.add('default');
    circle.style.stroke = 'none';
    let redf = trapezoidalWave(-2 / 6);
    let greenf = trapezoidalWave(0);
    let bluef = trapezoidalWave(2 / 6);
    let red = group.path('M 0 0');
    let blue = group.path('M 0 0');
    let green = group.path('M 0 0');
    red.style.fill = 'rgba(255, 0, 0, .2)';
    red.classList.add('default');
    green.style.fill = 'rgba(0, 255, 0, .2)';
    green.classList.add('default');
    blue.style.fill = 'rgba(0, 0, 255, .2)';
    blue.classList.add('default');
    let d = 1 / n;
    for (let a = 0; a < 1; a += d) {
        let angle = TAU * a;
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        let x2 = Math.cos(angle + TAU * d);
        let y2 = Math.sin(angle + TAU * d);
        let r = trapezoidalWave(-2 / 6)(a) * 255;
        let b = trapezoidalWave(2 / 6)(a) * 255;
        let g = trapezoidalWave(0 / 6)(a) * 255;
        // let rectangleGroup = group.group();
        // rectangleGroup.setAttribute('transform', `rotate(${angle*360/(TAU)})`);
        let id = 2 * circle.r / n;
        for (let i = 0; i <= circle.r; i += id) {
            let a = i / circle.r;
            let r1 = ((1 - a) * 255) + (a * r);
            let g1 = ((1 - a) * 255) + (a * g);
            let b1 = ((1 - a) * 255) + (a * b);
            // let r1 = 0;
            // let g1 = 0;
            // let b1 = 0;
            let path = group.path(`M ${i * x} ${i * y} L ${i * x2} ${i * y2} L ${(i + id) * x2} ${(i + id) * y2} L ${(i + id) * x} ${(i + id) * y} Z`);
            path.style.fill = `rgb( ${r1}, ${g1}, ${b1})`;
            path.style.stroke = `rgb( ${r1}, ${g1}, ${b1})`;
        }
        // let rectangle = group.rectangle(0,0, circle.r, circle.r*TAU*2*d);
        // rectangle.setAttribute('transform', `rotate(${angle*360/(TAU)})`);
        // rectangle.style.fill = `rgb( ${r}, ${g}, ${b})`;
        // rectangle.style.opacity = `.5`;
        // let path = group.path(`M ${0} ${0} L ${x} ${y} L ${x2} ${y2} Z`);
        // path.style.stroke = `rgb( ${r}, ${g}, ${b})`;
        // path.style.fill = `rgb( ${r}, ${g}, ${b})`;
        // let redv = redf(a);
        // let greenv = greenf(a);
        // let bluev = bluef(a);
        //  red.d += `L ${circle.r*redv*Math.cos(angle)} ${circle.r*redv*Math.sin(angle)}`;
        // green.d += `L ${circle.r*greenv*Math.cos(angle)} ${circle.r*greenv*Math.sin(angle)}`;
        //  blue.d += `L ${circle.r*bluev*Math.cos(angle)} ${circle.r*bluev*Math.sin(angle)}`;
    }
    //
    // let plot1 = interactive.plot( trapezoidalWave(4/6), {
    //   width: 836,
    //   height: 400,
    //   y: 400,
    //   x: -50,
    //   scaleX: 736,
    //   scaleY: 100,
    //   originX: -1/736*(1/2),
    //   originY: 150
    // })
    //
    // let plot2 = interactive.plot( trapezoidalWave(0/6), {
    //   width: 836,
    //   height: 400,
    //   y: 400,
    //   x: 0,
    //   scaleX: 736,
    //   scaleY: 100,
    //   originX: -1/736*(1/2),
    //   originY: 150
    // })
    //
    // let plot3 = interactive.plot( trapezoidalWave(2/6), {
    //   width: 836,
    //   height: 400,
    //   y: 800,
    //   x: 0,
    //   scaleX: 736,
    //   scaleY: 100,
    //   originX: -1/736*(1/2),
    //   originY: 150
    // })
}
//# sourceMappingURL=color-circle.js.map