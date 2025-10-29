/*
    Implement a queue using a linked list

    const queue = Queue();

    queue.push(5);
    queue.push(7);
    queue.push(9);

    console.log(queue.head);   // 5
    console.log(queue.pop());  // 5
    console.log(queue.head);   // 7
    console.log(queue.pop());  // 7
    console.log(queue.pop());  // 9

    console.log(queue.pop());  // Exception
*/

class QueueNode {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

function Queue() {
    return {
        _head: null,
        pop() {
            if (!this._head) {
                console.error('Empty queue');
                return;

                //throw new Error('Empty queue');
            }

            const oldHead = this._head;
            const nextNode = this._head.nextNode;

            if (nextNode) {
                this._head = nextNode;
            } else {
                this._head = null;
            }
            
            return oldHead.value;
        },
        push(value) {
            const newNode = new QueueNode(value);

            if (!this._head) {
                this._head = newNode;
            } else {
                let node = this._head;

                while (node.nextNode) {
                    node = node.nextNode;
                }

                node.nextNode = newNode;
            }

            return newNode.value;
        },
        get head() {
            return this._head?.value;
        }
    }
}

const queue = Queue();

queue.push(5);
queue.push(7);
queue.push(9);

// console.log(queue.head);   // 9
// console.log(queue.pop());  // 9
// console.log(queue.head);   // 7
// console.log(queue.pop());  // 7
// console.log(queue.pop());  // 5

// console.log(queue.pop());  // Exception


/*
    Implement a Double-Ended Queue (Deque)

    const deque = Queue();

    deque.push('apple');
    deque.unshift('banana');
    deque.push('cherry');

    console.log(deque.pop());    // 'cherry'
    console.log(deque.shift());  // 'banana'
    console.log(deque.pop());    // 'apple'
    console.log(deque.pop());    // Exception
*/

class DequeueNode {
    constructor(value, prevNode = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
        this.prevNode = prevNode;
    }
}

function Dequeue() {
    return {
        _first: null,
        _last: null,
        shift() {
            if (!this._first) {
                console.error('Empty queue');
                return;

                //throw new Error('Empty queue');
            }

            const oldHead = this._first;
            const nextNode = this._first.nextNode;

            if (nextNode) {
                this._first = nextNode;
                this._first.prevNode = null;
            } else {
                this.removeLastElem();
            }
            
            return oldHead.value;
        },
        pop() {
            if (!this._last) {
                console.error('Empty queue');
                return;
                
                //throw new Error('Empty queue');
            }

            const oldTail = this._last;
            const prevNode = this._last.prevNode;

            if (prevNode) {
                this._last = prevNode;
                this._last.nextNode = null;
            } else {
                this.removeLastElem();
            }

            return oldTail.value;
        },
        removeLastElem() {
            this._first = null;
            this._last = null;
        },
        createFirstElem(value) {
            const newNode = new DequeueNode(value);
            this._first = newNode;
            this._last = newNode;
        },
        push(value) {
            if (this.isEmpty()) {
                this.createFirstElem(value);
            } else {
                const newNode = new DequeueNode(value, this._last, null);
                this._last.nextNode = newNode;
                this._last = newNode;
            }
        },
        unshift(value) {
            if (this.isEmpty()) {
                this.createFirstElem(value);
            } else {
                const newNode = new DequeueNode(value, null, this._first);
                this._first.prevNode = newNode;
                this._first = newNode;
            }
        },
        isEmpty() {
            return !this._first;
        },
        get head() {
            return this._first?.value;
        },
        get tail() {
            return this._last?.value;
        }
    }
}


   const dequeue = Dequeue();
   
//    dequeue.push(10);
//    console.log('dequeue.push(10);')
//    console.log('head:', dequeue.head);
//    console.log('tail:', dequeue.tail);
//    console.log('====');
//    dequeue.unshift(11);
//    console.log('dequeue.unshift(11);')
//    console.log('head:', dequeue.head);
//    console.log('tail:', dequeue.tail);
//    console.log('====');
//    dequeue.push(12);
//    console.log('dequeue.push(12);')
//    console.log('head:', dequeue.head);
//    console.log('tail:', dequeue.tail);
//    console.log('====');
   


//     console.log('dequeue.pop(): ', dequeue.pop());   // 12
//     console.log('head:', dequeue.head);
//     console.log('tail:', dequeue.tail);

//     console.log('===============');
//     console.log('dequeue.shift(): ', dequeue.shift()); // 11
//     console.log('head:', dequeue.head);
//     console.log('tail:', dequeue.tail);

//     console.log('===============');
//     console.log('dequeue.pop(): ',dequeue.pop());   // 10
//     console.log('head:', dequeue.head);
//     console.log('tail:', dequeue.tail);

//     console.log('===============');
//     console.log('dequeue.pop(): ',dequeue.pop());   // Exception

/*  
    Task: Implement a stack based on a typed array of fixed length

    const stack = Stack(Float64Array, 5);

    stack.push(3.14);
    stack.push(2.71);
    stack.push(1.41);

    console.log(stack.head);  // 1.41

    console.log(stack.pop()); // 1.41

    console.log(stack.head);  // 2.71

    console.log(stack.pop()); // 2.71
    console.log(stack.pop()); // 3.14
    console.log(stack.pop()); // Exception
*/

function Stack(TypedArray, length) {
    const array = new TypedArray(length);

    return {
        headIndex: -1,
        push(value) {
            if (this.headIndex === -1) {
                array[0] = value;
                this.headIndex = 0;
            } else if (this.headIndex < length - 1) {
                array[this.headIndex + 1] = value;
                this.headIndex++;
            }
        },
        pop() {
            if (this.headIndex === -1) {
                throw new Error('stack is empty');
            }

            const prevHeadValue = array[this.headIndex];
            this.headIndex--;
            return prevHeadValue;
        },
        get head() {
            if (this.headIndex === -1) {
                throw new Error('stack is empty');
            }

            return array[this.headIndex];
        }
    }
}

const stack = Stack(Float64Array, 5);

stack.push(3.14);
stack.push(2.71);
stack.push(1.41);

console.log(stack.head);  // 1.41

console.log(stack.pop()); // 1.41

console.log(stack.head);  // 2.71

console.log(stack.pop()); // 2.71
console.log(stack.pop()); // 3.14
console.log(stack.pop()); // Exception