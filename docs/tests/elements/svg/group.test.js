import { descriptiveElements, shapeElements, structuralElements, aElement, clipPathElement, scriptElement, viewElement, textElement } from './content-model.test.js';
import Group from '../../../elements/svg/group.js';
describe('Group', function () {
    beforeEach(function () {
        this.element = new Group();
    });
    describe('content model', function () {
        // grouped elements
        descriptiveElements();
        shapeElements();
        structuralElements();
        // individual elements
        aElement();
        clipPathElement();
        // filterElement();
        // foreignObjectElement();
        // imageElement();
        // markerElement();
        // maskElement();
        scriptElement();
        // styleElement();
        // switchElement();
        textElement();
        viewElement();
    });
});
//# sourceMappingURL=group.test.js.map