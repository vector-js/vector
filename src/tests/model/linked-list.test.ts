import { LinkedList } from "../../model/linked-list";

test('should construct a linked list of size 0', () => {
  let ll = new LinkedList();
  expect(ll.size()).toBe(0);
});

test('should return null if the list is empty', () => {
  let ll = new LinkedList();
  expect(ll.first()).toBe(null);
});

test('should return the first element of the list ', () => {
  let ll = new LinkedList<string>();
  ll.insert('a');
  expect(ll.first()).toBe('a');
});

test('should return the first element of the list ', () => {
  let ll = new LinkedList<string>();
  ll.insert('a');
  ll.insert('b');
  expect(ll.first()).toBe('b');
});

test('remove should return false when called on an empty list', () => {
  let ll = new LinkedList<string>();
  expect(ll.remove()).toBe(false);
});

test('remove should remove the first element of the list', () => {
  let ll = new LinkedList<string>();
  ll.insert('a');
  ll.insert('b');
  expect(ll.remove()).toBe(true);
  expect(ll.first()).toBe('a');
});

test('should be able to create an array from linked list', () => {
  let ll = new LinkedList<string>();
  ll.insert('x');
  ll.insert('y');
  ll.insert('z');
  expect(Array.from(ll)).toEqual(['z','y','x']);
});

test('should be able to create an array from linked list', () => {
  let ll = new LinkedList<string>();
  ll.insert('x');
  ll.insert('y');
  ll.insert('z');
  ll.remove();
  expect(Array.from(ll)).toEqual(['y','x']);
});