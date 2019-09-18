import { isPrime, nextPrime } from '../util.js';
describe('Util', function () {
    describe('isPrime', function () {
        // edge cases
        it('should return false for a negative number', function () {
            chai.expect(isPrime(-1)).to.be.false;
        });
        it('should return false for 0', function () {
            chai.expect(isPrime(0)).to.be.false;
        });
        // base composite numbers
        it('should return false for 1', function () {
            chai.expect(isPrime(1)).to.be.false;
        });
        it('should return false for 4', function () {
            chai.expect(isPrime(4)).to.be.false;
        });
        it('should return false for 6', function () {
            chai.expect(isPrime(6)).to.be.false;
        });
        it('should return false for 8', function () {
            chai.expect(isPrime(8)).to.be.false;
        });
        it('should return false for 9', function () {
            chai.expect(isPrime(9)).to.be.false;
        });
        it('should return false for 10', function () {
            chai.expect(isPrime(10)).to.be.false;
        });
        // prime numbers
        it('should return true for 2', function () {
            chai.expect(isPrime(2)).to.be.true;
        });
        it('should return true for 3', function () {
            chai.expect(isPrime(3)).to.be.true;
        });
        it('should return true for 5', function () {
            chai.expect(isPrime(5)).to.be.true;
        });
        it('should return true for 7', function () {
            chai.expect(isPrime(7)).to.be.true;
        });
        it('should return true for 11', function () {
            chai.expect(isPrime(11)).to.be.true;
        });
        it('should return true for 13', function () {
            chai.expect(isPrime(13)).to.be.true;
        });
        it('should return true for 17', function () {
            chai.expect(isPrime(17)).to.be.true;
        });
    });
    describe('nextPrime', function () {
        it('should return 2 for a negative number', function () {
            chai.expect(nextPrime(-1)).to.equal(2);
        });
        it('should return 2 for 0', function () {
            chai.expect(nextPrime(0)).to.equal(2);
        });
        it('should return 2 for 1', function () {
            chai.expect(nextPrime(1)).to.equal(2);
        });
        it('should return 3 for 2', function () {
            chai.expect(nextPrime(2)).to.equal(3);
        });
        it('should return 5 for 3', function () {
            chai.expect(nextPrime(3)).to.equal(5);
        });
        it('should return 5 for 4', function () {
            chai.expect(nextPrime(4)).to.equal(5);
        });
        it('should return 7 for 5', function () {
            chai.expect(nextPrime(5)).to.equal(7);
        });
        it('should return 7 for 6', function () {
            chai.expect(nextPrime(6)).to.equal(7);
        });
        it('should return 11 for 7', function () {
            chai.expect(nextPrime(7)).to.equal(11);
        });
        it('should return 11 for 8', function () {
            chai.expect(nextPrime(8)).to.equal(11);
        });
        it('should return 11 for 9', function () {
            chai.expect(nextPrime(9)).to.equal(11);
        });
        it('should return 11 for 10', function () {
            chai.expect(nextPrime(10)).to.equal(11);
        });
        it('should return 13 for 11', function () {
            chai.expect(nextPrime(11)).to.equal(13);
        });
    });
});
//# sourceMappingURL=util.test.js.map