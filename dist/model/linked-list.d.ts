/**
* A dynamic, singlely linked list.
*/
export default class LinkedList<T> implements Iterable<T> {
    private head;
    /**
    Consstructs an empty linked list.
    */
    constructor();
    /**
    Inserts a node at the beginning of the list
    */
    insert(element: T): void;
    /**
    Returns the first element in the list, or null if the list is empty.
    */
    first(): T;
    /**
    Removes the first element in the list. Returns true if element was successfully removed, false otherwise.
    */
    remove(): boolean;
    /**
    * Prints out the string reprsentation of this linked list.
    */
    toString(): string;
    /**
    Returns an iterator over the elements in the list
    */
    [Symbol.iterator](): Iterator<T>;
}
