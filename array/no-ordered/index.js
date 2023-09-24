class Array extends ArrayDOM {
    constructor(number) {
        super();
        this.array = {};
        this.generate(number);
    }

    set iterationsCount(value) {
        this.changeIterationsCount(value);
        this._iterationsCount = value;
    }

    get iterationsCount() {
        return this._iterationsCount;
    }
  
    generate(number) {
        this.iterationsCount = 0;
        this.clearArray();

        const array = this.array;

        array.length = 0;
    
        for (let i = 0; i < number; i++) {
            this.pushS(getRandomNumner());
        }
    }

    push = (element) => {
        this.iterationsCount = 0;
        this.pushS(element);
    }

    pushS = (element) => {
        if (!isNaN(element)) {
            const array = this.array;

            if (this.findIndexS(element) === undefined) {
                const index = array.length;
                array[index] = element;
                array.length = array.length + 1;
        
                this.renderArrayElement(index, element);
                this.setActive(index);
                this.iterationsCount = this.iterationsCount + 1;
                debugger;
            }
        }
    } 

    findIndex = (element) => {
        this.iterationsCount = 0;
        this.pushS(element);
    }

    findIndexS = (element) => {
        const array = this.array;
        let index = -1;

        for (let i = 0; i < array.length; i++) {
            this.setActive(i);
            this.iterationsCount = this.iterationsCount + 1;
            debugger;
            if (array[i] === element) {
                index = i;
                break;
            }
        }

        return index !== -1 ? index : undefined;
    }

    shift = (index) => {
        const array = this.array;

        if (index < 0 || index >= array.length) {
            return;
        }

        if (index < array.length - 1) {
            for (let i = index; i < array.length - 1; i++) {
                array[i] = array[i+1];
                this.changeArrayElement(i, array[i+1]);
                this.setActive(i);
                this.iterationsCount = this.iterationsCount + 1;
                debugger;
            }
        }

        delete array[array.length - 1];
        this.removeArrayElement(array.length - 1);
        array.length = array.length - 1;
        this.iterationsCount = this.iterationsCount + 1;
    }

    delete = (element) => {
        this.iterationsCount = 0;
        this.deleteS(element);
    }

    deleteS = (element) => {
        const array = this.array;

        const index = this.findIndexS(element);

        if (index === undefined) return;

        array[index] = undefined;
        this.changeArrayElement(index, 'null');
        this.setActive(index);
        this.iterationsCount = this.iterationsCount + 1;
        debugger;

        this.shift(index);
    }
}

console.log('use debugger to see all iterations');
console.log('const array = new Array(number);');
console.log('array.push(element);');
console.log('array.delete(element);');
console.log('array.findIndex(element);');