import Container from '../container.js';
import colorWheel from '../../examples/color/color-wheel.js';
describe('Color Theory Interactives', function () {
    // create a new container before each test function
    let container;
    beforeEach(function () {
        container = Container.createContainer();
    });
    describe('Interactives', function () {
        it('color wheel', function () {
            colorWheel(container.id);
        });
    });
});
//# sourceMappingURL=color-wheel.js.map