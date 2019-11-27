import A from '../../../elements/svg/a.js';
describe('A (link)', function () {
    describe('constructor', function () {
        it('should create a link element', function () {
            let element = new A("./");
            element.setAttribute('href', 'example.com');
        });
    });
});
//# sourceMappingURL=a.test.js.map