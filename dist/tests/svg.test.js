import SVG from '../elements/svg.js';
import { descriptiveTests, shapeTests, structuralTests, typographyTests } from './content-model.test.js';
describe('SVG', function () {
    beforeEach(function () {
        this.element = new SVG();
    });
    describe('content model', function () {
        describe('descriptive', function () {
            descriptiveTests();
        });
        describe('shape', function () {
            shapeTests();
        });
        describe('structural', function () {
            structuralTests();
        });
        describe('typography', function () {
            typographyTests();
        });
        // TODO: test creation of 'a' element
        // TODO: test creation of 'clipPath' element
        // TODO: test creation of 'script' element
        // TODO: test creation of 'style' element
        // TODO: test creation of 'view' element
    });
});
//# sourceMappingURL=svg.test.js.map