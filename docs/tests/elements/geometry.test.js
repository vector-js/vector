import Container from '../container.js';
import { Interactive } from '../../index.js';
describe('Geometry', function () {
    // create a new container before each test function
    let container;
    let interactive;
    beforeEach(function () {
        container = Container.createContainer();
        interactive = new Interactive(container, {
            width: 200,
            height: 100,
            originX: 100,
            originY: 50
        });
    });
    describe('underlying path', function () {
        it('circle', function () {
            let circle = interactive.circle(0, 0, 40);
            circle.classList.add('default');
            let length = circle.getTotalLength();
            for (let i = 0; i < length; i += length / 8) {
                let point = circle.getPointAtLength(i);
                interactive.circle(point.x, point.y, 3).style.fill = 'cornflowerblue';
            }
        });
        it('rectangle', function () {
            let element = interactive.rectangle(-40, -40, 80, 80);
            element.classList.add('default');
            let length = element.getTotalLength();
            for (let i = 0; i < length; i += length / 8) {
                let point = element.getPointAtLength(i);
                interactive.circle(point.x, point.y, 3).style.fill = 'cornflowerblue';
            }
        });
        it('ellipse', function () {
            let element = interactive.ellipse(0, 0, 40, 30);
            element.classList.add('default');
            let length = element.getTotalLength();
            for (let i = 0; i < length; i += length / 8) {
                let point = element.getPointAtLength(i);
                interactive.circle(point.x, point.y, 3).style.fill = 'cornflowerblue';
            }
        });
        it('line', function () {
            let element = interactive.line(-40, 0, 40, 0);
            element.classList.add('default');
            let length = element.getTotalLength();
            for (let i = 0; i <= length; i += length / 4) {
                let point = element.getPointAtLength(i);
                interactive.circle(point.x, point.y, 3).style.fill = 'cornflowerblue';
            }
        });
        it('polygon', function () {
            let radius = 40;
            let TAU = 2 * Math.PI;
            let points = `${radius * Math.cos(0 * TAU / 3)}, ${radius * Math.sin(0 * TAU / 3)}
										${radius * Math.cos(1 * TAU / 3)}, ${radius * Math.sin(1 * TAU / 3)}
										${radius * Math.cos(2 * TAU / 3)}, ${radius * Math.sin(2 * TAU / 3)}`;
            let element = interactive.polygon(points);
            element.classList.add('default');
            let length = element.getTotalLength();
            for (let i = 0; i < length; i += length / 9) {
                let point = element.getPointAtLength(i);
                interactive.circle(point.x, point.y, 3).style.fill = 'cornflowerblue';
            }
        });
        it('path', function () {
            let radius = 40;
            let TAU = 2 * Math.PI;
            let d = `M ${radius * Math.cos(0 * TAU / 3)}, ${radius * Math.sin(0 * TAU / 3)}
							 L ${radius * Math.cos(1 * TAU / 3)}, ${radius * Math.sin(1 * TAU / 3)}
							 L ${radius * Math.cos(2 * TAU / 3)}, ${radius * Math.sin(2 * TAU / 3)}
							 Z`;
            let element = interactive.path(d);
            element.classList.add('default');
            let length = element.getTotalLength();
            for (let i = 0; i < length; i += length / 9) {
                let point = element.getPointAtLength(i);
                interactive.circle(point.x, point.y, 3).style.fill = 'cornflowerblue';
            }
        });
    });
    describe('bounding box', function () {
        let element;
        afterEach(function () {
            element.classList.add('default');
            let box = element.getBoundingBox();
            let rect = interactive.rectangle(box.x, box.y, box.width, box.height);
            rect.style.fill = 'cornflowerblue';
            rect.style.opacity = '.3';
        });
        it('circle', function () {
            element = interactive.circle(0, 0, 40);
        });
        it('ellipse', function () {
            element = interactive.ellipse(0, 0, 40, 30);
        });
        it('rectangle', function () {
            element = interactive.rectangle(-40, -40, 80, 80);
        });
        it('line', function () {
            element = interactive.line(-40, -40, 40, 40);
        });
        it('polygon', function () {
            let radius = 40;
            let TAU = 2 * Math.PI;
            let d = `${radius * Math.cos(0 * TAU / 4)}, ${radius * Math.sin(0 * TAU / 4)}
							 ${radius * Math.cos(1 * TAU / 4)}, ${radius * Math.sin(1 * TAU / 4)}
							 ${radius * Math.cos(2 * TAU / 4)}, ${radius * Math.sin(2 * TAU / 4)}
							 ${radius * Math.cos(3 * TAU / 4)}, ${radius * Math.sin(3 * TAU / 4)}`;
            element = interactive.polygon(d);
        });
        it('path', function () {
            let radius = 40;
            let TAU = 2 * Math.PI;
            let d = `M ${radius * Math.cos(0 * TAU / 4)}, ${radius * Math.sin(0 * TAU / 4)}
							 L ${radius * Math.cos(1 * TAU / 4)}, ${radius * Math.sin(1 * TAU / 4)}
							 L ${radius * Math.cos(2 * TAU / 4)}, ${radius * Math.sin(2 * TAU / 4)}
							 L ${radius * Math.cos(3 * TAU / 4)}, ${radius * Math.sin(3 * TAU / 4)}
							 Z`;
            element = interactive.path(d);
        });
        it('text', function () {
            element = interactive.text(0, 0, 'Typography');
        });
        it('text horizontally centered', function () {
            let text = interactive.text(0, 0, 'Typography');
            text.setAttribute('text-anchor', 'middle');
            element = text;
        });
        it('text vertically centered', function () {
            let text = interactive.text(0, 0, 'Typography');
            text.setAttribute('alignment-baseline', 'middle');
            element = text;
        });
        it('group', function () {
            let group = interactive.group();
            group.circle(-37, -37, 3);
            group.circle(37, 37, 3);
            element = group;
        });
        it('svg', function () {
            let svg = interactive.svg(10, 10, 90, 90);
            svg.circle(10, 10, 3);
            svg.circle(30, 30, 3);
            element = svg;
        });
    });
});
//# sourceMappingURL=geometry.test.js.map