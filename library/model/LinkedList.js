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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlua2VkTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbIm1vZGVsL0xpbmtlZExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUU7QUFDRixNQUFNLElBQUk7SUFLVDs7TUFFRTtJQUNELFlBQWEsSUFBTztRQUVsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUFFRDs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVTtJQUs5Qjs7TUFFRTtJQUNGO1FBRUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFFLE9BQVM7UUFFaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFDckI7WUFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO2FBRUQ7WUFDQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0YsQ0FBQztJQUVEOztNQUVFO0lBQ0YsS0FBSztRQUVKLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQ3JCO1lBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN0QjthQUVEO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtJQUNGLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU07UUFFTCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUNyQjtZQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDWjthQUVEO1lBQ0MsT0FBTyxLQUFLLENBQUM7U0FDYjtJQUNGLENBQUM7SUFFRDs7TUFFRTtJQUNGLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVoQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHO1lBQ2hCLElBQUk7Z0JBRUgsSUFBSSxPQUFPLElBQUksSUFBSSxFQUNuQjtvQkFDQyxPQUFPO3dCQUNOLElBQUksRUFBRSxJQUFJO3dCQUNWLEtBQUssRUFBRSxTQUFTO3FCQUNoQixDQUFBO2lCQUNEO3FCQUVEO29CQUNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN2QixPQUFPO3dCQUNOLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxJQUFJO3FCQUNYLENBQUE7aUJBQ0Q7WUFDRixDQUFDO1NBQ0QsQ0FBQTtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2pCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBBIG5vZGUgY2xhc3MgY29udGFpbnMgZGF0YSBhbmQgYSByZWN1cnNpdmUgbmV4dCBwb2ludC5cbiovXG5jbGFzcyBOb2RlPFQ+XG57XG5cdG5leHQgOiBOb2RlPFQ+O1xuICBkYXRhOiBUO1xuXG5cdC8qKlxuXHRDb25zdHJ1Y3RzIGEgbmV3IG5vZGUgd2l0aCB0aGUgcHJvdmlkZWQgZGF0YSBhbmQgc2V0cyBuZXh0IHRvIGJlIG51bGwuXG5cdCovXG4gIGNvbnN0cnVjdG9yKCBkYXRhOiBUKVxuICB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLm5leHQgPSBudWxsO1xuICB9XG59XG5cbi8qKlxuKiBBIGR5bmFtaWMsIHNpbmdsZWx5IGxpbmtlZCBsaXN0LlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmtlZExpc3Q8VD4gaW1wbGVtZW50cyBJdGVyYWJsZTxUPlxue1xuXHQvLyBDb250YWlucyBoZWFkIG9mIGxpbmtlZCBsaXN0XG5cdHByaXZhdGUgaGVhZDogTm9kZTxUPjtcblxuXHQvKipcblx0Q29uc3N0cnVjdHMgYW4gZW1wdHkgbGlua2VkIGxpc3QuXG5cdCovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHRoaXMuaGVhZCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0SW5zZXJ0cyBhIG5vZGUgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdFxuXHQqL1xuXHRpbnNlcnQoIGVsZW1lbnQ6VCApXG5cdHtcblx0XHRpZiggdGhpcy5oZWFkID09IG51bGwgKVxuXHRcdHtcblx0XHRcdHRoaXMuaGVhZCA9IG5ldyBOb2RlKGVsZW1lbnQpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bGV0IHRlbXAgPSB0aGlzLmhlYWQ7XG5cdFx0XHR0aGlzLmhlYWQgPSBuZXcgTm9kZShlbGVtZW50KTtcblx0XHRcdHRoaXMuaGVhZC5uZXh0ID0gdGVtcDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0UmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgbGlzdCwgb3IgbnVsbCBpZiB0aGUgbGlzdCBpcyBlbXB0eS5cblx0Ki9cblx0Zmlyc3QoKSA6IFRcblx0e1xuXHRcdGlmKCB0aGlzLmhlYWQgIT0gbnVsbClcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5oZWFkLmRhdGE7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0UmVtb3ZlcyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgbGlzdC4gUmV0dXJucyB0cnVlIGlmIGVsZW1lbnQgd2FzIHN1Y2Nlc3NmdWxseSByZW1vdmVkLCBmYWxzZSBvdGhlcndpc2UuXG5cdCovXG5cdHJlbW92ZSgpIDogYm9vbGVhblxuXHR7XG5cdFx0aWYoIHRoaXMuaGVhZCAhPSBudWxsIClcblx0XHR7XG5cdFx0XHR0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRSZXR1cm5zIGFuIGl0ZXJhdG9yIG92ZXIgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0XG5cdCovXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhdG9yPFQ+XG5cdHtcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuaGVhZDtcblxuXHRcdGNvbnN0IGl0ZXJhdG9yID0ge1xuXHRcdFx0bmV4dCgpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKCBjdXJyZW50ID09IG51bGwpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZG9uZTogdHJ1ZSxcblx0XHRcdFx0XHRcdHZhbHVlOiB1bmRlZmluZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGRhdGEgPSBjdXJyZW50LmRhdGE7XG5cdFx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnQubmV4dDtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZG9uZTogZmFsc2UsXG5cdFx0XHRcdFx0XHR2YWx1ZTogZGF0YVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpdGVyYXRvcjtcblx0fVxufVxuIl19