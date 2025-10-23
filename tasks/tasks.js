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

   ```js
   const jackBlack = Structure([
     ['name', 'utf16', 10], // Число - это максимальное количество символов
     ['lastName', 'utf16', 10],
     ['age', 'u16'] // uint16
   ]);
   
   jackBlack.set('name', 'Jack');
   jackBlack.set('lastName', 'Black');
   jackBlack.set('age', 53);
   
   console.log(jackBlack.get('name')); // 'Jack'
   ```  



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
    const bufferedData = {};

    data.forEach((field) => {
        const [
            title,
            type,
            length,
        ] = field;

        if (type !== 'utf16' && type !== 'u16') {
            throw new Error('Encoding / format is not supporting');
        }

        const bytesCount = (() => {
            switch (type) {
                case 'utf16': 
                    return 2 * length;
                case 'u16':
                    return 2;
            }
        })();

        const buffer = new ArrayBuffer(bytesCount);

        if (type === 'utf16') {
            const view = new Uint16Array(buffer);
            bufferedData[title] = {
                view,
                type,
                length,
                usedLength: 0,
            }
        } else if (type === 'u16') {
            const view = new Uint16Array(buffer);
            bufferedData[title] = {
                view,
                type,
                usedLength: 0,
            };
        }
    })

    return {
        set(title, value) {
            if (!bufferedData[title]) {
                throw new Error('Invalid title');
            }

            const {
                view,
                type,
                length
            } = bufferedData[title]

            if (type === 'utf16') {
                this.setUtf16(value, view, length);
            } else if (type === 'u16') {
                this.setU16(value, view);
            }

            bufferedData[title].usedLength = value.length;
        },
        setU16(value, view) {
            if (isNaN(value) || value < 0 || value > 65535) {
                throw new Error('Invalid value');
            }

            view[0] = value;
        },
        setUtf16(value, view, length) {
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
            if (!bufferedData[title]) {
                throw new Error('Invalid title');
            }

            const {
                view,
                type,
                usedLength,
            } = bufferedData[title];

            if (type === 'utf16') {
                return this.getUtf16(view, usedLength);
            } else if (type === 'u16') {
                return this.getU16(view);
            }
        },
        getUtf16(view, usedLength) {
            const bytes = new Uint8Array(view.buffer, 0, usedLength*2);
            return new TextDecoder("utf-16le").decode(bytes);
        },
        getU16(view) {
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