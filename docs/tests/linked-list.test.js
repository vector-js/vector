/**
* @ignore
*/
import LinkedList from '../model/linked-list.js';
describe('LinkedList', function () {
    describe('LinkedList.constructor', function () {
        it('should construct a new linked list', function () {
            new LinkedList();
        });
    });
    describe('LinkedList.first', function () {
        it('should return null if the list is empty', function () {
            let ll = new LinkedList();
            chai.expect(ll.first()).to.equal(null);
        });
        it('should return the first element of the list', function () {
            let ll = new LinkedList();
            ll.insert('a');
            chai.expect(ll.first()).to.equal('a');
        });
        it('should return the first element of the list', function () {
            let ll = new LinkedList();
            ll.insert('a');
            ll.insert('b');
            chai.expect(ll.first()).to.equal('b');
        });
    });
    describe('LinkedList.remove', function () {
        it('should return false when called on an empty list', function () {
            let ll = new LinkedList();
            chai.expect(ll.remove()).to.be.false;
        });
        it('should remove the first element of the list', function () {
            let ll = new LinkedList();
            ll.insert('a');
            ll.insert('b');
            chai.expect(ll.remove()).to.be.true;
            chai.expect(ll.first()).to.equal('a');
        });
    });
    describe('LinkedList.iterator', function () {
        it('should return an iterator with the numbers ', function () {
            let ll = new LinkedList();
            ll.insert(3);
            ll.insert(2);
            ll.insert(1);
            chai.expect(Array.from(ll)).to.deep.equal([1, 2, 3]);
        });
        it('should return an iterator with the numbers ', function () {
            let ll = new LinkedList();
            ll.insert(3);
            ll.insert(2);
            ll.insert(1);
            ll.remove();
            chai.expect(Array.from(ll)).to.deep.equal([2, 3]);
        });
    });
});
//# sourceMappingURL=linked-list.test.js.map