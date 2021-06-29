/**
* @ignore true
*/
// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import { Interactive } from '../../index.js';
export default function main(id) {
    // Initialize the interactive
    // let margin = 32;
    let interactive = new Interactive(id);
    interactive.border = false;
    interactive.originX = interactive.width / 2;
    interactive.originY = interactive.width / 2;
    interactive.height = interactive.width;
    interactive.style.overflow = 'visible';
    interactive.classList.add('default');
    // Create three control points
    let point = interactive.control(0, 0);
    let radius = 50;
    let n = 4;
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
    point.constrainWithin(border);
    let group = interactive.group();
    group.style.strokeOpacity = '.2';
    group.root.setAttribute('vector-effect', 'non-scaling-stroke');
    let r = 50;
    for (let i = 0; i <= n; i++) {
        let circle = group.circle(0, 0, i * r);
        if (i > 0 && i < n) {
            let tempAngle = 0 * Math.PI / n;
            group.text(circle.r * Math.cos(tempAngle) + 4, -circle.r * Math.sin(tempAngle) - 8, i.toString());
        }
    }
    for (let i = 0; i <= 2 * Math.PI; i++) {
        let x = border.r * Math.cos(i);
        let y = border.r * Math.sin(i);
        group.line(0, 0, x, -y);
        let label = group.text(x + 20 * Math.cos(i), -y - 20 * Math.sin(i), i.toString());
        label.style.alignmentBaseline = 'middle';
        label.style.textAnchor = 'middle';
    }
    point.translate(3 * radius * Math.cos(2), -3 * radius * Math.sin(2));
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
}
//# sourceMappingURL=polar-coordinate-system-radians.js.map