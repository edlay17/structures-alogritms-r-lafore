const getRandomNumner = () => Math.floor(Math.random() * 1000);

const clearArray = () => {
    const $array = document.getElementById('array');
    $array.innerHTML = '';
}

const renderArrayElement = (index, element) => {
    const $arrayRow = document.createElement('array-row');
    const $arrayIndex = document.createElement('array-index');
    const $arrayElement = document.createElement('array-element');
    const $arrayElementText = document.createElement('span');

    $arrayRow.setAttribute('id', index);
    $arrayIndex.innerText = index;
    $arrayElementText.innerText = element;

    const gerenateColor = () => {
        return Math.floor(Math.random() * (155 - 0));
    }

    const r = gerenateColor();
    const g = gerenateColor();
    const b = gerenateColor();
    $arrayElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    $arrayRow.classList.add('array-row');
    $arrayIndex.classList.add('array-index');
    $arrayElement.classList.add('array-element');

    const $array = document.getElementById('array');
    $array.appendChild($arrayRow);
    $arrayRow.appendChild($arrayIndex);
    $arrayRow.appendChild($arrayElement);
    $arrayElement.appendChild($arrayElementText);
}

const changeArrayElement = (index, element) => {
    const $arrayRow = document.getElementById(index);
    const $arrayElementText = $arrayRow.querySelector('array-element span');
    $arrayElementText.innerText = element;
}

class Array {
    // need to checking dublicates
    constructor(number) {
        this.array = {};
        this.generate(number);
    }
  
    generate(number) {
        clearArray();

        const array = this.array;

        array.length = 0;
    
        for (let i = 0; i < number; i++) {
            array.length += 1;
            const index = array.length - 1;
            
            this[index] = getRandomNumner();
            renderArrayElement(index, this[index]);
        }

    }

    push = (element) => {
        this.array.length;

        const index = this.array.length;
        this[index] = element;
        this.array.length = this.array.length + 1;

        renderArrayElement(index, element);
    } 

    findIndex = (element) => {
        const length = this.array.length;
        let index = -1;

        for (let i = 0; i < length; i++) {
            if (this[i] === element) {
                index = i;
            }
        }

        return index !== -1 ? index : undefined;
    }

    shift = (index) => {
        if (index < this.length || index >= this.length) {
            return;
        }

        if (index < this.length - 1) {
            for (let i = index; i < this.length - 1; i++) {
                this[i] = this[i+1];
                changeArrayElement(i, this[i+1]);
            }
        }

        this.length = this.length - 1;
    }

    delete = (element) => {
        // need to delete last prop
        const index = this.findIndex(element);
        if (index !== undefined) {
            this[index] = undefined;
            changeArrayElement(index, 'null');
            this.shift(index);
            debugger;
        }
    }
}

let array = new Array(10);
array.push(100);