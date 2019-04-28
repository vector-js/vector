/**
* A node class contains data and a recursive next point.
*/
class Node<T>
{
	next : Node<T>;
  data: T;

	/**
	Constructs a new node with the provided data and sets next to be null.
	*/
  constructor( data: T)
  {
    this.data = data;
    this.next = null;
  }
}

/**
* A dynamic, singlely linked list.
*/
export default class LinkedList<T> implements Iterable<T>
{
	// Contains head of linked list
	private head: Node<T>;

	/**
	Consstructs an empty linked list.
	*/
	constructor()
	{
		this.head = null;
	}

	/**
	Inserts a node at the beginning of the list
	*/
	insert( element:T )
	{
		if( this.head == null )
		{
			this.head = new Node(element);
		}
		else
		{
			let temp = this.head;
			this.head = new Node(element);
			this.head.next = temp;
		}
	}

	/**
	Returns the first element in the list, or null if the list is empty.
	*/
	first() : T
	{
		if( this.head != null)
		{
			return this.head.data;
		}
		else
		{
			return null;
		}
	}

	/**
	Removes the first element in the list. Returns true if element was successfully removed, false otherwise.
	*/
	remove() : boolean
	{
		if( this.head != null )
		{
			this.head = this.head.next;
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	Returns an iterator over the elements in the list
	*/
	[Symbol.iterator](): Iterator<T>
	{
		let current = this.head;

		const iterator = {
			next()
			{
				if( current == null)
				{
					return {
						done: true,
						value: undefined
					}
				}
				else
				{
					let data = current.data;
					current = current.next;
					return {
						done: false,
						value: data
					}
				}
			}
		}

		return iterator;
	}
}
