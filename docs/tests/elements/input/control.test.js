import Container from '../../container.js';
import { Interactive } from '../../../index.js';
describe('Control Point', function () {
    // create a new container before each test function
    let container;
    let interactive;
    let control;
    beforeEach(function () {
        container = Container.createContainer();
        interactive = new Interactive(container, {
            width: 120,
            height: 120,
            originX: 60,
            originY: 60
        });
    });
    describe('constrain within', function () {
        it('should constrain the position of the control within the circle', function () {
            let circle = interactive.circle(0, 0, 40);
            circle.style.fill = '#f8f8f8';
            circle.style.stroke = '#333333';
            control = interactive.control(0, 0);
            control.constrainWithin(circle);
        });
        it('should constrain the position of the control within the rectangle', function () {
            let rect = interactive.rectangle(-40, -40, 80, 80);
            rect.style.fill = '#f8f8f8';
            rect.style.stroke = '#333333';
            control = interactive.control(0, 0);
            control.constrainWithin(rect);
            interactive.line(rect.x, interactive.minY, rect.x, interactive.maxY).style.stroke = '#dddddd';
            interactive.line(interactive.minX, rect.y, interactive.maxX, rect.y).style.stroke = '#dddddd';
            interactive.line(rect.x + rect.width, interactive.minY, rect.x + rect.width, interactive.maxY).style.stroke = '#dddddd';
            interactive.line(interactive.minX, rect.y + rect.height, interactive.maxX, rect.y + rect.height).style.stroke = '#dddddd';
            // interactive.rectangle(-40,-40,80,80);
        });
    });
    describe('constrain to path', function () {
        it('should constrain the position of the control to the path of the circle', function () {
            let circle = interactive.circle(0, 0, 40);
            circle.style.stroke = '#5bbc76';
            circle.style.fill = '#f8f8f8';
            control = interactive.control(40, 0);
            control.constrainTo(circle);
        });
        it('should constrain the position of the control within the rectangle', function () {
            let shape = interactive.rectangle(-40, -40, 80, 80);
            shape.style.stroke = '#5bbc76';
            shape.style.fill = '#f8f8f8';
            control = interactive.control(0, 0);
            control.constrainTo(shape);
            interactive.line(interactive.minX, interactive.minY, interactive.maxX, interactive.maxY).style.stroke = '#dddddd';
            interactive.line(interactive.minX, interactive.maxY, interactive.maxX, interactive.minY).style.stroke = '#dddddd';
            ;
        });
    });
});
//# sourceMappingURL=control.test.js.map