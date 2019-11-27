/**
* @ignore true
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import { Interactive, getScriptName } from '../../index.js';
// Initialize the interactive
let margin = 32;
let interactive = new Interactive(getScriptName());
interactive.border = false;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.width / 2;
interactive.height = interactive.width;
interactive.style.overflow = 'visible';
// Create three control points
let point = interactive.control(0, 0);
let radius = 50;
let n = 5;
let border = interactive.circle(0, 0, n * radius);
// Create a path
let path = interactive.path('');
path.addDependency(point);
path.root.style.fill = 'rgb(236,236,236)';
path.update = function () {
    let flag = (point.y > 0) ? 1 : 0;
    let angle = getAngle();
    let r = 50;
    path.d = `M 0 0
            L ${r} 0
            A ${r} ${r} 0 ${flag} 0 ${r * Math.cos(angle)} ${-r * Math.sin(angle)}
            z`;
};
path.update();
let xAxis = interactive.line(-interactive.width / 2 + margin, 0, interactive.width / 2 - margin, 0);
let yAxis = interactive.line(0, -interactive.height / 2 + margin, 0, interactive.height / 2 - margin);
// let rectangle = interactive.rectangle(xAxis.x1, yAxis.y1, xAxis.x2 - xAxis.x1, yAxis.y2 - yAxis.y1);
point.constrainWithin(border);
let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');
xAxis.setAttribute('marker-end', `url(#${marker.id})`);
xAxis.setAttribute('marker-start', `url(#${marker.id})`);
yAxis.setAttribute('marker-end', `url(#${marker.id})`);
yAxis.setAttribute('marker-start', `url(#${marker.id})`);
let right = interactive.text(xAxis.x2 + 16, xAxis.y2, '0, 2π');
right.setAttribute('alignment-baseline', 'middle');
let top = interactive.text(yAxis.x1, yAxis.y1 - 16, 'π/2');
top.setAttribute('text-anchor', 'middle');
let left = interactive.text(xAxis.x1 - 20, xAxis.y2, 'π');
left.setAttribute('alignment-baseline', 'middle');
let bottom = interactive.text(yAxis.x1, yAxis.y2 + 32, '3π/2');
bottom.setAttribute('text-anchor', 'middle');
let group = interactive.group();
group.style.strokeOpacity = '.2';
group.root.setAttribute('vector-effect', 'non-scaling-stroke');
let r = 50;
for (let i = 0; i <= n; i++) {
    let angle = i * 2 * Math.PI / 12;
    let x = border.r * Math.cos(angle);
    let y = border.r * Math.sin(angle);
    let circle = group.circle(0, 0, i * r);
    group.line(-x, -y, x, y);
    if (i > 0 && i < n) {
        let tempAngle = 0 * Math.PI / n;
        group.text(circle.r * Math.cos(tempAngle) + 4, -circle.r * Math.sin(tempAngle) + 20, i.toString());
    }
}
let pointRadius = 4 * radius;
let pointAngle = 2 * 2 * Math.PI / 12;
point.translate(pointRadius * Math.cos(pointAngle), -pointRadius * Math.sin(pointAngle));
let radiusLine = interactive.line(0, 0, 0, 0);
radiusLine.style.stroke = 'cornflowerblue';
radiusLine.addDependency(point);
radiusLine.update = function () {
    this.x2 = point.x;
    this.y2 = point.y;
};
radiusLine.update();
interactive.circle(0, 0, 3).style.fill = '#404040';
let text = interactive.text(150, 150, "myText");
text.addDependency(point);
text.update = function () {
    this.x = point.x + 15;
    this.y = point.y - 15;
    this.contents = `(${Math.hypot(point.y / 50, point.x / 50).toFixed(2)}, ${getAngle().toFixed(2)})`;
};
text.update();
// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
    if (point.y <= 0) {
        return Math.abs(Math.atan2(point.y, point.x));
    }
    else {
        return Math.PI * 2 - Math.atan2(point.y, point.x);
    }
}
//# sourceMappingURL=polar-coordinate-system-pi.js.map