
import LinkedList from '../model/LinkedList';
import { expect } from 'chai';

describe('LinkedList', function () {

  describe('LinkedList.constructor', function() {

    it('should construct a new linked list', function(){

        new LinkedList<number>();
    });
  });

  describe('LinkedList.first', function() {

    it('should return null if the list is empty', function(){

      let ll = new LinkedList<string>();
      expect(ll.first()).to.equal(null);
    });

    it('should return the first element of the list', function(){

      let ll = new LinkedList<string>();
      ll.insert('a');
      expect(ll.first()).to.equal('a');
    });

    it('should return the first element of the list', function(){

      let ll = new LinkedList<string>();
      ll.insert('a');
      ll.insert('b');
      expect(ll.first()).to.equal('b');
    });
  });

  describe('LinkedList.remove', function() {

    it('should return false when called on an empty list', function(){

      let ll = new LinkedList<string>();
      expect(ll.remove()).to.be.false;
    });

    it('should remove the first element of the list', function(){

      let ll = new LinkedList<string>();
      ll.insert('a');
      ll.insert('b');
      expect(ll.remove()).to.be.true;
      expect(ll.first()).to.equal('a');
    });
  });

  describe('LinkedList.iterator', function() {

    it('should return an iterator with the numbers ', function(){

        let ll = new LinkedList<number>();
        ll.insert(3);
        ll.insert(2);
        ll.insert(1);

        expect(Array.from(ll)).to.deep.equal([1, 2, 3]);
    });

    it('should return an iterator with the numbers ', function(){

        let ll = new LinkedList<number>();
        ll.insert(3);
        ll.insert(2);
        ll.insert(1);
        ll.remove()

        expect(Array.from(ll)).to.deep.equal([2, 3]);
    });
  });
});
