import { expect } from 'chai';
import hello from '../Library';

describe('Example', function () {

    describe('Example.test', function () {

        it('should return the string hello', function () {
            expect(hello()).to.equal('hello');
        });
    });
});
