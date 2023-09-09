const getRandomNumner = () => Math.floor(Math.random() * 1000);

class ArrayDom {
    constructor(rootId) {
        this.$array = document.getElementById(rootId);
        this.activeIndex = -1;
    }

    getArrayRow(index) {
        return this.$array.querySelector(`.id-${index}`);
    }

    renderArrayElement(index, element) {
        const $arrayRow = document.createElement('array-row');
        const $arrayIndex = document.createElement('array-index');
        const $arrayElement = document.createElement('array-element');
        const $arrayElementText = document.createElement('span');
    
        $arrayRow.classList.add(`id-${index}`);
        $arrayIndex.innerText = index;
        $arrayElementText.innerText = element;
    
        /*
        const gerenateColor = () => {
            return Math.floor(Math.random() * (155 - 0));
        }

        const r = gerenateColor();
        const g = gerenateColor();
        const b = gerenateColor();
        $arrayElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        */

        $arrayRow.classList.add('array-row');
        $arrayIndex.classList.add('array-index');
        $arrayElement.classList.add('array-element');
    
        this.$array.appendChild($arrayRow);
        $arrayRow.appendChild($arrayIndex);
        $arrayRow.appendChild($arrayElement);
        $arrayElement.appendChild($arrayElementText);
    }

    clearArray() {
        this.$array.innerHTML = '';
    }

    removeArrayElement(index) {
        const $arrayRow = this.getArrayRow(index);
        $arrayRow.remove();
    }

    changeArrayElement(index, element) {
        const $arrayRow = this.getArrayRow(index);
        const $arrayElementText = $arrayRow.querySelector('array-element span');
        $arrayElementText.innerText = element;
    }

    setActive(index = -1) {
        if (this.activeIndex !== -1) {
            const $arrayRow = this.getArrayRow(this.activeIndex);
            const $arrayElement = $arrayRow.querySelector('array-element');
            $arrayElement.style.backgroundColor = '';
        }

        if (index !== -1) {
            const $arrayRow = this.getArrayRow(index);
            const $arrayElement = $arrayRow.querySelector('array-element');
            $arrayElement.style.backgroundColor = 'green';
        }
        
        this.activeIndex = index;
    }
}

class Array {
    // array without dublicates

    constructor(number) {
        this.array = {};
        this.DOM = new ArrayDom('array');
        this.generate(number);
    }
  
    generate(number) {
        this.DOM.clearArray();

        const array = this.array;

        array.length = 0;
    
        for (let i = 0; i < number; i++) {
            this.push(getRandomNumner());
        }
    }

    push = (element) => {
        const array = this.array;

        if (this.findIndex(element) === undefined) {
            const index = array.length;
            array[index] = element;
            array.length = array.length + 1;
    
            this.DOM.renderArrayElement(index, element);
            this.DOM.setActive(index);
            debugger;
        }
    } 

    findIndex = (element) => {
        const array = this.array;
        let index = -1;

        for (let i = 0; i < array.length; i++) {
            this.DOM.setActive(i);
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
                this.DOM.changeArrayElement(i, array[i+1]);
                this.DOM.setActive(i);
                debugger;
            }
        }

        delete array[array.length - 1];
        this.DOM.removeArrayElement(array.length - 1);
        array.length = array.length - 1;
    }

    delete = (element) => {
        const array = this.array;

        const index = this.findIndex(element);

        if (index === undefined) return;

        array[index] = undefined;
        this.DOM.changeArrayElement(index, 'null');
        this.DOM.setActive(index);
        debugger;

        this.shift(index);
    }
}

console.log('use debugger to see all iterations');
console.log('const array = new Array(number);');
console.log('array.push(element);');
console.log('array.delete(element);');
console.log('array.findIndex(element);');