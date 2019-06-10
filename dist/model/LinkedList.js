/**
* A node class contains data and a recursive next point.
*/
class Node {
    /**
    Constructs a new node with the provided data and sets next to be null.
    */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
/**
* A dynamic, singlely linked list.
*/
export default class LinkedList {
    /**
    Consstructs an empty linked list.
    */
    constructor() {
        this.head = null;
    }
    /**
    Inserts a node at the beginning of the list
    */
    insert(element) {
        if (this.head == null) {
            this.head = new Node(element);
        }
        else {
            let temp = this.head;
            this.head = new Node(element);
            this.head.next = temp;
        }
    }
    /**
    Returns the first element in the list, or null if the list is empty.
    */
    first() {
        if (this.head != null) {
            return this.head.data;
        }
        else {
            return null;
        }
    }
    /**
    Removes the first element in the list. Returns true if element was successfully removed, false otherwise.
    */
    remove() {
        if (this.head != null) {
            this.head = this.head.next;
            return true;
        }
        else {
            return false;
        }
    }
    /**
    Returns an iterator over the elements in the list
    */
    [Symbol.iterator]() {
        let current = this.head;
        const iterator = {
            next() {
                if (current == null) {
                    return {
                        done: true,
                        value: undefined
                    };
                }
                else {
                    let data = current.data;
                    current = current.next;
                    return {
                        done: false,
                        value: data
                    };
                }
            }
        };
        return iterator;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlua2VkTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbIm1vZGVsL0xpbmtlZExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUU7QUFDRixNQUFNLElBQUk7SUFLVDs7TUFFRTtJQUNELFlBQWEsSUFBTztRQUVsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUFFRDs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVTtJQUs5Qjs7TUFFRTtJQUNGO1FBRUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFFLE9BQVM7UUFFaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFDckI7WUFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO2FBRUQ7WUFDQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0YsQ0FBQztJQUVEOztNQUVFO0lBQ0YsS0FBSztRQUVKLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQ3JCO1lBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN0QjthQUVEO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtJQUNGLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU07UUFFTCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUNyQjtZQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDWjthQUVEO1lBQ0MsT0FBTyxLQUFLLENBQUM7U0FDYjtJQUNGLENBQUM7SUFFRDs7TUFFRTtJQUNGLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVoQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHO1lBQ2hCLElBQUk7Z0JBRUgsSUFBSSxPQUFPLElBQUksSUFBSSxFQUNuQjtvQkFDQyxPQUFPO3dCQUNOLElBQUksRUFBRSxJQUFJO3dCQUNWLEtBQUssRUFBRSxTQUFTO3FCQUNoQixDQUFBO2lCQUNEO3FCQUVEO29CQUNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN2QixPQUFPO3dCQUNOLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxJQUFJO3FCQUNYLENBQUE7aUJBQ0Q7WUFDRixDQUFDO1NBQ0QsQ0FBQTtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2pCLENBQUM7Q0FDRCJ9