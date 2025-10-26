/*
    Implement a doubly linked list

    const list = LinkedList();

    list.add('A');
    list.add('B');
    list.add('C');

    console.log(list.first.value);           // 'A'
    console.log(list.last.value);            // 'C'
    console.log(list.first.next.value);      // 'B'
    console.log(list.first.next.prev.value); // 'A'
*/

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
    }

    add(value) {
        const node = new Node(value);
        
        if (this.first === null) {
            this.first = node;
            this.last = node;
        } else {
            node.prev = this.last;
            this.last.next = node;
            this.last = node;
        }
    }
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

console.log ('========');

/*
    Make the linked list iterable

    const list = LinkedList();

    list.add('X');
    list.add('Y');
    list.add('Z');

    for (const value of list) {
    console.log(value);
    }
*/

const makeListIterable = (list) => {
    list[Symbol.iterator] = function() {
        const outer = this;
        let node = this.first;

        return {
            next() {
                if (!node.next) {
                    return {
                        done: true,
                    }
                }

                const result = {
                    done: false,
                    value: node.value,
                }

                node = node.next;

                return result;
            }
        };
    }

    return list;
}

const iterableList = makeListIterable(new LinkedList());

iterableList.add(0);
iterableList.add(2);
iterableList.add(null);
iterableList.add(undefined);
iterableList.add(0);
iterableList.add(1);
iterableList.add(2);
iterableList.add(3);

console.log(iterableList);

for (const value of iterableList) {
    console.log(value);
}

console.log ('========');

/*
    Implement a structure based on ArrayBuffer

    const johnDoe = Structure([
        ['firstName', 'utf16', 12], // The number is the maximum number of characters
        ['lastName', 'utf16', 12],
        ['age', 'u16'] // uint16
    ]);

    johnDoe.set('firstName', 'John');
    johnDoe.set('lastName', 'Doe');
    johnDoe.set('age', 48);

    console.log(johnDoe.get('firstName')); // 'John'
    console.log(johnDoe.get('lastName'));  // 'Doe'
    console.log(johnDoe.get('age'));       // 48
*/

function Structure(data) {
    (function validateTypes(){
        data.forEach((field) => {
            const type = field[1];

            if (type !== 'utf16' && type !== 'u16') {
                throw new Error('Encoding / format is not supporting');
            }
        })
    })();

    const fields = [];

    const totalDataBytesCount = data.reduce((accumulator, field) => {
        const [
            title,
            type,
            length,
        ] = field;

        const bytesCount = (() => {
            switch (type) {
                case 'utf16': 
                    return 2 * length;
                case 'u16':
                    return 2;
            }
        })();

        fields.push({
            title,
            type,
            length,
            bytesCount,
            bytesFrom: accumulator,
        })

        return accumulator + bytesCount;
    }, 0);

    const buffer = new ArrayBuffer(totalDataBytesCount);

    fields.forEach((field) => {
        const {
            bytesCount,
            bytesFrom,
        } = field;

        field.view = new Uint16Array(buffer, bytesFrom, bytesCount / 2);
    })

    return {
        set(title, value) {
            const field = fields.find((field) => field.title === title);

            if (!field) {
                throw new Error('Invalid title');
            }

            if (field.type === 'utf16') {
                this.setUtf16(field, value);
            } else if (field.type === 'u16') {
                this.setU16(field, value);
            }

            field.usedLength = value.length;
        },
        setU16(field, value) {
            const {
                view
            } = field;

            if (isNaN(value) || value < 0 || value > 65535) {
                throw new Error('Invalid value');
            }

            view[0] = value;
        },
        setUtf16(field, value) {
            const {
                view,
                length,
            } = field;

            if (value.length > length) {
                throw new Error('Invalid value');
            }

            for (let i = 0; i < length; i++) {
                const codePoint = value.charCodeAt(i);
                view[i] = codePoint;
            }

            for (let i = value.length; i < length; i++) {
                view[i] = 0;
            }
        },
        get(title) {
            const field = fields.find((field) => field.title === title);

            if (!field) {
                throw new Error('Invalid title');
            }

            if (field.type === 'utf16') {
                return this.getUtf16(field);
            } else if (field.type === 'u16') {
                return this.getU16(field);
            }
        },
        getUtf16(field) {
            const {
                view,
                bytesFrom,
                usedLength,
            } = field;

            const bytes = new Uint8Array(view.buffer, bytesFrom, usedLength*2);
            return new TextDecoder("utf-16le").decode(bytes);
        },
        getU16(field) {
            const {
                view,
            } = field;

            return view[0];
        }
    }
}

const johnScripter = Structure([
    ['name', 'utf16', 25],
    ['lastName', 'utf16', 25],
    ['position', 'utf16', 30],
    ['age', 'u16']
]);

johnScripter.set('age', 53);
johnScripter.set('name', 'John🤠');
johnScripter.set('lastName', '🤓🤓🤓Scripter🤓🤓🤓');
johnScripter.set('position', 'Software Engineer🤖');
   
console.log(johnScripter.get('age'));
console.log(johnScripter.get('name'));
console.log(johnScripter.get('lastName'));
console.log(johnScripter.get('position'));